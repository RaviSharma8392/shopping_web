import { COLORS } from "../../../style/theme";
import useTestimonials from "../../hook/useTestimonials";
import TestimonialCard from "../cards/CategoriesCard";

const TestimonialsSection = () => {
  const { testimonials, loading } = useTestimonials();

  if (loading) {
    return (
      <section className="py-20 flex justify-center items-center">
        <h2 className="text-xl text-gray-700">Loading testimonials...</h2>
      </section>
    );
  }

  return (
    <section className="w-full py-20 px-4 md:px-10 bg-white">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2
          className="text-4xl md:text-5xl font-semibold"
          style={{
            color: COLORS.textAlt,
            fontFamily: "Playfair Display, serif",
          }}>
          Mulmul and Me
        </h2>

        <p
          className="mt-2 tracking-widest text-sm"
          style={{
            letterSpacing: "3px",
            color: COLORS.textAlt,
            fontFamily: "Montserrat, sans-serif",
          }}>
          LOVE SHARED BY YOU
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {testimonials.map((t) => (
          <TestimonialCard
            key={t.id}
            name={t.name}
            img={t.img}
            message={t.message}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
