// packages/config/src/env.ts
import { z } from "zod";

export class ConfigError extends Error {
  constructor(public errors: Record<string, string[] | undefined>) {
    super("Invalid environment variables");
    this.name = "ConfigError";
  }
}

/**
 * All environment variables MUST be defined here.
 */
const baseEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default("0.0.0.0"),
});

export type Env = z.infer<typeof baseEnvSchema>;

/**
 * Parse & validate process.env
 */
export function loadEnv(): Env {
  const parsed = baseEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    throw new ConfigError(parsed.error.flatten().fieldErrors);
  }

  return parsed.data;
}
