import { useEffect, useState } from "react";
import { useAuth } from "../features/auth/context/UserContext"; // ✅ Auth Context
import { useCart } from "../features/cart/context/CartContext";
import { useLocation, Navigate } from "react-router-dom";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../config/firebase";

import AddressForm from "../components/form/AddressForm";
import AddressCard from "../components/cards/AddressCard";
import CartSummary from "../features/cart/components/CartSummary";
import PaymentConfirmationPopup from "../components/pop-up/PaymentConfirmationPopup";
import { Loader2 } from "lucide-react";

const AddressPage = () => {
  // 🔥 Get User, Save Function, and Cached Address from Context
  const { user, isLoggedIn, saveAddress, address: cachedAddress } = useAuth();
  const { clear } = useCart();
  const location = useLocation();

  // 1. RETRIEVE DATA FROM CART
  const { items, totalAmount } = location.state || {};

  // Safety: Redirect if accessed directly without data
  if (!items || items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // Form State
  const [form, setForm] = useState({
    name: "",
    phone: "",
    addressLine1: "", // Form UI uses this
    city: "",
    state: "",
    pincode: "",
    id: null, // To track editing ID
  });

  const [popupVisible, setPopupVisible] = useState(false);

  // Helper: Sanitize inputs (remove undefined)
  const sanitize = (obj) => {
    const sanitized = {};
    Object.entries(obj).forEach(([key, value]) => {
      sanitized[key] = value ?? "";
    });
    return sanitized;
  };

  // 2. FETCH ALL ADDRESSES (Subcollection)
  // We fetch the list because Context only holds the *Active* address
  useEffect(() => {
    if (!user?.uid) return;

    const loadAddresses = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "users", user.uid, "addresses"),
          orderBy("createdAt", "desc"),
        );
        const snapshot = await getDocs(q);

        const loadedAddresses = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAddresses(loadedAddresses);

        // 🔥 Smart Select:
        // 1. If we have a cached address in Context, find it in the list
        // 2. Else use defaultAddressId from profile
        const activeId = cachedAddress?.id || user.defaultAddressId;

        if (activeId) {
          const index = loadedAddresses.findIndex((a) => a.id === activeId);
          if (index !== -1) setSelectedAddressIndex(index);
        }
      } catch (err) {
        console.error("Failed to load addresses:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAddresses();
  }, [user, cachedAddress]); // Re-run if context address changes

  // 3. HANDLE SAVE (Using Context)
  const handleSaveAddress = async () => {
    if (!user) return;

    // Convert Form Data to DB Schema (line1 vs addressLine1)
    const addressPayload = {
      id: form.id, // Pass ID if editing, null if new
      line1: form.addressLine1, // Map UI field to DB field
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      name: form.name,
      phone: form.phone,
    };

    try {
      // 🔥 Call Context Function (Handles DB, Link, & LocalStorage)
      const savedAddr = await saveAddress(addressPayload);

      // Update Local List UI
      if (form.id) {
        // Edit Mode: Update item in list
        setAddresses((prev) =>
          prev.map((a) => (a.id === savedAddr.id ? savedAddr : a)),
        );
      } else {
        // Create Mode: Add to top and select
        setAddresses((prev) => [savedAddr, ...prev]);
        setSelectedAddressIndex(0);
      }

      setEditing(false);
      setForm({
        name: "",
        phone: "",
        addressLine1: "",
        city: "",
        state: "",
        pincode: "",
        id: null,
      });
    } catch (error) {
      alert("Failed to save address. Please try again.");
    }
  };

  // 4. 🔥 PLACE ORDER (Full Snapshot Details)
  const placeOrder = async () => {
    // A. Validation
    if (addresses.length === 0) {
      alert("Please add an address first.");
      return;
    }

    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    const selectedAddress = addresses[selectedAddressIndex];

    try {
      // B. Construct the Order Object (Snapshot Strategy)
      const orderPayload = {
        // 1. User Details Snapshot (Freezes user info at time of order)
        userId: user.uid,
        userSnapshot: {
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
        },

        // 2. Location Snapshot (Full Address Object)
        // We save the full address object so it persists even if user deletes address later
        deliveryAddress: sanitize({
          line1: selectedAddress.line1 || selectedAddress.addressLine1 || "",
          city: selectedAddress.city,
          state: selectedAddress.state,
          pincode: selectedAddress.pincode,
          name: selectedAddress.name || user.name, // Contact Person
          phone: selectedAddress.phone || user.phone, // Contact Phone
        }),

        // 3. Product Line Items (Snapshot)
        items: items.map((item) => ({
          productId: item.id,
          name: item.name,
          // Handle image array vs string safely
          image: Array.isArray(item.images) ? item.images[0] : item.image || "",
          price: Number(item.price),
          quantity: Number(item.selectedQuantity || 1),
          selectedSize: item.selectedSize || "N/A",
          // Calculate total for this specific line item
          lineTotal: Number(item.price) * Number(item.selectedQuantity || 1),
        })),

        // 4. Financials
        subtotal: Number(totalAmount),
        shippingFee: 0,
        totalAmount: Number(totalAmount),

        // 5. Order Metadata
        status: "PLACED", // Enums: PLACED, PACKED, SHIPPED, DELIVERED, CANCELLED
        paymentMethod: "COD",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // C. Save to Firestore
      const docRef = await addDoc(collection(db, "orders"), orderPayload);
      console.log("Order placed successfully! ID:", docRef.id);

      // D. Cleanup
      await clear(); // Clear Cart Context & DB
      setPopupVisible(true); // Show Success Modal
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  if (!isLoggedIn)
    return <div className="p-10 text-center">Please log in to continue.</div>;

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 font-[Poppins]">
      {/* LEFT: Address Management */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-6">Delivery Address</h3>

        {editing ? (
          <AddressForm
            form={form}
            setForm={setForm}
            onSave={handleSaveAddress} // Use our wrapper
            onCancel={() => {
              setEditing(false);
              setForm({
                name: "",
                phone: "",
                addressLine1: "",
                city: "",
                state: "",
                pincode: "",
                id: null,
              });
            }}
          />
        ) : (
          <div className="space-y-4">
            {addresses.map((addr, idx) => (
              <div
                key={addr.id}
                onClick={() => {
                  setSelectedAddressIndex(idx);
                  // Optional: Update global context when user clicks a card
                  saveAddress({ ...addr, id: addr.id });
                }}
                className={`border p-4 rounded-lg relative cursor-pointer transition-all ${
                  selectedAddressIndex === idx
                    ? "border-black bg-gray-50 ring-1 ring-black"
                    : "border-gray-200 hover:border-gray-300"
                }`}>
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedAddressIndex === idx
                        ? "border-black"
                        : "border-gray-400"
                    }`}>
                    {selectedAddressIndex === idx && (
                      <div className="w-2 h-2 rounded-full bg-black" />
                    )}
                  </div>

                  <div className="flex-1">
                    <AddressCard
                      address={{
                        ...addr,
                        // Map DB fields back to UI expected fields if AddressCard expects addressLine1
                        addressLine1: addr.line1 || addr.addressLine1,
                      }}
                      onEdit={(e) => {
                        e.stopPropagation();
                        setEditing(true);
                        setForm({
                          ...addr,
                          addressLine1: addr.line1 || addr.addressLine1, // Map back
                          id: addr.id,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                setForm({
                  name: user.name || "",
                  phone: user.phone || "",
                  addressLine1: "",
                  city: "",
                  state: "",
                  pincode: "",
                  id: null,
                });
                setEditing(true);
              }}
              className="w-full mt-4 bg-white hover:bg-gray-50 text-gray-800 font-medium py-4 rounded-xl transition border-2 border-dashed border-gray-300 flex items-center justify-center gap-2">
              <span>+</span> Add New Address
            </button>
          </div>
        )}
      </div>

      {/* RIGHT: Order Summary */}
      <div className="md:w-96 h-fit sticky top-24">
        <CartSummary
          subtotal={totalAmount}
          originalTotalPrice={totalAmount}
          platformFee={0}
          selectedItems={items}
          onPlaceOrder={placeOrder}
          btnText="Place Order"
        />
      </div>

      <PaymentConfirmationPopup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        whatsappNumber="919999999999"
        userId={user.uid}
      />
    </div>
  );
};

export default AddressPage;
