"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Bookmark, Check, ExternalLink, Search, X } from "lucide-react";
import { useAuth } from "@/components/auth-context";
import { FiskAvatar } from "@/components/fisk-cat";
import { FiskCornerCameo } from "@/components/fisk-corner-cameo";
import { PromptInput } from "@/components/ui/ai-chat-input";
import HoverRevealCards, { type CardItem } from "@/components/ui/cards";
import { StockSparkline } from "@/components/stock-sparkline";
import { StockArtwork } from "@/components/stock-artwork";
import { StockOverlay } from "@/components/stock-overlay";
import type { Evidence, ResearchResult } from "@/lib/types";

export type DiscoveryStock = { ticker: string; name: string; sector: string; icon?: string; price?: string; change?: string; freshness?: string };
const filters = ["All", "Technology", "Finance", "Consumer", "Healthcare", "Energy", "Crypto-linked"];
const tickerFrom = (value: string) => value.toUpperCase().match(/\b(?:NVDA|AAPL|MSFT|GOOGL|AMZN|META|TSLA|AMD|INTC|NFLX|JPM|BAC|V|MA|KO|WMT|PFE|XOM|CVX|COIN)\b/)?.[0];

export function DeskWorkspace({ initialQuestion, initialStock, stocks }: { initialQuestion: string; initialStock?: string; stocks: DiscoveryStock[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [saved, setSaved] = useState<string[]>([]);
  const [panel, setPanel] = useState(false);
  const [activeStock, setActiveStock] = useState(initialStock ?? "");
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [question, setQuestion] = useState(initialQuestion);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const { authenticated, getAccessToken } = useAuth();
  const started = useRef(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const visible = useMemo(() => stocks.filter((stock) => (
    (filter === "All" || stock.sector === filter)
    && (stock.ticker.includes(query.toUpperCase()) || stock.name.toLowerCase().includes(query.toLowerCase()))
  )), [stocks, filter, query]);
  const cardItems = useMemo<CardItem[]>(() => visible.map((stock) => ({ id: stock.ticker, title: stock.name, subtitle: stock.ticker, imageUrl: stock.icon ?? "" })), [visible]);

  const research = useCallback(async (value: string, meta: { attachments: File[] }) => {
    const next = value.trim();
    if (next.length < 3) {
      setError("Name a company, ticker, or market question so Fisk knows where to look.");
      return;
    }
    const ticker = tickerFrom(next);
    if (ticker && next.split(/\s+/).length <= 2) {
      window.location.assign(`/stock/${ticker}?q=${encodeURIComponent(next)}`);
      return;
    }
    setPanel(true);
    setQuestion(next);
    setLoading(true);
    setError(meta.attachments.length ? "Attachments stay on this device for now; this pass uses your written question." : "");
    try {
      const token = authenticated ? await getAccessToken() : null;
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ query: next, ticker: ticker ?? "NVDA" }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Research failed");
      setResult(body.result);
    } catch (value) {
      setResult(null);
      setError(value instanceof Error ? value.message : "Research is unavailable right now.");
    } finally {
      setLoading(false);
    }
  }, [authenticated, getAccessToken]);

  useEffect(() => {
    if (initialQuestion && !started.current) {
      started.current = true;
      void research(initialQuestion, { attachments: [] });
    }
  }, [initialQuestion, research]);

  const openStock = (ticker: string) => {
    setActiveStock(ticker);
    history.pushState({ stock: ticker, fromDesk: true }, "", `/desk?stock=${ticker}`);
  };
  const closeStock = useCallback(() => {
    if (history.state?.fromDesk) history.back();
    else {
      setActiveStock("");
      history.replaceState({}, "", "/desk");
    }
  }, []);

  useEffect(() => {
    const pop = () => setActiveStock(new URLSearchParams(location.search).get("stock") ?? "");
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);

  return <>
    <div className="discovery-layout">
      <div className="discovery-main">
        <section className="desk-discovery-hero" aria-labelledby="desk-hero-title">
          <div className="desk-discovery-copy">
            <h1 id="desk-hero-title">Find your next<br />stock.</h1>
            <p>Your world. Your stocks. Start with a name, then follow the paper trail, market context, and the question underneath.</p>
            <button type="button" onClick={() => searchRef.current?.focus()}>Explore stocks <Search size={15} /></button>
          </div>
          <div className="desk-hero-field" aria-hidden="true">
            {stocks.slice(0, 3).map((stock, index) => <div className={`desk-hero-stock is-${index + 1}`} key={stock.ticker}><StockArtwork ticker={stock.ticker} name={stock.name} icon={stock.icon} /><b>{stock.ticker}</b></div>)}
            <i /><i /><i />
          </div>
        </section>

        <section className="stock-discovery" aria-labelledby="stock-discovery-title">
          <header>
            <div><h2 id="stock-discovery-title">Stocks on the desk</h2><p>{stocks.length} companies ready for a closer look.</p></div>
            <label className="stock-search"><Search size={18} /><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a stock" aria-label="Search stocks" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={16} /></button>}</label>
          </header>
          <div className="stock-filters" aria-label="Filter stocks by sector">{filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
          {visible.length ? <HoverRevealCards items={cardItems} bare className="stock-card-grid" cardClassName="stock-card-reveal" renderItem={(item, revealClassName) => {
            const stock = visible.find((candidate) => candidate.ticker === item.id);
            if (!stock) return null;
            return <motion.article key={stock.ticker} role="listitem" aria-label={`${stock.name}, ${stock.ticker}`} tabIndex={0} data-ticker={stock.ticker} className={`${revealClassName} stock-card-reveal`} variants={{ hidden: { opacity: .55, y: 10 }, show: { opacity: 1, y: 0 } }}>
              <button className="stock-card-link" onClick={() => openStock(stock.ticker)} aria-label={`Open ${stock.name} research`}>
                <div className="stock-card-visual">
                  <div className="stock-card-atmosphere" aria-hidden="true" />
                  <StockArtwork ticker={stock.ticker} name={stock.name} icon={stock.icon} />
                  <div className="stock-card-overlay" aria-hidden="true" />
                  <div className="stock-card-topline"><span className="stock-card-sector">{stock.sector}</span><span className="stock-price-pill"><small>{stock.price ? "PRICE" : "PRICE PENDING"}</small><strong>{stock.price ?? "Loading…"}</strong></span></div>
                  <div className="stock-card-identity"><b>{stock.ticker}</b><span>{stock.name}</span></div>
                </div>
                <div className="stock-card-lower"><div className="stock-card-copy"><div><b>{stock.ticker}</b><span>{stock.name}</span></div><StockSparkline ticker={stock.ticker} /></div></div>
              </button>
              <button className={`stock-save ${saved.includes(stock.ticker) ? "is-saved" : ""}`} onClick={() => setSaved((items) => items.includes(stock.ticker) ? items.filter((item) => item !== stock.ticker) : [...items, stock.ticker])} aria-label={`${saved.includes(stock.ticker) ? "Remove" : "Save"} ${stock.ticker}`} aria-pressed={saved.includes(stock.ticker)}>{saved.includes(stock.ticker) ? <Check size={17} /> : <Bookmark size={17} />}</button>
              <footer><span>{stock.freshness ?? "Provider data"}</span><span className="stock-open-label">Open stock <ArrowUpRight size={11} /></span></footer>
            </motion.article>;
          }} /> : <div className="stock-empty"><FiskAvatar state="curious" large /><h3>No paw prints here.</h3><p>Try another ticker, company name, or sector.</p><button type="button" onClick={() => { setQuery(""); setFilter("All"); }}>Reset search</button></div>}
        </section>
      </div>
    </div>

    <AnimatePresence initial={false}>
      {panel ? <motion.aside key="fisk-conversation" layoutId="fisk-chat-shell" className="fisk-conversation" initial={{ opacity: 0, scale: .12, transformOrigin: "bottom right", y: 36 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .12, transformOrigin: "bottom right", y: 36 }} transition={{ type: "spring", stiffness: 260, damping: 26 }}>
        <header><FiskAvatar state={loading ? "analysing" : result ? "success" : "idle"} /><div><strong>Ask Fisk</strong><span>{loading ? "Researching sources…" : "Evidence first. Your call."}</span></div><button type="button" onClick={() => setPanel(false)} aria-label="Close Fisk conversation"><X size={18} /></button></header>
        <div className="fisk-thread">{!result && !loading && <div className="fisk-welcome"><h2>What caught your eye?</h2><p>Name a company or pressure-test a thesis. I’ll check the reporting, filings, price context, and evidence on the other side.</p></div>}{loading && <div className="fisk-loading" role="status"><FiskAvatar state="analysing" large /><p>Researching sources…</p><span>Checking reporting, filings, and counter-evidence.</span></div>}{result && <><div className="fisk-question">{question}</div><article><h2>{result.directAnswer}</h2><p>{result.thesis}</p><h3>Key findings</h3>{result.keyFindings.slice(0, 4).map((item) => <p key={item.claim}>{item.claim}</p>)}<div className="fisk-citations">{result.evidence.slice(0, 5).map((item) => <button type="button" key={item.id} onClick={() => setSelectedEvidence(item)}>{item.provider}<ExternalLink size={12} /></button>)}</div><h3>What would invalidate this?</h3>{result.invalidationConditions.map((item) => <p key={item}>{item}</p>)}</article></>}{error && <p className="fisk-error" role="alert">{error}</p>}</div>
        <PromptInput onSubmit={research} disabled={loading} placeholder="Ask about a company or thesis…" />
      </motion.aside> : <motion.div key="fisk-launcher" layoutId="fisk-chat-shell" className="fisk-chat-launcher" initial={{ opacity: 0, scale: .7, transformOrigin: "bottom right" }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .12, transformOrigin: "bottom right" }} transition={{ type: "spring", stiffness: 260, damping: 26 }}><FiskCornerCameo className="is-staged" onActivate={() => setPanel(true)} label="Ask Fisk" ariaLabel="Open Fisk conversation" /></motion.div>}
    </AnimatePresence>
    {selectedEvidence && <div className="evidence-modal" role="dialog" aria-modal="true" aria-label="Research evidence"><button className="evidence-backdrop" onClick={() => setSelectedEvidence(null)} aria-label="Close evidence" /><article><header><span>{selectedEvidence.provider} · {selectedEvidence.freshness}</span><button type="button" onClick={() => setSelectedEvidence(null)} aria-label="Close"><X size={19} /></button></header><h2>{selectedEvidence.title}</h2><p>{selectedEvidence.summary}</p><a href={selectedEvidence.sourceUrl} target="_blank" rel="noreferrer">Open original source <ExternalLink size={14} /></a></article></div>}
    {activeStock && <StockOverlay ticker={activeStock} onClose={closeStock} />}
  </>;
}
