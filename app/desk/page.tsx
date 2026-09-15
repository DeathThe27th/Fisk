import Link from "next/link";
import { Brand } from "@/components/brand";
import { AuthButton } from "@/components/auth-button";
import { DeskWorkspace } from "@/components/desk-workspace";
import { getCompanyNews } from "@/lib/providers/finnhub";
import { getRwaCandles } from "@/lib/providers/bitget";

export default async function Desk({searchParams}:{searchParams:Promise<{q?:string}>}){
  const {q}=await searchParams;
  const question=q??"";
  const ticker=question.toUpperCase().match(/\b[A-Z]{1,5}\b/)?.[0]??"NVDA";
  const now=new Date();
  const[feed,chart]=await Promise.all([getCompanyNews(ticker,new Date(now.getTime()-14*864e5).toISOString().slice(0,10),now.toISOString().slice(0,10)),getRwaCandles("NVDA","1h",120)]);
  return <main className="mono-desk"><header className="mono-desk-nav"><Brand/><nav><Link href="/">Home</Link><Link href="/methodology">Methodology</Link></nav><div><span>Live intelligence desk</span><AuthButton/></div></header><DeskWorkspace initialQuestion={question} news={feed.items} newsError={feed.error} chart={chart}/></main>;
}
