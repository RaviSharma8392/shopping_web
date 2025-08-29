import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUserCircle, FaBox } from "react-icons/fa";

const BottomNavbar = () => {
  const cartCount = 3;

  const navItems = [
    { id: 1, name: "Home", path: "/", icon: <FaHome size={22} /> },
    { id: 2, name: "Orders", path: "/orders", icon: <FaBox size={22} /> }, // New 'Orders' item
    { id: 3, name: "Cart", path: "/cart", icon: <FaShoppingCart size={22} /> },
    {
      id: 4,
      name: "Profile",
      path: "/account",
      icon: <FaUserCircle size={22} />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-gray-100 shadow-lg md:hidden">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center p-2 rounded-lg 
                 transition-colors duration-200 
                 ${
                   isActive
                     ? "text-blue-600 font-bold transform scale-110"
                     : "text-gray-500 hover:text-blue-500"
                 }`
              }>
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>

              {/* Cart Count Badge (visible only on Cart link) */}
              {item.name === "Cart" && cartCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavbar;
