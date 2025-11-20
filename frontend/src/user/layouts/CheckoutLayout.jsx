import React from "react";
import CheckoutNavbar from "../code/bars/CheckoutNavbar";
import { Outlet } from "react-router-dom";

const CheckoutLayout = () => {
  return (
    <div className="w-full min-h-screen  bg-white">
      <CheckoutNavbar />

      <div className="max-w-5xl mx-auto   ">
        <Outlet />
      </div>
    </div>
  );
};

export default CheckoutLayout;
