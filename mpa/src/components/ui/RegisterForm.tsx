import { LoginProps } from "@/types";
import { Link } from "react-router";

interface RegisterFormDeclarativeProps extends LoginProps {
  loading?: boolean;
  onSubmit: (data: { name: string; password: string; email: string; confirmPassword: string }) => void;
}

export default function RegisterForm({ error, loading, onSubmit }: RegisterFormDeclarativeProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const confirmPassword = formData.get("rpassword") as string;
    const password = formData.get("password") as string;
    onSubmit({ name, email, password, confirmPassword });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <div className="bg-base-200 border-base-300 rounded-box w-120 border p-6 mx-auto mt-10 mb-20 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Create an account</h2>
          <p className="text-center m-2 mb-4 text-lg">Join us to enjoy your freetime</p>

          <label className="label text-base font-medium w-full">Profile Name</label>
          <input type="text" name="name" required className="input w-full input-bordered text-base h-12" placeholder="Full Name" />

          <label className="label text-base font-medium w-full mt-2">Email</label>
          <input type="email" name="email" required className="input w-full input-bordered text-base h-12" placeholder="Email" />

          <label className="label text-base font-medium mt-2 w-full">Password</label>
          <input type="password" name="password" required className="input w-full input-bordered text-base h-12" placeholder="Password" />

          <label className="label text-base font-medium mt-2 w-full">Repeat password</label>
          <input type="password" name="rpassword" required className="input w-full input-bordered text-base h-12" placeholder="Repeat above password" />

          <button className="btn btn-primary mt-6 text-base h-12 w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
          <p className="text-center mt-4">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
