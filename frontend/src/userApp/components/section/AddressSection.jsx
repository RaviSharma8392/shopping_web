import { useEffect, useState } from "react";
import {
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../features/auth/context/UserContext";
import { Edit2, MapPin, X, Save, Loader2, ArrowLeft } from "lucide-react";

const AddressSection = () => {
  const { user, updateUserAndSync } = useAuth();

  // State
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [form, setForm] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  // --- 1. LOAD ADDRESS ---
  useEffect(() => {
    const loadAddress = async () => {
      setLoading(true);
      if (user?.defaultAddressId) {
        try {
          const snap = await getDoc(
            doc(db, "addresses", user.defaultAddressId),
          );
          a;
          if (snap.exists()) {
            const data = snap.data();
            setAddress(data);
            setForm({
              addressLine1: data.addressLine1 || "",
              addressLine2: data.addressLine2 || "",
              city: data.city || "",
              state: data.state || "",
              pincode: data.pincode || "",
            });
          }
        } catch (err) {
          console.error("Failed to load address:", err);
        }
      }
      setLoading(false);
    };
    loadAddress();
  }, [user?.defaultAddressId]);

  // --- 2. HANDLERS ---
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!user?.uid) return;
    if (!form.addressLine1 || !form.city || !form.pincode) {
      alert("Please fill in required fields");
      return;
    }

    setIsSaving(true);
    let addressId = user.defaultAddressId;

    try {
      const payload = {
        ...form,
        updatedAt: serverTimestamp(),
      };

      if (!addressId) {
        // Create New
        const newRef = doc(db, "addresses", crypto.randomUUID());
        addressId = newRef.id;
        await setDoc(newRef, {
          userId: user.uid,
          ...payload,
          createdAt: serverTimestamp(),
        });

        // Link to User
        await updateDoc(doc(db, "users", user.uid), {
          defaultAddressId: addressId,
        });
        await updateUserAndSync({ defaultAddressId: addressId });
      } else {
        // Update Existing
        await updateDoc(doc(db, "addresses", addressId), payload);
        await updateUserAndSync({ updatedAt: new Date().toISOString() });
      }

      setAddress(form); // Update local view immediately
      setIsEditing(false);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save address. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- 3. SUB-COMPONENTS ---
  const InputField = ({ label, name, value, placeholder, required }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none transition-all"
      />
    </div>
  );

  // --- 4. RENDER ---
  return (
    <div className="bg-white border border-gray-100 overflow-hidden mb-6">
      {/* HEADER */}
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <MapPin size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Delivery Address
            </h3>
            <p className="text-xs text-gray-500">
              Where should we send your orders?
            </p>
          </div>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
            <Edit2 size={14} />
            {address ? "CHANGE" : "ADD"}
          </button>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className="p-6">
        {/* VIEW MODE */}
        {!isEditing ? (
          loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-gray-100 rounded w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            </div>
          ) : address ? (
            <div className="flex flex-col gap-1 text-sm text-gray-600">
              <p className="font-bold text-gray-900 text-base">{user.name}</p>
              <p>{address.addressLine1}</p>
              {address.addressLine2 && <p>{address.addressLine2}</p>}
              <p>
                {address.city}, {address.state} -{" "}
                <span className="font-semibold text-gray-900">
                  {address.pincode}
                </span>
              </p>
              <p className="mt-2 text-xs font-medium text-gray-400">
                Phone: {user.phone}
              </p>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-400 text-sm">
              No address saved. Please add one.
            </div>
          )
        ) : (
          /* EDIT MODE (Responsive Overlay) */
          <div
            className={`
             /* Mobile: Fixed Full Screen Overlay */
             fixed inset-0 z-[200] bg-white flex flex-col
             /* Desktop: Normal Layout */
             md:relative md:inset-auto md:bg-transparent md:block
          `}>
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between px-4 h-16 border-b border-gray-100 sticky top-0 bg-white z-10">
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 -ml-2 text-gray-600">
                <ArrowLeft size={20} />
              </button>
              <span className="font-bold text-gray-900">Edit Address</span>
              <div className="w-8"></div> {/* Spacer */}
            </div>

            {/* Form Container (Scrollable on mobile) */}
            <div className="flex-1 overflow-y-auto p-4 md:p-0 md:overflow-visible">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <InputField
                    label="Address Line 1"
                    name="addressLine1"
                    value={form.addressLine1}
                    required
                    placeholder="House No, Building, Street"
                  />
                </div>
                <div className="md:col-span-2">
                  <InputField
                    label="Address Line 2"
                    name="addressLine2"
                    value={form.addressLine2}
                    placeholder="Area, Landmark (Optional)"
                  />
                </div>
                <InputField
                  label="City"
                  name="city"
                  value={form.city}
                  required
                  placeholder="City"
                />
                <InputField
                  label="State"
                  name="state"
                  value={form.state}
                  required
                  placeholder="State"
                />
                <div className="md:col-span-2">
                  <InputField
                    label="Pincode"
                    name="pincode"
                    value={form.pincode}
                    required
                    placeholder="6-digit Pincode"
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 md:p-0 md:mt-6 border-t md:border-0 border-gray-100 bg-white md:bg-transparent flex gap-3 md:justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="hidden md:block px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold shadow-lg shadow-gray-200 hover:bg-black transition-all flex items-center justify-center gap-2">
                {isSaving ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {isSaving ? "Saving..." : "Save Address"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSection;
