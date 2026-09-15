# FISK — ONE-SHOT BUILD SPECIFICATION

> Build the product. Spend the majority of the run implementing the experience, not generating broad test suites, speculative abstractions, or lengthy reports.

## 0. Operating instruction

You are building **Fisk**, an AI market-intelligence workbench for the Bitget AI Base Camp Hackathon S2, under **AI Trading Desk → Personalized Research Workbench**.

Work autonomously from this specification. Inspect current official documentation before integrating any external API or SDK. When an exact SDK method, request parameter, response field, authentication header, model endpoint, or package version exists, use the official documentation or the installed package types as the source of truth. Do not guess API shapes. Do not substitute blog posts, tutorials, search snippets, or invented mock interfaces for official documentation.

Do not ask the user to paste secrets into chat or commit them. Read credentials from environment variables. If a credential is missing, keep the adapter structurally complete, show a precise setup message in development, and preserve a clearly labelled demo snapshot path.

### Mandatory Impeccable workflow

The user has installed the **Impeccable** skill in Codex. At the beginning of the build, locate and read its current `SKILL.md` completely. Use it throughout the visual-system, landing-page, onboarding, responsive-layout, interaction, motion, and final interface-refinement work. Treat it as the primary UI craft workflow alongside this product specification. Do not merely mention Impeccable in the final report: actually apply its critique/refinement process. If it offers several workflows, select only those relevant to building and refining this product so it does not create unnecessary process or testing overhead.

This specification remains authoritative for product scope, architecture, security, data truthfulness, and hackathon requirements. Impeccable should improve execution quality without changing Fisk into a different product.

### One-time secure credential setup

Before implementation, inspect only whether the required environment-variable **names** exist; never print their values. If any required credentials are missing, the single allowed pause is one consolidated credential request containing every missing variable. After credential setup, do not interrupt the build to request keys individually, seek approval between sections, present checkpoints, or wait for the user to tell you to continue.

Offer to start one secure terminal setup session that collects all values using masked/no-echo input and writes `.env.local` directly. The user should enter secrets in that terminal session, not in Codex chat. Codex must create the environment file itself from those inputs.

Security requirements for this setup:

1. Add `.env.local`, `.env`, and relevant secret-file patterns to `.gitignore` **before** collecting anything.
2. Use an interactive terminal mechanism equivalent to `read -s`; characters and completed values must not be echoed.
3. Never place real secrets in an `apply_patch` call, command argument, source file, transcript, log, progress update, or final response.
4. Write the file with owner-only permissions (`chmod 600 .env.local`) and avoid leaving an intermediate plaintext file.
5. Automatically populate documented non-secret constants such as `QWEN_BASE_URL` and `QWEN_MODEL`; do not make the user type them.
6. After writing, verify only that each required variable is present and non-empty. Report variable names as configured/missing without values, prefixes, suffixes, or lengths.
7. Never display, `cat`, quote, summarize, repeat, or partially redact the completed `.env.local`.
8. Do not commit `.env.local`. Create and commit only `.env.example` with empty placeholders.
9. If Vercel variables must later be configured, transfer them through Vercel's secret/environment interface without printing them and ensure server-only secrets are not exposed as `NEXT_PUBLIC_*`.

The single secure setup session should collect these user-specific values together:

```text
BITGET_QWEN_API_KEY
NEXT_PUBLIC_PRIVY_APP_ID
PRIVY_APP_SECRET
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
FINNHUB_API_KEY
BITGET_WALLET_API_KEY
BITGET_WALLET_API_SECRET
SEC_USER_AGENT
NEXT_PUBLIC_BITGET_REDIRECT_URL
```

Set these constants automatically unless the user explicitly supplied different valid values:

