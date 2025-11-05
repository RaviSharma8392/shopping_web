import React from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../../style/theme";

const categories = [
  {
    name: "New In",
    img: "https://cdn.shopify.com/s/files/1/0088/4031/4931/t/49/assets/e0ce03684bfa--13-ef0fb5.png?v=1753347283",
    path: "/new-in",
  },
  {
    name: "Suits",
    img: "https://cdn.shopify.com/s/files/1/0088/4031/4931/t/49/assets/e0ce03684bfa--13-ef0fb5.png?v=1753347283",
    path: "/suits",
  },
  {
    name: "Kurtas",
    img: "https://cdn.shopify.com/s/files/1/0088/4031/4931/t/49/assets/e0ce03684bfa--13-ef0fb5.png?v=1753347283",
    path: "/kurtas",
  },
  {
    name: "Ethnic Sets",
    img: "https://cdn.shopify.com/s/files/1/0088/4031/4931/t/49/assets/e0ce03684bfa--13-ef0fb5.png?v=1753347283",
    path: "/ethnic",
  },
  {
    name: "Accessories",
    img: "https://cdn.shopify.com/s/files/1/0088/4031/4931/t/49/assets/e0ce03684bfa--13-ef0fb5.png?v=1753347283",
    path: "/accessories",
  },
];

const CollectionCategories = () => {
  return (
    <section className="w-full py-12 px-4 md:px-10 bg-white">
      {/* Heading */}
      <h2
        className="text-3xl md:text-4xl font-semibold text-center mb-8"
        style={{
          color: COLORS.textAlt,
          fontFamily: "Playfair Display, serif",
        }}>
        Shop by Category
      </h2>

      {/* CATEGORY ROW (smaller & spaced) */}
      <div className="flex justify-center gap-6 md:gap-10 flex-wrap max-w-6xl mx-auto">
        {categories.map((cat, idx) => (
          <Link
            to={cat.path}
            key={idx}
            className="flex flex-col items-center group cursor-pointer">
            {/* Circle Image */}
            <div
              className="
                w-20 h-20 md:w-24 md:h-24 
                rounded-full overflow-hidden 
                shadow-sm hover:shadow-md 
                transition-all duration-300 
                group-hover:scale-105
              "
              style={{
                border: `2px solid ${COLORS.accentAlt}`,
                background: COLORS.light,
              }}>
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Category Name */}
            <p
              className="text-sm md:text-sm mt-2 font-[poppins] tracking-wide"
              style={{
                color: COLORS.primary,
              }}>
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionCategories;
