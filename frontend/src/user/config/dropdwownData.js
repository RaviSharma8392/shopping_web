// Used in Desktop & Mobile dropdown


//  2. UTILITY MENU (About, Contact, Returns…)
// Clean, readable, NO ICONS
export const utilityMenuItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Shop", path: "/shop" },

  { label: "Artsy Collection", path: "/collections/artsy" },
  { label: "Basics Collection", path: "/collections/basics" },
  { label: "Rang Collection", path: "/collections/rang" },
  { label: "Babli On You", path: "/babli-on-you" },

  { label: "Return / Exchange", path: "/return-exchange" },
  { label: "Contact Us", path: "/contact" },

  { label: "My Account", path: "/account" },
  { label: "Login / Sign Up", path: "/login" },
];


//  3. DESKTOP MENU (Final merged clean navigation)
export const desktopMenuItems = [
  ...categoryMenuItems,
  ...utilityMenuItems, // categories + utility links
];


//  4. MOBILE MENU 
export const mobileMenuItems = [
  { path: "/", label: "Home",  },

  { path: "/categories", label: "Categories" },

  { path: "/cart", label: "My Cart"  },

  { path: "/orders", label: "My Orders"},

  { path: "/account", label: "My Account"  },

  { path: "/login", label: "Login / Sign Up"  },
];
