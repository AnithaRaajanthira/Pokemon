import { createBrowserRouter } from "react-router";
import AppLayout from "./components/layout/AppLayout";
import HomePage, { loader as HomePageLoader } from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import RosterPage, { rosterLoader } from "./pages/RosterPage";
import DetailsPage, { loader as detailsLoader } from "./pages/DetailsPage";
import LoginPage, { action as LoginAction } from "./pages/LoginPage";
import RegisterPage, { action as registerAction } from "./pages/RegisterPage";
import BattlePage from "./pages/BattlePage";
import LeaderboardPage from "./pages/LeaderboardPage";

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
      },
      {
        path: "/roster",
        Component: RosterPage,
        loader: rosterLoader,
      },
      {
        path: "/Login",
        element: <LoginPage />,
        action: LoginAction,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "/leaderboard",
        element: <LeaderboardPage />,
      },
    ],
  },
]);

export default router;
