import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.string().min(1),

  NEXTAUTH_URL: z.url(),
  NEXTAUTH_SECRET: z.string().min(1),

  AUTH_GOOGLE_ID: z.string().min(1),
  AUTH_GOOGLE_SECRET: z.string().min(1),

  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),

  RESEND_API_KEY: z.string().min(1).optional(),
});

const result = schema.safeParse(process.env);

if (!result.success) {
  const missing = result.error.issues
    .map((i) => `  ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(`Invalid environment variables:\n${missing}`);
}

export const env = result.data;
