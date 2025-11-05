import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../firebase/firebaseCategories";
import CategoriesCard from "../cards/CategoriesCard";
import LoadingScreen from "../loading/LoadingScreen";
import { COLORS } from "../../../style/theme";

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getAllCategories();
      setCategories(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <LoadingScreen text="Loading categories..." />;

  return (
    <section className="w-full px-4 md:px-12 py-14">
      {/* Title */}
      <div className="text-center mb-12">
        <h2
          className="text-4xl md:text-5xl font-semibold"
          style={{
            color: COLORS.textAlt,
            fontFamily: "Playfair Display, serif",
          }}>
          Shop by Category
        </h2>

        {/* ✅ refined subtitle */}
        <p
          className="mt-3 text-sm tracking-wide"
          style={{
            color: COLORS.textAlt,
            fontFamily: "Inter, sans-serif",
          }}>
          Discover collections crafted with thoughtful details — explore the
          styles that fit your everyday and festive moments.
        </p>
      </div>

      {/* Categories container */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-10 pb-4">
          {categories.map((cat) => (
            <CategoriesCard key={cat.id} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
