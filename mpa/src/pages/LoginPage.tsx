import LoginForm from "../components/ui/LoginForm";
import type { LoginProps } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function LoginPage({ error }: LoginProps) {
  const { handleSignIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(error || "");

  const onSubmit = async (data: { name: string; password: string }) => {
    try {
      setLoading(true);
      setFormError("");

      await handleSignIn(data);

      navigate("/");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return <LoginForm error={formError} loading={loading} onSubmit={onSubmit} />;
}