```text
QWEN_BASE_URL=https://hackathon.bitgetops.com/v1
QWEN_MODEL=qwen3.8-max
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Resource policy

Build first. Testing must be proportional and minimal.

Required verification only:

1. Type-check/lint once after the principal implementation is assembled.
2. Run one production build and fix actual failures.
3. Run narrow smoke checks for Qwen, Finnhub, Bitget RWA authentication plus `stockList`/`kline`, Privy authentication, and one Supabase write/read.
4. Manually verify one complete judge flow from question to cited, actionable insight.
5. Check the primary desktop view and one mobile viewport for obvious breakage.

Do **not** create a large unit-test suite, exhaustive component tests, snapshot tests, coverage targets, synthetic benchmarks, repeated build loops, elaborate test infrastructure, or documentation about hypothetical tests. Add a focused regression test only if a concrete bug is difficult to protect without one. Never spend time testing static copy or trivial presentational components.

## 1. Product definition

**Name:** Fisk  
**Descriptor:** AI Market Intelligence  
**Positioning:** A natural-language research desk that continuously monitors US equities and their tokenized counterparts, invokes specialist tools, and turns market data, news, filings, and cross-asset context into decision-ready intelligence. The human makes the final decision.

Fisk is not an autonomous trading bot. It does not connect wallets, custody assets, place orders, recommend guaranteed returns, or pretend that stale data is live. The only execution assistance is an explicit outbound **View on Bitget** link.

### Core product promise

A user should be able to ask:

> How exposed is NVDA to this weekend's semiconductor news, what is the market pricing in, and what would invalidate the bullish thesis?

Fisk should select the necessary tools, visibly gather evidence, and reshape the workspace into a cited research packet containing the chart, relevant news, official filings where applicable, signals, bull and bear cases, risks, unknowns, and invalidation conditions.

## 2. Product principles

1. **Evidence before confidence.** Every material claim links to its source and timestamp.
2. **Human final control.** Fisk presents analysis; the user records the decision.
3. **The interface follows the question.** Research modules adapt to intent instead of returning one generic chat blob.
4. **News is a first-class surface.** It is not filler in a sidebar.
5. **24/7 context is explicit.** Distinguish the underlying US market session from tokenized-stock activity.
6. **Calm density.** Professional information density without visual clutter.
7. **Honest data states.** Live, cached, delayed, unavailable, and demo data must be visibly distinguishable.
8. **A designed world, not assembled screens.** Typography, copy, iconography, illustration, motion, data states, and onboarding must feel authored from the same Fisk point of view.

## 3. Required stack

- Next.js App Router with TypeScript
- Tailwind CSS
- shadcn/ui primitives only where useful; customize them so the product does not look templated
- Motion for restrained transitions and layout changes
- TradingView `lightweight-charts` for custom candlestick/line rendering
- Qwen `qwen3.8-max` through Bitget's OpenAI-compatible endpoint
- Privy React SDK and Privy Node SDK for Email and Google authentication only
- Supabase JavaScript client for persistence
- Finnhub REST API for equity news and company context
- Official `@bitget-wallet/api` TypeScript SDK for authenticated Bitget Wallet OpenAPI/RWA requests
- SEC EDGAR JSON APIs for filings and XBRL facts
- Bitget Signal public MCP/skills as the macro, cross-asset, sentiment, technical, and crypto-news perception layer
- Zod for all external response normalization and AI structured outputs
- Vercel deployment

Do not add Prisma, Drizzle, Redux, a second auth provider, WalletConnect, wagmi, embedded wallets, a trading SDK, Twelve Data, a paid TradingView library, or another news provider unless a verified blocker makes it necessary.

## 4. Environment contract

Create `.env.example` with placeholders only:

```bash
# Qwen via Bitget
BITGET_QWEN_API_KEY=
QWEN_BASE_URL=https://hackathon.bitgetops.com/v1
QWEN_MODEL=qwen3.8-max

# Privy
NEXT_PUBLIC_PRIVY_APP_ID=
PRIVY_APP_SECRET=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Equity news
FINNHUB_API_KEY=

# Bitget Wallet OpenAPI
BITGET_WALLET_API_KEY=
BITGET_WALLET_API_SECRET=

# SEC fair-access identification; use a real monitored project email
SEC_USER_AGENT=Fisk fiskresearch@example.com

