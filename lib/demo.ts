import type { Candle, NewsItem, ResearchResult } from "@/lib/types";

const anchor = 1789459200;
const closes = [171.12,170.48,172.06,173.92,173.15,175.44,176.21,175.63,178.04,179.22,180.11,181.84,180.76,183.4,184.18,183.67,185.92,187.31,186.7,188.96,190.14,189.62,191.88,193.35,192.71,195.08,196.44,195.76,198.12,199.34];
export const demoCandles: Candle[] = closes.map((close, index) => {
  const open = index ? closes[index - 1] : close - .6;
  return { time: anchor + index * 3600, open, high: Math.max(open, close) + 1.18, low: Math.min(open, close) - .94, close, volume: 22_000_000 + index * 310_000 };
});

export const demoNews: NewsItem[] = [
  { id:"demo-policy", headline:"Export-policy uncertainty returns to the semiconductor outlook", summary:"Illustrative summary used when live provider data is unavailable. It demonstrates how Fisk separates a catalyst from verified company evidence.", source:"Fisk demo snapshot", sourceUrl:"https://www.sec.gov/edgar/browse/?CIK=1045810", publishedAt:"2026-09-13T16:40:00.000Z", fetchedAt:"2026-09-15T12:00:00.000Z", tickers:["NVDA","AMD"], sentiment:"neutral", relevance:.96, impact:"Policy scope could change the addressable market assumed in the bullish case.", category:"regulatory", freshness:"demo" },
  { id:"demo-filing", headline:"Recent filing language keeps demand concentration in focus", summary:"Illustrative filing card pointing to the official company filing index rather than invented filing text.", source:"SEC EDGAR demo", sourceUrl:"https://www.sec.gov/edgar/browse/?CIK=1045810", publishedAt:"2026-09-10T20:05:00.000Z", fetchedAt:"2026-09-15T12:00:00.000Z", tickers:["NVDA"], sentiment:"neutral", relevance:.88, impact:"Customer concentration remains a material stress-test input.", category:"filing", freshness:"demo" },
];

export const demoResearch: ResearchResult = {
  directAnswer:"NVDA remains positively exposed to durable AI-compute demand, but weekend policy reporting creates a specific gap risk: the market cannot fully price the scope until restrictions are confirmed. Treat the bullish thesis as conditional rather than settled.",
  thesis:"Demand evidence is constructive; the thesis holds only while policy scope, supplier guidance, and post-earnings price support remain inside current assumptions.", confidence:"medium", asOf:"2026-09-15T12:00:00.000Z",
  keyFindings:[{claim:"Policy scope is the highest-impact unresolved variable.",evidenceIds:["demo-policy"]},{claim:"Concentration deserves an explicit downside stress test.",evidenceIds:["demo-filing"]}],
  catalysts:[{event:"Confirmation or narrowing of semiconductor export restrictions",direction:"mixed"},{event:"Supplier and hyperscaler demand commentary",direction:"positive"},{event:"Underlying market reopening after weekend rToken activity",direction:"mixed"}],
  bullCase:["AI infrastructure demand remains durable across major customers.","Restrictions remain narrower than the downside scenario assumes.","Price holds the post-earnings support zone after the underlying reopens."],
  bearCase:["Policy expands to products or regions outside current expectations.","Customer concentration turns a capex pause into an outsized revenue shock.","Weekend tokenized activity signals risk that the underlying confirms on reopening."],
  stressTests:[{scenario:"Broader export restrictions",implication:"Reduce the addressable-market assumption and require updated management guidance before restoring confidence.",evidenceIds:["demo-policy"]},{scenario:"Top-customer capex pause",implication:"Concentration could amplify the revenue effect beyond the headline demand slowdown.",evidenceIds:["demo-filing"]}],
  invalidationConditions:["Confirmed restrictions materially exceed the current base case.","Supplier or hyperscaler guidance contradicts resilient near-term demand.","The underlying loses post-earnings support on strong volume after reopening."],
  unknowns:["Final policy language and enforcement timing.","How much weekend rToken movement reflects informed price discovery versus thin liquidity.","Updated customer-level demand visibility."],
  modules:["chart","news","filings","comparison","stress-test"], evidence:demoNews.map(item=>({id:item.id,provider:item.source,title:item.headline,sourceUrl:item.sourceUrl,summary:item.summary,publishedAt:item.publishedAt,fetchedAt:item.fetchedAt,freshness:item.freshness})),
  activity:[{tool:"get_stock_candles",state:"complete",summary:"Loaded an honestly labelled demonstration series."},{tool:"get_company_news",state:"partial",summary:"Live provider unavailable; retained source-labelled demo evidence."},{tool:"get_recent_filings",state:"complete",summary:"Attached the official SEC company filing index."},{tool:"self_review",state:"complete",summary:"Checked unsupported claims, counterarguments, and unknowns."}],
};
