import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { House, List, UserCircle } from "lucide-react";
import { usePopup } from "../../context/SignUpPopContext";

const BottomNavbar = ({ user }) => {
  const { openSignupPopup } = usePopup();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/", icon: <House size={24} /> },
    { name: "Categories", path: "/categories", icon: <List size={24} /> },
    {
      name: "Profile",
      path: "/account/profile",
      icon: <UserCircle size={24} />,
      action: () => {
        if (user) {
          navigate("/account/profile");
        } else {
          openSignupPopup();
        }
      },
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-inner border-t border-gray-200 z-40">
      <ul className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <button
              onClick={item.action || (() => navigate(item.path))}
              className="flex flex-col items-center text-sm text-gray-500 hover:text-[#B4292F]">
              {item.icon}
              <span className="mt-1">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavbar;
