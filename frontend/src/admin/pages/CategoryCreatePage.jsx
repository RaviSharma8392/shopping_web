import React, { useState } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { COLORS } from "../../style/theme";

const CategoryCreatePage = () => {
  const [category, setCategory] = useState({
    name: "",
    slug: "",
    banner: "",
    description: "",
    seoTitle: "",
    seoDescription: "",
    price: "", // ✅ NEW FIELD
  });

  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "categories"), {
        ...category,
        price: Number(category.price), // ✅ store as number
        createdAt: serverTimestamp(),
      });

      setNotice({
        type: "success",
        message: "Category created successfully ✅",
      });

      // ✅ Reset Form
      setCategory({
        name: "",
        slug: "",
        banner: "",
        description: "",
        seoTitle: "",
        seoDescription: "",
        price: "", // ✅ reset
      });
    } catch (error) {
      console.error(error);
      setNotice({
        type: "error",
        message: "Error creating category!",
      });
    }

    setLoading(false);
  };

  return (
    <div className="p-6 mt-20 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" style={{ color: COLORS.primary }}>
        Create New Category
      </h1>

      {/* Notice */}
      {notice && (
        <div
          className={`p-3 mb-4 rounded-lg text-white ${
            notice.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}>
          {notice.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ✅ Category Name */}
        <div>
          <label className="font-medium">Category Name</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            className="w-full p-3 mt-1 border rounded-lg"
            placeholder="Kurta Sets"
            required
          />
        </div>

        {/* ✅ Slug */}
        <div>
          <label className="font-medium">Slug (URL)</label>
          <input
            type="text"
            name="slug"
            value={category.slug}
            onChange={handleChange}
            className="w-full p-3 mt-1 border rounded-lg"
            placeholder="kurta-sets"
            required
          />
        </div>

        {/* ✅ Banner Image */}
        <div>
          <label className="font-medium">Banner Image URL</label>
          <input
            type="text"
            name="banner"
            value={category.banner}
            onChange={handleChange}
            className="w-full p-3 mt-1 border rounded-lg"
            placeholder="https://example.com/banner.jpg"
          />
        </div>

        {/* ✅ Description */}
        <div>
          <label className="font-medium">Short Description</label>
          <textarea
            name="description"
            value={category.description}
            onChange={handleChange}
            className="w-full p-3 mt-1 border rounded-lg"
            rows={3}
            placeholder="Elegant premium kurta sets for all occasions."></textarea>
        </div>

        {/* ✅ SEO Title */}
        <div>
          <label className="font-medium">SEO Title</label>
          <input
            type="text"
            name="seoTitle"
            value={category.seoTitle}
            onChange={handleChange}
            className="w-full p-3 mt-1 border rounded-lg"
            placeholder="Buy Premium Kurta Sets Online"
          />
        </div>

        {/* ✅ SEO Description */}
        <div>
          <label className="font-medium">SEO Description</label>
          <textarea
            name="seoDescription"
            value={category.seoDescription}
            onChange={handleChange}
            className="w-full p-3 mt-1 border rounded-lg"
            rows={3}
            placeholder="Explore premium kurta sets crafted for elegance..."></textarea>
        </div>

        {/* ✅ Price Field */}
        <div>
          <label className="font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={category.price}
            onChange={handleChange}
            className="w-full p-3 mt-1 border rounded-lg"
            placeholder="1499"
          />
        </div>

        {/* ✅ Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-white rounded-lg font-medium transition"
          style={{
            backgroundColor: COLORS.primary,
            opacity: loading ? 0.7 : 1,
          }}>
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
};

export default CategoryCreatePage;
