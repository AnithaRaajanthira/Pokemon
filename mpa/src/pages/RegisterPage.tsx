import RegisterForm from "@/components/ui/RegisterForm";
import { LoginProps } from "@/types";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts";
import { useState } from "react";

// Pure UI wrapper
export default function RegisterPage({ error }: LoginProps) {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(error || "");
  const onSubmit = async (data: { name: string; password: string; email: string; confirmPassword: string }) => {
    try {
      setLoading(true);
      setFormError("");
      await handleRegister(data);
      navigate("/Login");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return <RegisterForm error={formError} loading={loading} onSubmit={onSubmit} />;
}

// // Declarative action for data-router
// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();
//   const name = formData.get("name");
//   const email = formData.get("email");
//   const password = formData.get("password");
//   const rpassword = formData.get("rpassword");

//   //for type safety-------------------------------------------------------------
//   if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string" || typeof rpassword !== "string") {
//     alert("Invalid form data");
//     return null;
//   }

//   // validation
//   if (name.length < 2) {
//     alert("Name must be at least 2 characters");
//     return null;
//   }
//   if (password.length < 8) {
//     alert("Password must be at least 8 characters");
//     return null;
//   }
//   if (password !== rpassword) {
//     alert("Passwords do not match");
//     return null;
//   }
// };

// // API call
// //   const response = await fetch("http://localhost:3001/api/users", {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({ name, password }),
// //   });

// //   if (!response.ok) {
// //     const errorData = await response.json();
// //     alert(errorData.message || "Registration failed");
// //     return null;
// //   }

// //   alert("Registration successful!");
// //   return redirect("/signin"); // declarative redirect
// // };
