"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "@/components/icons";

export function ResearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  function submit(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/desk?q=${encodeURIComponent(value)}` : "/desk");
  }
  return (
    <form className="research-input" onSubmit={submit}>
      <label htmlFor="hero-query">Ask Fisk about a company, catalyst, or market risk</label>
      <div>
        <textarea id="hero-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What would invalidate the bullish case for NVDA this weekend?" rows={2} />
        <button aria-label="Research this question" type="submit"><ArrowUpRight size={20} /></button>
      </div>
    </form>
  );
}
