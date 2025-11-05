import React from "react";
import { COLORS } from "../../../../style/theme";
import { useNavigate } from "react-router-dom";

const CategoriesSection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Co-ords",
      slug: "co-ords",
      image:
        "https://shopmulmul.com/cdn/shop/files/88_115d8b10-f8dd-4d5d-a07a-5800f127bb85_800x.jpg",
    },
    {
      id: 2,
      name: "Kurtas",
      slug: "kurtas",
      image:
        "https://shopmulmul.com/cdn/shop/files/7_1bf47440-7b9c-479f-8982-e6ef21700b5f_800x.jpg",
    },
    {
      id: 3,
      name: "Dresses",
      slug: "dresses",
      image:
        "https://cdn.shopify.com/s/files/1/0088/4031/4931/files/188_20e089d1-7f04-4cb6-9042-7224655cd1f8.jpg",
    },
    {
      id: 4,
      name: "Winter Wear",
      slug: "winter-wear",
      image:
        "https://shopmulmul.com/cdn/shop/files/7_1bf47440-7b9c-479f-8982-e6ef21700b5f_800x.jpg",
    },
    {
      id: 5,
      name: "Festive",
      slug: "festive",
      image:
        "https://shopmulmul.com/cdn/shop/files/88_115d8b10-f8dd-4d5d-a07a-5800f127bb85_800x.jpg",
    },
  ];

  return (
    <section className="w-full px-4 md:px-12 py-14">
      {" "}
      <h2
        className="text-center text-3xl md:text-4xl font-playfair font-semibold mb-12 tracking-wide"
        style={{ color: COLORS.textAlt }}>
        Categories
      </h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-10 pb-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/category/${cat.slug}`)}
              className="cursor-pointer flex-shrink-0 w-60 md:w-64 group">
              {/* Category Name */}
              <h3
                className="text-center text-lg font-semibold mb-4 tracking-wide"
                style={{ color: COLORS.primary }}>
                {cat.name}
              </h3>

              {/* Image Card */}
              <div
                className="relative w-full h-72 rounded-xl overflow-hidden shadow-md 
                              group-hover:shadow-xl transition-all duration-500">
                {/* Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-xl 
                             transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-all duration-500"
                  style={{
                    background: `linear-gradient(180deg, transparent, ${COLORS.primary})`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
