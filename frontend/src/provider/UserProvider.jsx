import { UserContext } from "./UserContext";
import { useUser } from "../hooks/useUser";

export const UserProvider = ({ children }) => {
  const value = useUser();
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
