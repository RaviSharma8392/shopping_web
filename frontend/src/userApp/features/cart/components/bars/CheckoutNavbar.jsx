import { ArrowLeft, Images } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IMAGES } from "../../../../../assets/images";

const steps = [
  { name: "BAG", path: "/checkout/cart" },
  { name: "ADDRESS", path: "/checkout/address" },
  { name: "PAYMENT", path: "/checkout/payment" },
];

const CheckoutNavbar = () => {
  const location = useLocation();
  const activeIndex = steps.findIndex((s) => s.path === location.pathname);
  const activeStep = steps[activeIndex];

  return (
    <div className="w-full bg-white py-9 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          {/* Desktop Logo */}
          <Link to="/" className="hidden md:flex">
            <img src={IMAGES.appLogo} alt="logo" className="w-20" />
          </Link>

          {/* Mobile Back Button */}
          <Link to="/" className="md:hidden flex">
            <ArrowLeft size={22} />
          </Link>

          {/* Desktop Step List */}
          <div className="hidden md:flex items-center ml-90 gap-6">
            {steps.map((step, index) => {
              const active = location.pathname === step.path;

              return (
                <div key={index} className="flex items-center gap-2">
                  <Link
                    to={step.path}
                    className={`text-sm transition  ${
                      active ? "text-[#FF3F6C] underline" : "text-gray-500"
                    }`}>
                    {step.name}
                  </Link>
                  {index < steps.length - 1 && (
                    <span className="text-gray-300">———</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile — Only Active Step Name */}
          <div className="md:hidden text-sm font-semibold text-black/55">
            {activeStep?.name === "BAG" ? "SHOPPING BAG" : activeStep?.name}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">
          {/* Secure Icon */}
          <div className="flex items-center gap-2">
            <img
              src="https://constant.myntassets.com/checkout/assets/img/sprite-secure.png"
              alt="secure"
              className="w-5 h-5 object-contain"
            />
            <span className="text-xs font-medium text-gray-600">
              100% SECURE
            </span>
          </div>
          {/* Step Counter (Desktop Only) */}
        </div>
      </div>
    </div>
  );
};

export default CheckoutNavbar;
