import { z } from 'zod/v4';

const envSchema = z.object({
  MONGO_URI: z.url({ protocol: /mongodb/ }),
  DB_NAME: z.string(),
  REFRESH_TOKEN_TTL: z.coerce.number().default(7 * 24 * 60 * 60), // 7 days in seconds
  ACCESS_TOKEN_TTL: z.coerce.number().default(15 * 60), // 15 minutes in seconds
  SALT_ROUNDS: z.coerce.number().default(13),

  ACCESS_JWT_SECRET: z
    .string({
      error: 'ACCESS_JWT_SECRET is required and must be at least 64 characters long'
    })
    .min(64),
  CLIENT_BASE_URL: z.url().default('http://localhost:5173')
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:\n', z.prettifyError(parsedEnv.error));
  process.exit(1);
}

export const {
  ACCESS_JWT_SECRET,
  DB_NAME,
  CLIENT_BASE_URL,
  MONGO_URI,
  REFRESH_TOKEN_TTL,
  ACCESS_TOKEN_TTL,
  SALT_ROUNDS
} = parsedEnv.data;
