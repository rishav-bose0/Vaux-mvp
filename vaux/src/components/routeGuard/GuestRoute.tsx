import { useAuth } from "hooks/useAuth";
import { AuthContext } from "context/AuthContext";

export const GuestRoute = ({ children }: { children: any }) => {
  const { token, setToken }: any = useAuth();
  return <AuthContext.Provider value={{token, setToken}}>{children}</AuthContext.Provider>;
};