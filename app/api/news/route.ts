import { NextResponse } from "next/server";
import { z } from "zod";
import { getCompanyNews } from "@/lib/providers/finnhub";
const Query=z.object({ticker:z.string().regex(/^[A-Za-z.]{1,8}$/).default("NVDA"),from:z.string().date().optional(),to:z.string().date().optional()});
export async function GET(request:Request){try{const url=new URL(request.url);const q=Query.parse(Object.fromEntries(url.searchParams));const now=new Date();const to=q.to??now.toISOString().slice(0,10);const from=q.from??new Date(now.getTime()-14*864e5).toISOString().slice(0,10);const result=await getCompanyNews(q.ticker,from,to);return NextResponse.json(result,{headers:{"Cache-Control":"public, s-maxage=600, stale-while-revalidate=1800"}})}catch(error){return NextResponse.json({items:[],error:error instanceof Error?error.message:"Invalid request"},{status:400})}}
