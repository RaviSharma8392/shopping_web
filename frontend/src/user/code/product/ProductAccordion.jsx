import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const ProductAccordion = ({ product }) => {
  const [openSection, setOpenSection] = useState("description");

  const sections = [
    {
      id: "description",
      title: "Product Description",
      content: product.description || "No description available.",
    },
    {
      id: "details",
      title: "Product Details",
      content: `
        • Material: Premium fabric
        • Care: Dry clean only
        • Fit: Regular fit
        • Pattern: Embroidered
        ${
          product.colors
            ? `• Available Colors: ${product.colors
                .map((c) => c.name)
                .join(", ")}`
            : ""
        }
        ${product.sizes ? `• Available Sizes: ${product.sizes.join(", ")}` : ""}
      `,
    },
    {
      id: "shipping",
      title: "Shipping & Returns",
      content: `
        • Free shipping on orders above ₹1999
        • Standard delivery: 3-5 business days
        • Express delivery: 1-2 business days
        • Easy 7-day return policy
        • Free pickup for returns
      `,
    },
    {
      id: "care",
      title: "Care Instructions",
      content: `
        • Dry clean only
        • Do not bleach
        • Iron on low heat
        • Store in a cool, dry place
        • Avoid direct sunlight
      `,
    },
  ];

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {sections.map((section) => (
        <div
          key={section.id}
          className="border-b border-gray-200 last:border-b-0">
          <button
            onClick={() =>
              setOpenSection(openSection === section.id ? null : section.id)
            }
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
            <span className="text-lg font-semibold text-gray-900">
              {section.title}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                openSection === section.id ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === section.id && (
            <div className="px-6 pb-4">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductAccordion;
