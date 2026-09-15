import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
export async function GET(request:Request,{params}:{params:Promise<{sessionId:string}>}){try{const user=await requireUser(request);const {sessionId}=await params;const result=await supabaseAdmin().from("research_sessions").select("*").eq("id",sessionId).eq("user_id",user.userId).single();if(result.error)return NextResponse.json({error:"Research session not found."},{status:404});return NextResponse.json({session:result.data})}catch{return NextResponse.json({error:"Sign in to access this research session."},{status:401})}}
