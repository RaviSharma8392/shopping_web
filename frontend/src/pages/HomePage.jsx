import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Buttons/PrimaryButton";

const HomePage = () => {
  const navigate = useNavigate();

  //   handel login
  const handleLogin = () => {
    onClick = navigate("/login");
  };

  //   handel signUp
  const handleSignup = () => {
    onClick = navigate("/signup");
  };

  //   user redirect

  const StartShopping = () => {
    onClick = navigate("/item");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold mb-10 text-center text-gray-800">
        Welcome to ShopEase
      </h1>
      <p className="text-center mb-12 text-lg text-gray-700">
        Choose your role to continue shopping or manage your store
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Normal User Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transition transform hover:scale-105">
          <img
            src="https://img.icons8.com/fluency/96/shopping-cart.png"
            alt="User Shopping"
            className="mb-6"
          />
          <h2 className="text-2xl font-semibold mb-4">Shopper</h2>
          <p className="mb-6 text-center text-gray-600">
            Browse products, view details, and shop with ease.
          </p>
          <Button
            onClick={StartShopping}
            type="secondary"
            label=" Start Shopping"
          />
        </div>

        {/* Admin Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transition transform hover:scale-105">
          <img
            src="https://img.icons8.com/color/96/admin-settings-male.png"
            alt="Admin"
            className="mb-6"
          />
          <h2 className="text-2xl font-semibold mb-4">Admin</h2>
          <p className="mb-6 text-center text-gray-600">
            Manage products, orders, and users efficiently.
          </p>
          <div className="flex gap-4 flex-col w-full">
            <Button label="Login" onClick={handleLogin} type="primary" />
            <Button label="Sign Up" onClick={handleSignup} type="success" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
