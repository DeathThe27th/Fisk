import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { requireEnv, requirePublicEnv } from "@/lib/env";
import type { Database } from "@/lib/database";

let singleton:SupabaseClient<Database>|undefined;
export function supabaseAdmin(){if(!singleton){singleton=createClient<Database>(requirePublicEnv("NEXT_PUBLIC_SUPABASE_URL"),requireEnv("SUPABASE_SERVICE_ROLE_KEY"),{auth:{persistSession:false,autoRefreshToken:false}})}return singleton}
