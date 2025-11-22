import CategoriesCard from "../cards/CategoriesCard";
import LoadingScreen from "../loading/LoadingScreen";
import { COLORS } from "../../../style/theme";

const CategoriesSection = ({ categories, loading }) => {
  if (loading) return <LoadingScreen text="Loading categories..." />;

  return (
    <section className="w-full px-4 md:px-12 md:py-14">
      {/* Title */}
      <div className="text-center mb-12">
        <h2
          style={{
            fontFamily: "Playfair Display, serif",
          }}
          className="text-center text-3xl md:text-4xl tracking-wide mb-12 text-gray-900">
          SHOP by CATEGORIES
        </h2>
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
