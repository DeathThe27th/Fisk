"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Maximize2, Minimize2, X } from "lucide-react";
import { PromptInput } from "@/components/ui/ai-chat-input";
import { FiskAvatar } from "@/components/fisk-cat";
import { FiskCornerCameo } from "@/components/fisk-corner-cameo";
import { ResearchResultView } from "@/components/research-result-view";
import type { ResearchResult } from "@/lib/types";

export function StockChat({ ticker, companyName = ticker, initialQuestion = "", context = "", onOpenChange }: { ticker: string; companyName?: string; initialQuestion?: string; context?: string; onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(Boolean(initialQuestion));
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ResearchResult | null>(null);
  const submittedInitial = useRef(false);
  const requestId = useRef(0);
  const mounted = useRef(true);

  useEffect(() => () => { mounted.current = false; }, []);
  useEffect(() => { onOpenChange?.(open); }, [onOpenChange, open]);

  const submit = useCallback(async (value: string, attachments: File[] = []) => {
    const query = value.trim();
    if (!query) return;
    const id = ++requestId.current;
    setOpen(true);
    setLoading(true);
    setError("");
    try {
      const enrichedQuery = context ? `${query}\n\nResearch context (use as grounding, not as a conclusion):\n${context}` : query;
      const form = new FormData();
      form.append("query", enrichedQuery);
      form.append("ticker", ticker);
      attachments.forEach((file) => form.append("attachments", file));
      const response = await fetch("/api/research", { method: "POST", body: form });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Research failed");
      if (mounted.current && id === requestId.current) setResult(body.result);
    } catch (value) {
      if (mounted.current && id === requestId.current) setError(value instanceof Error ? value.message : "Research is unavailable.");
    } finally {
      if (mounted.current && id === requestId.current) setLoading(false);
    }
  }, [context, ticker]);

  useEffect(() => {
    if (initialQuestion && !submittedInitial.current) {
      submittedInitial.current = true;
      void submit(initialQuestion);
    }
  }, [initialQuestion, submit]);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const prompt = (event as CustomEvent<string>).detail;
      setOpen(true);
      if (prompt) void submit(prompt);
    };
    window.addEventListener("fisk:stock-chat", onOpen);
    return () => window.removeEventListener("fisk:stock-chat", onOpen);
  }, [submit]);

  return <>
    <AnimatePresence>{open && <motion.aside id="stock-chat" className={`stock-chat-panel${expanded ? " is-expanded" : ""}`} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 50, opacity: 0 }} aria-label={`Ask Fisk about ${companyName}`}>
      <header><div><strong>Fisk on {companyName}</strong><span>{loading ? "Researching sources…" : "Ask, inspect, or hand me a task."}</span></div><div className="fisk-chat-controls"><button type="button" onClick={() => setExpanded((value) => !value)} aria-label={expanded ? "Shrink Fisk conversation" : "Expand Fisk conversation"} aria-pressed={expanded}>{expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}</button><button type="button" onClick={() => { setOpen(false); setExpanded(false); }} aria-label="Close Fisk"><X size={18} /></button></div></header>
      <div>{loading ? <div className="stock-chat-loading" role="status"><FiskAvatar state="analysing" large /><p>Researching sources…</p><span>Checking reporting, filings, and counter-evidence.</span></div> : result ? <><div className="fisk-question">Stock context · {ticker}</div><ResearchResultView result={result} onAsk={(prompt) => submit(prompt)} /></> : <article><h2>What should we work on?</h2><p>I can explain a filing, connect the chart to reporting, compare the bull and bear cases, or turn your question into a decision checklist.</p></article>}{error && <p role="alert">{error}</p>}</div>
      <PromptInput onSubmit={(value, meta) => submit(value, meta.attachments)} disabled={loading} placeholder={`Ask Fisk about ${companyName}…`} />
    </motion.aside>}</AnimatePresence>
    {!open && <div className="stock-chat-cameo"><FiskCornerCameo className="is-staged" onActivate={() => setOpen(true)} label={`Ask about ${ticker}`} ariaLabel={`Ask Fisk about ${companyName}`} /></div>}
  </>;
}
