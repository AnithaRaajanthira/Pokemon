import LoginForm from "../components/ui/LoginForm";
import { redirect } from "react-router";
import type { ActionFunction } from "react-router";
import type { LoginProps } from "../types";

// Pure UI wrapper
export default function LoginPage({ error }: LoginProps) {
  return <LoginForm error={error} />;
}

// Data-router declarative action
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("name");
  const password = formData.get("password");

  try {
    // Call the same login logic as your AuthContext
    const res = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Invalid email or password");
    }

    const data = await res.json();
    localStorage.setItem("token", data.token); // AuthContext will pick it up on mount
    return redirect("/?auth=success"); // declarative redirect to fix reload issues
  } catch (err: any) {
    alert(err.message);
    return null; // stay on the form
  }
};
