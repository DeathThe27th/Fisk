import Link from "next/link";
import { Brand } from "@/components/brand";
import { ArrowUpRight } from "@/components/icons";

export default function Methodology() {
  return <main className="landing"><nav className="nav shell"><Brand/><Link className="button button-dark" href="/desk">Open Fisk <ArrowUpRight size={15}/></Link></nav><section className="shell" style={{maxWidth:900,padding:"100px 0 150px"}}><h1 style={{fontSize:"clamp(52px,8vw,96px)",lineHeight:.96,letterSpacing:"-.04em",fontWeight:550,margin:"0 0 60px"}}>Evidence first.<br/>Confidence second.</h1><div style={{maxWidth:680,fontSize:17,lineHeight:1.75,color:"#55554f"}}><p>Fisk gathers market prices, company news, regulatory filings, tokenized-stock activity, and cross-asset context. Every material claim should carry its source and relevant timestamp.</p><p>Freshness labels distinguish live, cached, delayed, unavailable, and demonstration data. Confidence describes evidence quality; it is not a probability of profit.</p><p>Fisk offers research assistance. It does not connect a wallet, hold assets, place trades, or make the final decision. You do.</p></div></section></main>;
}
