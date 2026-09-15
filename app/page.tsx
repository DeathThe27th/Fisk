import Link from "next/link";
import { Brand } from "@/components/brand";
import { ArrowUpRight, ExternalLink, FileText, Newspaper, Radar, ShieldCheck, Sparkles, Telescope } from "@/components/icons";
import { HeroObservatory } from "@/components/landing/hero-observatory";
import { ResearchInput } from "@/components/landing/research-input";
import { MarketRibbon } from "@/components/market-ribbon";
import { getCompanyNews } from "@/lib/providers/finnhub";

const prompts = [
  "Stress-test NVDA’s bullish thesis",
  "Compare TSLA with its rToken",
  "What changed after the latest 8-K?",
];

const fallbackStories = [
  { category: "Semiconductors", time: "18m", title: "Chipmakers enter the weekend with policy risk back in focus", source: "Illustrative newsroom", tickers: ["NVDA", "AMD"], tone: "mixed" },
  { category: "Filings", time: "42m", title: "New 8-K adds a first-party signal to the earnings picture", source: "SEC EDGAR demo", tickers: ["AAPL"], tone: "neutral" },
  { category: "Macro", time: "1h", title: "Rates and dollar strength test the breadth of the risk rally", source: "Illustrative macro brief", tickers: ["SPY", "BTC"], tone: "risk" },
];

