import "server-only";
import { z } from "zod";
import { cached } from "@/lib/cache";
import { serverEnv } from "@/lib/env";

const CIK:Record<string,string>={NVDA:"0001045810",AAPL:"0000320193",TSLA:"0001318605",AMD:"0000002488",COIN:"0001679788"};
const SubmissionSchema=z.object({filings:z.object({recent:z.object({accessionNumber:z.array(z.string()),filingDate:z.array(z.string()),reportDate:z.array(z.string()),form:z.array(z.string()),primaryDocument:z.array(z.string()),primaryDocDescription:z.array(z.string()).optional()})})});
export type Filing={id:string;form:string;filedAt:string;reportDate:string;title:string;sourceUrl:string;fetchedAt:string;freshness:"live"|"cached"};

export async function getRecentFilings(ticker:string,forms=["10-K","10-Q","8-K"]):Promise<{items:Filing[];error:string|null}> {
  const symbol=ticker.toUpperCase();const cik=CIK[symbol];if(!cik)return{items:[],error:"Ticker is not in Fisk’s current SEC lookup cache."};
  try{const result=await cached(`sec:${cik}`,6*60*60_000,async()=>{const response=await fetch(`https://data.sec.gov/submissions/CIK${cik}.json`,{headers:{"User-Agent":serverEnv().SEC_USER_AGENT,"Accept-Encoding":"gzip, deflate"},signal:AbortSignal.timeout(8_000)});if(!response.ok)throw new Error(`SEC request failed (${response.status})`);return SubmissionSchema.parse(await response.json())});const recent=result.value.filings.recent;const fetchedAt=new Date(result.storedAt).toISOString();const items=recent.form.flatMap((form,index)=>{if(!forms.includes(form))return[];const accession=recent.accessionNumber[index];const accessionPlain=accession.replaceAll("-","");return[{id:accession,form,filedAt:new Date(`${recent.filingDate[index]}T00:00:00Z`).toISOString(),reportDate:recent.reportDate[index],title:`${symbol} ${form} filed ${recent.filingDate[index]}`,sourceUrl:`https://www.sec.gov/Archives/edgar/data/${Number(cik)}/${accessionPlain}/${recent.primaryDocument[index]}`,fetchedAt,freshness:result.cached?"cached" as const:"live" as const}]});return{items:items.slice(0,8),error:null};}catch(error){return{items:[],error:error instanceof Error?error.message:"SEC unavailable"}}
}

export async function getCompanyFacts(ticker:string,concepts:string[]){const symbol=ticker.toUpperCase(),cik=CIK[symbol];if(!cik)throw new Error("Ticker is not in Fisk’s current SEC lookup cache.");const response=await fetch(`https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`,{headers:{"User-Agent":serverEnv().SEC_USER_AGENT},signal:AbortSignal.timeout(8_000)});if(!response.ok)throw new Error(`SEC facts request failed (${response.status})`);const data=z.object({facts:z.record(z.string(),z.record(z.string(),z.unknown()))}).parse(await response.json());const usGaap=data.facts["us-gaap"]??{};return Object.fromEntries(concepts.filter(name=>name in usGaap).map(name=>[name,usGaap[name]]))}
