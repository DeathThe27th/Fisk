"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CandlestickSeries, HistogramSeries, LineSeries, createChart, createSeriesMarkers, type UTCTimestamp } from "lightweight-charts";
import type { Candle } from "@/lib/types";

export type MarketChartPayload = { candles: Candle[]; freshness: "live" | "cached" | "delayed" | "demo"; updatedAt: string; source: string; error?: string };
type ChartInstrument = { chain?: string; contract?: string };
const ranges = [{ label: "1D", period: "5m", size: 96 }, { label: "1W", period: "1h", size: 120 }, { label: "1M", period: "4h", size: 180 }, { label: "3M", period: "1d", size: 120 }] as const;

function markerTimestamp(value?: string) {
  if (!value) return undefined;
  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) ? Math.floor(timestamp / 1000) as UTCTimestamp : undefined;
}

export function MarketChart({ ticker, instrumentLabel = ticker, instrument, initial, markerTime }: { ticker: string; instrumentLabel?: string; instrument?: ChartInstrument; initial: MarketChartPayload; markerTime?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const requestId = useRef(0);
  const [data, setData] = useState(initial);
  const [range, setRange] = useState("1W");
  const [chartType, setChartType] = useState<"line" | "candles">("line");
  const [loading, setLoading] = useState(false);
  const marker = markerTimestamp(markerTime);
  const last = data.candles.at(-1);
  const first = data.candles[0];
  const move = first && last ? ((last.close / first.close) - 1) * 100 : null;

  useEffect(() => {
    setData(initial);
    setRange("1W");
  }, [initial]);

  useEffect(() => {
    if (!container.current || !data.candles.length) return;
    const chart = createChart(container.current, {
      autoSize: true,
      layout: { background: { color: "transparent" }, textColor: "#65718b", fontFamily: "JetBrains Mono Variable", fontSize: 10 },
      grid: { vertLines: { color: "#e3e8f2" }, horzLines: { color: "#e3e8f2" } },
      rightPriceScale: { borderColor: "#d7e0f5" },
      timeScale: { borderColor: "#d7e0f5", timeVisible: true, secondsVisible: false },
      crosshair: { vertLine: { color: "#245bff", labelBackgroundColor: "#0b1b46" }, horzLine: { color: "#245bff", labelBackgroundColor: "#0b1b46" } },
    });
    const positive = (last?.close ?? 0) >= (first?.close ?? 0);
    const color = positive ? "#11875d" : "#e45d68";
    const series = chartType === "candles" ? chart.addSeries(CandlestickSeries, { upColor: "#11875d", downColor: "#e45d68", borderUpColor: "#11875d", borderDownColor: "#e45d68", wickUpColor: "#11875d", wickDownColor: "#e45d68" }) : chart.addSeries(LineSeries, { color, lineWidth: 2, crosshairMarkerRadius: 4 });
    if (chartType === "candles") series.setData(data.candles.map((candle) => ({ time: candle.time as UTCTimestamp, open: candle.open, high: candle.high, low: candle.low, close: candle.close })));
    else series.setData(data.candles.map((candle) => ({ time: candle.time as UTCTimestamp, value: candle.close })));
    const volume = data.candles.filter((candle) => typeof candle.volume === "number");
    if (volume.length) {
      const volumeSeries = chart.addSeries(HistogramSeries, { priceFormat: { type: "volume" }, color: "#b9c8e8", priceScaleId: "volume" });
      chart.priceScale("volume").applyOptions({ scaleMargins: { top: 0.82, bottom: 0 } });
      volumeSeries.setData(volume.map((candle) => ({ time: candle.time as UTCTimestamp, value: candle.volume ?? 0, color: candle.close >= candle.open ? "#b9dfd0" : "#f2c5ca" })));
    }
    if (marker && marker >= data.candles[0].time && marker <= data.candles.at(-1)!.time) createSeriesMarkers(series, [{ time: marker, position: "aboveBar", color: "#245bff", shape: "circle", text: "NEWS" }]);
    chart.timeScale().fitContent();
    return () => chart.remove();
  }, [chartType, data, first, last, marker]);

  async function changeRange(item: typeof ranges[number]) {
    const id = ++requestId.current;
    setRange(item.label);
    setLoading(true);
    try {
      const query = new URLSearchParams({ period: item.period, size: String(item.size) });
      if (instrument?.chain && instrument.contract) { query.set("chain", instrument.chain); query.set("contract", instrument.contract); }
      const response = await fetch(`/api/market/rwa/${ticker}/kline?${query.toString()}`);
      const next = await response.json() as MarketChartPayload;
      if (id === requestId.current) setData((previous) => next.candles?.length ? next : { ...previous, error: next.error || "Price history is unavailable from the current provider." });
    } catch {
      if (id === requestId.current) setData((previous) => ({ ...previous, error: "Price history is unavailable from the current provider." }));
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }

  const instrumentNote = useMemo(() => instrumentLabel === ticker ? "Underlying equity reference" : instrumentLabel, [instrumentLabel, ticker]);
  return <section className="live-chart stock-market-chart" aria-label={`${instrumentNote} price chart`}>
    <header><div><span className="chart-eyebrow">PRICE HISTORY · {instrumentNote}</span><strong>{last ? `$${last.close.toLocaleString("en-US", { maximumFractionDigits: 4 })}` : "Price unavailable"}</strong><b className={move !== null && move >= 0 ? "is-positive" : "is-negative"}>{move === null ? "No movement" : `${move >= 0 ? "+" : ""}${move.toFixed(2)}% in view`}</b></div><div className="chart-view-controls"><div className="chart-segmented" aria-label="Chart view"><button type="button" className={chartType === "line" ? "active" : ""} onClick={() => setChartType("line")}>Line</button><button type="button" className={chartType === "candles" ? "active" : ""} onClick={() => setChartType("candles")}>Candles</button></div><div className="chart-controls" aria-label="Chart range">{ranges.map((item) => <button type="button" className={range === item.label ? "active" : ""} disabled={loading} onClick={() => void changeRange(item)} key={item.label}>{item.label}</button>)}</div></div></header>
    {data.candles.length ? <div ref={container} className="chart-canvas" aria-label={`${instrumentNote} ${chartType} chart. ${data.candles.length} observations.`} /> : <div className="chart-unavailable"><strong>Price history unavailable</strong><span>{data.error || "Bitget did not return usable candles for this instrument."}</span></div>}
    <footer><span>{data.source}</span><span>{data.freshness} · Updated {new Date(data.updatedAt).toLocaleString()}</span>{data.error && <span className="provider-note">Last successful data preserved</span>}</footer>
  </section>;
}
