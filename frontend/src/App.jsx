import { useAuth } from "./user/context/AuthContext";
import { usePopup } from "./user/context/SignUpPopContext";

import SignupPopup from "./user/code/pop-up/SignupPage";
import UserRoutes from "./user";
import AdminRoutes from "./admin";

const App = () => {
  const { signupOpen, closeSignupPopup } = usePopup();
  const { isLoggedIn, loading } = useAuth();
  console.log("POPUP SHOULD SHOW?", !isLoggedIn && signupOpen);
  console.log("signupOpen:", signupOpen);
  console.log("isLoggedIn:", isLoggedIn);

  const isAdminPath = window.location.pathname.startsWith("/admin");

  // 🔥 Prevent popup flicker BEFORE auth loads
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* ADMIN ROUTES */}
      {isAdminPath ? (
        <AdminRoutes />
      ) : (
        <>
          {/* USER POPUP — open only when user is NOT logged in */}
          {!isLoggedIn && signupOpen && (
            <SignupPopup onClose={closeSignupPopup} />
          )}

          {/* USER ROUTES */}
          <UserRoutes />
        </>
      )}
    </>
  );
};

export default App;
