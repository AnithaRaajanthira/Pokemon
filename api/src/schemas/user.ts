import { z } from "zod/v4";
import { dbEntrySchema } from "./shared.ts";

const userInputSchema = z.strictObject({
  name: z.string().min(1, "Name should be a valid one").trim(),
  email: z.email().trim().toLowerCase(),
  password: z.string().min(6, "Password should be min 6 characters long"),
});

const userSchema = z.strictObject({
  ...userInputSchema.shape,
  ...dbEntrySchema.shape,
});
export { userInputSchema, userSchema };
