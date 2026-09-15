import { NextResponse } from "next/server";
import { z } from "zod";
import { getRwaCandles } from "@/lib/providers/bitget";
export const runtime="nodejs";
const Query=z.object({period:z.enum(["5m","15m","1h","4h","1d"]).default("1h"),size:z.coerce.number().int().min(10).max(300).default(120),chain:z.string().optional(),contract:z.string().optional()});
export async function GET(request:Request,{params}:{params:Promise<{ticker:string}>}){try{const {ticker}=await params;const url=new URL(request.url);const input=Query.parse(Object.fromEntries(url.searchParams));const result=await getRwaCandles(ticker,input.period,input.size,input.chain&&input.contract?{chain:input.chain,contract:input.contract}:undefined);return NextResponse.json(result,{headers:{"Cache-Control":"public, s-maxage=45, stale-while-revalidate=180"}})}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Invalid request"},{status:400})}}
