"use client";

import { ArrowUpRight, FileText, Newspaper, ShieldAlert, Sparkles } from "lucide-react";
import type { Evidence, ResearchResult } from "@/lib/types";

function sourceIcon(item: Evidence) {
  if (item.provider === "User upload") return <FileText size={18} />;
  if (item.provider === "SEC EDGAR") return <FileText size={18} />;
  return <Newspaper size={18} />;
}

function evidenceFor(result: ResearchResult, ids: string[]) {
  return ids.map((id) => result.evidence.find((item) => item.id === id)).filter((item): item is Evidence => Boolean(item));
}

export function ResearchResultView({ result, onAsk }: { result: ResearchResult; onAsk?: (prompt: string) => void }) {
  return <div className="fisk-result">
    <div className="fisk-result-verdict"><div><span className="fisk-result-eyebrow"><Sparkles size={12} /> Fisk verdict</span><strong>{result.confidence} confidence</strong></div><span>{new Date(result.asOf).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</span></div>
    <h2>{result.directAnswer}</h2>
    <p className="fisk-result-thesis">{result.thesis}</p>

    {result.keyFindings.length > 0 && <section className="fisk-result-section"><header><span>01</span><h3>What the evidence says</h3></header><div className="fisk-finding-list">{result.keyFindings.slice(0, 4).map((finding) => <article key={finding.claim}><p>{finding.claim}</p>{evidenceFor(result, finding.evidenceIds).length > 0 && <div className="fisk-inline-citations">{evidenceFor(result, finding.evidenceIds).map((item) => <a href={item.sourceUrl} target="_blank" rel="noreferrer" key={item.id}>{item.provider} <ArrowUpRight size={11} /></a>)}</div>}</article>)}</div></section>}

    {(result.bullCase.length > 0 || result.bearCase.length > 0) && <section className="fisk-result-section"><header><span>02</span><h3>Two sides of the case</h3></header><div className="fisk-case-grid"><article className="is-bull"><small>Supports the view</small>{result.bullCase.map((item) => <p key={item}>{item}</p>)}</article><article className="is-bear"><small>Challenges the view</small>{result.bearCase.map((item) => <p key={item}>{item}</p>)}</article></div></section>}

    {result.catalysts.length > 0 && <section className="fisk-result-section"><header><span>03</span><h3>What could move it</h3></header><div className="fisk-catalyst-list">{result.catalysts.map((item) => <div key={`${item.event}-${item.date ?? ""}`}><b className={`is-${item.direction}`}>{item.direction}</b><p>{item.event}</p><small>{item.date || "Date not supplied"}</small></div>)}</div></section>}

    {result.stressTests.length > 0 && <section className="fisk-result-section"><header><span>04</span><h3>Stress tests</h3></header><div className="fisk-stress-list">{result.stressTests.map((item) => <article key={item.scenario}><ShieldAlert size={16} /><div><strong>{item.scenario}</strong><p>{item.implication}</p></div></article>)}</div></section>}

    {result.invalidationConditions.length > 0 && <section className="fisk-result-section"><header><span>05</span><h3>What would change Fisk’s mind</h3></header><ul className="fisk-result-list">{result.invalidationConditions.map((item) => <li key={item}>{item}</li>)}</ul></section>}

    <section className="fisk-result-section fisk-source-section"><header><span>Sources</span><h3>Inspect the paper trail</h3><small>{result.evidence.length} attached</small></header><div className="fisk-source-grid">{result.evidence.slice(0, 8).map((item) => <a className="fisk-source-card" href={item.sourceUrl || undefined} target={item.sourceUrl ? "_blank" : undefined} rel={item.sourceUrl ? "noreferrer" : undefined} key={item.id}><div className="fisk-source-thumb">{item.imageUrl ? <img src={item.imageUrl} alt="" /> : sourceIcon(item)}</div><div><small>{item.provider} · {item.freshness}</small><strong>{item.title}</strong><span>{item.sourceUrl ? "Open source" : "User-provided document"}<ArrowUpRight size={12} /></span></div></a>)}</div></section>

    {onAsk && <div className="fisk-result-actions"><button type="button" onClick={() => onAsk("Now challenge this answer with the strongest counter-evidence.")}>Challenge this answer</button><button type="button" onClick={() => onAsk("Turn this research into a concise decision checklist.")}>Make a decision checklist</button></div>}
  </div>;
}
