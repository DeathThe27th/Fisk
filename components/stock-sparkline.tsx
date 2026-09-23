"use client";

import { useEffect, useRef, useState } from "react";
import type { Candle } from "@/lib/types";

type Instrument = { chain?: string; contract?: string };
type ProviderAsset = Instrument & { latest_price?: string; status?: string };
type ProviderStock = { latest_price?: string; chain_assets?: ProviderAsset[]; contracts?: ProviderAsset[] };
let marketRequestQueue = Promise.resolve();

function queuedFetch(url: string, cache: RequestCache = "force-cache") {
  const request = marketRequestQueue.then(async () => {
    const response = await fetch(url, { cache });
    await new Promise((resolve) => setTimeout(resolve, 100));
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
  if (value === undefined || value === "") return "Quote unavailable";
  const parsed = Number(value);
  return Number.isFinite(parsed) ? `$${parsed.toLocaleString("en-US", { maximumFractionDigits: 4 })}` : String(value);
}

function providerAsset(item: ProviderStock) {
  return [...(item.chain_assets ?? []), ...(item.contracts ?? [])]
    .filter((asset) => asset.chain && asset.contract)
    .find((asset) => asset.status !== "offline");
}

function pointsFor(candles: Candle[]) {
  const closes = candles.map((candle) => candle.close);
  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const span = max - min || 1;
  return closes.map((value, index) => `${index / Math.max(closes.length - 1, 1) * 100},${34 - (value - min) / span * 30}`).join(" ");
}

export function StockCardMarketData({ ticker, instrument, initialPrice, loadHistory = true }: { ticker: string; instrument?: Instrument; initialPrice?: string; loadHistory?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [historyEnabled, setHistoryEnabled] = useState(false);
  const [candles, setCandles] = useState<Candle[] | null>(null);
  const [livePrice, setLivePrice] = useState<string | undefined>(initialPrice);
  const [resolvedInstrument, setResolvedInstrument] = useState<Instrument | undefined>(instrument?.chain && instrument.contract ? instrument : undefined);
  const [quotePending, setQuotePending] = useState(initialPrice === undefined || initialPrice === "");
  const chain = instrument?.chain;
  const contract = instrument?.contract;
  const effectiveChain = resolvedInstrument?.chain ?? chain;
  const effectiveContract = resolvedInstrument?.contract ?? contract;
  const shouldLoadHistory = loadHistory;

  useEffect(() => {
    if (!shouldLoadHistory) {
      setHistoryEnabled(false);
      return;
    }
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const constrained = connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
    setHistoryEnabled(!constrained);
  }, [shouldLoadHistory]);

  useEffect(() => {
    let alive = true;
    if (initialPrice !== undefined && initialPrice !== "") {
      setLivePrice(initialPrice);
      setQuotePending(false);
      return () => { alive = false; };
    }

    setQuotePending(true);
    async function loadQuote() {
      try {
        const response = await queuedFetch(`/api/market/rwa/${encodeURIComponent(ticker)}`, "no-store");
        if (!response.ok) throw new Error("Quote unavailable");
        const body = await response.json() as { item?: ProviderStock };
        const item = body.item;
        const asset = item ? providerAsset(item) : undefined;
        const price = item?.latest_price || asset?.latest_price;
        if (!alive) return;
        if (price) setLivePrice(price);
        if (!chain && asset?.chain && asset.contract) setResolvedInstrument({ chain: asset.chain, contract: asset.contract });
        setQuotePending(false);
      } catch {
        if (alive) setQuotePending(false);
      }
    }
    void loadQuote();
    return () => { alive = false; };
  }, [chain, initialPrice, ticker]);

  useEffect(() => {
    if (!shouldLoadHistory || !historyEnabled) return;
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
  }, [historyEnabled, shouldLoadHistory]);

  useEffect(() => {
    if (!active || !historyEnabled || !shouldLoadHistory) return;
    let alive = true;
    async function load() {
      try {
        const exactInstrument = { chain: effectiveChain, contract: effectiveContract };
        const response = await queuedFetch(chartUrl(ticker, exactInstrument, "1h"));
        if (!response.ok) throw new Error("Market history unavailable");
        const body = await response.json() as { candles?: Candle[] };
        if (alive) setCandles(body.candles ?? []);
      } catch {
        if (alive) setCandles([]);
      }
    }
    void load();
    return () => { alive = false; };
  }, [active, effectiveChain, effectiveContract, historyEnabled, shouldLoadHistory, ticker]);

  const last = candles?.at(-1)?.close;
  const first = candles?.[0]?.close;
  const direction = last !== undefined && first !== undefined && last >= first ? "is-up" : "is-down";
  const displayPrice = livePrice ?? last;
  return <div ref={host} className="stock-card-market-data">
    <div className="stock-price-pill"><small>{quotePending ? "LOADING" : "PRICE"}</small><strong>{formatPrice(displayPrice)}</strong></div>
    {!shouldLoadHistory || !historyEnabled ? <div className="sparkline-awaiting">Open chart for live history</div> : candles === null ? <div className="sparkline-skeleton" aria-label="Loading Bitget price history" /> : candles.length >= 2 ? <svg className={`stock-sparkline ${direction}`} viewBox="0 0 100 38" preserveAspectRatio="none" role="img" aria-label={`Bitget price movement for ${ticker}`}><polyline points={pointsFor(candles)} fill="none" vectorEffect="non-scaling-stroke" stroke="currentColor" strokeWidth="2" /></svg> : <div className="sparkline-awaiting">Price history unavailable</div>}
  </div>;
}

export function StockSparkline({ ticker, instrument }: { ticker: string; instrument?: Instrument }) {
  return <StockCardMarketData ticker={ticker} instrument={instrument} />;
}
