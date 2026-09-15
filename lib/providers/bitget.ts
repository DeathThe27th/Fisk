import "server-only";
import { BitgetWalletApiClient } from "@bitget-wallet/api";
import { createSigningFetch } from "@bitget-wallet/api/auth";
import { z } from "zod";
import { requireEnv } from "@/lib/env";
import { cached, stale } from "@/lib/cache";
import { CandleSchema, type Candle } from "@/lib/types";

let singleton: BitgetWalletApiClient | undefined;
function client() {
  if (!singleton) {
    const apiKey=requireEnv("BITGET_WALLET_API_KEY"),apiSecret=requireEnv("BITGET_WALLET_API_SECRET");
    const options={ apiKey, fetch:createSigningFetch({ apiKey, apiSecret }), timeoutInSeconds:10, maxRetries:2 } as unknown as ConstructorParameters<typeof BitgetWalletApiClient>[0];
    singleton = new BitgetWalletApiClient(options);
  }
  return singleton;
}

const StockSchema = z.object({ ticker:z.string(), name:z.string().default(""), icon:z.string().optional(), status:z.string().default("online"), contracts:z.array(z.object({chain:z.string(),contract:z.string(),symbol:z.string().default(""),data_source:z.string().default(""),status:z.string().default("online")})).default([]) });
export type RwaStock = z.infer<typeof StockSchema>;

export async function getRwaStocks() {
  return cached("bitget:rwa:list", 5*60_000, async()=>{
    const response = await client().rwa.stockList({});
    if (response.status !== 0) throw new Error("Bitget RWA stock list failed");
    return z.array(StockSchema).parse(response.data?.list ?? []);
  });
}

export async function getRwaStock(ticker:string) {
  const symbol=ticker.toUpperCase();
  return cached(`bitget:rwa:stock:${symbol}`,60_000,async()=>{
    const response=await client().rwa.stockInfo({ticker:symbol});
    if(response.status!==0 || !response.data) throw new Error("Bitget RWA stock detail failed");
    return response.data;
  });
}

export async function getRtokenMapping(ticker:string){const stocks=await getRwaStocks();return stocks.value.find(item=>item.ticker===ticker.toUpperCase())??null}
export async function getRtokenTransactions(chain:string,contract:string,side?:"buy"|"sell",page=1,size=20){const response=await client().rwa.transactionList({chain,contract,side,page,size:Math.min(size,100)});if(response.status!==0)throw new Error("Bitget RWA transaction list failed");return response.data}

export async function getRwaCandles(ticker:string,period:"5m"|"15m"|"1h"|"4h"|"1d"="1h",size=120,asset?:{chain:string;contract:string}) {
  const symbol=ticker.toUpperCase(); const key=`bitget:rwa:kline:${symbol}:${period}:${asset?.chain??"underlying"}`;
  try {
    const result=await cached(key,45_000,async()=>{
      const response=await client().rwa.kline({chain:asset?.chain??"rwa",contract:asset?.contract??symbol,period,size:Math.min(size,300)});
      if(response.status!==0) throw new Error("Bitget RWA K-line failed");
      const candles=(response.data?.list??[]).map(item=>CandleSchema.parse({time:item.ts,open:item.open,high:item.high,low:item.low,close:item.close,volume:item.volume})).sort((a,b)=>a.time-b.time);
      if(!candles.length) throw new Error("Bitget returned no candles");
      return candles;
    });
    return {candles:result.value,freshness:(result.cached?"cached":"live") as "cached"|"live",updatedAt:new Date(result.storedAt).toISOString(),source:"Bitget Wallet RWA"};
  } catch(error) {
    const old=stale<Candle[]>(key);
    if(old) return {candles:old.value,freshness:"delayed" as const,updatedAt:new Date(old.storedAt).toISOString(),source:"Bitget Wallet RWA"};
    return {candles:[],freshness:"delayed" as const,updatedAt:new Date().toISOString(),source:"Bitget Wallet RWA",error:error instanceof Error?error.message:"Provider unavailable"};
  }
}
