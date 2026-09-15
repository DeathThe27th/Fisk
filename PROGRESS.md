# Fisk build progress

**Status:** 95% — publishing and external service setup

## Complete

- Phase 1 preserved and reconciled with the updated build specification.
- Public editorial landing page and full research desk implemented.
- Stock, methodology, authentication, watchlist, journal, and settings routes implemented.
- Bitget RWA, Finnhub, SEC EDGAR, Qwen, Privy, and Supabase adapters implemented.
- Typed research orchestration, citations, evidence grading, risks, invalidation, and stress tests implemented.
- Supabase schema, indexes, row-level security policies, and authenticated persistence routes prepared.
- Responsive design system, accessibility states, reduced motion, metadata, manifest, and social image implemented.
- `@ui-layouts/mcp` and Bitget Signal tooling installed.
- Live provider smoke checks completed for Bitget RWA, Finnhub, SEC EDGAR, and Qwen.
- TypeScript, ESLint, and the production build pass.
- Production browser smoke tests pass for the landing page, research desk, stock page, and live provider routes.
- Desktop and mobile captures pass the Impeccable visual review; the mechanical detector reports no findings.
- The shipped design system is recorded in `DESIGN.md` and `.impeccable/design.json`.

## In progress

- Publishing the verified build to the repository and linked Vercel project.

## Remaining

- Apply `supabase/migrations/001_initial.sql` to the linked Supabase project.
- Authenticate the Vercel CLI or use the linked Git integration.
- Deploy and verify the existing Vercel alias.

## Known configuration gap

- `NEXT_PUBLIC_BITGET_REDIRECT_URL` still needs the final Bitget redirect URL. The app currently uses a safe Bitget website fallback.
