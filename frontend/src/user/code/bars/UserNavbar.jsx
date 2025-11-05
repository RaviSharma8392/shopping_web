import React, { useState, useEffect } from "react";
import DesktopNavbar from "./DesktopNavbarDesign";
import MobileTopbar from "./MobileNavbarDesign";
import promoData from "../../data/promoData.json";

const UserNavbar = () => {
  const user = "";
  console.log(promoData);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <DesktopNavbar user={user} promoData={promoData} />
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
