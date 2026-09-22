# Fisk AI / UX checkpoint — 2026-09-22

## Resume point

The last pushed baseline before this batch was `545acab` (`Make Qwen research responses schema tolerant`). This batch is ready to commit and push as the next checkpoint. The user asked to pause here because the local PC is under load.

## Completed in this batch

- Added document-aware research ingestion with `pdf-parse`.
  - Accepts PDF, TXT, MD, CSV, JSON, XML, and HTML uploads.
  - Limits each file to 8 MB and extracted context to 45,000 characters.
  - Supports multipart form submissions through `/api/research` while retaining JSON requests.
- Passed uploaded-document evidence into the research pipeline and Qwen prompt, with a stronger structured answer contract.
- Added `components/research-result-view.tsx` for rich assistant answers: verdict, findings, bull/bear cases, catalysts, stress tests, invalidation, source cards, and follow-up actions.
- Updated desk and stock chat with expand/contract controls, document upload, richer result rendering, and shared FormData handling.
- Desk stock questions can detect a ticker/company and route to that stock page while answering, when no attachment is being analyzed.
- Started relevance filtering for Finnhub company/general news so stock pages do not blindly show unrelated headlines.
- Updated landing copy to “Your real-time research partner,” changed the hero actions, removed Methodology navigation, deleted `app/methodology/page.tsx`, and updated metadata/manifest/Open Graph copy.
- Added the small stock-page navigation/color refinements and supporting chat/result styles.

## Verification at pause

- `git diff --check` passed.
- The attachment/chat implementation passed `npm run typecheck` before the final landing/AuthButton/metadata edits.
- A full typecheck after those final edits and a production build/browser pass are still pending. Deleting the Methodology page may require a fresh Next build to regenerate stale `.next/types` output.

## Next resume tasks

1. Run typecheck/build after the final landing edits and fix any generated `.next` stale-type issue.
2. Add/verify styling for the new landing hero sign-in button (`.ed-hero-signin`).
3. Validate the Finnhub relevance filter against representative stock pages and improve source coverage using the configured news API.
4. Exercise desk-to-stock navigation, attachment extraction, rich source cards, and expanded chat in a browser.
5. Review the assistant’s action-oriented behavior and persisted history/watchlist/journal work before calling the AI UX pass complete.

## Deliberately not included

The existing untracked `FISK-STOCK-EXPERIENCE-REBUILD.md` brief and `From Klickpin.com- 479703797832817653-pin-id-479703797832817653.mp4` asset are intentionally left untouched and unstaged.

## Impeccable context note

The existing `.impeccable/design.json` sidecar is stale relative to `DESIGN.md`, and `.impeccable/config.json` has no `buildPath`; these were left untouched because the user requested a low-load checkpoint rather than documentation/config maintenance.
