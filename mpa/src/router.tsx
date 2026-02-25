import { createBrowserRouter } from "react-router";
import AppLayout from "./components/layout/AppLayout";
import HomePage, { loader as HomePageLoader } from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import RosterPage, { rosterLoader } from "./pages/RosterPage";
import DetailsPage, { loader as detailsLoader } from "./pages/DetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BattlePage, { loader as battleLoader } from "./pages/BattlePage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: HomePageLoader,
      },
      {
        path: "/details/:id",
        element: <DetailsPage />,
        loader: detailsLoader,
      },
      {
        path: "/battle",
        element: <BattlePage />,
        loader: battleLoader,
      },
      {
        path: "/roster",
        Component: RosterPage,
        loader: rosterLoader,
      },
      {
        path: "/Login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