# Public URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BITGET_REDIRECT_URL=
```

All secrets stay server-side. Only variables beginning with `NEXT_PUBLIC_` may reach browser bundles. Never log keys, raw authorization headers, Privy access tokens, or the Bitget signature payload.

## 5. Information architecture

### Public routes

- `/` — editorial landing page and live market pulse
- `/stock/[ticker]` — public stock overview with chart, rToken status, and news
- `/login` — minimal Privy-powered Email/Google entry
- `/methodology` — concise explanation of sources, freshness labels, confidence, and human-control policy

### Authenticated routes

- `/desk` — adaptive AI research workspace
- `/desk/[sessionId]` — persisted research session
- `/watchlist` — personalized equities and rTokens
- `/journal` — human decision records and outcome reviews
- `/settings` — research preferences, risk profile, sectors, time horizon, and account controls

### Server routes

- `/api/market/rwa/list`
- `/api/market/rwa/[ticker]`
- `/api/market/rwa/[ticker]/kline`
- `/api/news`
- `/api/filings/[ticker]`
- `/api/research`
- `/api/research/[sessionId]`
- `/api/watchlist`
- `/api/journal`
- `/api/health/providers` in development only; never reveal secrets

## 6. Visual and interaction direction

The goal is not to imitate Apple's website. Apply the qualities that make Apple interfaces compelling: hierarchy, restraint, immediate feedback, precise spacing, coherent motion, progressive disclosure, and obsessive state design.

### Experience split

Fisk has two deliberately related modes:

- **The public experience is editorial and inviting:** light or softly tinted canvas, oversized type, confident negative space, visual storytelling, and a constantly alive market/news layer. It should make a complex product feel desirable before asking the visitor to learn it.
- **The research desk is focused and analytical:** darker graphite workspace, tighter information density, high-legibility data, and restrained controls. It should feel like entering a professional instrument, not visiting a second unrelated brand.

The transition from landing page to desk should feel continuous through shared typography, Fisk accent color, motion curves, radii, iconography, and voice.

### Visual language

- Editorial-light public surface and dark-first market desk; neither should resemble neon cyberpunk.
- Soft mineral/off-white landing canvas; near-black graphite desk with high-contrast off-white type.
- One restrained Fisk accent color; reserve green/red for market semantics.
- Use a modern grotesk for UI and a disciplined monospace for prices, timestamps, tickers, and numeric deltas.
- Strong typographic scale and generous negative space around important decisions.
- Bento composition with varied module sizes based on importance. Do not create a wall of identical rounded cards.
- Borders should be subtle. Shadows should establish hierarchy, not create glowing glass panels.
- No generic gradient blobs, floating coins, robot illustrations, fake 3D dashboards, excessive glassmorphism, or crypto casino styling.
- If custom imagery is used, it must express Fisk's own idea—evidence, market relationships, continuous observation, and clarity—not mascots, coins, or borrowed visual metaphors.
- Create a small coherent family of bespoke visual motifs and reuse them with restraint. Do not mix unrelated stock photography, random icons, and generic AI art.

### Motion

- Use short spring transitions for module insertion/reordering.
- Stream research steps without layout jumps.
- Preserve scroll position when the workspace adapts.
- Provide skeletons shaped like the final content.
- Every clickable surface needs hover, pressed, focus, loading, success, and failure states.
- Respect `prefers-reduced-motion`.

### Landing page composition

1. Quiet, precise navigation with one unmistakable **Open Fisk** action. Avoid a crowded SaaS header.
2. Thin live market/news ribbon: underlying session status, rToken 24/7 status, major movers, breaking headlines, and freshness time. It should immediately communicate that Fisk is awake and current.
3. Hero: **See what the market is missing.** Use oversized editorial typography, a large natural-language input, and three high-quality example prompts. The hero must have one memorable Fisk-native visual composition rather than a screenshot floating in a card.
4. A four-item proof strip: live sources, tokenized equities, no wallet needed, human final decision.
5. Market Pulse Bento:
   - dominant breaking-news/editorial card;
   - compact movers list;
   - 24/7 rToken activity card;
   - watchlist card after login;
   - a small macro context module.
6. Live Newsroom: filterable, source-rich feed with clear visual rhythm.
7. One interactive, scroll-led demonstration of a question becoming a research workspace. Explain the benefit through the transformation rather than a feature checklist.
8. Three composed use-case scenes: weekend catalyst, earnings research, and underlying-versus-rToken divergence.
9. Human-control statement and methodology link.

The landing page must be useful before login. Let visitors explore stocks, news, charts, and one demo research path first. Authentication is requested only when the user wants to save, personalize, journal, or continue a research session. Use reassuring microcopy such as **Explore first. Sign in only when you want Fisk to remember.**

### Research desk composition

- Compact global navigation and stock switcher.
- Main canvas prioritizes the chart and the current research thesis.
- Persistent but collapsible AI composer/panel on the right at desktop widths.
- Watchlist/context rail on the left only when space permits; collapse before squeezing the main chart.
- Adaptive Bento modules below/around the chart: catalysts, news, filings, technical signals, cross-asset context, bull case, bear case, stress test, unknowns, and citations.
- On tablets/mobile, use a single prioritized column and a bottom-sheet AI composer. Never show a shrunken three-column terminal.

## 7. Newsroom specification

News is a core product, not secondary decoration.

### Sources

- Finnhub company news is primary for ticker-specific equity stories.
- Finnhub market news supplies the broad equity feed when available under the user's plan.
- SEC 8-K filings appear as first-party corporate events, not ordinary media stories.
- Bitget Signal `news-briefing` contributes crypto and cross-asset context, not a replacement for company news.

### Normalized news item

```ts
type NewsItem = {
  id: string;
  headline: string;
  summary: string;
  source: string;
  sourceUrl: string;
  imageUrl?: string;
  publishedAt: string;
  fetchedAt: string;
  tickers: string[];
  sentiment: "bullish" | "bearish" | "neutral";
  relevance: number; // 0..1
  impact: string; // one concise AI-generated implication
  category: "company" | "earnings" | "filing" | "macro" | "regulatory" | "crypto";
  freshness: "live" | "cached" | "delayed" | "demo";
};
```

### Feed behavior

- Deduplicate by canonical URL and normalized-headline similarity.
- Cluster multiple outlets covering the same event.
- Sort primarily by user relevance and secondarily by recency; offer Latest and Impact toggles.
- Filters: watchlist, ticker, sector, earnings, filings, macro, crypto/rToken.
- Each item shows source, exact relative time, ticker chips, impact label, original-link affordance, and **Ask Fisk**.
- `Ask Fisk` opens a research session with the story, ticker, timestamp, and source already attached as evidence.
- Never fabricate article text. Summarize only returned headline/summary content and link outward for the original.
- Cache raw provider responses briefly and normalized stories longer to protect free quotas. Use stale-while-revalidate.
- A failed image must degrade to a typographic source tile without breaking layout.

## 8. Market data and charts

TradingView Lightweight Charts is the renderer. It contains no market data. Feed it normalized candles from Bitget RWA.

### Official Bitget client

Install:

```bash
npm install @bitget-wallet/api
```

Instantiate on the Node.js server only:

```ts
import { BitgetWalletApiClient } from "@bitget-wallet/api";
import { createSigningFetch } from "@bitget-wallet/api/auth";

