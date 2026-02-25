import { Outlet, useNavigation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { JSX } from "react";
import { AuthProvider } from "@/contexts";
// import AuthProvider from "../../contexts/AuthContext";

export default function AppLayout(): JSX.Element {
  const navigation = useNavigation();
  const isLoading: boolean = navigation.state === "loading";

  return (
    <AuthProvider>
      <Header />
      {isLoading && <div>Loading...</div>}
      <Outlet />
      <Footer />
    </AuthProvider>
  );
}
