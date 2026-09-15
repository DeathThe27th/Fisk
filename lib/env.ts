import { z } from "zod";

const serverSchema = z.object({
  BITGET_QWEN_API_KEY: z.string().min(1),
  QWEN_BASE_URL: z.string().url().default("https://hackathon.bitgetops.com/v1"),
  QWEN_MODEL: z.string().default("qwen3.8-max"),
  PRIVY_APP_SECRET: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  FINNHUB_API_KEY: z.string().min(1),
  BITGET_WALLET_API_KEY: z.string().min(1),
  BITGET_WALLET_API_SECRET: z.string().min(1),
  SEC_USER_AGENT: z.string().min(8),
});

const publicSchema = z.object({
  NEXT_PUBLIC_PRIVY_APP_ID: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_BITGET_REDIRECT_URL: z.string().url().optional().or(z.literal("")),
});

export function serverEnv() {
  return serverSchema.parse(process.env);
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
