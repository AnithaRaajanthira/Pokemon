import { authServiceURL } from "@/utils";

type SuccessRes = { message: string };
type TokenRes = SuccessRes & { accessToken: string; refreshToken: string };

const login = async (formData: LoginInput): Promise<TokenRes> => {
  const res = await fetch(`${authServiceURL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const data = (await res.json()) as TokenRes;

  return data;
};

const me = async (): Promise<User> => {
  const accessToken = localStorage.getItem("accessToken");

  const res = await fetch(`${authServiceURL}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);
  const { user } = (await res.json()) as SuccessRes & { user: User };

  return user;
};
const logout = async (): Promise<SuccessRes> => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const res = await fetch(`${authServiceURL}/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);
  const data = (await res.json()) as SuccessRes;

  return data;
};

const register = async (formData: RegisterFormState): Promise<TokenRes> => {
  const res = await fetch(`${authServiceURL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const data = (await res.json()) as TokenRes;

  return data;
};

export { login, me, logout, register };
