import { redirect } from "react-router";

export async function registerAction({ request }: { request: Request }) {
  const formData = await request.formData();

  const payload = {
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
    rpassword: String(formData.get("rpassword") || ""),
  };

  const res = await fetch(`${import.meta.env.VITE_APP_AUTH_SERVER_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // IMPORTANT if refresh token is cookie
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // return something your component can show
    return { error: data?.error ?? "Registration failed" };
  }

  // Store access token (simple version)
  localStorage.setItem("accessToken", data.accessToken);

  return redirect("/");
}
