import React from "react";

const AddressForm = ({ form, setForm, onSave }) => {
  return (
    <div className="border p-5 rounded bg-white shadow-sm">
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
        onClick={onSave}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all">
        Save Address
      </button>
    </div>
  );
};

export default AddressForm;
