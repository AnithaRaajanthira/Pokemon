import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { login, me, logout, register } from "@/data";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [checkSession, setCheckSession] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await me();
        setUser(userData);
        setSignedIn(true);
      } catch (error) {
        console.error(error);
      } finally {
        setCheckSession(false);
      }
    };

    if (checkSession) getUser();
  }, [checkSession]);

  const handleSignIn = async ({ name, password }: LoginInput) => {
    const { accessToken, refreshToken } = await login({ name, password });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    // setSignedIn(true);
    setCheckSession(true);
  };

  const handleSignOut = async () => {
    await logout();
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    setSignedIn(false);
    setUser(null);
  };

  const handleRegister = async (formData: RegisterFormState) => {
    const { accessToken, refreshToken } = await register(formData);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    // setSignedIn(true);
    setCheckSession(true);
  };

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        user,
        handleSignIn,
        handleSignOut,
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  //--- specify return type
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
