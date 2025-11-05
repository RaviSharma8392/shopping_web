import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { api } from "../../config";
import {
  Plus,
  Trash2,
  Upload,
  ArrowLeft,
  Image,
  DollarSign,
} from "lucide-react";

const AddItem = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    coverImage: "",
    additionalImages: "",
    price: [{ unit: "", price: "" }],
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [additionalPreviews, setAdditionalPreviews] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${api}/category`);
        setCategories(res.data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Generate preview for cover image
    if (name === "coverImage" && value) {
      setImagePreview(value);
    }

    // Generate previews for additional images
    if (name === "additionalImages") {
      const urls = value
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean);
      setAdditionalPreviews(urls);
    }
  };

  const handlePriceChange = (index, field, value) => {
    const updatedPrice = [...form.price];
    updatedPrice[index][field] = value;
    setForm((prev) => ({ ...prev, price: updatedPrice }));
  };

  const addPriceRow = () => {
    setForm((prev) => ({
      ...prev,
      price: [...prev.price, { unit: "", price: "" }],
    }));
  };

  const removePriceRow = (index) => {
    if (form.price.length > 1) {
      const updatedPrice = [...form.price];
      updatedPrice.splice(index, 1);
      setForm((prev) => ({ ...prev, price: updatedPrice }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Build payload for backend
      const payload = {
        name: form.name.trim(),
        category: form.category, // Must be category _id
        description: form.description.trim(),
        coverImage: form.coverImage.trim(),
        additionalImages: form.additionalImages
          .split(",")
          .map((img) => img.trim())
          .filter(Boolean),
        price: form.price
          .filter((p) => p.unit && p.price) // Only keep filled rows
          .map((p) => ({
            unit: p.unit.trim(),
            price: Number(p.price), // Ensure price is a number
          })),
      };

      // Simple validation
      if (!payload.category) {
        alert("❌ Please select a category");
        setLoading(false);
        return;
      }
      if (payload.price.some((p) => isNaN(p.price) || p.price <= 0)) {
        alert("❌ Price must be a positive number");
        setLoading(false);
        return;
      }

      const res = await axios.post(`${api}/item/add`, payload);

      alert("✅ " + res.data.message);

      // Reset form
      setForm({
        name: "",
        category: "",
        description: "",
        coverImage: "",
        additionalImages: "",
        price: [{ unit: "", price: "" }],
      });
      setImagePreview("");
      setAdditionalPreviews([]);
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
      alert(
        "❌ Failed to add item: " +
          (error.response?.data?.error || "Please check your inputs")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <NavLink
            to="/admin/items"
            className="flex items-center text-blue-600 hover:text-blue-800 mr-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Items
          </NavLink>
          <h1 className="text-3xl font-bold text-gray-900">Add New Item</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600">1</span>
                </div>
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Name *
                  </label>
                  <input
                    name="name"
                    placeholder="Enter item name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  placeholder="Describe the item in detail..."
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Image Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600">2</span>
                </div>
                Images
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image URL *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      name="coverImage"
                      placeholder="https://example.com/image.jpg"
                      value={form.coverImage}
                      onChange={handleChange}
                      required
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Image size={20} className="text-gray-400" />
                    </div>
                  </div>
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Cover preview"
                        className="h-20 w-20 object-cover rounded-lg border"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Images URLs
                  </label>
                  <textarea
                    name="additionalImages"
                    placeholder="Enter comma-separated image URLs"
                    value={form.additionalImages}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  {additionalPreviews.length > 0 && (
                    <div className="flex space-x-2 mt-2">
                      {additionalPreviews.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Additional preview ${index + 1}`}
                          className="h-12 w-12 object-cover rounded border"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600">3</span>
                </div>
                Pricing
              </h2>

              <div className="space-y-4">
                {form.price.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-end space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unit (e.g., 1 kg, 500 ml, 1 piece)
                      </label>
                      <input
                        placeholder="Unit"
                        value={p.unit}
                        onChange={(e) =>
                          handlePriceChange(idx, "unit", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={p.price}
                          onChange={(e) =>
                            handlePriceChange(idx, "price", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          required
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                    {form.price.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePriceRow(idx)}
                        className="p-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addPriceRow}
                  className="flex items-center text-blue-600 hover:text-blue-800 mt-2">
                  <Plus size={20} className="mr-2" />
                  Add Another Price Option
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-8 rounded-lg transition-colors flex items-center justify-center">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding Item...
                  </>
                ) : (
                  <>
                    <Plus size={20} className="mr-2" />
                    Add Item
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
