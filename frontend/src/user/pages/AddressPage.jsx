import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useCart } from "../context/CartContext";

import AddressForm from "../code/form/AddressForm";
import AddressCard from "../code/cards/AddressCard";
import CartSummary from "../code/cartComponents/CartSummary";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, updateUser } = useAuth();
  const { cart, totalAmount, clearCart, totalPrice, originalTotalPrice } =
    useCart();

  const [address, setAddress] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (!isLoggedIn || !user) return;

    if (user.address) {
      setAddress(user.address);
      setForm(user.address);
    }
  }, [isLoggedIn, user]);

  if (!isLoggedIn)
    return (
      <h2 className="text-center mt-20 text-xl font-semibold">
        Please login to continue.
      </h2>
    );

  const handleSave = async () => {
    if (
      !form.name ||
      !form.phone ||
      !form.line1 ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const updatedAddress = { ...form, updatedAt: serverTimestamp() };
    await updateDoc(doc(db, "users", user.uid), { address: updatedAddress });

    setAddress(updatedAddress);
    updateUser({ address: updatedAddress });
    setEditing(false);
  };

  const handlePlaceOrder = () => {
    navigate("/checkout/payment");
  };

  return (
    <div className="max-w-5xl mx-auto  md:pt-8 md:flex gap-6">
      {/* LEFT SIDE */}
      <div className="flex-1 bg-white md:rounded-xl md:shadow-sm px-5 pb-5 md:py-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-sm font-semibold tracking-wide text-gray-700">
            DELIVERY ADDRESS
          </h2>

          {/* <button
            onClick={() => setEditing(true)}
            className="text-xs border px-4 py-1.5 md:rounded-md hover:bg-gray-100 transition">
            {address ? "EDIT" : "ADD"}
          </button> */}
        </div>

        {/* Address Form or Preview */}
        {editing ? (
          <AddressForm form={form} setForm={setForm} onSave={handleSave} />
        ) : address ? (
          <AddressCard address={address} onEdit={() => setEditing(true)} />
        ) : (
          <div className="text-gray-500 text-sm">
            No address found. Click **ADD** to enter one.
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="mt-6 md:mt-0">
        <CartSummary
          subtotal={totalPrice}
          originalTotalPrice={originalTotalPrice}
          platformFee={50}
          selectedItems={cart}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>
    </div>
  );
};

export default AddressPage;
