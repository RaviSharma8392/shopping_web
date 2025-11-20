import React from "react";
import DesktopNavbar from "./DesktopNavbarDesign";
import MobileTopbar from "./MobileNavbarDesign";
import promoData from "../../data/promoData.json";
import { desktopMenuItems, mobileMenuItems } from "../../config/dropdwownData";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import BottomHomeNavbar from "./BottomHomeNavbar";

const UserNavbar = () => {
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  console.log(wishlistCount);
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <DesktopNavbar
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          promoData={promoData}
          desktopMenuItems={desktopMenuItems}
          mobileMenuItems={mobileMenuItems}
        />
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        <MobileTopbar
          promoData={promoData}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
        />
        <BottomHomeNavbar />
      </div>
    </>
  );
};

export default UserNavbar;
