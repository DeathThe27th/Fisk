import { NextResponse } from "next/server";
import { getRecentFilings } from "@/lib/providers/sec";
export async function GET(_:Request,{params}:{params:Promise<{ticker:string}>}){const {ticker}=await params;const result=await getRecentFilings(ticker);return NextResponse.json(result,{headers:{"Cache-Control":"public, s-maxage=21600, stale-while-revalidate=86400"}})}
