import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { COLORS } from "../../style/theme";
import ProductImages from "../components/product/ProductImages";
import SizeSelector from "../components/product/SizeSelector";
import ColorSelector from "../components/product/ColorSelector";
import QuantitySelector from "../components/product/QuantitySelector";
import ProductSection from "../code/section/ProductSection";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBottomSize, setSelectedBottomSize] = useState("");
  const [selectedDupatta, setSelectedDupatta] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, "products", slug);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        setProduct({ id: productSnap.id, ...productSnap.data() });
      }
      setLoading(false);
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!product) return <p className="text-center mt-20">Product not found!</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 grid md:grid-cols-2 gap-8">
      {/* Left: Images */}
      <ProductImages images={product.images || [product.thumbnail]} />

      {/* Right: Product Info */}
      <div className="space-y-4">
        <h1
          className="text-3xl font-semibold"
          style={{ color: COLORS.textAlt }}>
          {product.name}
        </h1>

        <p className="text-xl font-bold text-pink-600">
          ₹{product.salePrice || product.price}
        </p>

        {/* Stock */}
        {product.stock && product.stock <= 2 && (
          <p className="text-sm text-red-600">
            Only {product.stock} units left
          </p>
        )}

        {/* Sizes */}
        {product.topSizes && (
          <SizeSelector
            label="Top size"
            sizes={product.topSizes}
            selected={selectedSize}
            onSelect={setSelectedSize}
          />
        )}
        {product.bottomSizes && (
          <SizeSelector
            label="Bottom size"
            sizes={product.bottomSizes}
            selected={selectedBottomSize}
            onSelect={setSelectedBottomSize}
          />
        )}

        {/* Dupatta */}
        {product.dupattaOptions && (
          <ColorSelector
            label="Dupatta"
            colors={product.dupattaOptions}
            selected={selectedDupatta}
            onSelect={setSelectedDupatta}
          />
        )}

        {/* Quantity */}
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

        {/* Add to cart / Buy now */}
        <div className="flex flex-col md:flex-row gap-4">
          <button className="w-full md:w-1/2 py-3 rounded-md bg-black text-white hover:bg-gray-900">
            Add to Cart
          </button>
          <button className="w-full md:w-1/2 py-3 rounded-md bg-pink-600 text-white hover:bg-pink-700">
            Buy it Now
          </button>
        </div>

        {/* Extra info */}
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p>Made in India</p>
          <p>Free Delivery</p>
          <p>COD Available</p>
          {product.offers && <p>{product.offers}</p>}
        </div>

        {/* Description */}
        {product.description && (
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
        )}

        {/* Related products */}
        {product.relatedProducts && (
          <ProductSection
            title="Basics"
            subtitle="Fresh styles added this week"
            //   products={newArrivalProducts}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
