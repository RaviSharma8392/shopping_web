import React from "react";

const AddressForm = ({ form, setForm, onSave }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const inputClass =
    "w-full px-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-sm text-gray-900 placeholder-gray-400 bg-white shadow-sm";

  const labelClass =
    "block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide";

  return (
    <div className="space-y-5">
      {/* Name and Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={inputClass}
          />
        </div>
      </div>

      {/* Address Line 1 */}
      <div>
        <label className={labelClass}>Flat / House / Building</label>
        <input
          type="text"
          name="addressLine1"
          value={form.addressLine1}
          onChange={handleChange}
          placeholder="House no, Building name"
          className={inputClass}
        />
      </div>

      {/* Address Line 2 */}
      <div>
        <label className={labelClass}>Area / Street (Optional)</label>
        <input
          type="text"
          name="addressLine2"
          value={form.addressLine2}
          onChange={handleChange}
          placeholder="Area, Street, Sector"
          className={inputClass}
        />
      </div>

      {/* City / State / Pincode */}
      <div className="grid grid-cols-3 gap-3 md:gap-5">
        <div>
          <label className={labelClass}>City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>State</label>
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>PIN Code</label>
          <input
            type="number"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={onSave}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition">
        Save Address
      </button>
    </div>
  );
};

export default AddressForm;
