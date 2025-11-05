import AdminRoutes from "./admin";
import UserRoutes from "./user";

const App = () => {
  const isAdminPath = window.location.pathname.startsWith("/admin");

  return <>{isAdminPath ? <AdminRoutes /> : <UserRoutes />}</>;
};

export default App;
