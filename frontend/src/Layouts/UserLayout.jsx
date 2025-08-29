import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import BottomNavbar from "../components/ui/navbar/BottomNavbar";
import UserNavbar from "../components/ui/Navbar/UserNavbar";

const UserLayout = () => {
  return (
    <div>
      <UserNavbar />
      <Outlet />
      <Footer />
      <BottomNavbar />
    </div>
  );
};

export default UserLayout;
