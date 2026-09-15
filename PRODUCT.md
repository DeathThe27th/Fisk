# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js App Router with TypeScript, Tailwind CSS, selected shadcn/ui primitives, Motion, TradingView Lightweight Charts, Privy, Supabase, Zod, and server-side adapters for Bitget Qwen, Bitget Wallet RWA, Finnhub, SEC EDGAR, and Bitget Signal. Vercel is the deployment target.

## Users

**Inferred from the build specification:** The primary user is a self-directed active investor researching US equities and tokenized counterparts across normal market sessions and 24/7 activity. They need to understand catalysts, evidence, disagreement, and invalidation conditions before recording their own decision.

Hackathon judges are an evaluation audience. They need to understand the product, data sources, AI tool use, and human-control boundary quickly through one complete research flow.

## Product Purpose

Fisk is an AI market-intelligence workbench that turns a natural-language market question into a cited, decision-ready research packet. Success means a user can inspect live or honestly labelled fallback evidence, understand both sides of a thesis, and make and journal their own decision.

## Positioning

Fisk makes the interface follow the question: it selects specialist sources and reshapes the workspace into the chart, news, filings, signals, risks, stress tests, and citations that the current research intent requires. It connects US equity context with tokenized-stock activity without presenting itself as a trading or custody product.

## Operating Context

Visitors can explore the public landing page, stock pages, news, charts, and a demo research path before signing in. Authenticated users can save sessions, personalize a watchlist and research preferences, and append human decision-journal entries. The flagship demonstration asks how weekend semiconductor news affects NVDA, what the market prices in, and what invalidates the bullish thesis.

## Capabilities and Constraints

- Natural-language research with a short visible plan, bounded typed tool calls, structured synthesis, and one evidence-quality review.
- Source-labelled Bitget RWA charts, Finnhub company and market news, SEC filings, and Bitget Signal macro or crypto context.
- Email and Google authentication through Privy, with no wallet UI or embedded-wallet creation.
- Personalized data stored through authenticated server routes backed by Supabase.
- Fisk never places trades, connects wallets, custodies assets, guarantees returns, or disguises stale or demonstration data as live.
- Every material claim includes traceable evidence and timestamps; the user makes the final decision.
- Current open decision: the final `NEXT_PUBLIC_BITGET_REDIRECT_URL` has not been supplied.

## Brand Commitments

The product name is **Fisk** and its descriptor is **AI Market Intelligence**. Its voice is precise, calm, evidence-led, and candid about uncertainty. The public experience is editorial and inviting; the research desk is focused and analytical. Both belong to one authored identity and avoid crypto-casino styling.

## Evidence on Hand

The repository contains the authoritative product and build specification at `fisk-build.md`. No testimonials, customer logos, performance claims, or production data snapshots are currently available and future work must not fabricate them. Demonstration content must be clearly labelled when it is illustrative or captured.

## Product Principles

1. Evidence before confidence.
2. Human final control.
3. The interface follows the question.
4. News is a first-class research surface.
5. Data freshness and market-session differences are explicit.

## Accessibility & Inclusion

The interface must work with keyboard navigation, visible focus, reduced motion, responsive layouts, and non-colour indicators for market direction and status. Mobile uses a prioritized single column rather than a compressed desktop terminal.