export const bitget = new BitgetWalletApiClient({
  fetch: createSigningFetch({
    apiKey: process.env.BITGET_WALLET_API_KEY!,
    apiSecret: process.env.BITGET_WALLET_API_SECRET!,
  }),
  timeoutInSeconds: 10,
  maxRetries: 2,
});
```

The official SDK handles the required `x-api-key`, millisecond `x-api-timestamp`, and base64 HMAC-SHA256 `x-api-signature`. Do not reimplement signing unless the current SDK lacks a required endpoint.

### Required RWA calls

Use SDK resource methods and installed TypeScript types where available. Confirm method names against the installed version.

- Stock list: `client.rwa.stockList({})`
- Stock detail: official `stockInfo` method using `ticker`, or `chain` plus `contract`
- K-line:
  - underlying/off-chain path: `chain: "rwa"`, `contract: ticker`
  - tokenized path: actual chain plus contract address
  - supported request fields from official docs: `chain`, `contract`, optional `period`, `size`, `end_time`
- Transaction list: actual `chain` and `contract`, optional `side`, `page`, `size`

Normalize provider candles:

```ts
type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
};
```

Chart requirements:

- Candlestick and line toggle.
- 5m, 15m, 1h, 4h, 1D ranges only if supported by returned data.
- Responsive resize without recreating the chart unnecessarily.
- Price/volume crosshair, visible latest-price line, semantic up/down colors, and accessible textual summary.
- Toggle or compare **Underlying** and **rToken** when both exist.
- Clearly show market state: underlying market open/closed and rToken trading 24/7.
- Show data source and last-updated time beside the chart.
- Never interpolate missing candles as if they traded.

### Resilience

Data resolution order:

1. Fresh Bitget response.
2. Recently cached verified response.
3. Bundled demo snapshot for a small set such as NVDA, TSLA, and AAPL.

Demo snapshots must be captured from real successful responses, stripped of sensitive metadata, stored with `capturedAt`, and labelled **Demo snapshot · captured [date]**. Never silently replace live data with fixtures.

Do not add Twelve Data at the start. Add a secondary market-data provider only if the verified Bitget stock/rToken coverage cannot support the final demo story.

## 9. SEC EDGAR integration

Use `data.sec.gov` JSON endpoints. They require no key. Every request must send a descriptive User-Agent from `SEC_USER_AGENT`. Calls must be made server-side because `data.sec.gov` does not support browser CORS.

Use:

- company submissions for recent 10-K, 10-Q, and 8-K filing metadata;
- company facts/XBRL only when numeric filing evidence materially improves the answer;
- official filing URLs as citations.

Maintain a small ticker-to-CIK lookup cache. Respect SEC fair-access limits, avoid burst fetching, and cache filings aggressively because filings do not change after publication. Do not scrape entire filings when metadata or specific facts answer the question.

## 10. Authentication and personalized data

### Privy

Install current official packages:

```bash
npm install @privy-io/react-auth @privy-io/node
```

Configure `PrivyProvider` using `NEXT_PUBLIC_PRIVY_APP_ID`. In both dashboard settings and SDK configuration, permit only:

```ts
loginMethods: ["email", "google"]
```

Disable automatic embedded-wallet creation. Do not install Solana wallet dependencies, external wallet connectors, or display any wallet UI.

For every authenticated server mutation/read, obtain the current Privy access token on the client, send it as `Authorization: Bearer <token>`, and verify it with the official Privy Node SDK before touching user data. The verified Privy user ID is the canonical `user_id`.

### Supabase access model

Use the publishable key in the browser only for genuinely public/read-only data if needed. Personalized tables are accessed through authenticated Next.js server routes after Privy token verification. Those routes use the Supabase server client/service-role key and always scope queries by the verified Privy user ID.

This deliberately avoids pretending that a Privy token is a Supabase Auth token. Do not build a second login system. Never accept a client-supplied user ID as authority.

### Tables

Create one SQL migration with:

- `profiles`: `user_id` text PK, email, display_name, created_at, updated_at
- `preferences`: user_id PK/FK, sectors jsonb, risk_tolerance, horizon, experience_level, default_view, updated_at
- `watchlist_items`: id uuid, user_id, ticker, asset_type, created_at; unique `(user_id,ticker,asset_type)`
- `research_sessions`: id uuid, user_id, title, query, primary_ticker, status, synthesis jsonb, created_at, updated_at
- `research_evidence`: id uuid, session_id, provider, source_url, title, published_at, fetched_at, payload jsonb
- `research_steps`: id uuid, session_id, tool_name, state, summary, started_at, completed_at
- `journal_entries`: id uuid, user_id, session_id nullable, ticker, decision, thesis, confidence, invalidation, horizon, review_at, outcome jsonb, created_at, updated_at

Add indexes on user/time, ticker/time, and session foreign keys. Enable RLS on all personalized tables and deny direct anonymous writes. Server routes remain the controlled data boundary.

## 11. Qwen research engine

Use:

```text
Base URL: https://hackathon.bitgetops.com/v1
Model: qwen3.8-max
Environment key: BITGET_QWEN_API_KEY
Protocol: OpenAI-compatible Responses API
```

Use the current official OpenAI-compatible client interface supported by the endpoint. Keep the model adapter isolated in `lib/ai/qwen.ts` so a future provider can be swapped without changing tools or UI.

### Tool registry

Expose narrow, typed server tools:

- `get_stock_overview(ticker)`
- `get_stock_candles(ticker, period, size, assetMode)`
- `get_company_news(ticker, from, to)`
- `get_market_news(category)`
- `get_recent_filings(ticker, forms)`
- `get_company_facts(ticker, concepts)`
- `get_rtoken_mapping(ticker)`
- `get_rtoken_transactions(chain, contract, side, page, size)`
- Bitget Signal research tools where available
- `save_research_session(...)`
- `save_journal_entry(...)`

Tool inputs and outputs must be validated with Zod. The model never receives API secrets or raw privileged objects.

### Research loop

1. Classify intent: brief, catalyst, earnings, compare, risk, technical, filing, rToken, or open research.
2. Produce a short visible research plan.
3. Invoke only tools necessary for the question, preferably in parallel when independent.
4. Normalize all evidence with provider, source URL, published/fetched timestamps, and freshness state.
5. Synthesize a structured answer.
6. Run one compact self-review pass checking unsupported claims, stale evidence, conflicting sources, and missing counterarguments.
7. Render adaptive workspace modules and citations.

Do not create uncontrolled recursive agents or long autonomous loops. Cap tool rounds and surface a useful partial answer when a provider fails.

### Structured result

Return a schema shaped around:

```ts
type ResearchResult = {
  directAnswer: string;
  thesis: string;
  confidence: "low" | "medium" | "high";
  asOf: string;
  keyFindings: Array<{ claim: string; evidenceIds: string[] }>;
  catalysts: Array<{ event: string; date?: string; direction: "positive" | "negative" | "mixed" }>;
  bullCase: string[];
  bearCase: string[];
  stressTests: Array<{ scenario: string; implication: string; evidenceIds: string[] }>;
  invalidationConditions: string[];
  unknowns: string[];
  modules: Array<"chart" | "news" | "filings" | "signals" | "comparison" | "stress-test">;
  evidence: Evidence[];
};
```

Confidence is an evidence-quality label, not a probability of profit.

## 12. Bitget Signal integration

Bitget Signal is crypto-focused. Use it for the research dimensions where it is genuinely relevant:

- `macro-analyst`: Fed policy and cross-asset relationships such as BTC versus Nasdaq/S&P/DXY/Gold/10Y
- `market-intel`: on-chain and institutional context
- `sentiment-analyst`: positioning, funding, open interest, and crypto sentiment
- `technical-analysis`: indicators when appropriate
- `news-briefing`: crypto/macro narrative context

Do not use it as the primary source for US-company news or SEC disclosures.

Install the official package for Codex during the build if not already available:

```bash
npx @bitget-ai/bitget-signal --target codex
```

The package installs five instruction skills and registers Bitget's public HTTP MCP server. It needs no account or API key. Inspect the installed MCP tool schemas before calling them; do not invent tool names or parameters. If the deployed Next.js runtime cannot directly consume the registered host MCP safely, implement the web product's core path with the explicit REST adapters above and use the official Bitget Signal workflow in the demonstrated research layer. Document exactly which tools were invoked; do not claim runtime integration that does not exist.

## 13. Finnhub integration

Use the official company-news endpoint contract from Finnhub's API documentation. Keep all calls server-side with `FINNHUB_API_KEY`.

Requirements:

- Resolve a bounded date window; do not request unbounded history.
- Normalize Unix timestamps correctly.
- Preserve the original URL, source, headline, summary, image, category, related ticker, and provider ID when returned.
- Cache provider responses and coalesce identical concurrent requests.
- Handle rate-limit and plan-restriction responses explicitly.
- Never make one Finnhub request per rendered card.

## 14. Personalization and decision journal

On first authenticated use, show a beautifully composed preference sheet—not a settings form. Ask **What do you watch?** and present six visual, multi-select interest tiles with recognizable ticker marks:

- AI & semiconductors;
- crypto & exchanges;
- consumer technology;
- finance & fintech;
- energy & industrials;
- everyday brands.

Then ask only what improves research:

- markets/sectors of interest;
- typical horizon: intraday, swing, long-term;
- risk tolerance;
- experience level;
- optional starter watchlist.

Keep this flow to two lightweight steps, include **Skip**, and immediately preview how the chosen interests change the watchlist/news mix. Do not block public exploration with onboarding. Use these preferences to rank news, choose explanation depth, and select relevant stress tests. Never silently change factual analysis to agree with the user's thesis.

The journal records the user's decision—not Fisk's execution:

- watching / bullish / bearish / no-action;
- thesis;
- confidence;
- invalidation condition;
- intended horizon and review date.

At review time, compare the original thesis with subsequent evidence. Preserve the original entry; append outcomes rather than rewriting history.

## 15. Bitget redirect

Use a clearly labelled outbound action such as **View on Bitget** or **Explore on Bitget**. It opens `NEXT_PUBLIC_BITGET_REDIRECT_URL` in a new tab with safe `rel` attributes.

Do not label it Buy, Trade Now, or Execute unless the destination and asset mapping have been verified. Do not pass user secrets, Privy identifiers, or unapproved tracking data in the URL. No wallet connection is permitted.

## 16. Freshness, citations, and trust UI

Every data-bearing module must display:

- source/provider;
- relevant market timestamp;
- fetch timestamp where useful;
- live/cached/delayed/demo state;
- direct source link when one exists.

Research claims use numbered evidence citations that open a source drawer. The drawer shows the supporting excerpt/summary, provider, original URL, publication time, and which claims rely on it.

Never use green/red alone to convey meaning. Include text/icons and accessible labels. Add a concise disclaimer: **Research assistance, not financial advice. You make the final decision.**

## 17. Performance and reliability

- Server-render the useful landing shell and initial news payload.
- Lazy-load the chart and heavy research modules.
- Stream research progress and structured sections when supported.
- Cache public market/news data with explicit freshness metadata.
- Debounce symbol search and cancel obsolete requests.
- Use provider timeouts, at most two retries for transient failures, and exponential backoff where the official SDK supports it.
- Protect Qwen and provider endpoints with authenticated user limits plus sensible anonymous limits.
- Avoid waterfalls: fetch independent chart, news, and stock metadata concurrently.
- Keep raw provider payloads out of the client unless required for display.

## 18. Continuous one-shot execution

This is one uninterrupted implementation run—not a phased engagement. The sequence below is an internal ordering guide, not a set of milestones requiring user approval. After the single credential setup, continue autonomously through the entire list, fix blockers within scope, deploy, and return only when the complete product satisfies the definition of done. Do not stop after the landing page, an integration, authentication, or any other intermediate checkpoint. Do not ask “continue?” or propose a future phase.

1. Read Impeccable and establish one written visual concept for Fisk.
2. Scaffold the app, design tokens, typography, navigation, responsive shell, bespoke motifs, and reusable primitives.
3. Build the editorial-light landing page and dark desk shell as one coherent identity, including the live ribbon, authored hero composition, Newsroom structure, and intentional loading/empty/error states.
4. Implement the official Bitget SDK adapter and confirm `stockList` plus one K-line through the narrow smoke check.
5. Implement Finnhub normalization/caching, the live Newsroom, SEC filings, and the stock/rToken chart comparison using TradingView Lightweight Charts.
6. Implement the typed research-tool registry and Qwen Responses integration, stream visible research activity, and render adaptive research modules plus the evidence drawer.
7. Integrate Privy Email/Google authentication, server-side token verification, the Supabase migration, personalization, watchlists, saved sessions, and the decision journal.
8. Complete the flagship NVDA/weekend-semiconductor research flow from natural-language question to cited, stress-tested insight and human decision.
9. Apply the Impeccable refinement pass across hierarchy, spacing, interaction states, motion, responsive behavior, accessibility, copy, metadata, Open Graph image, favicon, and the outbound Bitget action.
10. Add an honestly labelled demo-data fallback captured from successful real responses, complete the methodology page, run only the required final verification, deploy to Vercel, and confirm the deployed flagship flow.

Parallelize independent work where safe. Do not serialize unrelated integrations merely because they appear sequentially above. The goal is one finished deployment, not progress reports about partially completed layers.

## 19. Definition of done

The product is done when:

- A visitor can understand Fisk within ten seconds and browse a real news-rich market pulse.
- The landing page feels intentionally art-directed rather than assembled from a UI kit, while the desk remains serious and operational.
- Moving from the editorial landing page into the dark desk feels like entering a deeper mode of the same product.
- A user can authenticate with Email or Google without seeing a wallet prompt.
- A stock page shows a functioning, source-labelled chart and meaningful news.
- Fisk can take a natural-language question, invoke multiple appropriate tools, visibly show progress, and return structured cited research.
- The answer contains both supporting and opposing evidence, unknowns, stress tests, and invalidation conditions.
- The user—not the AI—records the final decision.
- A tokenized-stock surface uses verified Bitget RWA data or is honestly labelled as a demo snapshot.
- The application has a functioning Bitget outbound redirect and no execution or custody path.
- Loading, empty, rate-limited, stale, partial-provider-failure, and demo states look intentional.
- The production build passes and the flagship judge flow works on the deployed URL.

## 20. Hackathon submission alignment

Prepare the product and repository so the submission can clearly demonstrate:

- **Feature depth/data sources/skill integrations:** Finnhub, SEC, Bitget RWA, Bitget Signal, TradingView rendering, and Qwen tool orchestration.
- **Research quality:** citations, freshness, bull/bear reasoning, contradiction detection, unknowns, and invalidation.
- **LUI fluency:** natural-language question changes the workspace and invokes tools visibly.
- **Personalized thesis:** preferences, watchlists, saved sessions, and decision journal.
- **Human final decision:** no autonomous execution.

Preserve a concise provider/tool activity record per research session for the demo. Prepare one complete question-to-actionable-insight path. Ensure the eventual submission includes an accessible demo, a full project description, Qwen's exact role, supporting materials, and the required X post containing `#BitgetHackathon` and `@Bitget_AI`. Include the user's full university name in the submission to enter the University Special Prize if desired.

