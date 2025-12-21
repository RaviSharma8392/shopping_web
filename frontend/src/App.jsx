import { useAuth } from "./user/context/AuthContext";
import { usePopup } from "./user/context/SignUpPopContext";

import SignupPopup from "./user/code/pop-up/SignupPage";
import AdminRoutes from "./admin";
import UserRoutes from "./user/routes";
import AuthRoutes from "./user/routes/authRoutes";

const App = () => {
  const { signupOpen, closeSignupPopup } = usePopup();
  const { isLoggedIn, loading } = useAuth();

  const path = window.location.pathname;

  const isAdminPath = path.startsWith("/admin");
  const isAuthPath = path.startsWith("/account");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      {isAdminPath ? (
        <AdminRoutes />
      ) : isAuthPath ? (
        // Only authentication pages
        <AuthRoutes />
      ) : (
        <>
          {/* Popup only in user area */}
          {!isLoggedIn && signupOpen && (
            <SignupPopup onClose={closeSignupPopup} />
          )}

          {/* All frontend UI pages */}
          <UserRoutes />
        </>
      )}
    </>
  );
};

export default App;
