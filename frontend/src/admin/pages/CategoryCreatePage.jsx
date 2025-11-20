import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Upload,
  DollarSign,
  Tag,
  Image as ImageIcon,
} from "lucide-react";
import { useCategories } from "../hooks/useCategories";

const CategoryCreatePage = () => {
  const navigate = useNavigate();
  const { createCategory, loading, error, clearError } = useCategories();

  const [category, setCategory] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
  });

  const [notice, setNotice] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (error) clearError();
    if (notice) setNotice(null);
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const validateForm = () => {
    if (!category.name.trim()) {
      return "Category name is required";
    }
    if (!category.image.trim()) {
      return "Image URL is required";
    }
    if (!isValidUrl(category.image)) {
      return "Please enter a valid image URL";
    }
    return null;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setNotice({ type: "error", message: validationError });
      return;
    }

    try {
      const categoryData = {
        ...category,
        slug: generateSlug(category.name),
        price: category.price || "0",
      };

      await createCategory(categoryData);

      setNotice({
        type: "success",
        message: "Category created successfully! 🎉",
      });

      setTimeout(() => {
        navigate("/admin/categories");
      }, 1500);
    } catch (err) {
      setNotice({
        type: "error",
        message: err.message || "Failed to create category",
      });
    }
  };

  return (
    <div className="min-h-screen b-gradient-to-br from-gray-50 to-gray-100 pt-16">
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/categories")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-6 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Categories
          </button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Create New Category
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Add a new product category with name, image, and pricing details
            </p>
          </div>
        </div>

        {/* Notice/Alerts */}
        {(notice || error) && (
          <div
            className={`mb-6 p-4 rounded-xl border-2 ${
              notice?.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            } transition-all duration-300`}>
            <div className="flex items-center justify-between">
              <span className="font-medium">{notice?.message || error}</span>
              <button
                onClick={() => {
                  setNotice(null);
                  clearError();
                }}
                className="text-sm opacity-70 hover:opacity-100">
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <div className="space-y-8">
            {/* Category Name */}
            <div className="group">
              <label className="flex items-center gap-2 font-semibold text-gray-900 mb-3 text-lg">
                <Tag className="w-5 h-5 text-[#B4292F]" />
                Category Name *
              </label>
              <input
                type="text"
                name="name"
                value={category.name}
                onChange={handleChange}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#B4292F] focus:ring-2 focus:ring-[#B4292F]/20 transition-all duration-200 placeholder-gray-400 text-gray-900 text-lg"
                placeholder="Enter category name (e.g., Kurta, Saree, Dress)"
                required
              />
            </div>

            {/* Image URL */}
            <div className="group">
              <label className="flex items-center gap-2 font-semibold text-gray-900 mb-3 text-lg">
                <ImageIcon className="w-5 h-5 text-[#B4292F]" />
                Category Image *
              </label>

              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="url"
                      name="image"
                      value={category.image}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#B4292F] focus:ring-2 focus:ring-[#B4292F]/20 transition-all duration-200 placeholder-gray-400 text-gray-900"
                      placeholder="https://example.com/category-image.jpg"
                      required
                    />
                    <Upload className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Enter a direct URL to your category image
                  </p>
                </div>

                {/* Image Preview */}
                <div className="lg:w-48">
                  <div className="bg-gray-100 rounded-xl p-4 border-2 border-dashed border-gray-300">
                    <p className="text-sm text-gray-600 mb-3 text-center">
                      Preview
                    </p>
                    {category.image ? (
                      <div className="w-full h-32 rounded-lg overflow-hidden bg-white">
                        <img
                          src={category.image}
                          className="w-full h-full object-cover"
                          alt="Category preview"
                          onError={(e) => {
                            e.target.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%239ca3af'%3EInvalid URL%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-32 rounded-lg bg-gray-200 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="group">
              <label className="flex items-center gap-2 font-semibold text-gray-900 mb-3 text-lg">
                <DollarSign className="w-5 h-5 text-[#B4292F]" />
                Starting Price
              </label>
              <div className="relative max-w-xs">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  name="price"
                  value={category.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#B4292F] focus:ring-2 focus:ring-[#B4292F]/20 transition-all duration-200 placeholder-gray-400 text-gray-900 text-lg"
                  placeholder="1499.00"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                This will be displayed as the starting price for this category
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/admin/categories")}
              className="flex-1 px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200 border-2 border-transparent hover:border-gray-300">
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-8 py-4 bg-[#B4292F] text-white rounded-xl font-semibold hover:bg-[#9c2227] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Category...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Create Category
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryCreatePage;
