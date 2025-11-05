import { useNavigate } from "react-router-dom";
import ViewAllButton from "../button/ViewAllButton";
import ProductCard from "../cards/ProductCard";

const ProductSection = ({ title, subtitle, products = [] }) => {
  const navigate = useNavigate();
  return (
    <section className="w-full px-4 md:px-12 py-5">
      {/* Title */}
      <div className="text-center mb-10">
        <h2
          className="text-3xl md:text-4xl font-semibold"
          style={{ fontFamily: "Playfair Display, serif" }}>
          {title}
        </h2>

        {subtitle && (
          <p className="text-gray-600 mt-2 text-sm tracking-wide">{subtitle}</p>
        )}
      </div>

      {/* Product CArd  */}
      <div className="grid  grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 pb-8">
        {products.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <ViewAllButton
        label="View All Products"
        onClick={() => navigate("/products")}
      />
    </section>
  );
};

export default ProductSection;
