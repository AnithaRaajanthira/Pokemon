import { Link, useNavigate } from "react-router";
import { useAuth } from "@/contexts";
import { JSX } from "react";
import { toast } from "react-toastify";

export default function Header(): JSX.Element {
  const { signedIn, user, handleSignOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await handleSignOut();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error logging out");
      }
    }
  };
  return (
    <div className="navbar bg-mist-500 shadow-md px-4">
      <div className="navbar-start gap-6">
        <Link to="/" className="btn btn-ghost border-2 rounded-xl text-lg font-bold text-grey-200 hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95">
          Homepage
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <h1 className="text-xl font-bold tracking-widest uppercase text-grey-200">Welcome to the arena!</h1>
      </div>

      <div className="navbar-end gap-2">
        {signedIn ? (
          <>
            <Link to="/battle" className="btn btn-ghost border-2  rounded-xl text-lg font-bold text-red-700 hover:bg-red-800 hover:text-white transition-all duration-300 active:scale-95">
              Battle
            </Link>

            <Link to="/roster" className="btn btn-ghost border-2  rounded-xl text-lg font-bold text-grey-200 hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95">
              My Roster
            </Link>

            <Link to="/" onClick={handleLogout} className="btn btn-ghost border-2  rounded-xl text-lg font-bold text-red-700 hover:bg-red-800 hover:text-white transition-all duration-300 active:scale-95">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost border-2  rounded-xl text-lg font-bold text-grey-200 hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95">
              Login
            </Link>

            <Link to="/register" className="btn btn-ghost border-2  rounded-xl text-lg font-bold text-grey-200 hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
