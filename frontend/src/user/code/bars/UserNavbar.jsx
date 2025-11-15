import React, { useState, useEffect } from "react";
import DesktopNavbar from "./DesktopNavbarDesign";
import MobileTopbar from "./MobileNavbarDesign";
import promoData from "../../data/promoData.json";
import { IMAGES } from "../../../assets/images/index";
import { desktopMenuItems, mobileMenuItems } from "../../config/dropdwownData";

const UserNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(promoData);
  const Logo = IMAGES.logo;

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <DesktopNavbar
          Logo
          cartCount="10"
          promoData={promoData}
          desktopMenuItems={desktopMenuItems}
          mobileMenuItems={mobileMenuItems}
        />
      </div>

      {/* Mobile */}
      <div className="block  md:hidden">
        {/* Promotional Bar */}

        <MobileTopbar user={user} promoData={promoData} />
      </div>
    </>
  );
};

export default UserNavbar;
