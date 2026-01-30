import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { IMAGES } from "../../assets/images";
import { useProducts } from "../features/product/hook/useProducts";
import { useFirebaseCollection } from "../features/collection/hook/useItemCollection";
import { useCategories } from "../features/category/hooks/useCategory";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchAllProducts = async () => {
  try {
    const itemsCollection = collection(db, "itemsCollection"); // Your Firestore collection
    const snapshot = await getDocs(itemsCollection);

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("All products:", products); // Print products
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// -----------------------------
// 3. Usage example
// -----------------------------
(async () => {
  const allProducts = await fetchAllProducts();
  // console.log("Total products fetched:", allProducts.length);
})();
// Lazy-loaded components (for better performance)
const HeroBanner = React.lazy(() => import("../components/banner/HeroBanner"));
const VideoSection = React.lazy(
  () => import("../components/section/VideoSection"),
);
const CategoriesSection = React.lazy(
  () => import("../components/section/CategoriesSection"),
);
const FeaturedCollectionSection = React.lazy(
  () => import("../components/section/FeaturedCollectionSection"),
);
const ProductSection = React.lazy(
  () => import("../components/section/ProductSection"),
);
const CollectionGrid = React.lazy(
  () => import("../components/cards/CollectionGrid"),
);
const TestimonialsSection = React.lazy(
  () => import("../components/section/TestimonialsSection"),
);

// -----------------------------
// Loading fallback (spinner while lazy components load)
// -----------------------------
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center h-[50vh] text-center">
    <img
      src={IMAGES.appLogo}
      alt="Loading"
      className="w-20 h-20 mb-4 animate-spin-slow"
    />
    <p className="text-gray-600 text-sm">Loading…</p>
  </div>
);

// -----------------------------
// Helper: Normalize collection types
// Makes sure we always have an array, no matter how data is stored
// -----------------------------
const normalizeCollectionTypes = (product) => {
  if (Array.isArray(product.collectionTypes)) return product.collectionTypes;
  if (typeof product.collectionTypes === "string")
    return [product.collectionTypes];
  if (Array.isArray(product.collectionType)) return product.collectionType;
  if (typeof product.collectionType === "string")
    return [product.collectionType];
  return [];
};

const HomePage = () => {
  const collectionName = "itemsCollection";

  // -----------------------------
  // CUSTOM HOOKS
  // -----------------------------
  const { getProducts, loading: productsLoading } = useProducts(); // Get all products
  const { items: collectionItems } = useFirebaseCollection(collectionName); // Get collection items
  const { categories, loading: categoriesLoading } = useCategories(); // Get all categories

  // -----------------------------
  // STATE
  // -----------------------------
  const [homeProducts, setHomeProducts] = useState({}); // Products grouped by section
  const [collection, setCollection] = useState([]); // All collection items
  const [allCategories, setAllCategories] = useState([]); // All categories

  // -----------------------------
  // TEMP: Print all products to console (for debugging)
  // -----------------------------
  // useEffect(() => {
  //   const fetchAllProducts = async () => {
  //     try {
  //       const products = await getProducts();
  //       // console.log("ALL PRODUCTS:", products); // 🔹 Check all products
  //     } catch (err) {
  //       console.error("Failed to fetch products:", err);
  //     }
  //   };
  //   fetchAllProducts();
  // }, [getProducts]);

  // -----------------------------
  // CONFIG: PRODUCT SECTIONS
  // You can manually add titles/subtitles for each collection type
  // key = matches product.collectionType
  // -----------------------------
  const productSections = [
    {
      key: "new-arrivals",
      title: "New Arrivals",
      subtitle: "Fresh styles added this week",
    },
    { key: "basics", title: "Basics", subtitle: "Handpicked just for you" },
    // {
    //   key: "Suits & Anarkalis",
    //   title: "Festive Collection",
    //   subtitle: "Special designs for occasions",
    // },
    {
      key: "Trends",
      title: "Trends Collection",
      subtitle: "Luxury and elegance",
    },
  ];

  // -----------------------------
  // FETCH HOME PRODUCTS & GROUP BY SECTION
  // -----------------------------
  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const products = await getProducts();

        // Group products by collection key (section)
        const grouped = {};
        productSections.forEach((section) => {
          grouped[section.key] = products.filter(
            (product) =>
              product.isActive === true &&
              normalizeCollectionTypes(product).includes(section.key),
          );
        });

        setHomeProducts(grouped);
      } catch (error) {
        console.error("Failed to fetch home products:", error);
      }
    };

    fetchHomeProducts();
  }, [getProducts]);

  // -----------------------------
  // SET COLLECTION & CATEGORIES
  // -----------------------------
  useEffect(() => {
    setCollection(collectionItems || []); // set all collection items
  }, [collectionItems]);

  useEffect(() => {
    setAllCategories(categories || []); // set all categories
  }, [categories]);

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Mnmukt — Luxury Ethnic Wear | Crafted with Love</title>
        <meta
          name="description"
          content="Discover Mnmukt luxury ethnic wear crafted with premium fabrics, elegant designs and thoughtful details."
        />
      </Helmet>

      <Suspense fallback={<LoadingFallback />}>
        {/* Hero Section */}
        <HeroBanner />

        {/* Video Section */}
        <VideoSection />

        {/* Categories Section */}
        {allCategories.length > 0 && (
          <CategoriesSection
            categories={allCategories}
            loading={categoriesLoading}
          />
        )}

        {/* Featured Collection Sections */}
        {productSections.map((section) => (
          <FeaturedCollectionSection
            key={section.key}
            title={section.title}
            products={homeProducts[section.key] || []}
            loading={productsLoading}
          />
        ))}

        {/* Product Sections */}
        {productSections.map((section) => (
          <ProductSection
            key={section.key}
            title={section.title}
            subtitle={section.subtitle}
            products={homeProducts[section.key] || []}
            loading={productsLoading}
          />
        ))}

        {/* Collections Grid */}
        <CollectionGrid title="SHOP BY COLLECTIONS" items={collection} />

        {/* Testimonials Section */}
        <TestimonialsSection />
      </Suspense>
    </div>
  );
};

export default HomePage;
