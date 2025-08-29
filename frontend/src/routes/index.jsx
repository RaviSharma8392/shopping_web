// AppRoutes.jsx
import React from "react";
import { Routes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";
import AccountPage from "../pages/User/Account";
import HomePage from "../pages/HomePage";
import { Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      {AdminRoutes()}
      {UserRoutes()}
      {AuthRoutes()}

      <Route path="/account" element={<AccountPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;
