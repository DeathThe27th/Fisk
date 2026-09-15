import { NextResponse } from "next/server";
import { getRwaStock } from "@/lib/providers/bitget";
export const runtime="nodejs";
export async function GET(_:Request,{params}:{params:Promise<{ticker:string}>}){try{const {ticker}=await params;const result=await getRwaStock(ticker);return NextResponse.json({item:result.value,freshness:result.cached?"cached":"live",fetchedAt:new Date(result.storedAt).toISOString()})}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Provider unavailable"},{status:503})}}
