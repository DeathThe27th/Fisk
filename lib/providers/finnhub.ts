import "server-only";
import { createHash } from "node:crypto";
import { z } from "zod";
import { cached, stale } from "@/lib/cache";
import { requireEnv } from "@/lib/env";
import { NewsItemSchema, type NewsItem } from "@/lib/types";
import { getStockDefinition } from "@/lib/stocks";

const RawStory=z.object({category:z.string().optional(),datetime:z.number(),headline:z.string(),id:z.number(),image:z.string().optional(),related:z.string().optional(),source:z.string(),summary:z.string().default(""),url:z.string().url()});
function canonical(url:string){try{const parsed=new URL(url);[...parsed.searchParams.keys()].filter(k=>k.startsWith("utm_")).forEach(k=>parsed.searchParams.delete(k));return parsed.toString()}catch{return url}}
function normalizeHeadline(value:string){return value.toLowerCase().replace(/[^a-z0-9 ]/g,"").replace(/\s+/g," ").trim()}
function inferCategory(value:string):NewsItem["category"]{const v=value.toLowerCase();if(v.includes("earn"))return"earnings";if(v.includes("regulat"))return"regulatory";return"company"}
function relevanceFor(story:z.infer<typeof RawStory>,symbol:string,companyName:string){const related=(story.related??"").split(",").map(value=>value.trim().toUpperCase());if(related.includes(symbol))return 1;const text=normalizeHeadline(`${story.headline} ${story.summary}`);if(text.includes(symbol.toLowerCase()))return .92;const companyTokens=companyName.toLowerCase().split(/\s+/).filter(token=>token.length>3);return companyTokens.some(token=>text.includes(token)) ? .8 : 0}
function normalizeStories(raw:z.infer<typeof RawStory>[],symbol:string,companyName:string,fetchedAt:string,baseRelevance=0){const seen=new Set<string>();return raw.flatMap((story,index)=>{const relevance=Math.max(baseRelevance,relevanceFor(story,symbol,companyName));if(!relevance)return[];const url=canonical(story.url),headlineKey=normalizeHeadline(story.headline);if(seen.has(url)||seen.has(headlineKey))return[];seen.add(url);seen.add(headlineKey);const item:NewsItem={id:`fh-${story.id}`,headline:story.headline,summary:story.summary,source:story.source,sourceUrl:url,imageUrl:story.image||undefined,publishedAt:new Date(story.datetime*1000).toISOString(),fetchedAt,tickers:[symbol],sentiment:"neutral",relevance:Math.min(1,Math.max(.45,relevance-index*.01)),impact:"Ask Fisk to connect this development to the current thesis.",category:inferCategory(story.category??""),freshness:"live"};return[NewsItemSchema.parse(item)]})}

export async function getCompanyNews(ticker:string,from:string,to:string) {
  const symbol=ticker.toUpperCase(); const key=`finnhub:${symbol}:${from}:${to}`;
  try {
    const result=await cached(key,10*60_000,async()=>{
      const token=requireEnv("FINNHUB_API_KEY");const companyUrl=new URL("https://finnhub.io/api/v1/company-news");companyUrl.searchParams.set("symbol",symbol);companyUrl.searchParams.set("from",from);companyUrl.searchParams.set("to",to);companyUrl.searchParams.set("token",token);const marketUrl=new URL("https://finnhub.io/api/v1/news");marketUrl.searchParams.set("category","general");marketUrl.searchParams.set("token",token);
      const responses=await Promise.allSettled([fetch(companyUrl,{signal:AbortSignal.timeout(8_000)}),fetch(marketUrl,{signal:AbortSignal.timeout(8_000)})]);if(responses.every(result=>result.status==="rejected"))throw new Error("Finnhub news requests failed");const payloads=await Promise.all(responses.map(async(result)=>result.status==="fulfilled"&&result.value.ok?z.array(RawStory).parse(await result.value.json()):[]));const fetchedAt=new Date().toISOString();const companyName=getStockDefinition(symbol)?.companyName??symbol;const company=normalizeStories(payloads[0],symbol,companyName,fetchedAt,0);const market=normalizeStories(payloads[1],symbol,companyName,fetchedAt,0);const merged=[...company,...market].sort((a,b)=>b.relevance-a.relevance||new Date(b.publishedAt).getTime()-new Date(a.publishedAt).getTime());const seen=new Set<string>();return merged.filter(item=>{if(seen.has(item.sourceUrl)||seen.has(normalizeHeadline(item.headline)))return false;seen.add(item.sourceUrl);seen.add(normalizeHeadline(item.headline));return true}).slice(0,40);
    });
    return {items:result.value.map(item=>({...item,freshness:result.cached?"cached" as const:item.freshness})),error:null};
  }catch(error){const old=stale<NewsItem[]>(key);if(old)return{items:old.value.map(item=>({...item,freshness:"delayed" as const})),error:error instanceof Error?error.message:"Finnhub unavailable"};return{items:[],error:error instanceof Error?error.message:"Finnhub unavailable"}}
}

export function newsFingerprint(item:NewsItem){return createHash("sha1").update(normalizeHeadline(item.headline)).digest("hex").slice(0,12)}
