import { Routes, Route, Navigate } from "react-router-dom";

/* AUTH PAGES */
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";

/* MISC */
import EmailVerification from "../pages/EmailVerificationNotice";
import ConnectionErrorPage from "../pages/ConnectionErrorPage";

import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ReserPasswordPage";

import { useAuth } from "../context/AuthContext";

const AuthRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/connection-error" element={<ConnectionErrorPage />} />
      {!isLoggedIn ? (
        <>
          <Route path="/account/login" element={<LoginPage />} />
          <Route path="/account/register" element={<SignupPage />} />
        </>
      ) : (
        <Route path="/account/*" element={<Navigate to="/" replace />} />
      )}

      <Route path="/account/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/account/reset-password" element={<ResetPasswordPage />} />

      <Route
        path="/account/email-verification"
        element={<EmailVerification />}
      />
    </Routes>
  );
};

export default AuthRoutes;
