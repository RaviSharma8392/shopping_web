import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { IMAGES } from "../../assets/images";
import { useProducts } from "../hook/useProducts";
import { useFirebaseCollection } from "../hook/useItemCollection";
import { useCategories } from "../hook/useCategory";

// Lazy-loaded components
const HeroBanner = React.lazy(() => import("../code/banner/HeroBanner"));
const VideoSection = React.lazy(() => import("../code/section/VideoSection"));
const CategoriesSection = React.lazy(() =>
  import("../code/section/CategoriesSection")
);
const FeaturedCollectionSection = React.lazy(() =>
  import("../code/section/FeaturedCollectionSection")
);
const ProductSection = React.lazy(() =>
  import("../code/section/ProductSection")
);
const CollectionGrid = React.lazy(() => import("../code/cards/CollectionGrid"));
const TestimonialsSection = React.lazy(() =>
  import("../code/section/TestimonialsSection")
);
const OfferStrip = React.lazy(() => import("../code/offer/OfferStrip"));

// Simple fallback while lazy pages load
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center h-[50vh] text-center">
    <img
      src={IMAGES.appLogo}
      alt="Loading"
      className="w-20 h-20 mb-4 animate-spin-slow"
    />
    <p className="text-gray-600 tracking-wide text-sm md:text-base">Loading…</p>
  </div>
);

const HomePage = () => {
  const collectionName = "itemsCollection";

  // Hooks for products, collection & categories
  const {
    getNewArrivals,
    getFeaturedProducts,
    loading: productsLoading,
  } = useProducts();
  const { items: collectionItems, fetchAll } =
    useFirebaseCollection(collectionName);
  const { categories, loading: categoriesLoading } = useCategories();

  // State for rendering
  const [collection, setCollection] = useState([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  // Fetch products on mount
  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const arrivals = await getNewArrivals(8);
        const featured = await getFeaturedProducts(8);

        setNewArrivalProducts(arrivals || []);
        setFeaturedProducts(featured || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchHomeProducts();
  }, []);

  // Update collection when fetched
  useEffect(() => {
    setCollection(collectionItems || []);
  }, [collectionItems]);

  // Update categories when fetched
  useEffect(() => {
    setAllCategories(categories || []);
  }, [categories]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Mnmukt — Luxury Ethnic Wear | Crafted with Love</title>
        <meta
          name="description"
          content="Discover Mnmukt luxury ethnic wear crafted with premium fabrics, elegant designs and thoughtful details. Shop festive collections, curated looks and everyday elegance."
        />
      </Helmet>

      <Suspense fallback={<LoadingFallback />}>
        {/* Hero Section */}
        <HeroBanner />

        {/*Video Section */}
        <VideoSection />

        {/*Categories Section*/}
        {allCategories.length > 0 && (
          <CategoriesSection
            categories={allCategories}
            loading={categoriesLoading}
          />
        )}

        {/*Featured Collections*/}
        <FeaturedCollectionSection
          title="Winter Edit"
          products={newArrivalProducts}
          loading={productsLoading}
        />

        <FeaturedCollectionSection
          title="Recommended For You"
          products={featuredProducts}
          loading={productsLoading}
        />

        {/* New Arrivals*/}
        <ProductSection
          title="New Arrivals"
          subtitle="Fresh styles added this week"
          products={newArrivalProducts}
          loading={productsLoading}
        />

        {/*Explore Collection */}
        <CollectionGrid title="Explore Collection" items={collection} />

        {/* Customer Testimonials */}
        <TestimonialsSection />
      </Suspense>
    </div>
  );
};

export default HomePage;
