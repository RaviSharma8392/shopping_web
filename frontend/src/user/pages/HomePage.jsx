import React, { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import VideoSection from "../code/section/VideoSection";
import FeaturedCollectionSection from "../code/section/FeaturedCollectionSection";
import OfferStrip from "../code/offer/OfferStrip";
import ProductSection from "../code/section/ProductSection";

//  Lazy-loaded sections
const HeroBanner = React.lazy(() => import("../code/banner/HeroBanner"));
const TestimonialsSection = React.lazy(() =>
  import("../code/section/TestimonialsSection")
);
const CategoriesSection = React.lazy(() =>
  import("../code/section/CategoriesSection")
);
// const CenterBanner = React.lazy(() => import("../code/section/CenterBanner"));

//  Lightweight fallback
const LoadingFallback = () => (
  <div className="py-20 text-center text-gray-600 tracking-wide">Loading…</div>
);

const HomePage = () => {
  const newArrivalProducts = [
    {
      id: 1,
      name: "Rosette Kurta Set",
      price: 2499,
      banner:
        "https://shopmulmul.com/cdn/shop/files/45_c710f79c-4585-4867-9fa6-44dfe569b8b8_800x.png?v=1759815613",

      images: [
        "https://shopmulmul.com/cdn/shop/files/45_c710f79c-4585-4867-9fa6-44dfe569b8b8_800x.png?v=1759815613",
        ,
        "https://shopmulmul.com/cdn/shop/files/45_c710f79c-4585-4867-9fa6-44dfe569b8b8_800x.png?v=1759815613",
      ],
      sizes: [
        { size: "S", available: true },
        { size: "M", available: false },
        { size: "L", available: true },
      ],
    },
    {
      id: 1,
      name: "Rosette Kurta Set",
      price: 2499,
      banner:
        "https://shopmulmul.com/cdn/shop/files/Diwali_Resize_Imagesdfds_800x.jpg?v=1759837486",

      image:
        "https://shopmulmul.com/cdn/shop/files/Diwali_Resize_Imagesdfds_800x.jpg?v=1759837486",

      sizes: [
        { size: "S", available: true },
        { size: "M", available: false },
        { size: "L", available: true },
      ],
    },
    {
      id: 1,
      name: "Rosette Kurta Set",
      price: 2499,
      banner:
        "https://shopmulmul.com/cdn/shop/files/45_c710f79c-4585-4867-9fa6-44dfe569b8b8_800x.png?v=1759815613",

      image: [
        "https://shopmulmul.com/cdn/shop/files/45_c710f79c-4585-4867-9fa6-44dfe569b8b8_800x.png?v=1759815613",
        ,
        "https://shopmulmul.com/cdn/shop/files/45_c710f79c-4585-4867-9fa6-44dfe569b8b8_800x.png?v=1759815613",
      ],
    },
    {
      id: 1,
      name: "Rosette Kurta Set",
      price: 2499,
      image:
        "https://shopmulmul.com/cdn/shop/files/92_2844d9d1-f60a-42df-8521-7edf38b17470_800x.jpg?v=1759745896",
    },
    {
      id: 1,
      name: "Rosette Kurta Set",
      price: 2499,
      image:
        "https://shopmulmul.com/cdn/shop/files/92_2844d9d1-f60a-42df-8521-7edf38b17470_800x.jpg?v=1759745896",
    },
    {
      id: 1,
      name: "Rosette Kurta Set",
      price: 2499,
      image:
        "https://shopmulmul.com/cdn/shop/files/92_2844d9d1-f60a-42df-8521-7edf38b17470_800x.jpg?v=1759745896",
    },
    {
      id: 1,
      name: "Rosette Kurta Set",
      price: 2499,
      image:
        "https://shopmulmul.com/cdn/shop/files/92_2844d9d1-f60a-42df-8521-7edf38b17470_800x.jpg?v=1759745896",
    },
    {
      id: 1,
      name: "Rosette Kurta Set",
      price: 2499,
      image:
        "https://shopmulmul.com/cdn/shop/files/92_2844d9d1-f60a-42df-8521-7edf38b17470_800x.jpg?v=1759745896",
    },
    {
      id: 1,
      name: "Rosette Kurta Set",
      price: 2499,
      image:
        "https://shopmulmul.com/cdn/shop/files/92_2844d9d1-f60a-42df-8521-7edf38b17470_800x.jpg?v=1759745896",
    },
    {
      id: 1,
      name: "Rosette Kurta Set",
      price: 2499,
      image:
        "https://shopmulmul.com/cdn/shop/files/62_02823c15-e2c0-4c2f-b21e-4d0edce74b5a_800x.jpg?v=1760087031",
    },
    {
      id: 1,
      name: "Rosette Kurta Set",
      price: 2499,
      image:
        "https://shopmulmul.com/cdn/shop/files/92_2844d9d1-f60a-42df-8521-7edf38b17470_800x.jpg?v=1759745896",
    },
    {
      id: 1,
      name: "Rosette Kurta Set",
      price: 2499,
      image:
        "https://shopmulmul.com/cdn/shop/files/92_2844d9d1-f60a-42df-8521-7edf38b17470_800x.jpg?v=1759745896",
    },
    {
      id: 2,
      name: "Amber Anarkali",
      price: 2999,
      image:
        "https://shopmulmul.com/cdn/shop/files/92_2844d9d1-f60a-42df-8521-7edf38b17470_800x.jpg?v=1759745896",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/*  SEO Optimized Metadata */}
      <Helmet>
        <title>Mulmul — Luxury Ethnic Wear | Crafted with Love</title>
        <meta
          name="description"
          content="Discover Mulmul’s luxury ethnic wear crafted with premium fabrics, elegant designs and thoughtful details. Shop festive collections, curated looks and everyday elegance."
        />
        <link rel="canonical" href="https://your-website-domain.com/" />
      </Helmet>

      {/*  Lazy Loaded Page Sections */}
      <Suspense fallback={<LoadingFallback />}>
        <HeroBanner />

        <VideoSection />
        <FeaturedCollectionSection title="Winter Edit" />
        <ProductSection
          title="New Arrivals"
          subtitle="Fresh styles added this week"
          products={newArrivalProducts}
        />
        <ProductSection
          title="Basics"
          subtitle="Fresh styles added this week"
          products={newArrivalProducts}
        />
        <TestimonialsSection />
        <CategoriesSection />
        {/* <CenterBanner /> */}
        <OfferStrip />
      </Suspense>
    </div>
  );
};

export default HomePage;
