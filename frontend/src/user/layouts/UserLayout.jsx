import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../code/bars/UserNavbar";

const UserLayout = () => {
  return (
    <div>
      <UserNavbar />
      {/* <CartSidebar /> */}
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default UserLayout;
