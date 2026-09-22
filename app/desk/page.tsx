import Link from "next/link";
import { Brand } from "@/components/brand";
import { AuthButton } from "@/components/auth-button";
import { DeskWorkspace, type DiscoveryStock } from "@/components/desk-workspace";
import { STOCK_REGISTRY } from "@/lib/stocks";
import { publicEnv } from "@/lib/env";
import { getRwaQuotes, getRwaStocks, selectRwaInstrument } from "@/lib/providers/bitget";

export const dynamic = "force-dynamic";

export default async function Desk({ searchParams }: { searchParams: Promise<{ q?: string; stock?: string }> }) {
  const { q = "" } = await searchParams;
  const [rwa, quotes] = await Promise.allSettled([getRwaStocks(), getRwaQuotes(STOCK_REGISTRY.map((item) => item.ticker))]);
  const providerStocks = rwa.status === "fulfilled" ? rwa.value.value : [];
  const providerQuotes = quotes.status === "fulfilled" ? quotes.value.value : [];
  const quoteCached = quotes.status === "fulfilled" && quotes.value.cached;
  const bitgetRedirectUrl = publicEnv().NEXT_PUBLIC_BITGET_REDIRECT_URL || "https://www.bitget.com/";
  const stocks: DiscoveryStock[] = STOCK_REGISTRY.map((stockDefinition) => {
    const match = providerStocks.find((item) => item.ticker === stockDefinition.ticker);
    const quote = providerQuotes.find((item) => item.ticker === stockDefinition.ticker);
    const instrument = match ? selectRwaInstrument(match) : null;
    return {
      ...stockDefinition,
      name: match?.name || stockDefinition.companyName,
      icon: stockDefinition.logoPath,
      price: quote?.latest_price,
      change: quote?.price_24h_change_ratio,
      freshness: quote ? (quoteCached ? "Cached · Bitget Wallet" : "Bitget Wallet RWA") : "Price unavailable",
      bitgetSymbol: instrument?.symbol,
      bitgetProductType: instrument?.productType,
      bitgetChain: instrument?.chain,
      bitgetContract: instrument?.contract,
      bitgetDataSource: instrument?.dataSource,
      tradeUrl: bitgetRedirectUrl,
    };
  });

  return <main className="fisk-desk">
    <header className="fisk-desk-nav">
      <Brand />
      <nav aria-label="Desk navigation"><Link className="active" href="/desk">Desk</Link><Link href="/watchlist">Watchlist</Link><Link href="/journal">Journal</Link><Link href="/methodology">Methodology</Link></nav>
      <div className="desk-nav-actions"><AuthButton className="desk-signin" /></div>
    </header>
    <DeskWorkspace initialQuestion={q} stocks={stocks} />
  </main>;
}
