import Link from "next/link";
import { ArrowUpRight, FileCheck2, Radar, Scale, Waves } from "lucide-react";

export function StatsBento() {
  return <section className="fisk-bento" aria-label="How Fisk builds a research answer">
    <Link className="bento-primary" href="/desk?q=Stress-test%20NVDA%27s%20bullish%20thesis">
      <span>One question becomes an evidence field</span><div className="bento-orbit" aria-hidden="true"><i/><i/><i/><i/></div>
      <div><h3>Research that shows<br/>where it stands.</h3><p>Price, filings, news and tokenized activity converge into one conditional thesis.</p></div><ArrowUpRight size={21}/>
    </Link>
    <article className="bento-signal"><header><span>Evidence quality</span><b>MEDIUM · DEMO</b></header><div className="signal-bars">{[44,72,58,88,66,93,78,100].map((height,index)=><i key={index} style={{height:`${height}%`}}/>)}</div><h3>Agreement without false certainty.</h3></article>
    <article className="bento-source"><FileCheck2 size={22}/><strong>4</strong><span>demo traceable sources</span></article>
    <article className="bento-source bento-source-violet"><Scale size={22}/><strong>2-sided</strong><span>illustrative bull + bear case</span></article>
    <article className="bento-wide"><div><Radar size={21}/><span>Interface follows the question</span></div><p>Weekend catalyst? Fisk brings forward rToken activity and gap risk. Filing change? First-party evidence takes the lead.</p><Waves size={34}/></article>
  </section>;
}
