import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  //   if (!user || user.role !== "user") {
  //     return <Navigate to="/account/login" replace />;
  //   }

  return children;
};

export default ProtectedAdmin;
