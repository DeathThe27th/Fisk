"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Bookmark, Check, FileText, LoaderCircle, Plus, RefreshCw, Settings2, Sparkles, Trash2 } from "lucide-react";
import { useAuth as usePrivy } from "@/components/auth-context";
import { FiskAvatar } from "@/components/fisk-cat";
import { StockCardMarketData } from "@/components/stock-sparkline";
import { readApiResponse } from "@/lib/client-api";
import { getStockDefinition } from "@/lib/stocks";

type Mode = "watchlist" | "journal" | "settings";
type PersonalItem = Record<string, unknown>;
type Decision = "watching" | "bullish" | "bearish" | "no-action";

const interests = ["AI & semiconductors", "Crypto & exchanges", "Consumer technology", "Finance & fintech", "Energy & industrials", "Everyday brands"];
const previewStocks = ["NVDA", "AAPL", "COIN"];

function stringValue(item: PersonalItem, key: string, fallback = "") {
  const value = item[key];
  return typeof value === "string" ? value : fallback;
}

function dateLabel(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function stockLabel(ticker: string) {
  const stock = getStockDefinition(ticker);
  return stock ? { name: stock.companyName, logo: stock.logoPath } : { name: ticker, logo: "" };
}

function Nav({ mode }: { mode: Mode }) {
  return <nav className="personal-nav" aria-label="Your research space">
    <Link className={mode === "watchlist" ? "is-active" : ""} href="/watchlist"><Bookmark size={15} /> Watchlist</Link>
    <Link className={mode === "journal" ? "is-active" : ""} href="/journal"><FileText size={15} /> Journal</Link>
    <Link className={mode === "settings" ? "is-active" : ""} href="/settings"><Settings2 size={15} /> Preferences</Link>
  </nav>;
}

function Preview({ mode, login }: { mode: Mode; login: () => void }) {
  const titles = {
    watchlist: "Keep the names worth another look close.",
    journal: "Make the decision explicit before the market makes it for you.",
    settings: "Give Fisk a better starting point for every research pass.",
  };
  const descriptions = {
    watchlist: "Build a private field of companies and tokenized counterparts. Open any name for live reporting, filings, and the exact instrument context.",
    journal: "A decision journal turns a passing opinion into something you can revisit: thesis, confidence, horizon, and the condition that would change your mind.",
    settings: "Choose the sectors and decision horizon that should shape your starting context. Fisk will still show the evidence and disagreement.",
  };
  return <section className="personal-public-state">
    <div className="personal-public-copy"><FiskAvatar state="curious" large /><h2>{titles[mode]}</h2><p>{descriptions[mode]}</p><button className="personal-primary-action" type="button" onClick={login}>Sign in to make it yours <ArrowUpRight size={16} /></button><span className="personal-public-note">Public market exploration stays open. Sign in only when you want Fisk to remember.</span></div>
    {mode === "watchlist" ? <div className="public-market-preview"><div className="personal-section-title"><div><h2>A useful field starts here.</h2><p>Open a company now, then save it when you are ready.</p></div><Link href="/desk">Browse all markets <ArrowUpRight size={15} /></Link></div><div className="public-preview-grid">{previewStocks.map((ticker) => { const stock = stockLabel(ticker); return <Link className="public-stock-preview" href={`/stock/${ticker}`} key={ticker}><div className="public-stock-logo">{stock.logo ? <img src={stock.logo} alt="" /> : ticker.slice(0, 2)}</div><div><strong>{ticker}</strong><span>{stock.name}</span><small>Open live research <ArrowUpRight size={12} /></small></div></Link>; })}</div></div> : <div className="personal-structure-preview"><div className="structure-row"><span className="structure-icon"><FileText size={16} /></span><div><strong>{mode === "journal" ? "A decision, not a prediction" : "Your research lens"}</strong><p>{mode === "journal" ? "Thesis · confidence · invalidation · review date" : "Sectors · horizon · experience · risk tolerance"}</p></div><span className="structure-line" /></div><div className="structure-row"><span className="structure-icon"><Sparkles size={16} /></span><div><strong>Evidence stays attached</strong><p>Fisk keeps sources, freshness, and uncertainty visible.</p></div><span className="structure-line" /></div><div className="structure-row"><span className="structure-icon"><Bookmark size={16} /></span><div><strong>Private by default</strong><p>Your saved context belongs to your account.</p></div><span className="structure-line" /></div></div>}
  </section>;
}

export function PersonalSpace({ mode }: { mode: Mode }) {
  const { ready, authenticated, login, getAccessToken } = usePrivy();
  const [items, setItems] = useState<PersonalItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [ticker, setTicker] = useState("");
  const [assetType, setAssetType] = useState<"equity" | "rtoken">("equity");
  const [selected, setSelected] = useState<string[]>(["AI & semiconductors"]);
  const [decision, setDecision] = useState<Decision>("watching");
  const [confidence, setConfidence] = useState("medium");
  const [horizon, setHorizon] = useState("swing");

  const load = useCallback(async () => {
    if (!authenticated) return;
    setLoading(true);
    setError("");
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Your sign-in session is not ready. Please try again.");
      const response = await fetch(`/api/${mode === "settings" ? "preferences" : mode}`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
      const body = await readApiResponse<{ items?: PersonalItem[]; preferences?: PersonalItem | null }>(response, `Could not load your ${mode}.`);
      setItems(mode === "settings" ? (body.preferences ? [body.preferences] : []) : body.items ?? []);
      if (mode === "settings" && body.preferences) {
        const sectors = body.preferences.sectors;
        if (Array.isArray(sectors)) setSelected(sectors.filter((value): value is string => typeof value === "string"));
        if (typeof body.preferences.horizon === "string") setHorizon(body.preferences.horizon);
      }
    } catch (value) {
      setError(value instanceof Error ? value.message : `Could not load your ${mode}.`);
    } finally {
      setLoading(false);
    }
  }, [authenticated, getAccessToken, mode]);

  useEffect(() => { void load(); }, [load]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Your sign-in session is not ready. Please try again.");
      const form = new FormData(event.currentTarget);
      let body: Record<string, unknown>;
      if (mode === "watchlist") body = { ticker: String(form.get("ticker") ?? "").trim(), asset_type: form.get("asset_type") };
      else if (mode === "journal") body = { ticker: String(form.get("ticker") ?? "").trim(), decision: form.get("decision"), thesis: form.get("thesis"), confidence: form.get("confidence"), invalidation: form.get("invalidation"), horizon: form.get("horizon") };
      else body = { sectors: selected, risk_tolerance: form.get("risk_tolerance"), horizon: form.get("horizon"), experience_level: form.get("experience_level"), default_view: "desk" };
      const response = await fetch(`/api/${mode === "settings" ? "preferences" : mode}`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(body) });
      const result = await readApiResponse<{ item?: PersonalItem; preferences?: PersonalItem }>(response, `Could not save your ${mode}.`);
      setMessage(mode === "journal" ? "Decision recorded. Revisit it when the evidence changes." : mode === "watchlist" ? "Added to your market field." : "Preferences updated.");
      if (mode === "journal" && result.item) setItems((previous) => [result.item!, ...previous]);
      if (mode === "watchlist" && result.item) setItems((previous) => [result.item!, ...previous.filter((item) => !(stringValue(item, "ticker") === stringValue(result.item!, "ticker") && stringValue(item, "asset_type") === stringValue(result.item!, "asset_type")))]);
      if (mode === "settings" && result.preferences) setItems([result.preferences]);
      if (mode === "watchlist") { setTicker(""); setAssetType("equity"); }
      if (mode === "journal") event.currentTarget.reset();
    } catch (value) {
      setError(value instanceof Error ? value.message : `Could not save your ${mode}.`);
    } finally {
      setSaving(false);
    }
  }

  async function removeWatchlist(item: PersonalItem) {
    setError("");
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Your sign-in session is not ready. Please try again.");
      const response = await fetch("/api/watchlist", { method: "DELETE", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ ticker: stringValue(item, "ticker"), asset_type: stringValue(item, "asset_type", "equity") }) });
      await readApiResponse(response, "Could not remove that instrument.");
      setItems((previous) => previous.filter((candidate) => candidate !== item));
      setMessage("Removed from your market field.");
    } catch (value) {
      setError(value instanceof Error ? value.message : "Could not remove that instrument.");
    }
  }

  const title = mode === "watchlist" ? "Your market field" : mode === "journal" ? "Decision journal" : "Research preferences";
  const description = mode === "watchlist" ? "A small, deliberate list of names you want to keep in motion." : mode === "journal" ? "Record the thesis, the confidence, and the thing that would change your mind." : "Set the context Fisk should bring to the next question.";
  const countLabel = mode === "watchlist" ? `${items.length} saved ${items.length === 1 ? "instrument" : "instruments"}` : mode === "journal" ? `${items.length} recorded ${items.length === 1 ? "decision" : "decisions"}` : "Private to your account";
  const watchlistItems = useMemo(() => items.map((item) => ({ item, ticker: stringValue(item, "ticker", "—"), ...stockLabel(stringValue(item, "ticker")) })), [items]);

  if (!ready) return <div className="account-loading"><LoaderCircle className="spin" size={20} /> Loading your research space…</div>;
  return <div className="personal-page">
    <div className="personal-heading"><div><h1>{title}</h1><p>{description}</p></div><div className="personal-heading-actions"><Link className="personal-secondary-action" href="/desk">Open research desk <ArrowUpRight size={15} /></Link>{authenticated ? <span className="personal-account-state"><Check size={14} /> Synced to your account</span> : <button className="personal-primary-action" type="button" onClick={login}>Sign in to save <ArrowUpRight size={15} /></button>}</div></div>
    <div className="personal-page-grid"><Nav mode={mode} /><div className="personal-content">
      {!authenticated ? <Preview mode={mode} login={login} /> : <>
        <div className="personal-status-row"><span>{countLabel}</span>{loading && <span><LoaderCircle className="spin" size={13} /> Updating</span>}{error && <button type="button" onClick={() => void load()}><RefreshCw size={13} /> Try again</button>}</div>
        {error && <div className="personal-error" role="alert">{error}</div>}
        {message && mode === "watchlist" && <div className="personal-success" role="status"><Check size={14} /> {message}</div>}
        {mode === "watchlist" && <>
          <form className="personal-add-bar" onSubmit={submit}><div><Plus size={18} /><label htmlFor="watchlist-ticker">Add to your field</label><input id="watchlist-ticker" name="ticker" value={ticker} onChange={(event) => setTicker(event.target.value.toUpperCase())} placeholder="Ticker e.g. NVDA" required pattern="[A-Za-z.]{1,8}" /></div><select name="asset_type" value={assetType} onChange={(event) => setAssetType(event.target.value as "equity" | "rtoken")} aria-label="Asset type"><option value="equity">Underlying equity</option><option value="rtoken">rToken</option></select><button className="personal-primary-action" type="submit" disabled={saving}>{saving ? <LoaderCircle className="spin" size={15} /> : <Plus size={15} />} Save name</button></form>
          <div className="personal-section-title"><div><h2>Market field</h2><p>Every name stays one click from its reporting, filings, and market context.</p></div><Link href="/desk">Find another name <ArrowUpRight size={15} /></Link></div>
          {watchlistItems.length ? <div className="personal-watch-grid">{watchlistItems.map(({ item, ticker: symbol, name, logo }) => <article className="personal-watch-card" key={String(item.id ?? `${symbol}-${stringValue(item, "asset_type")}`)}><Link href={`/stock/${encodeURIComponent(symbol)}`} className="personal-watch-main"><div className="personal-watch-logo">{logo ? <img src={logo} alt={`${name} logo`} /> : <span>{symbol.slice(0, 2)}</span>}</div><div><span className="personal-watch-ticker">{symbol}</span><h3>{name}</h3><small>{stringValue(item, "asset_type") === "rtoken" ? "rToken" : "Underlying equity"}</small></div><ArrowUpRight size={16} /></Link><StockCardMarketData ticker={symbol} /><footer><span>Open market view for current sources</span><button type="button" onClick={() => void removeWatchlist(item)} aria-label={`Remove ${symbol} from watchlist`}><Trash2 size={14} /> Remove</button></footer></article>)}</div> : <div className="personal-empty"><Bookmark size={22} /><h2>Your field is quiet.</h2><p>Add a ticker above, then use the market view to ask Fisk about what changed.</p><Link className="personal-secondary-action" href="/desk">Browse the market directory <ArrowUpRight size={15} /></Link></div>}
        </>}
        {mode === "journal" && <>
          <form className="journal-compose" onSubmit={submit}><div className="journal-compose-heading"><div><h2>Record a decision</h2><p>Write it while the evidence is fresh. This is a record, not a trade ticket.</p></div><FileText size={22} /></div><div className="journal-form-grid"><label>Ticker<input name="ticker" defaultValue="NVDA" required pattern="[A-Za-z.]{1,8}" /></label><label>Decision<select name="decision" value={decision} onChange={(event) => setDecision(event.target.value as Decision)}><option value="watching">Watching</option><option value="bullish">Bullish</option><option value="bearish">Bearish</option><option value="no-action">No action</option></select></label><label className="journal-wide">Your thesis<textarea name="thesis" placeholder="What do you believe, and what evidence is doing the work?" required minLength={8} /></label><label className="journal-wide">What would invalidate it?<textarea name="invalidation" placeholder="Name an observable condition, not a feeling." required minLength={3} /></label><label>Confidence<select name="confidence" value={confidence} onChange={(event) => setConfidence(event.target.value)}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></label><label>Review horizon<select name="horizon" value={horizon} onChange={(event) => setHorizon(event.target.value)}><option value="intraday">Intraday</option><option value="swing">Swing</option><option value="long-term">Long-term</option></select></label></div><footer><span>{message || "Fisk will keep the original record attached to your account."}</span><button className="personal-primary-action" type="submit" disabled={saving}>{saving ? <LoaderCircle className="spin" size={15} /> : <FileText size={15} />} Record decision</button></footer></form>
          <div className="personal-section-title"><div><h2>Decision history</h2><p>Read old conviction beside the condition that could undo it.</p></div></div>
          {items.length ? <div className="journal-list">{items.map((item, index) => { const symbol = stringValue(item, "ticker", "—"); const stock = stockLabel(symbol); return <article className="journal-entry" key={String(item.id ?? index)}><header><div className="journal-entry-title"><span className="personal-watch-logo">{stock.logo ? <img src={stock.logo} alt="" /> : symbol.slice(0, 2)}</span><div><strong>{symbol}</strong><span>{stock.name}</span></div></div><span className={`decision-pill is-${stringValue(item, "decision", "watching")}`}>{stringValue(item, "decision", "watching").replace("no-action", "no action")}</span></header><p className="journal-thesis">{stringValue(item, "thesis", "No thesis recorded.")}</p><div className="journal-entry-grid"><div><small>Confidence</small><strong>{stringValue(item, "confidence", "—")}</strong></div><div><small>Horizon</small><strong>{stringValue(item, "horizon", "—")}</strong></div><div><small>Recorded</small><strong>{dateLabel(stringValue(item, "created_at"))}</strong></div></div><div className="journal-invalidation"><small>Invalidation</small><p>{stringValue(item, "invalidation", "No invalidation condition recorded.")}</p></div><footer><Link href={`/stock/${encodeURIComponent(symbol)}`}>Open {symbol} market view <ArrowUpRight size={14} /></Link></footer></article>; })}</div> : <div className="personal-empty"><FileText size={22} /><h2>No decisions recorded yet.</h2><p>Start with the question you are already carrying. The useful part is naming what would change your mind.</p></div>}
        </>}
        {mode === "settings" && <>
          <form className="preferences-panel" onSubmit={submit}><div className="personal-section-title"><div><h2>What should Fisk notice first?</h2><p>These preferences shape context, never the conclusion.</p></div><Settings2 size={21} /></div><div className="interest-grid">{interests.map((interest) => <button type="button" className={selected.includes(interest) ? "is-selected" : ""} key={interest} onClick={() => setSelected((value) => value.includes(interest) ? value.filter((current) => current !== interest) : [...value, interest])}><span>{interest}</span>{selected.includes(interest) ? <Check size={16} /> : <Plus size={16} />}</button>)}</div><div className="preferences-fields"><label>Typical horizon<select name="horizon" value={horizon} onChange={(event) => setHorizon(event.target.value)}><option value="intraday">Intraday</option><option value="swing">Swing</option><option value="long-term">Long-term</option></select></label><label>Risk tolerance<select name="risk_tolerance" defaultValue="balanced"><option value="conservative">Conservative</option><option value="balanced">Balanced</option><option value="aggressive">Aggressive</option></select></label><label>Experience<select name="experience_level" defaultValue="intermediate"><option value="new">New</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></label></div><footer><span>{message || "Fisk will keep your lens separate from the evidence."}</span><button className="personal-primary-action" type="submit" disabled={saving}>{saving ? <LoaderCircle className="spin" size={15} /> : <Check size={15} />} Save preferences</button></footer></form><div className="personal-guidance"><Sparkles size={18} /><div><h2>Evidence still gets the final word.</h2><p>Your preferences help Fisk choose context and questions. They never remove opposing evidence or turn research into a recommendation.</p></div></div>
        </>}
      </>}
    </div></div>
  </div>;
}
