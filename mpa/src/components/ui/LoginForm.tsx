import { Link } from "react-router";
import type { LoginProps } from "../../types";

interface LoginFormDeclarativeProps extends LoginProps {
  loading?: boolean;
  onSubmit: (data: { name: string; password: string }) => void;
}

export default function LoginForm({ error, loading, onSubmit }: LoginFormDeclarativeProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    onSubmit({ name, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-base-200 p-6 rounded-lg">
        <h2 className="text-center text-xl font-semibold mb-6">Sign In</h2>

        <label className="label text-base font-medium mt-2">Name</label>

        <input type="text" name="name" className="input w-full input-bordered h-12" placeholder="Profile Name" required />

        <label className="label text-base font-medium mt-4">Password</label>

        <input type="password" name="password" className="input w-full input-bordered h-12" placeholder="Password" required />

        <button type="submit" className="btn btn-primary mt-6 w-full h-12" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}

        <p className="text-center mt-4">
          Don't have an account?
          <Link to="/register" className="text-blue-600 hover:underline ml-1">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
