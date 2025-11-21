import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";

const AddressPage = () => {
  const { user, isLoggedIn, updateUser } = useAuth();
  const navigate = useNavigate();

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

  // Fetch user's address from Firestore on mount
  useEffect(() => {
    if (isLoggedIn && user?.uid) {
      const fetchAddress = async () => {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const data = snap.data();
          if (data.address) {
            setAddress(data.address);
            setForm(data.address); // populate form for editing
          }
        }
      };
      fetchAddress();
    }
  }, [isLoggedIn, user?.uid]);

  if (!isLoggedIn)
    return <h2 className="text-center mt-20">Please login to continue.</h2>;

  const handleSave = async () => {
    if (!user?.uid) return;

    const updatedAddress = { ...form, updatedAt: serverTimestamp() };
    const userRef = doc(db, "users", user.uid);

    await updateDoc(userRef, { address: updatedAddress });

    setAddress(updatedAddress);
    updateUser({ address: updatedAddress }); // sync with AuthContext
    setEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto md:flex gap-6 py-6">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Delivery Address</h2>
          <button
            onClick={() => setEditing(true)}
            className="border px-4 py-1 rounded text-sm hover:bg-gray-100">
            {address ? "EDIT" : "ADD"}
          </button>
        </div>

        {editing ? (
          <div className="border p-4 rounded mb-3 bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                placeholder="Address Line 1"
                value={form.line1}
                onChange={(e) => setForm({ ...form, line1: e.target.value })}
                className="border p-2 rounded md:col-span-2"
              />
              <input
                placeholder="Address Line 2"
                value={form.line2}
                onChange={(e) => setForm({ ...form, line2: e.target.value })}
                className="border p-2 rounded md:col-span-2"
              />
              <input
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                placeholder="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                placeholder="Pincode"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                className="border p-2 rounded"
              />
            </div>
            <button
              onClick={handleSave}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Address
            </button>
          </div>
        ) : address ? (
          <div className="border rounded p-4 mb-3">
            <p className="font-medium">{address.name}</p>
            <p>
              {address.line1}, {address.line2}
            </p>
            <p>
              {address.city}, {address.state} - {address.pincode}
            </p>
            <p>Mobile: {address.phone}</p>
          </div>
        ) : (
          <p>No address found. Click "ADD" to enter one.</p>
        )}
      </div>

      {/* Right side: summary (can keep as before) */}
      <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded">
        <h3 className="font-semibold mb-3">Delivery Estimates</h3>
        <div className="mb-4">
          <p>
            Delivery between <strong>27 Nov - 29 Nov</strong>
          </p>
        </div>
        <h3 className="font-semibold mb-2">Price Details (2 Items)</h3>
        <div className="text-gray-700 mb-2">
          <p>Total MRP: ₹5,997</p>
          <p>Discount on MRP: -₹3,123</p>
          <p>
            Platform Fee:{" "}
            <span className="text-pink-500 cursor-pointer">Know More</span>: ₹23
          </p>
        </div>
        <hr className="my-2" />
        <p className="font-bold text-lg">Total Amount: ₹2,897</p>
        <button className="mt-4 w-full bg-pink-500 text-white py-3 rounded hover:bg-pink-600 transition-all">
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default AddressPage;
