import { Form, Link } from "react-router";

export default function RegisterForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <Form method="post" className="flex items-center w-full">
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

          <button className="btn btn-primary mt-6 text-base h-12 w-full">Register</button>

          <p className="text-center mt-4">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}
