import { useNavigate } from "react-router-dom";
import CategoryFloatingInfoCard from "./CategoryFloatingInfoCard";

const CategoriesCard = ({ cat }) => {
  const navigate = useNavigate();

  return (
    <div
      key={cat.id}
      onClick={() => navigate(`/category/${cat.slug}`)}
      className="cursor-pointer flex-shrink-0 w-64 group">
      <div className="relative w-full h-80 md:h-[420px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.10)] transition-all duration-500 bg-white">
        {/* Image */}
        <img
          src={cat.banner}
          alt={cat.name}
          className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        />

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-black/60 opacity-60 group-hover:opacity-80 transition-all duration-500" />

        {/* Floating White Info Card */}
        {<CategoryFloatingInfoCard cat={cat} />}
      </div>
    </div>
  );
};

export default CategoriesCard;
