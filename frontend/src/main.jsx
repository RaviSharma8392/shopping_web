import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { AuthProvider } from "./user/context/AuthContext.jsx";
import { PopupProvider } from "./user/context/SignUpPopContext.jsx";
import { CartProvider } from "./user/context/CartContext.jsx";
import { WishlistProvider } from "./user/context/WishlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <AuthProvider>
          <WishlistProvider>
            <PopupProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </PopupProvider>
          </WishlistProvider>
        </AuthProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>
);
