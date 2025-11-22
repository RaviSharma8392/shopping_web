import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { House, List, UserCircle, Heart, Sparkles } from "lucide-react";
import { usePopup } from "../../context/SignUpPopContext";

const BottomNavbar = ({ user }) => {
  const { openSignupPopup } = usePopup();
  const navigate = useNavigate();

  const handleProtected = (path) => {
    if (user) navigate(path);
    else openSignupPopup();
  };

  const navItems = [
    { name: "Home", path: "/", icon: <House size={20} /> },

    { name: "Categories", path: "/categories", icon: <List size={20} /> },

    {
      name: "New",
      path: "/new",
      icon: <Sparkles size={20} />,
    },

    {
      name: "Wishlist",
      path: "/account/wishlist",
      icon: <Heart size={20} />,
      protected: true,
    },

    {
      name: "Profile",
      path: "/account/profile",
      icon: <UserCircle size={20} />,
      protected: true,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-2xl border-t border-gray-200 z-[999] rounded-t-2xl">
      <ul className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <div
              onClick={() =>
                item.protected
                  ? handleProtected(item.path)
                  : navigate(item.path)
              }
              className="flex flex-col items-center text-xs text-gray-500 hover:text-[#B4292F] transition">
              {item.icon}
              <span className="mt-1">{item.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavbar;
