import "server-only";
import { createHash } from "node:crypto";
import { z } from "zod";
import { cached, stale } from "@/lib/cache";
import { serverEnv } from "@/lib/env";
import { NewsItemSchema, type NewsItem } from "@/lib/types";
import { demoNews } from "@/lib/demo";

const RawStory=z.object({category:z.string().optional(),datetime:z.number(),headline:z.string(),id:z.number(),image:z.string().optional(),related:z.string().optional(),source:z.string(),summary:z.string().default(""),url:z.string().url()});
function canonical(url:string){try{const parsed=new URL(url);[...parsed.searchParams.keys()].filter(k=>k.startsWith("utm_")).forEach(k=>parsed.searchParams.delete(k));return parsed.toString()}catch{return url}}
function normalizeHeadline(value:string){return value.toLowerCase().replace(/[^a-z0-9 ]/g,"").replace(/\s+/g," ").trim()}
function inferCategory(value:string):NewsItem["category"]{const v=value.toLowerCase();if(v.includes("earn"))return"earnings";if(v.includes("regulat"))return"regulatory";return"company"}

export async function getCompanyNews(ticker:string,from:string,to:string) {
  const symbol=ticker.toUpperCase(); const key=`finnhub:${symbol}:${from}:${to}`;
  try {
    const result=await cached(key,10*60_000,async()=>{
      const url=new URL("https://finnhub.io/api/v1/company-news"); url.searchParams.set("symbol",symbol);url.searchParams.set("from",from);url.searchParams.set("to",to);url.searchParams.set("token",serverEnv().FINNHUB_API_KEY);
      const response=await fetch(url,{signal:AbortSignal.timeout(8_000)}); if(response.status===429)throw new Error("Finnhub rate limit reached");if(!response.ok)throw new Error(`Finnhub request failed (${response.status})`);
      const raw=z.array(RawStory).parse(await response.json()); const seen=new Set<string>(); const fetchedAt=new Date().toISOString();
      return raw.flatMap((story,index)=>{const url=canonical(story.url), headlineKey=normalizeHeadline(story.headline);if(seen.has(url)||seen.has(headlineKey))return[];seen.add(url);seen.add(headlineKey);const item:NewsItem={id:`fh-${story.id}`,headline:story.headline,summary:story.summary,source:story.source,sourceUrl:url,imageUrl:story.image||undefined,publishedAt:new Date(story.datetime*1000).toISOString(),fetchedAt,tickers:[symbol],sentiment:"neutral",relevance:Math.max(.45,1-index*.015),impact:"Ask Fisk to connect this development to the current thesis.",category:inferCategory(story.category??""),freshness:"live"};return[NewsItemSchema.parse(item)]});
    });
    return {items:result.value.map(item=>({...item,freshness:result.cached?"cached" as const:item.freshness})),error:null};
  }catch(error){const old=stale<NewsItem[]>(key);if(old)return{items:old.value.map(item=>({...item,freshness:"delayed" as const})),error:error instanceof Error?error.message:"Finnhub unavailable"};return{items:demoNews,error:error instanceof Error?error.message:"Finnhub unavailable"}}
}

export function newsFingerprint(item:NewsItem){return createHash("sha1").update(normalizeHeadline(item.headline)).digest("hex").slice(0,12)}
