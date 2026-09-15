"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Newspaper, ScanSearch } from "lucide-react";
import { useAuth } from "@/components/auth-context";
import { MarketChart } from "@/components/market-chart";
import { PromptInput } from "@/components/ui/ai-chat-input";
import type { Candle, NewsItem, ResearchResult } from "@/lib/types";

type ChartData={candles:Candle[];freshness:"live"|"cached"|"delayed"|"demo";updatedAt:string;source:string;error?:string};
const stocks=[{ticker:"NVDA",name:"NVIDIA"},{ticker:"AAPL",name:"Apple"},{ticker:"TSLA",name:"Tesla"},{ticker:"AMD",name:"AMD"}];
const displayHeadline=(value:string)=>value.replace(/\bdow jones\b/gi,"Dow Jones");

export function DeskWorkspace({initialQuestion,news,newsError,chart}:{initialQuestion:string;news:NewsItem[];newsError:string|null;chart:ChartData}){
  const[result,setResult]=useState<ResearchResult|null>(null),[question,setQuestion]=useState(initialQuestion),[error,setError]=useState(""),[loading,setLoading]=useState(false);
  const{authenticated,getAccessToken}=useAuth();
  async function research(value:string,meta:{attachments:File[]}){
    const next=value.trim();if(next.length<8){setError("Ask a little more so Fisk can build a useful research plan.");return}
    setQuestion(next);setLoading(true);setError(meta.attachments.length?"Attachments are queued locally; this research run uses your written question.":"");
    const ticker=next.toUpperCase().match(/\b(?:NVDA|AAPL|TSLA|AMD|COIN)\b/)?.[0]??"NVDA";
    try{const token=authenticated?await getAccessToken():null;const response=await fetch("/api/research",{method:"POST",headers:{"Content-Type":"application/json",...(token?{Authorization:`Bearer ${token}`}:{})},body:JSON.stringify({query:next,ticker})});const body=await response.json();if(!response.ok)throw new Error(body.error||"Research failed");setResult(body.result)}catch(value){setResult(null);setError(value instanceof Error?value.message:"Research is unavailable right now.")}finally{setLoading(false)}
  }
  return <div className="mono-desk-grid">
    <section className="desk-canvas">
      <div className="desk-news-grid">
        <article className="desk-news-lead"><header><Newspaper size={18}/><span>{news.length?`${news.length} live stories`:"Provider status"}</span></header>{news[0]?<><h1>{displayHeadline(news[0].headline)}</h1><p>{news[0].summary}</p><a href={news[0].sourceUrl} target="_blank" rel="noreferrer">{news[0].source} · Open source <ExternalLink size={14}/></a></>:<div className="desk-empty"><h1>News is reconnecting.</h1><p>{newsError||"No current stories were returned."}</p></div>}</article>
        <div className="desk-news-stack">{news.slice(1,3).map(item=><a href={item.sourceUrl} target="_blank" rel="noreferrer" key={item.id}><span>{item.source}</span><h2>{displayHeadline(item.headline)}</h2><ExternalLink size={14}/></a>)}{news.length<2&&<div className="desk-empty-small">More reporting appears here when the live feed responds.</div>}</div>
      </div>
      <section className="desk-chart-bento"><header><div><strong>NVDA market response</strong><span>Source-labelled market structure</span></div><Link href="/stock/NVDA">Full market view <ArrowUpRight size={14}/></Link></header><MarketChart ticker="NVDA" initial={chart}/></section>
      <section className="stock-bento-grid">{stocks.map(stock=><Link href={`/stock/${stock.ticker}`} key={stock.ticker}><span>{stock.name}</span><strong>{stock.ticker}</strong><small>Open research surface</small><ArrowUpRight size={16}/></Link>)}</section>
    </section>
    <aside className="copilot-bento"><header><div className="copilot-mark"><ScanSearch size={18}/></div><div><strong>Fisk copilot</strong><span>Evidence in. Decision clarity out.</span></div></header><div className="copilot-thread">{result?<><div className="copilot-question">{question}</div><article><h2>{result.directAnswer}</h2><p>{result.thesis}</p><div className="copilot-findings">{result.keyFindings.slice(0,3).map(item=><span key={item.claim}>{item.claim}</span>)}</div><div className="copilot-sources">{result.evidence.slice(0,4).map(item=><a key={item.id} href={item.sourceUrl} target="_blank" rel="noreferrer">{item.provider}<ExternalLink size={12}/></a>)}</div></article></>:<div className="copilot-empty"><h2>Ask across the whole desk.</h2><p>Fisk connects the reporting, chart context, filings, and counter-evidence behind your question.</p><div><button onClick={()=>research("What changed for NVDA today, and what would invalidate the bullish view?",{attachments:[]})}>What changed for NVDA?</button><button onClick={()=>research("Compare the strongest bull and bear evidence for AMD right now.",{attachments:[]})}>Pressure-test AMD</button></div></div>}{loading&&<div className="copilot-loading">Gathering current evidence…</div>}{error&&<p className="copilot-error">{error}</p>}</div><PromptInput onSubmit={(value,meta)=>research(value,meta)} placeholder="Ask about a market move, company, or thesis…"/></aside>
  </div>
}
