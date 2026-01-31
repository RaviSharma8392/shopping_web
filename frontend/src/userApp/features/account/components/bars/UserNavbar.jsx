import React from "react";
import DesktopNavbar from "./DesktopNavbarDesign";
import MobileTopbar from "./MobileNavbarDesign";
import promoData from "../../data/promoData.json";
// import { useCart } from "../../../../context/CartContext";
// import { useWishlist } from "../../../../context/WishlistContext";
import { categoryMenuItems } from "../../data/categoryMenuItems";

const UserNavbar = () => {
  // const { count: cartCount } = useCart();
  // const { count: wishlistCount } = useWishlist();
  const cartCount = 15;
  const wishlistCount = 15;

  console.log(wishlistCount);
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <DesktopNavbar
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          promoData={promoData}
          categoryMenuItems={categoryMenuItems}
        />
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        <MobileTopbar
          promoData={promoData}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
        />
      </div>
    </>
  );
};

export default UserNavbar;
