import { z } from "zod";

export const FreshnessSchema = z.enum(["live", "cached", "delayed", "demo"]);

export const CandleSchema = z.object({
  time: z.number().int().positive(),
  open: z.number(),
  high: z.number(),
  low: z.number(),
  close: z.number(),
  volume: z.number().optional(),
});
export type Candle = z.infer<typeof CandleSchema>;

export const NewsItemSchema = z.object({
  id: z.string(),
  headline: z.string(),
  summary: z.string(),
  source: z.string(),
  sourceUrl: z.string().url(),
  imageUrl: z.string().url().optional(),
  publishedAt: z.string().datetime(),
  fetchedAt: z.string().datetime(),
  tickers: z.array(z.string()),
  sentiment: z.enum(["bullish", "bearish", "neutral"]),
  relevance: z.number().min(0).max(1),
  impact: z.string(),
  category: z.enum(["company", "earnings", "filing", "macro", "regulatory", "crypto"]),
  freshness: FreshnessSchema,
});
export type NewsItem = z.infer<typeof NewsItemSchema>;

export const EvidenceSchema = z.object({
  id: z.string(),
  provider: z.string(),
  title: z.string(),
  sourceUrl: z.string().url(),
  summary: z.string(),
  publishedAt: z.string().datetime().optional(),
  fetchedAt: z.string().datetime(),
  freshness: FreshnessSchema,
});
export type Evidence = z.infer<typeof EvidenceSchema>;

export const ResearchResultSchema = z.object({
  directAnswer: z.string(),
  thesis: z.string(),
  confidence: z.enum(["low", "medium", "high"]),
  asOf: z.string().datetime(),
  keyFindings: z.array(z.object({ claim: z.string(), evidenceIds: z.array(z.string()) })),
  catalysts: z.array(z.object({ event: z.string(), date: z.string().optional(), direction: z.enum(["positive", "negative", "mixed"]) })),
  bullCase: z.array(z.string()),
  bearCase: z.array(z.string()),
  stressTests: z.array(z.object({ scenario: z.string(), implication: z.string(), evidenceIds: z.array(z.string()) })),
  invalidationConditions: z.array(z.string()),
  unknowns: z.array(z.string()),
  modules: z.array(z.enum(["chart", "news", "filings", "signals", "comparison", "stress-test"])),
  evidence: z.array(EvidenceSchema),
  activity: z.array(z.object({ tool: z.string(), state: z.enum(["complete", "partial", "failed"]), summary: z.string() })),
});
export type ResearchResult = z.infer<typeof ResearchResultSchema>;
