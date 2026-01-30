import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { House, List, UserCircle, Heart, Sparkles } from "lucide-react";
import { useAuth } from "../../../auth/context/UserContext";

const BottomNavbar = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleProtected = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      // redirect to login and preserve current page
      navigate("/auth/login", {
        state: { from: location.pathname },
        replace: true,
      });
    }
  };

  const navItems = [
    { name: "Home", path: "/", icon: <House size={20} /> },
    { name: "Categories", path: "/categories", icon: <List size={20} /> },
    { name: "New", path: "/new", icon: <Sparkles size={20} /> },
    {
      name: "Wishlist",
      path: "/user/wishlist",
      icon: <Heart size={20} />,
      protected: true,
    },
    {
      name: "Profile",
      path: "/user/profile",
      icon: <UserCircle size={20} />,
      protected: true,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-2xl border-t border-gray-200 z-[999] rounded-t-2xl">
      <ul className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <button
              type="button"
              onClick={() =>
                item.protected
                  ? handleProtected(item.path)
                  : navigate(item.path)
              }
              className="flex flex-col items-center text-xs text-gray-500 hover:text-[#B4292F] transition focus:outline-none">
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