## 21. Official sources Codex must consult

- Hackathon handbook and judging: <https://bitget-ai.gitbook.io/bitgetai_hackathons2#iv.-tracks-submission-and-judging>
- Qwen subsidy/setup: <https://bitget-ai.gitbook.io/bitgetai_hackathons2#qwen-token-subsidy-during-the-hackathon>
- Bitget Wallet authentication: <https://web3.bitget.com/en/docs/authentication>
- Bitget RWA market data: <https://web3.bitget.com/en/docs/market/rwa>
- Bitget Wallet TypeScript SDK: <https://github.com/bitgetwallet/tob-api-sdk-ts>
- Bitget Signal: <https://github.com/Bitget-AI/bitget-signal>
- TradingView product comparison: <https://www.tradingview.com/charting-library-docs/latest/getting_started/product-comparison/>
- TradingView Lightweight Charts docs: <https://tradingview.github.io/lightweight-charts/>
- Privy documentation index: <https://docs.privy.io/llms.txt>
- Privy React setup: <https://docs.privy.io/basics/react/setup>
- Privy access tokens: <https://docs.privy.io/authentication/user-authentication/access-tokens>
- Supabase JavaScript guide: <https://supabase.com/docs/reference/javascript/introduction>
- Finnhub company news: <https://finnhub.io/docs/api/company-news>
- SEC EDGAR APIs: <https://www.sec.gov/search-filings/edgar-application-programming-interfaces>
- SEC developer resources/fair access: <https://www.sec.gov/about/developer-resources>

When documentation and assumptions conflict, the current official documentation and installed SDK types win. Record material deviations in a short `IMPLEMENTATION-NOTES.md`; do not turn that file into a diary.
