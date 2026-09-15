import Link from "next/link";
import { ArrowUpRight, ExternalLink, FileText, Newspaper, ShieldCheck } from "lucide-react";
import { Brand } from "@/components/brand";
import { ResearchInput } from "@/components/landing/research-input";
import { StatsBento } from "@/components/ui/stats-bento";
import { getCompanyNews } from "@/lib/providers/finnhub";

const prompts=["Stress-test NVDA’s bullish thesis","Compare TSLA with its rToken","What changed after the latest 8-K?"];
const fallbackStories=[
  {category:"Semiconductors",title:"Chipmakers enter the weekend with policy risk back in focus",source:"Illustrative newsroom",time:"18m",tickers:["NVDA","AMD"]},
  {category:"Filings",title:"New 8-K adds a first-party signal to the earnings picture",source:"SEC EDGAR demo",time:"42m",tickers:["AAPL"]},
  {category:"Macro",title:"Rates and dollar strength test the breadth of the risk rally",source:"Illustrative macro brief",time:"1h",tickers:["SPY","BTC"]},
];

export const revalidate=600;
export default async function Home(){
  const now=new Date();
  const live=await getCompanyNews("NVDA",new Date(now.getTime()-10*864e5).toISOString().slice(0,10),now.toISOString().slice(0,10));
  const stories=live.items.length?live.items.slice(0,3).map(item=>({category:item.category,title:item.headline,source:`${item.source} · ${item.freshness}`,time:`${Math.max(1,Math.round((Date.now()-new Date(item.publishedAt).getTime())/36e5))}h`,tickers:item.tickers})):fallbackStories;
  return <main className="landing landing-v2">
    <nav className="floating-nav" aria-label="Primary navigation"><Brand/><div><Link href="#method">How it works</Link><Link href="#newsroom">Signals</Link><Link href="/methodology">Methodology</Link></div><Link className="nav-launch" href="/desk">Open desk <ArrowUpRight size={14}/></Link></nav>
    <section className="hero-v2 shell">
      <div className="hero-atmosphere" aria-hidden="true"><i/><i/><i/></div>
      <div className="hero-v2-copy"><h1>Ask the market<br/>a better question.</h1><p>Fisk turns a thesis into an inspectable research surface—connecting price, news, filings and tokenized activity to what would prove you wrong.</p><ResearchInput/><div className="hero-prompts">{prompts.map(prompt=><Link key={prompt} href={`/desk?q=${encodeURIComponent(prompt)}`}>{prompt}<ArrowUpRight size={12}/></Link>)}</div></div>
      <div className="hero-instrument" aria-label="Illustrative Fisk research synthesis"><div className="instrument-question"><span>NVDA · WEEKEND RISK</span><strong>What breaks<br/>the bull case?</strong></div><div className="instrument-path" aria-hidden="true"><i/><i/><i/><i/></div><div className="instrument-verdict"><span>CONDITIONAL THESIS · DEMO</span><strong>Demand holds. Policy scope is the hinge.</strong><div><i/><i/><i/><i/></div></div><div className="instrument-sources"><span><Newspaper size={14}/> News</span><span><FileText size={14}/> Filings</span><span><ShieldCheck size={14}/> Invalidation</span></div></div>
      <div className="hero-foot"><span>Explore without signing in</span><span>Evidence-linked answers</span><span>Human final decision</span></div>
    </section>
    <section className="bento-wrap shell" id="method"><div className="bento-heading"><h2>Not another answer box.<br/>A research instrument.</h2><p>Fisk reorganizes itself around the risk inside your question, then keeps every conclusion tethered to evidence.</p></div><StatsBento/></section>
    <section className="newsroom newsroom-v2 shell" id="newsroom"><div className="bento-heading"><h2>Signals worth<br/>opening.</h2><p>Current context when available. Honest demo states when it isn’t.</p></div><div className="signal-list">{stories.map((story,index)=><Link href={`/desk?q=${encodeURIComponent(`Analyze this ${story.category} story: ${story.title}`)}`} key={story.title}><span className="signal-number">0{index+1}</span><div><small>{story.category} · {story.time} ago</small><h3>{story.title}</h3><p>{story.source}</p></div><div className="signal-tickers">{story.tickers.map(ticker=><span key={ticker}>{ticker}</span>)}</div><ArrowUpRight size={19}/></Link>)}</div></section>
    <section className="landing-close"><div className="shell"><h2>Bring the question.<br/>Leave with the conditions.</h2><Link href="/desk">Start researching <ArrowUpRight size={18}/></Link></div></section>
    <footer className="footer shell"><div><Brand/><p>Research assistance, not financial advice.<br/>You make the final decision.</p></div><div><Link href="/methodology">Methodology</Link><Link href="/desk">Open Fisk</Link><a href={process.env.NEXT_PUBLIC_BITGET_REDIRECT_URL||"https://www.bitget.com"} target="_blank" rel="noopener noreferrer">Explore Bitget <ExternalLink size={13}/></a></div></footer>
  </main>;
}
