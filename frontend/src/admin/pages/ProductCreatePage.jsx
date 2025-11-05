import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { COLORS } from "../../style/theme";
import Notification from "../../components/common/Notification";

const ProductCreatePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    slug: "",
    categoryId: "",
    price: "",
    salePrice: "",
    thumbnail: "",
    images: [""],
    description: "",
    seoTitle: "",
    seoDescription: "",
    sizes: [{ size: "S", stock: 10 }],
    colors: [{ name: "", hex: "", images: [""] }],
  });

  /* ✅ Fetch categories */
  useEffect(() => {
    const loadCats = async () => {
      const snap = await getDocs(collection(db, "categories"));
      setCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    loadCats();
  }, []);

  /* ✅ Input handler */
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  /* ✅ Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "products"), {
        ...product,
        price: Number(product.price),
        salePrice: Number(product.salePrice),
        createdAt: serverTimestamp(),
      });

      setNotice({ type: "success", message: "Product created successfully!" });

      setProduct({
        name: "",
        slug: "",
        categoryId: "",
        price: "",
        salePrice: "",
        thumbnail: "",
        images: [""],
        description: "",
        seoTitle: "",
        seoDescription: "",
        sizes: [{ size: "S", stock: 10 }],
        colors: [{ name: "", hex: "", images: [""] }],
      });
    } catch (err) {
      console.error(err);
      setNotice({ type: "error", message: "Failed to create product" });
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {notice && (
        <Notification
          type={notice.type}
          message={notice.message}
          onClose={() => setNotice(null)}
        />
      )}

      <h1 className="text-3xl font-bold mb-6" style={{ color: COLORS.primary }}>
        Create New Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-md p-6 rounded-xl border">
        {/* ✅ Product Name */}
        <InputField
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Floral Cotton Kurta Set"
        />

        {/* ✅ Slug */}
        <InputField
          label="Slug (URL)"
          name="slug"
          value={product.slug}
          onChange={handleChange}
          placeholder="floral-cotton-kurta-set"
        />

        {/* ✅ Category Dropdown */}
        <div>
          <label className="font-medium">Category</label>
          <select
            className="w-full mt-1 p-3 border rounded-lg"
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Pricing */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            placeholder="2499"
          />
          <InputField
            label="Sale Price"
            name="salePrice"
            type="number"
            value={product.salePrice}
            onChange={handleChange}
            placeholder="1999"
          />
        </div>

        {/* ✅ Thumbnail */}
        <InputField
          label="Thumbnail Image URL"
          name="thumbnail"
          value={product.thumbnail}
          onChange={handleChange}
          placeholder="https://example.com/img.jpg"
        />

        {/* ✅ Gallery Images */}
        <GalleryImages product={product} setProduct={setProduct} />

        {/* ✅ Description */}
        <TextAreaField
          label="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
        />

        {/* ✅ SEO */}
        <InputField
          label="SEO Title"
          name="seoTitle"
          value={product.seoTitle}
          onChange={handleChange}
        />
        <TextAreaField
          label="SEO Description"
          name="seoDescription"
          value={product.seoDescription}
          onChange={handleChange}
        />

        {/* ✅ Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-white rounded-lg font-medium"
          style={{
            backgroundColor: COLORS.primary,
            opacity: loading ? 0.7 : 1,
          }}>
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductCreatePage;

/* ✅ Reusable Inputs */
const InputField = ({ label, ...rest }) => (
  <div>
    <label className="font-medium">{label}</label>
    <input className="w-full p-3 border rounded-lg mt-1" {...rest} />
  </div>
);

const TextAreaField = ({ label, ...rest }) => (
  <div>
    <label className="font-medium">{label}</label>
    <textarea
      className="w-full p-3 border rounded-lg mt-1"
      rows={4}
      {...rest}
    />
  </div>
);

/* ✅ Gallery Image Input Component */
const GalleryImages = ({ product, setProduct }) => (
  <div>
    <label className="font-medium">Gallery Images</label>
    {product.images.map((img, i) => (
      <input
        key={i}
        className="w-full p-3 border rounded-lg mt-2"
        value={img}
        onChange={(e) => {
          const arr = [...product.images];
          arr[i] = e.target.value;
          setProduct({ ...product, images: arr });
        }}
        placeholder="https://example.com/img.jpg"
      />
    ))}

    <button
      type="button"
      className="mt-2 px-4 py-2 bg-gray-200 rounded-lg"
      onClick={() =>
        setProduct({ ...product, images: [...product.images, ""] })
      }>
      + Add Image
    </button>
  </div>
);
