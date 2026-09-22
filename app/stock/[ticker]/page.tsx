import { publicEnv } from "@/lib/env";
import { getStockDefinition } from "@/lib/stocks";
import { getRwaCandles, getRwaStock, selectRwaInstrument } from "@/lib/providers/bitget";
import { getCompanyNews } from "@/lib/providers/finnhub";
import { getRecentFilings } from "@/lib/providers/sec";
import { StockResearchWorkspace, type StockWorkspaceInstrument } from "@/components/stock-research-workspace";

export const dynamic = "force-dynamic";

export default async function StockPage({ params, searchParams }: { params: Promise<{ ticker: string }>; searchParams: Promise<{ q?: string }> }) {
  const [{ ticker: raw }, { q = "" }] = await Promise.all([params, searchParams]);
  const ticker = raw.toUpperCase();
  const definition = getStockDefinition(ticker) ?? { ticker, companyName: ticker, sector: "Technology" as const, logoPath: "" };
  const now = new Date();
  const stockResult = await getRwaStock(ticker).catch(() => null);
  const info = stockResult?.value ?? null;
  const selected = info ? selectRwaInstrument(info) : null;
  const [chartResult, newsResult, filingsResult] = await Promise.allSettled([
    getRwaCandles(ticker, "1h", 120, selected ? { chain: selected.chain, contract: selected.contract } : undefined),
    getCompanyNews(ticker, new Date(now.getTime() - 14 * 864e5).toISOString().slice(0, 10), now.toISOString().slice(0, 10)),
    getRecentFilings(ticker),
  ]);
  const chart = chartResult.status === "fulfilled" ? chartResult.value : { candles: [], freshness: "delayed" as const, updatedAt: now.toISOString(), source: "Bitget Wallet RWA", error: "Market data unavailable." };
  const news = newsResult.status === "fulfilled" ? newsResult.value : { items: [], error: "Finnhub news is unavailable." };
  const filings = filingsResult.status === "fulfilled" ? filingsResult.value.items : [];
  const instrument: StockWorkspaceInstrument | null = selected ? { symbol: selected.symbol, dataSource: selected.dataSource, productType: selected.productType, chain: selected.chain, contract: selected.contract, latestPrice: selected.latestPrice, absoluteChange: selected.absoluteChange, percentageChange: selected.percentageChange, marketStatus: selected.marketStatus, marketStatusTitle: selected.marketStatusTitle } : null;
  const tradeUrl = publicEnv().NEXT_PUBLIC_BITGET_REDIRECT_URL || "https://www.bitget.com/";

  return <StockResearchWorkspace ticker={ticker} companyName={info?.name || definition.companyName} logoPath={definition.logoPath} instrument={instrument} price={info?.latest_price || selected?.latestPrice} absoluteChange={info?.price_24h_change || selected?.absoluteChange} percentageChange={info?.price_24h_change_ratio || selected?.percentageChange} marketStatus={selected?.marketStatusTitle} updatedAt={chart.updatedAt} chart={chart} news={news.items} newsError={news.error} filings={filings} tradeUrl={tradeUrl} initialQuestion={q} />;
}
