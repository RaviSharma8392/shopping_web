import React, { useState, useEffect } from "react";
import DesktopNavbar from "../navbar/DesktopNavbarDesign";
import MobileTopbar from "../navbar/MobileNavbarDesign";

const UserNavbar = () => {
  const [promoData, setPromoData] = useState([
    {
      message: "Big Sale — Up to 50% OFF",
      linkText: "Shop Now",
      linkUrl: "/sale",
      bgColor: "#FFF0F5",
      textColor: "#2D2342",
      linkColor: "#D63384",
    },
    {
      message: "Free Shipping on Orders Above ₹999!",
      linkText: "Explore",
      linkUrl: "/collections",
      bgColor: "#F8C8DC",
      textColor: "#2D2342",
      linkColor: "#D63384",
    },
  ]);

  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getPromotionalBar();
      if (res && res.items) setPromoData(res.items);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

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
