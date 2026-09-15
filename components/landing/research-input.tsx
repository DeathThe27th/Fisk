"use client";

import { useRouter } from "next/navigation";
import { PromptInput } from "@/components/ui/ai-chat-input";

export function ResearchInput() {
  const router = useRouter();
  function submit(value: string) {
    router.push(value ? `/desk?q=${encodeURIComponent(value)}` : "/desk");
  }
  return <PromptInput className="hero-prompt" onSubmit={submit} placeholder="Ask about a company, catalyst, or market risk…" />;
}
