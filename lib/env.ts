import { z } from "zod";

const serverSchema = z.object({
  BITGET_QWEN_API_KEY: z.string().min(1).optional(),
  QWEN_BASE_URL: z.string().url().default("https://hackathon.bitgetops.com/v1"),
  QWEN_MODEL: z.string().default("qwen3.8-max"),
  PRIVY_APP_SECRET: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  FINNHUB_API_KEY: z.string().min(1).optional(),
  BITGET_WALLET_API_KEY: z.string().min(1).optional(),
  BITGET_WALLET_API_SECRET: z.string().min(1).optional(),
  SEC_USER_AGENT: z.string().min(8).optional(),
});

const publicSchema = z.object({
  NEXT_PUBLIC_PRIVY_APP_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_BITGET_REDIRECT_URL: z.string().url().optional().or(z.literal("")),
});

export function serverEnv() {
  return serverSchema.parse(process.env);
}

export function requireEnv(name:keyof z.infer<typeof serverSchema>) {
  const value=serverEnv()[name];
  if(!value) throw new Error(`${name} is not configured.`);
  return value;
}

export function publicEnv() {
  return publicSchema.parse({
    NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_BITGET_REDIRECT_URL: process.env.NEXT_PUBLIC_BITGET_REDIRECT_URL,
  });
}

export function requirePublicEnv(name:keyof z.infer<typeof publicSchema>) {
  const value=publicEnv()[name];
  if(!value) throw new Error(`${name} is not configured.`);
  return value;
}
