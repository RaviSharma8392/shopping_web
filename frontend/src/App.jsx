import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

import { AuthProvider } from "./userApp/features/auth/context/UserContext";
import { CartProvider } from "./userApp/context/CartContext";
import { WishlistProvider } from "./userApp/context/WishlistContext";
import { PopupProvider } from "./userApp/context/SignUpPopContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <PopupProvider>
              <AppRoutes />
            </PopupProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
