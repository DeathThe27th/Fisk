import Link from "next/link";
import { ArrowUpRight, ExternalLink, FileSearch, Newspaper, Scale, ShieldCheck } from "lucide-react";
import { Brand } from "@/components/brand";
import { ConstellationHero } from "@/components/landing/constellation-hero";
import { getCompanyNews } from "@/lib/providers/finnhub";

export const revalidate=600;
export default async function Home(){
  const now=new Date();
  const feed=await getCompanyNews("NVDA",new Date(now.getTime()-10*864e5).toISOString().slice(0,10),now.toISOString().slice(0,10));
  return <main className="cosmos-site">
    <nav className="cosmos-nav"><Brand inverse/><div><Link href="#method">How it works</Link><Link href="#news">News</Link><Link href="/methodology">Methodology</Link></div><Link href="/desk">Open Fisk <ArrowUpRight size={14}/></Link></nav>
    <section className="cosmos-hero"><ConstellationHero/><div className="cosmos-scrim"/><div className="cosmos-copy"><h1>See the market.<br/>Shape your view.</h1><p>Fisk turns live reporting, market structure, and primary sources into one research surface—so you can move from noise to a defensible decision.</p><div className="cosmos-actions"><Link href="/desk">Open the intelligence desk <ArrowUpRight size={16}/></Link><Link href="#method">Explore the system</Link></div></div></section>
    <section className="cosmos-bento shell" id="method">
      <article className="bento-lead"><Newspaper size={23}/><h2>One surface.<br/>Every signal.</h2><p>Follow the story, inspect the market response, question the evidence, and keep your own judgment in control.</p><Link href="/desk">Enter the desk <ArrowUpRight size={16}/></Link></article>
      <article className="bento-evidence"><FileSearch size={21}/><div><strong>Sources stay visible</strong><p>Open the original reporting from every answer.</p></div></article>
      <article className="bento-balance"><Scale size={24}/><h3>Pressure-test<br/>the narrative.</h3><p>Compare supporting evidence, counter-signals, and what would change the view.</p></article>
      <article className="bento-control"><ShieldCheck size={22}/><span>YOU DECIDE</span><div className="control-rings" aria-hidden="true"><i/><i/><i/></div><h3>Research assistance.<br/>Never autopilot.</h3></article>
    </section>
    <section className="cosmos-news shell" id="news"><header><h2>Current reporting.</h2><p>{feed.error?"The live news provider is currently unavailable.":"Latest sourced company coverage."}</p></header>{feed.items.length?<div>{feed.items.slice(0,5).map(item=><a key={item.id} href={item.sourceUrl} target="_blank" rel="noreferrer"><span>{item.source}<br/>{new Date(item.publishedAt).toLocaleDateString()}</span><h3>{item.headline}</h3><ExternalLink size={17}/></a>)}</div>:<div className="news-empty"><Newspaper size={25}/><strong>No current stories available.</strong><p>Connect Finnhub or return when the provider is available.</p></div>}</section>
    <footer className="cosmos-footer shell"><Brand/><p>Research assistance, not financial advice.</p><div><Link href="/methodology">Methodology</Link><Link href="/desk">Open Fisk</Link></div></footer>
  </main>;
}
