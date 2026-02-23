import { Form, Link } from "react-router";

export default function RegisterForm() {
  return (
    <Form method="post" className="flex items-center w-full">
      <fieldset className="fieldset bg-base-200 border-base-300 items-center rounded-box w-120 border p-6 mx-auto mt-10 mb-20">
        <h2 className="fieldset-legend text-xl justify-center font-semibold">Create an account</h2>
        <p className="text-center m-2 mb-4 text-lg">Join us to enjoy your freetime</p>

        <label className="label text-base font-medium">Profile Name</label>
        <input type="text" name="name" required className="input w-auto input-bordered text-base h-12" placeholder="Full Name" />

        <label className="label text-base font-medium">Email</label>
        <input type="email" name="email" required className="input w-auto input-bordered text-base h-12" placeholder="Email" />

        <label className="label text-base font-medium mt-2">Password</label>
        <input type="password" name="password" required className="input w-auto input-bordered text-base h-12" placeholder="Password" />

        <label className="label text-base font-medium mt-2">Repeat password</label>
        <input type="password" name="rpassword" required className="input w-auto input-bordered text-base h-12" placeholder="Repeat above password" />

        <button className="btn btn-primary mt-6 text-base h-12">Register</button>

        <p className="text-center mt-4">
          Already have an account?
          <Link to="/signin" className="text-blue-600 hover:underline ml-1">
            Login
          </Link>
        </p>
      </fieldset>
    </Form>
  );
}
