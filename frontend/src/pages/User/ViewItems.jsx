import React, { useState, useEffect } from "react";
import axios from "axios";
import { HashLoader } from "react-spinners";
import HeroBanner from "../../components/UserHomePage/HeroBanner";
import CategoriesSection from "../../components/category/CategoriesSection";
import CategoryWithItems from "../../components/category/CategoryWithItems";
import { api } from "../../config/config";
import Poster from "../../components/poster/Poster";
import BestSellers from "../../components/UserHomePage/BestSellers";
import SubcategoryNavbar from "../../components/ui/navbar/SubcategoryNavbar";

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all items
        const itemsRes = await axios.get(`${api}/item/items`);
        setItems(itemsRes.data.data.items || []);

        // Fetch all categories
        const categoriesRes = await axios.get(`${api}/category/all`);
        setCategories(categoriesRes.data.categories || []);

        // Flatten subcategories for navbar
        const allSubcategories = [];
        categoriesRes.data.categories.forEach((cat) => {
          if (cat.subcategories?.length > 0) {
            cat.subcategories.forEach((sub) => allSubcategories.push(sub.name));
          }
        });
        setSubcategories(allSubcategories);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <HashLoader size={80} color="#4f46e5" />
      </div>
    );
  }

  // Group items by category
  const itemsByCategory = categories.map((cat) => ({
    ...cat,
    items: items.filter((item) => item.category === cat._id),
  }));

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="mx-auto px-4 py-6 md:px-8">
        <HeroBanner />
        <CategoriesSection categories={categories} />
        <Poster
          imageUrl="https://images-eu.ssl-images-amazon.com/images/G/31/img22/WLA/2025/OnePlus_New_Launch/Update_DesktopHeroTemplate_3000x1200_ref._CB803206841_.jpg"
          altText="Hero Banner"
        />
        {itemsByCategory.map((cat) => (
          <CategoryWithItems key={cat._id} category={cat} />
        ))}
        <Poster
          imageUrl="https://images.meesho.com/images/marketing/1744698265981.webp"
          altText="Hero Banner"
        />
        <BestSellers />
      </div>
    </div>
  );
};

export default ViewItems;
