import { NextResponse } from "next/server";
import { runResearch, ResearchRequestSchema } from "@/lib/research";
import { allowRequest } from "@/lib/rate-limit";
import { authenticate } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
export const runtime="nodejs";
export async function POST(request:Request){try{const user=await authenticate(request);const ip=request.headers.get("x-forwarded-for")?.split(",")[0]??"local";if(!allowRequest(user?.userId??ip,user?30:6))return NextResponse.json({error:"Research limit reached. Try again shortly."},{status:429});const input=ResearchRequestSchema.parse(await request.json());const result=await runResearch(input);let sessionId:string|undefined;if(user){const saved=await supabaseAdmin().from("research_sessions").insert({user_id:user.userId,title:input.query.slice(0,90),query:input.query,primary_ticker:input.ticker,status:"complete",synthesis:result}).select("id").single();sessionId=typeof saved.data?.id==="string"?saved.data.id:undefined}return NextResponse.json({result,sessionId})}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Research failed"},{status:400})}}
