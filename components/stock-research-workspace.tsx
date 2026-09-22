"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Bookmark, Check, ExternalLink, FileText, MessageCircle, Newspaper, ShieldCheck } from "lucide-react";
import { useAuth } from "@/components/auth-context";
import { MarketChart, type MarketChartPayload } from "@/components/market-chart";
import { StockChat } from "@/components/stock-chat";
import { tickerMonogram } from "@/lib/stocks";
import type { NewsItem } from "@/lib/types";

export type StockWorkspaceInstrument = {
  symbol?: string;
  dataSource?: string;
  productType?: "rtoken" | "ondo-token" | "reality" | string;
  chain?: string;
  contract?: string;
  latestPrice?: string;
  absoluteChange?: string;
  percentageChange?: string;
  marketStatus?: string;
  marketStatusTitle?: string;
};

type Filing = { id: string; form: string; filedAt: string; title?: string; sourceUrl: string };

export type StockResearchWorkspaceProps = {
  ticker: string;
  companyName: string;
  logoPath: string;
  instrument: StockWorkspaceInstrument | null;
  price?: string;
  absoluteChange?: string;
  percentageChange?: string;
  marketStatus?: string;
  updatedAt: string;
  chart: MarketChartPayload;
  news: NewsItem[];
  newsError?: string | null;
  filings: Filing[];
  tradeUrl: string;
  initialQuestion?: string;
};

function formatPrice(value?: string) {
  if (!value) return "Price unavailable";
  const parsed = Number(value);
  return Number.isFinite(parsed) ? `$${parsed.toLocaleString("en-US", { maximumFractionDigits: 4 })}` : value;
}

function formatChange(value?: string) {
  if (!value) return "Change unavailable";
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return value;
  const percent = Math.abs(parsed) <= 1 ? parsed * 100 : parsed;
  return `${percent >= 0 ? "+" : ""}${percent.toFixed(2)}%`;
}

function formatAbsoluteChange(value?: string) {
  if (!value) return "Absolute change unavailable";
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return value;
  return `${parsed >= 0 ? "+" : "-"}$${Math.abs(parsed).toLocaleString("en-US", { maximumFractionDigits: 4 })}`;
}

function productLabel(instrument: StockWorkspaceInstrument | null) {
  if (!instrument) return "Underlying equity reference";
  if (instrument.productType === "ondo-token") return "Ondo stock token";
  if (instrument.productType === "reality") return "Reality rToken";
  return "RWA stock token";
}

function Logo({ companyName, ticker, src, large = false }: { companyName: string; ticker: string; src: string; large?: boolean }) {
  const [failed, setFailed] = useState(!src);
  return <div className={`stock-logo ${large ? "stock-logo-large" : ""}`}>
    {!failed ? <img src={src} alt={`${companyName} logo`} onError={() => setFailed(true)} /> : <span aria-label={`${companyName} monogram`}>{tickerMonogram(ticker)}</span>}
  </div>;
}

function AskButton({ prompt, children }: { prompt: string; children: React.ReactNode }) {
  return <button type="button" className="stock-ask-button" onClick={() => window.dispatchEvent(new CustomEvent("fisk:stock-chat", { detail: prompt }))}>{children}</button>;
}

