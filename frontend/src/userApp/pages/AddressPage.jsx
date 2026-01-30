import { useEffect, useState } from "react";
import { useAuth } from "../features/auth/context/UserContext";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";
import { useSelectedOrderData } from "../features/cart/hooks/useSelectedOrderData";

import AddressForm from "../components/form/AddressForm";
import AddressCard from "../components/cards/AddressCard";
import CartSummary from "../features/cart/components/CartSummary";
import PaymentConfirmationPopup from "../components/pop-up/PaymentConfirmationPopup";

const AddressPage = () => {
  const { user, isLoggedIn, updateUser } = useAuth();
  const { cart, clear } = useCart();
  const location = useLocation();

  const selectedIds = location.state?.selectedIds || [];
  const { selectedItems, subtotal, originalTotal } = useSelectedOrderData(
    cart,
    selectedIds,
  );

  const [addresses, setAddresses] = useState([]); // list of addresses for this order
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // which address is being edited
  const [popupVisible, setPopupVisible] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ===============================
  // Utility: sanitize object for Firestore (no undefined)
  // ===============================
  // Utility function to remove undefined and set defaults
  const sanitize = (obj) => {
    const sanitized = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        // set default value depending on type
        sanitized[key] = key === "price" || key === "quantity" ? 0 : "";
      } else {
        sanitized[key] = value;
      }
    });
    return sanitized;
  };

  // ===============================
  // Load default address from Firestore
  // ===============================
  useEffect(() => {
    const loadAddresses = async () => {
      setLoading(true);
      const loadedAddresses = [];

      if (user?.defaultAddressId) {
        try {
          const snap = await getDoc(
            doc(db, "addresses", user.defaultAddressId),
          );
          if (snap.exists()) {
            const data = snap.data();
            loadedAddresses.push({
              name: user.name || "",
              phone: user.phone || "",
              ...sanitize(data),
            });
          }
        } catch (err) {
          console.error("Failed to load default address:", err);
        }
      }

      setAddresses(loadedAddresses);
      setLoading(false);
    };

    loadAddresses();
  }, [user]);

  // ===============================
  // Save new or edited address locally (and Firestore if no default)
  // ===============================
  const saveAddress = async () => {
    const newAddress = { ...sanitize(form), savedAt: new Date().toISOString() };

    if (editingIndex !== null) {
      // Editing existing address
      const updated = [...addresses];
      updated[editingIndex] = newAddress;
      setAddresses(updated);
      setEditingIndex(null);
      setSelectedAddressIndex(editingIndex);
    } else {
      // Adding new address
      setAddresses([...addresses, newAddress]);
      setSelectedAddressIndex(addresses.length);
    }

    setEditing(false);

    // Save to Firestore only if user has no default address yet
    if (!user?.defaultAddressId && editingIndex === null) {
      try {
        const newRef = doc(collection(db, "addresses"));
        await setDoc(newRef, {
          ...newAddress,
          userId: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        await updateDoc(doc(db, "users", user.uid), {
          defaultAddressId: newRef.id,
        });
        updateUser({ defaultAddressId: newRef.id });
      } catch (err) {
        console.error("Failed to save default address:", err);
      }
    }
  };

  // ===============================
  // Place Order
  // ===============================
  const placeOrder = async () => {
    if (!addresses[selectedAddressIndex]) {
      alert("Please select an address");
      return;
    }

    const selectedAddress = sanitize(addresses[selectedAddressIndex]);

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        address: selectedAddress,
        items: selectedItems.map((i) =>
          sanitize({
            productId: i.id ?? "",
            name: i.name ?? "",
            image: i.images?.[0] ?? "",
            price: i.price ?? 0,
            quantity: i.quantity ?? 1,
          }),
        ),
        subtotal: subtotal ?? 0,
        platformFee: 50,
        totalAmount: (subtotal ?? 0) + 50,
        orderStatus: "PLACED",
        createdAt: serverTimestamp(),
      });

      clear();
      setPopupVisible(true);
    } catch (err) {
      console.error("Order error:", err);
      alert("Failed to place order");
    }
  };

  // ===============================
  // Render
  // ===============================
  if (!isLoggedIn) return <h2 className="text-center mt-20">Please login</h2>;
  if (selectedItems.length === 0)
    return <h2 className="text-center mt-20">No items selected</h2>;

  return (
    <div className="max-w-5xl mx-auto md:flex gap-6 pt-8">
      <div className="flex-1 bg-white p-5 rounded-xl">
        <h3 className="font-semibold mb-4">Delivery Address</h3>

        {loading ? (
          <p className="text-gray-500">Loading address...</p>
        ) : editing ? (
          <AddressForm form={form} setForm={setForm} onSave={saveAddress} />
        ) : (
          <div className="space-y-4">
            {addresses.map((addr, idx) => (
              <div key={idx} className="border p-4 rounded-lg relative">
                <input
                  type="radio"
                  name="selectedAddress"
                  checked={selectedAddressIndex === idx}
                  onChange={() => setSelectedAddressIndex(idx)}
                  className="absolute top-3 left-3"
                />
                <AddressCard
                  address={addr}
                  onEdit={() => {
                    setEditing(true);
                    setEditingIndex(idx);
                    setForm(addr);
                  }}
                />
              </div>
            ))}

            <button
              onClick={() => {
                setForm({
                  name: user.name || "",
                  phone: user.phone || "",
                  addressLine1: "",
                  addressLine2: "",
                  city: "",
                  state: "",
                  pincode: "",
                });
                setEditing(true);
                setEditingIndex(null);
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg transition">
              Add New Address
            </button>
          </div>
        )}
      </div>

      <CartSummary
        subtotal={subtotal}
        originalTotalPrice={originalTotal}
        platformFee={50}
        selectedItems={selectedItems}
        onPlaceOrder={placeOrder}
      />

      <PaymentConfirmationPopup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        whatsappNumber="63868368"
        userId={user.uid}
      />
    </div>
  );
};

export default AddressPage;
