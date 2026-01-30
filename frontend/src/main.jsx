import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { TaruvedaCartProvider } from "./userApp/context/TaruvedaCartContext";
import App from "./App";
import { AuthProvider } from "./userApp/features/auth/context/UserContext";
import { PopupProvider } from "./userApp/context/SignUpPopContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
