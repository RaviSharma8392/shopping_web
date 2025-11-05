import ShareSection from "../components/common/share/ShareSection";
import { COLORS } from "../../style/theme";
import ItemCard from "../components/common/cards/ItemCard";

const WishlistPage = () => {
  const isLoggedIn = false; // change this based on your auth state

  const wishlistItems = [
    {
      id: 1,
      name: "Eirene Lawn Printed Navy Co-ord Set",
      price: 12950,
      images: [
        "https://shopmulmul.com/cdn/shop/files/88_115d8b10-f8dd-4d5d-a07a-5800f127bb85_800x.jpg?v=1755607569",
      ],
      selectedSize: "XS",
    },
    {
      id: 2,
      name: "Aurora Printed Linen Off White Co-ord Set",
      price: 9950,
      images: [
        "https://cdn.shopify.com/s/files/1/0088/4031/4931/files/188_20e089d1-7f04-4cb6-9042-7224655cd1f8.jpg?v=1756538942",
      ],
      selectedSize: "S",
    },
  ];

  return (
    <section
      className="mt-20 min-h-screen w-full px-4 md:px-12 py-12"
      style={{ background: COLORS.light }}>
      {/* Page Title */}
      <h1
        className="text-center text-3xl md:text-4xl font-playfair font-semibold mb-6"
        style={{ color: COLORS.textAlt }}>
        My Wishlist
      </h1>

      {/* Show Login Reminder ONLY if user ISN’T logged in */}
      {!isLoggedIn && (
        <p
          className="text-center text-sm md:text-base mb-10"
          style={{ color: COLORS.text }}>
          To save your wishlist please{" "}
          <span className="underline cursor-pointer">login</span> or{" "}
          <span className="underline cursor-pointer">sign up</span>.
        </p>
      )}

      {/* Show Share component */}
      <ShareSection />

      {/* Wishlist Items */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlistItems.map((item) => (
          <div key={item.id}>
            <ItemCard product={item} />

            {/* Link */}
            <p
              className="mt-3 text-sm underline cursor-pointer text-center"
              style={{ color: COLORS.textAlt }}>
              Go to product page of: {item.name} in {item.selectedSize} /{" "}
              {item.selectedSize}
            </p>
          </div>
        ))}
      </div>

      {/* When wishlist empty */}
      {wishlistItems.length === 0 && (
        <p className="text-center text-lg mt-10" style={{ color: COLORS.text }}>
          Your wishlist is empty.
        </p>
      )}
    </section>
  );
};

export default WishlistPage;
