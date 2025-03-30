/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  API_KEY: z.string().min(1),
  SERVICE_DOMAIN: z.string().min(1),
  NEXT_PUBLIC_GA_ID: z.string().min(1),
});

export const env = schema.parse(process.env);
