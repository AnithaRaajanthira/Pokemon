import { createBrowserRouter } from "react-router";
import AppLayout from "./components/layout/AppLayout.tsx";
import HomePage, { loader as HomePageLoader } from "./pages/HomePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import RosterPage, { rosterLoader } from "./pages/RosterPage";
import LoginPage, { action as LoginAction } from "./pages/LoginPage.tsx";
import RegisterPage, { action as registerAction } from "./pages/RegisterPage.tsx";

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

      // {
      //   path: "/Login",
      //   element: <LogIn />,
      // },
      // {
      //   path: "/register",
      //   element: <Register />,
      // },

      // {
      //   path: "/leaderboard",
      //   element: <LeaderboardPage />,
      // },
    ],
  },
]);

export default router;
