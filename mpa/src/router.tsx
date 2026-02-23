import { createBrowserRouter } from "react-router";
import AppLayout from "./components/layout/AppLayout.tsx";
import HomePage, { loader as HomePageLoader } from "./pages/HomePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import RosterPage, { rosterLoader } from "./pages/RosterPage";

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
      // {
      //   path: "/Login",
      //   element: <LogIn />,
      // },
      // {
      //   path: "/register",
      //   element: <Register />,
      // },
      // {
      //   path: "/details",
      //   element: <DetailsPage />,
      // },
      // {
      //   path: "/leaderboard",
      //   element: <LeaderboardPage />,
      // },
    ],
  },
]);

export default router;
