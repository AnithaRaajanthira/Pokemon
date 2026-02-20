import { createBrowserRouter } from "react-router";
import AppLayout from "./components/layout/AppLayout.tsx";
import HomePage, { loader as HomePageLoader } from "./pages/HomePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

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
      // {
      //   path: "/Login",
      //   element: <LogIn />,
      // },
      // {
      //   path: "/register",
      //   element: <Register />,
      // },
      // {
      //   path: "/roster",
      //   element: <RosterPage />,
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
