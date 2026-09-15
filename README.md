# Fisk

Fisk is an AI market-intelligence workbench for US equities and their tokenized counterparts. It turns a natural-language question into an adaptive research packet with market data, news, filings, bull and bear cases, stress tests, invalidation conditions, and direct source citations.

## Run locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and supply the documented provider credentials. Never commit local environment files.

## Data and control

Bitget Wallet RWA supplies stock and tokenized-market mapping and candles. Finnhub supplies company news. SEC EDGAR supplies first-party filing metadata and facts. Bitget Qwen synthesizes normalized evidence through the Responses protocol. Bitget Signal supplies host-assisted macro, technical, sentiment, on-chain, and crypto-news context when invoked.

Fisk does not connect wallets, custody assets, or place orders. Research assistance is informational; the user records the final decision.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```

The Supabase schema is in `supabase/migrations/001_initial.sql`.