export function StockResearchWorkspace({ ticker, companyName, logoPath, instrument, price, absoluteChange, percentageChange, marketStatus, updatedAt, chart, news, newsError, filings, tradeUrl, initialQuestion = "" }: StockResearchWorkspaceProps) {
  const { authenticated, login, getAccessToken } = useAuth();
  const [selectedId, setSelectedId] = useState(news[0]?.id ?? "");
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const selectedNews = useMemo(() => news.find((item) => item.id === selectedId) ?? news[0] ?? null, [news, selectedId]);
  const relatedNews = useMemo(() => news.filter((item) => item.id !== selectedNews?.id).slice(0, 4), [news, selectedNews]);
  const instrumentName = instrument?.symbol ?? ticker;
  const marketLabel = productLabel(instrument);
  const context = `Company: ${companyName} (${ticker}). Bitget instrument: ${instrumentName}. Product type: ${marketLabel}. Price source: ${chart.source}. Current price: ${formatPrice(price)}. Chart interval: 1h.${selectedNews ? ` Selected story: ${selectedNews.headline} (${selectedNews.sourceUrl}).` : ""}`;
  const SaveIcon = saved ? Check : Bookmark;

  async function toggleSaved() {
    if (!authenticated) {
      login();
      return;
    }
    setSaveError("");
    try {
      const token = await getAccessToken();
      const response = await fetch("/api/watchlist", {
        method: saved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ ticker, asset_type: "stock" }),
      });
      if (!response.ok) throw new Error((await response.json()).error || "Could not update your watchlist.");
      setSaved((value) => !value);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Could not update your watchlist.");
    }
  }

  return <main className="stock-research-page">
    <header className="stock-research-nav">
      <Link href="/desk" className="stock-back-link"><ArrowLeft size={15} /> Back to Desk</Link>
      <span className="stock-nav-title">Fisk · AI Market Intelligence</span>
      <Link href="/watchlist" className="stock-nav-link">Watchlist</Link>
    </header>

    <div className="stock-research-shell">
      <section className="stock-market-hero" aria-labelledby="stock-workspace-title">
        <div className="stock-market-identity"><Logo companyName={companyName} ticker={ticker} src={logoPath} large /><div><h1 id="stock-workspace-title">{companyName}</h1><p><strong>{ticker}</strong><span>·</span><span>{instrumentName}</span><span>·</span><span>{marketLabel}</span></p></div></div>
        <div className="stock-market-quote"><span>Current market view</span><strong>{formatPrice(price ?? instrument?.latestPrice)}</strong><div><b className={Number(percentageChange ?? instrument?.percentageChange ?? "0") >= 0 ? "is-positive" : "is-negative"}>{formatChange(percentageChange ?? instrument?.percentageChange)}</b><span>{formatAbsoluteChange(absoluteChange ?? instrument?.absoluteChange)}</span><span>{marketStatus ?? instrument?.marketStatusTitle ?? "Status unavailable"}</span></div></div>
        <div className="stock-market-actions"><button type="button" className={`stock-save-button ${saved ? "is-saved" : ""}`} onClick={toggleSaved} aria-pressed={saved}><SaveIcon size={16} /> {saved ? "Saved" : "Save"}</button><a className="stock-trade-button" href={tradeUrl} target="_blank" rel="noreferrer">Trade on Bitget <ArrowUpRight size={16} /></a>{saveError && <span className="stock-save-error" role="alert">{saveError}</span>}</div>
        <div className="stock-market-meta"><span>{instrument ? `Instrument ${instrumentName} · ${instrument.dataSource ?? "Bitget RWA"}` : "No verified Bitget instrument mapping returned"}</span><span>Updated {new Date(updatedAt).toLocaleString()}</span></div>
      </section>

      <section className="stock-talk-bento" aria-labelledby="stock-talk-title">
        <div className="stock-talk-icon"><MessageCircle size={20} /></div><div><h2 id="stock-talk-title">Talk about {companyName}</h2><p>Ask Fisk to connect this instrument to reporting, filings, counter-evidence and your own thesis. Fisk researches; you decide.</p></div><div className="stock-starter-prompts"><AskButton prompt={`What changed today for ${companyName}?`}>What changed today?</AskButton><AskButton prompt={`Build the bull and bear case for ${companyName} on ${instrumentName}.`}>Bull / bear case</AskButton><AskButton prompt={`Stress-test my thesis on ${companyName} and ${instrumentName}.`}>Stress-test my thesis</AskButton><AskButton prompt={`How could the selected news affect ${instrumentName}?`}>News impact</AskButton></div>
      </section>

      <section className="stock-main-bento" aria-label={`${companyName} lead story and chart`}>
        <article className="stock-lead-story">
          <header><span>Selected reporting</span>{selectedNews && <span>{selectedNews.source} · {new Date(selectedNews.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>}</header>
          {selectedNews?.imageUrl ? <img className="stock-lead-image" src={selectedNews.imageUrl} alt="" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement?.classList.add("has-image-fallback"); }} /> : <div className="stock-lead-image stock-image-fallback"><Newspaper size={28} /><span>{newsError ? "News image unavailable" : "Source image unavailable"}</span></div>}
          {selectedNews ? <div className="stock-lead-copy"><h2>{selectedNews.headline}</h2><p>{selectedNews.summary || selectedNews.impact}</p><div><a href={selectedNews.sourceUrl} target="_blank" rel="noreferrer">Read original <ExternalLink size={14} /></a><AskButton prompt={`Analyze this story for ${companyName} and ${instrumentName}: ${selectedNews.headline}. Source: ${selectedNews.sourceUrl}`}>Ask Fisk about this story</AskButton></div></div> : <div className="stock-lead-copy"><h2>No validated reporting yet.</h2><p>{newsError || "The news provider did not return a story for this company."}</p></div>}
        </article>
        <div className="stock-chart-bento"><MarketChart ticker={ticker} instrumentLabel={instrumentName} instrument={instrument ? { chain: instrument.chain, contract: instrument.contract } : undefined} initial={chart} markerTime={selectedNews?.publishedAt} /></div>
      </section>

      <section className="stock-related-section" aria-labelledby="stock-related-title"><header><div><span>More from the reporting feed</span><h2 id="stock-related-title">Keep the context close.</h2></div><span>{news.length} validated {news.length === 1 ? "story" : "stories"}</span></header>{relatedNews.length ? <div className="stock-news-grid">{relatedNews.map((item) => <button type="button" className={`stock-news-card ${item.id === selectedNews?.id ? "is-selected" : ""}`} key={item.id} onClick={() => setSelectedId(item.id)}><div className="stock-news-card-image">{item.imageUrl ? <img src={item.imageUrl} alt="" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement?.classList.add("is-fallback"); }} /> : <Newspaper size={20} />}</div><div><span>{item.source} · {new Date(item.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span><h3>{item.headline}</h3><p>{item.summary || item.impact}</p></div></button>)}</div> : <div className="stock-empty-news"><Newspaper size={19} /><p>{newsError || "More company reporting will appear when the provider responds."}</p></div>}</section>

      <section className="stock-support-grid"><article className="stock-support-panel"><header><div><span>Primary evidence</span><h2>Official filings</h2></div><span>SEC EDGAR</span></header>{filings.length ? filings.slice(0, 6).map((filing) => <a className="stock-filing-row" href={filing.sourceUrl} target="_blank" rel="noreferrer" key={filing.id}><b>{filing.form}</b><span>{filing.title || "Company filing"}</span><small>{filing.filedAt.slice(0, 10)}</small><ExternalLink size={13} /></a>) : <p className="stock-support-empty"><FileText size={18} /> No recent filings available for this ticker.</p>}</article><article className="stock-support-panel stock-decision-panel"><header><div><span>Decision boundary</span><h2>Evidence stays attached.</h2></div><ShieldCheck size={20} /></header><p>Fisk keeps the company, instrument, source and freshness visible so a market view never gets mistaken for certainty.</p><dl><div><dt>Chart source</dt><dd>{chart.source}</dd></div><div><dt>Instrument</dt><dd>{instrumentName}</dd></div><div><dt>Data state</dt><dd>{chart.freshness}</dd></div></dl></article></section>
    </div>
    <StockChat ticker={ticker} companyName={companyName} initialQuestion={initialQuestion} context={context} />
  </main>;
}
