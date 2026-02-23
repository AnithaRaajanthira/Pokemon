import { z } from "zod/v4";
// import { dbEntrySchema } from "./shared.ts";
import { isValidObjectId } from "mongoose";

const scoreInputSchema = z.strictObject({
  userId: z.string().refine((val) => isValidObjectId(val), "Invalid User ID"),
  score: z.number(),
  date: z.date(),
});

// const userSchema = z.strictObject({
//   ...scoreInputSchema.shape,
//   ...dbEntrySchema.shape,
// });
export { scoreInputSchema };
