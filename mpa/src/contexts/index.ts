import { createContext, use } from "react";
import AuthProvider from "./AuthContext";

const AuthContext = createContext<AuthContextType | null>(null);

const useAuth = (): AuthContextType => {
  const context = use(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export { AuthContext, AuthProvider, useAuth };
