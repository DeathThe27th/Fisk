"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { PromptInput } from "@/components/ui/ai-chat-input";
import { FiskAvatar } from "@/components/fisk-cat";
import { FiskCornerCameo } from "@/components/fisk-corner-cameo";
import type { ResearchResult } from "@/lib/types";

export function StockChat({ ticker, companyName = ticker, initialQuestion = "", context = "", onOpenChange }: { ticker: string; companyName?: string; initialQuestion?: string; context?: string; onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(Boolean(initialQuestion));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ResearchResult | null>(null);
  const submittedInitial = useRef(false);
  const requestId = useRef(0);
  const mounted = useRef(true);

  useEffect(() => () => { mounted.current = false; }, []);
  useEffect(() => { onOpenChange?.(open); }, [onOpenChange, open]);

  const submit = useCallback(async (value: string) => {
    const query = value.trim();
    if (!query) return;
    const id = ++requestId.current;
    setOpen(true);
    setLoading(true);
    setError("");
    try {
      const enrichedQuery = context ? `${query}\n\nResearch context (use as grounding, not as a conclusion):\n${context}` : query;
      const response = await fetch("/api/research", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: enrichedQuery, ticker }) });
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
    <AnimatePresence>{open && <motion.aside id="stock-chat" className="stock-chat-panel" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 50, opacity: 0 }} aria-label={`Ask Fisk about ${companyName}`}>
      <header><div><strong>Ask Fisk about {companyName}</strong><span>{loading ? "Researching sources…" : "Ask, challenge, inspect."}</span></div><button type="button" onClick={() => setOpen(false)} aria-label="Close Fisk"><X size={18} /></button></header>
      <div>{loading ? <div className="stock-chat-loading" role="status"><FiskAvatar state="analysing" large /><p>Researching sources…</p><span>Checking reporting, filings, and counter-evidence.</span></div> : result ? <article><h2>{result.directAnswer}</h2><p>{result.thesis}</p>{result.keyFindings.slice(0, 4).map((item) => <p key={item.claim}>{item.claim}</p>)}</article> : <article><h2>What do you want to know?</h2><p>I’ll connect the chart to reporting, filings, and the argument on the other side.</p></article>}{error && <p role="alert">{error}</p>}</div>
      <PromptInput onSubmit={(value) => submit(value)} disabled={loading} placeholder={`Ask Fisk about ${companyName}…`} />
    </motion.aside>}</AnimatePresence>
    {!open && <div className="stock-chat-cameo"><FiskCornerCameo className="is-staged" onActivate={() => setOpen(true)} label={`Ask about ${ticker}`} ariaLabel={`Ask Fisk about ${companyName}`} /></div>}
  </>;
}
