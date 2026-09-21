"use client";

import { useEffect, useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { MarketChart } from "@/components/market-chart";
import { StockChat } from "@/components/stock-chat";
import { StockArtwork } from "@/components/stock-artwork";
import type { Candle, NewsItem } from "@/lib/types";

type ChartData = { candles: Candle[]; freshness: "live" | "cached" | "delayed" | "demo"; updatedAt: string; source: string; error?: string };
type Filing = { id: string; form: string; filedAt: string; sourceUrl: string };

export function StockOverlay({ ticker, onClose }: { ticker: string; onClose: () => void }) {
  const [chart, setChart] = useState<ChartData | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filings, setFilings] = useState<Filing[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    Promise.allSettled([
      fetch(`/api/market/rwa/${ticker}/kline?period=1h&size=120`).then((response) => response.json()),
      fetch(`/api/news?ticker=${ticker}`).then((response) => response.json()),
      fetch(`/api/filings/${ticker}`).then((response) => response.json()),
    ]).then(([candleResponse, newsResponse, filingResponse]) => {
      if (!alive) return;
      if (candleResponse.status === "fulfilled" && Array.isArray(candleResponse.value.candles)) setChart(candleResponse.value);
      else setError("Price history is unavailable from the current provider.");
      if (newsResponse.status === "fulfilled") setNews(newsResponse.value.items ?? []);
      if (filingResponse.status === "fulfilled") setFilings(filingResponse.value.items ?? []);
    });
    return () => { alive = false; document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", esc); };
  }, [ticker, onClose]);

  return <div className="stock-overlay-shell" role="dialog" aria-modal="true" aria-label={`${ticker} research workspace`}>
    <button className="stock-overlay-backdrop" onClick={onClose} aria-label="Close stock research" />
    <section className="stock-overlay">
      <header>
        <div className="stock-overlay-heading"><div className="stock-overlay-art"><StockArtwork ticker={ticker} name={ticker} /></div><div><span>Selected stock · Fisk research workspace</span><h2>{ticker}</h2></div></div>
        <button type="button" onClick={onClose} aria-label="Close"><X size={21} /></button>
      </header>
      {chart ? <MarketChart ticker={ticker} initial={chart} /> : <div className="overlay-loading" role="status"><div className="overlay-loading-chart" aria-hidden="true"><span>PRICE FIELD · {ticker}</span><i /><i /><i /><b /></div><p>{error || "Checking the numbers…"}</p><span>{error ? "You can still review the reporting and filings below." : `Opening ${ticker} without losing your place.`}</span></div>}
      <div className="overlay-research"><div><h3>Latest reporting</h3>{news.length ? news.slice(0, 5).map((item) => <a key={item.id} href={item.sourceUrl} target="_blank" rel="noreferrer"><span>{item.source}</span><strong>{item.headline}</strong><ExternalLink size={14} /></a>) : <p>Recent reporting is unavailable.</p>}</div><aside><h3>SEC filings</h3>{filings.length ? filings.slice(0, 6).map((item) => <a key={item.id} href={item.sourceUrl} target="_blank" rel="noreferrer"><b>{item.form}</b><span>{item.filedAt.slice(0, 10)}</span></a>) : <p>Recent filings are unavailable.</p>}</aside></div>
    </section>
    <StockChat ticker={ticker} />
  </div>;
}
