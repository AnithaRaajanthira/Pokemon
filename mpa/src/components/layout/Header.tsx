import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext.js";
import { JSX } from "react";

export default function Header(): JSX.Element {
  // const { isAuthenticated, logout } = useAuth();
  // const navigate = useNavigate();
  // const handleLogout = (): void => {
  //   if (isAuthenticated) {
  //     logout(); // clears state + localStorage
  //   } else {
  //     navigate("/login");
  //   }
  // };
  return (
    <div className="navbar bg-stone-800 shadow-md px-4">
      <div className="navbar-start gap-6">
        <Link
          to="/"
          className="btn btn-ghost border-2 border-amber-950/20 rounded-xl text-lg font-bold text-grey-200 hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95"
        >
          Homepage
        </Link>
        {/* <div className="hidden md:flex gap-4">
          <Link
            to="/leaderboard"
            className="btn btn-ghost border-2 border-amber-950/20 rounded-xl text-lg font-bold text-grey-200 hover:bg-blue-500 hover:text-white transition-all duration-300 active:scale-95"
          >
            Leaderboard
          </Link>
        </div> */}
      </div>

      <div className="navbar-center hidden lg:flex">
        <h1 className="text-xl font-bold tracking-widest uppercase text-grey-200">
          Welcome to the arena!
        </h1>
      </div>

      <div className="navbar-end gap-2">
        <Link
          to="/roster"
          className="btn btn-ghost border-2 border-amber-950/20 rounded-xl text-lg font-bold text-grey-200 hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95"
        >
          My Roster
        </Link>

        <Link
          to="/battle"
          className="btn btn-ghost border-2 border-amber-950/20 rounded-xl text-lg font-bold text-red-700 hover:bg-red-800 hover:text-white transition-all duration-300 active:scale-95"
        >
          Battle
        </Link>

        <Link
          to="/login"
          className="btn btn-ghost border-2 border-amber-950/20 rounded-xl text-lg font-bold text-grey-200 hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="btn btn-ghost border-2 border-amber-950/20 rounded-xl text-lg font-bold text-grey-200 hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
