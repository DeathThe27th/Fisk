"use client";

import { useEffect, useRef, useState } from "react";
import type { Candle } from "@/lib/types";

type Instrument = { chain?: string; contract?: string };
let marketRequestQueue = Promise.resolve();

function queuedFetch(url: string) {
  const request = marketRequestQueue.then(async () => {
    const response = await fetch(url, { cache: "force-cache" });
    await new Promise((resolve) => setTimeout(resolve, 260));
    return response;
  });
  marketRequestQueue = request.then(() => undefined, () => undefined);
  return request;
}

function chartUrl(ticker: string, instrument: Instrument, period: "15m" | "1h") {
  const query = new URLSearchParams({ period, size: "96" });
  if (instrument.chain && instrument.contract) {
    query.set("chain", instrument.chain);
    query.set("contract", instrument.contract);
  }
  return `/api/market/rwa/${ticker}/kline?${query}`;
}

function formatPrice(value?: number | string) {
  if (value === undefined || value === "") return "Live quote";
  const parsed = Number(value);
  return Number.isFinite(parsed) ? `$${parsed.toLocaleString("en-US", { maximumFractionDigits: 4 })}` : String(value);
}

function pointsFor(candles: Candle[]) {
  const closes = candles.map((candle) => candle.close);
  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const span = max - min || 1;
  return closes.map((value, index) => `${index / Math.max(closes.length - 1, 1) * 100},${34 - (value - min) / span * 30}`).join(" ");
}

export function StockCardMarketData({ ticker, instrument, initialPrice }: { ticker: string; instrument?: Instrument; initialPrice?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [candles, setCandles] = useState<Candle[] | null>(null);
  const chain = instrument?.chain;
  const contract = instrument?.contract;

  useEffect(() => {
    if (!host.current || typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, { rootMargin: "240px" });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    let alive = true;
    async function load() {
      try {
        const exactInstrument = { chain, contract };
        const response = await queuedFetch(chartUrl(ticker, exactInstrument, "15m"));
        const body = await response.json() as { candles?: Candle[] };
        if (alive && (body.candles?.length ?? 0) >= 2) return setCandles(body.candles ?? []);
        const fallback = await queuedFetch(chartUrl(ticker, exactInstrument, "1h"));
        const fallbackBody = await fallback.json() as { candles?: Candle[] };
        if (alive) setCandles(fallbackBody.candles ?? []);
      } catch {
        if (alive) setCandles([]);
      }
    }
    void load();
    return () => { alive = false; };
  }, [active, chain, contract, ticker]);

  const last = candles?.at(-1)?.close;
  const first = candles?.[0]?.close;
  const direction = last !== undefined && first !== undefined && last >= first ? "is-up" : "is-down";
  return <div ref={host} className="stock-card-market-data">
    <div className="stock-price-pill"><small>PRICE</small><strong>{formatPrice(last ?? initialPrice)}</strong></div>
    {candles === null ? <div className="sparkline-skeleton" aria-label="Loading Bitget price history" /> : candles.length >= 2 ? <svg className={`stock-sparkline ${direction}`} viewBox="0 0 100 38" preserveAspectRatio="none" role="img" aria-label={`Bitget price movement for ${ticker}`}><polyline points={pointsFor(candles)} fill="none" vectorEffect="non-scaling-stroke" stroke="currentColor" strokeWidth="2" /></svg> : <div className="sparkline-awaiting">Open chart for live history</div>}
  </div>;
}

export function StockSparkline({ ticker, instrument }: { ticker: string; instrument?: Instrument }) {
  return <StockCardMarketData ticker={ticker} instrument={instrument} />;
}
