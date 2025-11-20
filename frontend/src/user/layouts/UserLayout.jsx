import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserNavbar from "../code/bars/UserNavbar";
import Footer from "../code/Footer";
import ConnectionErrorPage from "../pages/ConnectionErrorPage";
import WhatsAppPopup from "../code/pop-up/WhatsAppPopup";

const UserLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOnline) {
      console.log("Network back, rendering page...");
    }
  }, [isOnline, location]);

  // Retry handler for manual retry (optional)
  const handleRetry = () => {
    if (navigator.onLine) {
      setIsOnline(true);
    }
  };

  // If offline, show error page
  if (!isOnline) {
    return <ConnectionErrorPage onRetry={handleRetry} />;
  }

  return (
    <div className="relative">
      <UserNavbar />
      <WhatsAppPopup phoneNumber="+911234567890" />

      <main className={isHome ? "" : "pt-15 md:mt-25"}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default UserLayout;
