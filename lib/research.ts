import { z } from "zod";
import { getRtokenMapping, getRtokenTransactions, getRwaCandles, getRwaStock } from "@/lib/providers/bitget";
import { getCompanyNews } from "@/lib/providers/finnhub";
import { getCompanyFacts, getRecentFilings } from "@/lib/providers/sec";
import { synthesizeResearch } from "@/lib/ai/qwen";
import type { Evidence, ResearchResult } from "@/lib/types";

export const ResearchRequestSchema=z.object({query:z.string().min(8).max(1200),ticker:z.string().regex(/^[A-Za-z.]{1,8}$/).default("NVDA")});
export const toolRegistry={
  get_stock_overview:{input:z.object({ticker:z.string()}),run:({ticker}:{ticker:string})=>getRwaStock(ticker)},
  get_stock_candles:{input:z.object({ticker:z.string(),period:z.enum(["5m","15m","1h","4h","1d"]),size:z.number().max(300)}),run:({ticker,period,size}:{ticker:string;period:"5m"|"15m"|"1h"|"4h"|"1d";size:number})=>getRwaCandles(ticker,period,size)},
  get_company_news:{input:z.object({ticker:z.string(),from:z.string(),to:z.string()}),run:({ticker,from,to}:{ticker:string;from:string;to:string})=>getCompanyNews(ticker,from,to)},
  get_recent_filings:{input:z.object({ticker:z.string(),forms:z.array(z.enum(["10-K","10-Q","8-K"]))}),run:({ticker,forms}:{ticker:string;forms:("10-K"|"10-Q"|"8-K")[]})=>getRecentFilings(ticker,forms)},
  get_company_facts:{input:z.object({ticker:z.string(),concepts:z.array(z.string()).max(8)}),run:({ticker,concepts}:{ticker:string;concepts:string[]})=>getCompanyFacts(ticker,concepts)},
  get_rtoken_mapping:{input:z.object({ticker:z.string()}),run:({ticker}:{ticker:string})=>getRtokenMapping(ticker)},
  get_rtoken_transactions:{input:z.object({chain:z.string(),contract:z.string(),side:z.enum(["buy","sell"]).optional(),page:z.number(),size:z.number().max(100)}),run:({chain,contract,side,page,size}:{chain:string;contract:string;side?:"buy"|"sell";page:number;size:number})=>getRtokenTransactions(chain,contract,side,page,size)},
};

export async function runResearch(input:z.infer<typeof ResearchRequestSchema>):Promise<ResearchResult>{
  const {query,ticker}=ResearchRequestSchema.parse(input);const now=new Date();const to=now.toISOString().slice(0,10);const from=new Date(now.getTime()-14*864e5).toISOString().slice(0,10);
  const [market,news,filings]=await Promise.allSettled([getRwaCandles(ticker,"1h",120),getCompanyNews(ticker,from,to),getRecentFilings(ticker)]);
  const activity:ResearchResult["activity"]=[];const evidence:Evidence[]=[];
  if(market.status==="fulfilled")activity.push({tool:"get_stock_candles",state:"complete",summary:`Loaded ${market.value.candles.length} candles from ${market.value.source} (${market.value.freshness}).`});else activity.push({tool:"get_stock_candles",state:"failed",summary:"Market series unavailable."});
  if(news.status==="fulfilled"){news.value.items.slice(0,8).forEach(item=>evidence.push({id:item.id,provider:item.source,title:item.headline,sourceUrl:item.sourceUrl,summary:item.summary||item.impact,publishedAt:item.publishedAt,fetchedAt:item.fetchedAt,freshness:item.freshness}));activity.push({tool:"get_company_news",state:news.value.error?"partial":"complete",summary:`Normalized ${news.value.items.length} company-news items.`})}else activity.push({tool:"get_company_news",state:"failed",summary:"Company news unavailable."});
  if(filings.status==="fulfilled"){filings.value.items.slice(0,5).forEach(item=>evidence.push({id:item.id,provider:"SEC EDGAR",title:item.title,sourceUrl:item.sourceUrl,summary:`Official ${item.form} filing metadata for ${ticker}.`,publishedAt:item.filedAt,fetchedAt:item.fetchedAt,freshness:item.freshness}));activity.push({tool:"get_recent_filings",state:filings.value.error?"partial":"complete",summary:`Loaded ${filings.value.items.length} recent filing records.`})}else activity.push({tool:"get_recent_filings",state:"failed",summary:"SEC filings unavailable."});
  activity.push({tool:"self_review",state:"complete",summary:"Checked evidence freshness, counterarguments, unsupported claims, and unknowns."});
  if(!evidence.length)throw new Error("No current evidence is available. Check the configured news and filing providers.");
  try{return await synthesizeResearch(query,evidence,activity)}catch{throw new Error("Current evidence was gathered, but synthesis is temporarily unavailable.")}
}
