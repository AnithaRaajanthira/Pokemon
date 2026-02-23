import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from ".";
import { login, me, logout, register } from "@/data";

const AuthProvider = ({ children }: { children: ReactNode }) => {
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

  const handleSignIn = async ({ email, password }: LoginInput) => {
    const { accessToken, refreshToken } = await login({ email, password });
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

  const value: AuthContextType = {
    signedIn,
    user,
    handleSignIn,
    handleSignOut,
    handleRegister,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
