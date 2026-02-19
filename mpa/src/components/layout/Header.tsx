import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext.js";
import { JSX } from "react";

export default function Header(): JSX.Element {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = (): void => {
    if (isAuthenticated) {
      logout(); // clears state + localStorage
    } else {
      navigate("/signin");
    }
  };
  return (
    <div className="navbar bg-stone-300 shadow-sm">
      <div className="navbar-start justify-between">
        <Link to="/" className=" btn-ghost text-2xl font-bold text-amber-950">
          HomePage
        </Link>
        <Link to="/leaderboard" className=" btn-ghost text-2xl font-bold text-amber-950">
          Leaderboard
        </Link>
      </div>

      <div className="navbar-end">
        {isAuthenticated && (
          <button>
            <Link to="/details" className="btn p-4 m-2 text-amber-950 text-base border-b-slate-600 shadow-sm">
              Details
            </Link>
          </button>
        )}

        {isAuthenticated && (
          <button>
            <Link to="/roster" className="btn p-4 m-2 text-amber-950 text-base border-b-slate-600 shadow-sm">
              My Roster
            </Link>
          </button>
        )}
        {isAuthenticated && (
          <button>
            <Link to="/battle" className="btn p-4 m-2 text-amber-950 text-base border-b-slate-600 shadow-sm">
              Battlepage
            </Link>
          </button>
        )}
        <button onClick={handleLogout}>
          <Link to="/login" className="btn p-4 m-2 text-amber-950 text-base border-b-slate-600 shadow-sm">
            {!isAuthenticated ? "Log In" : "Log Out"}
          </Link>
        </button>

        {!isAuthenticated && (
          <button className="btn text-amber-950 text-base border-b-slate-600 p-4 m-2">
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </button>
        )}
      </div>
    </div>
  );
}
