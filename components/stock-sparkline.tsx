"use client";

import { useEffect, useState } from "react";
import type { Candle } from "@/lib/types";

export function StockSparkline({ ticker }: { ticker: string }) {
  const [data, setData] = useState<Candle[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`/api/market/rwa/${ticker}/kline?period=15m&size=96`)
      .then((response) => response.json())
      .then((body) => { if (alive) setData(body.candles ?? []); })
      .catch(() => { if (alive) setData([]); });
    return () => { alive = false; };
  }, [ticker]);

  if (data === null) return <div className="stock-chart-loading" aria-label="Loading 24 hour price movement"><span>24H FLOW</span><i /><i /><i /></div>;
  if (data.length < 2) return <div className="stock-chart-unavailable"><span>24H FLOW</span><em>Price trail unavailable</em></div>;

  const closes = data.map((candle) => candle.close);
  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const span = max - min || 1;
  const points = closes.map((value, index) => `${index / (closes.length - 1) * 100},${34 - (value - min) / span * 27}`).join(" ");
  const last = closes.at(-1)!;
  const first = closes[0];
  const delta = ((last / first) - 1) * 100;
  const up = last >= first;
  const gradientId = `chart-fill-${ticker.toLowerCase()}`;
  return <div className={`stock-chart ${up ? "is-up" : "is-down"}`}>
    <div className="stock-chart-meta"><span>24H FLOW</span><b>{delta >= 0 ? "+" : ""}{delta.toFixed(1)}%</b></div>
    <svg viewBox="0 0 100 42" preserveAspectRatio="none" role="img" aria-label={`24 hour price movement ${up ? "up" : "down"}`}>
      <defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".24" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs>
      <line x1="0" y1="36" x2="100" y2="36" className="stock-chart-baseline" vectorEffect="non-scaling-stroke" />
      <polygon points={`0,42 ${points} 100,42`} fill={`url(#${gradientId})`} />
      <polyline points={points} fill="none" vectorEffect="non-scaling-stroke" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="100" cy={34 - (last - min) / span * 27} r="2.4" fill="currentColor" />
    </svg>
  </div>;
}