export const revalidate=600;
export default async function Home() {
  const now=new Date();
  const live=await getCompanyNews("NVDA",new Date(now.getTime()-10*864e5).toISOString().slice(0,10),now.toISOString().slice(0,10));
  const stories=live.items.length?live.items.slice(0,3).map(item=>({category:item.category,time:`${Math.max(1,Math.round((Date.now()-new Date(item.publishedAt).getTime())/36e5))}h`,title:item.headline,source:`${item.source} · ${item.freshness}`,tickers:item.tickers,tone:item.sentiment==="bullish"?"mixed":item.sentiment==="bearish"?"risk":"neutral",sourceUrl:item.sourceUrl})):fallbackStories.map(item=>({...item,sourceUrl:"/desk"}));
  return (
    <main className="landing">
      <nav className="nav shell">
        <Brand />
        <div className="nav-links"><Link href="#newsroom">Newsroom</Link><Link href="/methodology">Methodology</Link></div>
        <Link className="button button-dark" href="/desk">Open Fisk <ArrowUpRight size={15} /></Link>
      </nav>
      <MarketRibbon />

      <section className="hero shell">
        <div className="hero-copy">
          <h1>See what the<br />market is <em>missing.</em></h1>
          <p>Fisk turns a market question into a living research desk—price, news, filings, tokenized activity, and the evidence that could prove you wrong.</p>
          <ResearchInput />
          <div className="prompt-row">
            {prompts.map((prompt) => <Link key={prompt} href={`/desk?q=${encodeURIComponent(prompt)}`}>{prompt}<ArrowUpRight size={13} /></Link>)}
          </div>
          <small className="explore-note">Explore first. Sign in only when you want Fisk to remember.</small>
        </div>
        <HeroObservatory />
      </section>

      <section className="proof-strip shell" aria-label="Product principles">
        <span><Radar size={17} /> Live sources</span>
        <span><Sparkles size={17} /> Tokenized equities</span>
        <span><ShieldCheck size={17} /> No wallet needed</span>
        <span><Telescope size={17} /> Human final decision</span>
      </section>

      <section className="pulse-section shell">
        <div className="section-heading"><h2>The market doesn’t wait<br />for Monday.</h2><p>A single evidence field for the underlying session and the activity that continues around it.</p></div>
        <div className="pulse-grid">
          <article className="lead-story">
            <div className="story-meta"><span>WEEKEND CATALYST</span><span>Illustrative · 18m ago</span></div>
            <h3>Semiconductor policy risk is back. The tape has only priced part of it.</h3>
            <p>Fisk connects the headline to supplier exposure, recent price structure, rToken activity, and the conditions that would break the thesis.</p>
            <Link href="/desk?q=How%20exposed%20is%20NVDA%20to%20this%20weekend%27s%20semiconductor%20news%3F">Open the research <ArrowUpRight size={16} /></Link>
            <div className="story-spectrum"><i /><i /><i /><i /><i /></div>
          </article>
          <article className="movers-panel">
            <header><h3>Moving now</h3><span>DEMO</span></header>
            {[["NVDA", "138.85", "+1.74%"], ["TSLA", "248.98", "−0.61%"], ["AAPL", "227.55", "+0.22%"]].map(([ticker, price, delta]) => <div className="mover" key={ticker}><b>{ticker}</b><span>${price}</span><em className={delta.startsWith("+") ? "up" : "down"}>{delta}</em></div>)}
          </article>
          <article className="rtoken-panel">
            <div><span className="status-dot" /> RTOKEN MARKET</div>
            <h3>Activity continues<br />after the closing bell.</h3>
            <p>Compare tokenized prices with the underlying session—without pretending they share the same liquidity or market structure.</p>
            <div className="comparison"><span>NVDA</span><i /><span>NVDAx</span><b>+0.12% divergence</b></div>
          </article>
          <article className="macro-panel"><Radar size={24} /><div><span>MACRO CONTEXT</span><strong>Rates firmer · USD bid</strong><p>Growth sensitivity elevated</p></div></article>
        </div>
      </section>

      <section className="newsroom shell" id="newsroom">
        <div className="section-heading"><h2>A newsroom built<br />for decisions.</h2><div className="filter-pills"><button className="active">For you</button><button>Latest</button><button>Filings</button><button>Macro</button></div></div>
        <div className="news-list">
          {stories.map((story, index) => (
            <article className="news-item" key={story.title}>
              <div className={`news-index tone-${story.tone}`}>0{index + 1}</div>
              <div className="news-copy"><span>{story.category} · {story.time} ago</span><h3>{story.title}</h3><p>{story.source}</p></div>
              <div className="ticker-stack">{story.tickers.map((ticker) => <span key={ticker}>{ticker}</span>)}</div>
              <Link href={`/desk?q=${encodeURIComponent(`Analyze this ${story.category} story for NVDA: ${story.title}`)}`} aria-label={`Ask Fisk about ${story.title}`}>Ask Fisk <ArrowUpRight size={15} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="use-scenes shell">
        <div className="section-heading"><h2>Research changes<br />with the question.</h2><p>Each scene opens a different evidence field. The interface gives the current risk the room it deserves.</p></div>
        <div className="scene-grid">
          <Link className="scene-weekend" href="/desk?q=How%20exposed%20is%20NVDA%20to%20this%20weekend%27s%20semiconductor%20news%3F"><span>WEEKEND CATALYST</span><h3>The underlying sleeps.<br/>The evidence doesn’t.</h3><div className="scene-hours"><i/><b>FRI 16:00</b><i/><b>MON 09:30</b></div><p>Track news, rToken activity, and the gap risk waiting for the opening bell.</p><ArrowUpRight size={18}/></Link>
          <Link className="scene-earnings" href="/desk?q=Build%20an%20earnings%20research%20packet%20for%20AAPL"><span>EARNINGS RESEARCH</span><div className="earnings-lines"><i/><i/><i/><i/></div><h3>Guidance meets the filing.</h3><p>Separate the call narrative from first-party numbers and the market’s reaction.</p><ArrowUpRight size={18}/></Link>
          <Link className="scene-divergence" href="/desk?q=Compare%20TSLA%20with%20its%20tokenized%20counterpart"><span>UNDERLYING / RTOKEN</span><div className="split-price"><b>TSLA</b><i/><b>TSLAx</b></div><h3>Same reference.<br/>Different market.</h3><p>Make liquidity, session state, and price divergence explicit.</p><ArrowUpRight size={18}/></Link>
        </div>
      </section>

      <section className="transformation">
        <div className="shell transformation-inner">
          <div className="transform-copy"><h2>One question.<br />A desk shaped around it.</h2><p>Fisk shows its work as it gathers evidence, then gives every claim somewhere to stand.</p><Link className="button button-light" href="/desk">Enter the research desk <ArrowUpRight size={16} /></Link></div>
          <div className="research-packet">
            <div className="packet-top"><span>NVDA / WEEKEND CATALYST</span><b>Evidence quality: medium</b></div>
            <div className="packet-thesis"><span>CONDITIONAL THESIS</span><h3>Demand remains resilient, but policy scope is the hinge.</h3><p>The bullish case holds while confirmed restrictions remain inside current assumptions and supplier commentary stays intact.</p></div>
            <div className="packet-grid"><div><FileText size={16} /><span>4 SOURCES</span><strong>2 first-party</strong></div><div><Newspaper size={16} /><span>CATALYSTS</span><strong>3 in view</strong></div><div><ShieldCheck size={16} /><span>INVALIDATION</span><strong>2 conditions</strong></div></div>
          </div>
        </div>
      </section>

      <footer className="footer shell"><div><Brand /><p>Research assistance, not financial advice.<br />You make the final decision.</p></div><div><Link href="/methodology">Methodology</Link><Link href="/desk">Open Fisk</Link><a href={process.env.NEXT_PUBLIC_BITGET_REDIRECT_URL||"https://www.bitget.com"} target="_blank" rel="noopener noreferrer">Explore Bitget <ExternalLink size={13} /></a></div></footer>
    </main>
  );
}
