import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import UserNavbar from "../features/account/components/bars/UserNavbar";
import WhatsAppPopup from "../components/pop-up/WhatsAppPopup";
// import Footer from "../components/Footer"; // enable if needed

/**
 * UserLayout
 * Wrapper layout for all user-facing pages
 */
const UserLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Top Navigation */}
      <UserNavbar />

      {/* WhatsApp Support Popup */}
      <WhatsAppPopup phoneNumber="+911234567890" />

      {/* Page Content */}
      <main className={`flex-1 ${isHome ? "" : "pt-16 md:pt-24"}`}>
        <Outlet />
      </main>

      {/* Footer (optional) */}
      {/* <Footer /> */}
    </div>
  );
};

export default UserLayout;
