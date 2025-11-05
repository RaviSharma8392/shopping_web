import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import axios from "axios";
import { api } from "../../config";
import ImageGallery from "../../components/ImageGallery";
import ProductInfo from "../../components/ProductInfo";
import RecommendationSection from "../../components/RecommendationSection";
import { CartService } from "../../services/cartService";
import ReviewsSection from "../../components/review/ReviewsSection";

// Static best reviews
const staticReviews = [
  {
    rating: 5,
    comment: "Excellent product! Very happy with the quality.",
    author: "Alice W.",
  },
  {
    rating: 5,
    comment: "Top-notch! Highly recommend to everyone.",
    author: "Bob K.",
  },
  {
    rating: 4,
    comment: "Good product, delivery was quick.",
    author: "Charlie M.",
  },
];

const ItemDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // Navigate to enquiry page
  const handleEnquire = () => {
    navigate(`/item/${id}/${item.name}/enquiry`);
  };

  // Handle gallery image selection
  const handleImageSelect = (index) => setSelectedImageIndex(index);

  // Add to cart
  const handleAddToCart = async () => {
    if (!user) return alert("Please login to add items to cart");
    try {
      const unit =
        selectedUnit || (item.price.length > 0 ? item.price[0].unit : "");
      await CartService.addToCart(user._id, item._id, 1, unit);
      alert(`${item.name} added to cart! 🛒`);
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  // Fetch product and related items
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        setLoading(true);

        // Fetch product by ID
        const itemRes = await axios.get(`${api}/item/${id}`);
        const product = itemRes.data.data;
        setItem(product);

        // Default selected unit
        setSelectedUnit(product.price?.[0]?.unit || "");

        // Fetch related items by category
        if (product.category) {
          const relatedRes = await axios.get(
            `${api}/item/category/${product.category}`
          );
          const filteredRelated = relatedRes.data.data.filter(
            (i) => i._id !== product._id
          );
          setRelatedItems(filteredRelated);
        }
      } catch (err) {
        console.error("Failed to fetch item data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItemData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader size={100} color="blue" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Item not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-10 min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <ImageGallery
              images={item.additionalImages}
              selectedIndex={selectedImageIndex}
              onSelectImage={handleImageSelect}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <ProductInfo
              item={item}
              selectedUnit={selectedUnit}
              onSelectUnit={setSelectedUnit}
              onEnquire={handleEnquire}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>

        {/* Reviews Section with static reviews */}
        <div className="flex">
          <ReviewsSection reviews={staticReviews} />
        </div>

        {/* Recommendations */}
        {relatedItems.length > 0 && (
          <RecommendationSection typeItem={relatedItems} currentItemId={id} />
        )}
      </main>
    </div>
  );
};

export default ItemDetails;
