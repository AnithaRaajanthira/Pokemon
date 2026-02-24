import { createBrowserRouter } from "react-router";
import AppLayout from "./components/layout/AppLayout.js";
import HomePage, { loader as HomePageLoader } from "./pages/HomePage.js";
import ErrorPage from "./pages/ErrorPage.js";
import RosterPage, { rosterLoader } from "./pages/RosterPage.js";
import DetailsPage, { loader as detailsLoader } from "./pages/DetailsPage.js";
import LoginPage, { action as LoginAction } from "./pages/LoginPage.js";
import RegisterPage, { action as registerAction } from "./pages/RegisterPage.js";
import BattlePage from "./pages/BattlePage_log.js";
import LeaderboardPage from "./pages/LeaderboardPage.js";

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
