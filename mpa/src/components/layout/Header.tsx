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
    <div className="navbar bg-stone-300 shadow-md px-4">
      <div className="navbar-start gap-6">
        <Link to="/" className="btn btn-ghost text-2xl font-black text-amber-950 hover:scale-105 transition-transform">
          Homepage
        </Link>
        <div className="hidden md:flex gap-4">
          <Link
            to="/leaderboard"
            className="btn btn-ghost text-2xl font-black text-amber-950 hover:scale-105 transition-transform"
          >
            Leaderboard
          </Link>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <h1 className="text-xl font-bold tracking-widest uppercase text-stone-600">Welcome..Start playing !!!</h1>
      </div>

      <div className="navbar-end gap-2">
<<<<<<< HEAD
        {/* <Link to="/details" className="btn btn-ghost text-lg font-bold text-amber-950 hover:underline">
          Details
        </Link> */}

=======
>>>>>>> 24d90e01fb0e1aa0ec9eb0155847ddcdfa8aecb1
        <Link to="/roster" className="btn btn-ghost text-lg font-bold text-amber-950 hover:underline">
          My Roster
        </Link>

        <Link
          to="/battle"
          className="btn btn-ghost text-lg font-bold text-red-700 hover:bg-red-100 active:scale-95 transition-all"
        >
          Battle
        </Link>

        <Link
          to="/login"
          className="btn btn-ghost border-2 border-amber-950/20 rounded-xl text-lg font-bold text-amber-950 hover:bg-blue-500 hover:text-white hover:border-blue-600 transition-all duration-300 active:scale-95"
        >
          Login
        </Link>

        <Link to="/register" className="btn btn-ghost text-lg font-bold text-amber-950 hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
}
