import { createBrowserRouter } from "react-router";
import AppLayout from "./components/layout/AppLayout.tsx";
import HomePage, { loader as HomePageLoader } from "./pages/HomePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import RosterPage, { rosterLoader } from "./pages/RosterPage";
import DetailsPage, { loader as detailsLoader } from "./pages/DetailsPage.tsx";
import LoginPage, { action as LoginAction } from "./pages/LoginPage.tsx";
import RegisterPage, { action as registerAction } from "./pages/RegisterPage.tsx";
import BattlePage from "./pages/BattlePage.tsx";
import LeaderboardPage from "./pages/LeaderboardPage.tsx";

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
