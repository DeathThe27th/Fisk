"use client";

import { FormEvent, useState } from "react";
import { ArrowUp, ExternalLink, LoaderCircle, Newspaper } from "lucide-react";
import { FiskAvatar } from "@/components/fisk-cat";
import type { NewsItem } from "@/lib/types";
import { readApiResponse } from "@/lib/client-api";

export function NewsChat({initialQuestion,initialNews,initialError}:{initialQuestion:string;initialNews:NewsItem[];initialError:string|null}) {
  const [question,setQuestion]=useState(initialQuestion);
  const [submittedQuestion,setSubmittedQuestion]=useState(initialQuestion);
  const [news,setNews]=useState(initialNews);
  const [error,setError]=useState(initialError ?? "");
  const [loading,setLoading]=useState(false);
  async function submit(event:FormEvent){event.preventDefault();const nextQuestion=question.trim();if(!nextQuestion)return;setSubmittedQuestion(nextQuestion);setLoading(true);setError("");const ticker=nextQuestion.toUpperCase().match(/\b[A-Z]{1,5}\b/)?.[0]??"NVDA";try{const response=await fetch(`/api/news?ticker=${ticker}`);const body=await readApiResponse<{items:NewsItem[];error?:string}>(response,"News could not be loaded");setNews(body.items??[]);setError(body.error??"")}catch(value){setNews([]);setError(value instanceof Error?value.message:"News unavailable")}finally{setLoading(false)}}
  return <div className="chat-workspace">
    <section className="chat-thread"><div className="chat-intro"><span className="chat-orb"><Newspaper size={22}/></span><h1>What do you want to understand?</h1><p>Ask about a company or market event. Fisk starts with current reporting and keeps every source attached.</p></div>
      {submittedQuestion&&<div className="chat-conversation"><div className="user-message">{submittedQuestion}</div><div className="assistant-message"><FiskAvatar state={loading?"gathering":"result"}/><div><strong>{news.length?`Current reporting connected to your question`:`No current reporting returned`}</strong>{error&&<p className="chat-error">{error}. Try another company or check the provider configuration.</p>}<div className="news-cards">{news.slice(0,6).map(item=><a href={item.sourceUrl} target="_blank" rel="noreferrer" key={item.id}><div><span>{item.source} · {new Date(item.publishedAt).toLocaleDateString()}</span><h2>{item.headline}</h2><p>{item.summary}</p></div><ExternalLink size={15}/></a>)}</div></div></div></div>}
    </section>
    <form className="chat-composer" onSubmit={submit}><textarea value={question} onChange={event=>setQuestion(event.target.value)} placeholder="Ask Fisk about the news…" rows={1}/><button className="chat-send" disabled={loading||!question.trim()} aria-label="Send">{loading?<LoaderCircle className="spin" size={17}/>:<ArrowUp size={17}/>}</button><small>Fisk can make mistakes. Verify important information in the linked sources.</small></form>
  </div>;
}
