import { z } from 'zod/v4';

const emailError = 'Please provide a valid email address.';
const emailSchema = z.email({ error: emailError }).trim();

const nameError = 'Please provide a valid profile name';
const nameSchema = z.string({ error: nameError }).trim().min(2, { error: nameError });

const basePasswordSchema = z
  .string({ error: 'Password must be a string' })
  .min(6, { error: 'Password must be at least 6 characters.' })
  .max(512, { error: 'The length of this Password is excessive.' });

export const registerSchema = z
  .strictObject(
    {
      email: emailSchema,
      password: basePasswordSchema
        .regex(/[a-z]/, { error: 'Password must include at least one lowercase letter.' })
        .regex(/[A-Z]/, { error: 'Password must include at least one uppercase letter.' })
        .regex(/[0-9]/, { error: 'Password must include at least one number.' })
        .regex(/[!@#$%^&*()_+\-=\[\]{}|;:'",.<>/?`~]/, {
          error: 'Password must include at least one special character'
        }),
      confirmPassword: z.string(),
      name: nameSchema
    },
    { error: 'Please provide a valid email and a secure password.' }
  )

  .refine(data => data.password === data.confirmPassword, { error: "Passwords don't match" });

export const loginSchema = z.object({
  name: nameSchema,
  password: basePasswordSchema
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1)
});
