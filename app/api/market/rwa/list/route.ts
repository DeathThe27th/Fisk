import { NextResponse } from "next/server";
import { getRwaStocks } from "@/lib/providers/bitget";
export const runtime="nodejs";
export async function GET(){try{const result=await getRwaStocks();return NextResponse.json({items:result.value,freshness:result.cached?"cached":"live",fetchedAt:new Date(result.storedAt).toISOString()},{headers:{"Cache-Control":"public, s-maxage=300, stale-while-revalidate=900"}})}catch(error){return NextResponse.json({items:[],freshness:"unavailable",error:error instanceof Error?error.message:"Provider unavailable"},{status:503})}}
