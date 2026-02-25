import { userSchema, logInSchema } from "#schemas";
import { z } from "zod/v4";

declare global {
  type UserRequestBody = z.infer<typeof userSchema>;
  type LogInRequestBody = z.infer<typeof logInSchemaInSchema>;

  type SanitizedBody = UserRequestBody | SignInRequestBody;
}
