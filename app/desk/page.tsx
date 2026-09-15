import Link from "next/link";
import { PanelLeft } from "lucide-react";
import { Brand } from "@/components/brand";
import { AuthButton } from "@/components/auth-button";
import { NewsChat } from "@/components/news-chat";
import { getCompanyNews } from "@/lib/providers/finnhub";

export default async function Desk({searchParams}:{searchParams:Promise<{q?:string}>}){
  const {q}=await searchParams;
  const question=q??"";
  const ticker=question.toUpperCase().match(/\b[A-Z]{1,5}\b/)?.[0]??"NVDA";
  const now=new Date();
  const feed=await getCompanyNews(ticker,new Date(now.getTime()-14*864e5).toISOString().slice(0,10),now.toISOString().slice(0,10));
  return <main className="fisk-chat-page"><aside className="chat-sidebar"><div><PanelLeft size={18}/><Brand/></div><Link href="/desk">New research</Link><nav><span>RECENT</span>{question&&<Link href={`/desk?q=${encodeURIComponent(question)}`}>{question}</Link>}</nav><footer><AuthButton/></footer></aside><div className="chat-main"><header><Link href="/">Fisk</Link><span>News research</span><AuthButton/></header><NewsChat initialQuestion={question} initialNews={feed.items} initialError={feed.error}/></div></main>;
}
