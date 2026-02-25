export type LoginProps = {
  error?: string;
};
declare global {
  type User = {
    _id: string;
    createdAt: string;
    __v: number;
    email: string;
    name: string;
  };
  type LoginInput = { name: string; password: string };

  type AuthContextType = {
    signedIn: boolean;
    user: User | null;
    handleSignIn: ({ name, password }: LoginInput) => Promise<void>;
    handleSignOut: () => Promise<void>;
    handleRegister: (formData: RegisterFormState) => Promise<void>;
  };

  type RegisterFormState = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}
