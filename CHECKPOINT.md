# Fisk redesign checkpoint

Saved: 2026-09-15

## Locked user direction

- Replace the previous visual direction completely.
- Landing hero uses the exact ThreeUI `ConstellationField` particle-network source, with centered copy.
- Do not put the chatbot input on the landing page.
- The landing bento must feel raised, dimensional, asymmetric, and visually exceptional.
- Rebuild `/desk` as a focused ChatGPT-style chat/work interface.
- Desk is news-first; remove charts for now.
- Remove model and reasoning/effort selectors from chat.
- Do not show demo, illustrative, synthetic, or fabricated content anywhere in the project. Provider failure uses a real empty/error state.

## Exact ThreeUI source verification

Fetched `https://threeui.com/source-code/particle-network.json` before editing.

Verified registered file hashes exactly:

- `NeuformBatchEffects.tsx`: `dc68c51bea26b922965de44b4fb8d6c432607508fb2b61e16ed60d245da1a69f`
- `particle-network.html`: `bc7bffdc48a9019cbba937dab9d335b85f20ac8a472f10dfa3d553da439cfdb7`
- `threeui.css`: `efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf`

Installed official `@designcodeio/threeui@1.2.0`. The package exposes `ConstellationField` and the exact `particle-network` variant. Root layout imports `@designcodeio/threeui/style.css`.

Configured usage is preserved in `components/landing/constellation-hero.tsx` with all requested props.

## Work completed but not yet verified

- Replaced landing page structure with centered constellation hero, CTA-only landing interaction, raised bento, live-news section, and honest empty state.
- Replaced desk structure with a centered news-chat workspace and compact sidebar.
- Added `components/news-chat.tsx` with no model or reasoning controls.
- Removed Finnhub's demo fallback; it now returns an empty result plus provider error.

## Continue from here

1. Add the new visual-system CSS for `.cosmos-*`, `.shader-frame`, `.fisk-chat-page`, `.chat-*`, and the new bento classes. Remove or neutralize obsolete redesign rules.
2. Remove every remaining runtime import/use of `lib/demo.ts`, then delete demo-only components/data if unused. Search with:
   `rg -n "demo|Demo|illustrative|Illustrative" --glob '!package-lock.json'`
3. Change Bitget and research fallbacks to honest unavailable/error results without fabricated content.
4. Update freshness types if `demo` is no longer needed.
5. Run TypeScript, ESLint, and production build.
6. Capture desktop/mobile landing plus desktop/mobile desk. Verify the ThreeUI canvas renders and animates in-browser.
7. Run Impeccable detector and finish reviewer; apply one bounded correction pass.
8. Update `DESIGN.md` and `.impeccable/design.json` for the new constellation/chat visual world.
9. Commit and push the finished work, then verify Vercel.

Current worktree is intentionally a mid-implementation checkpoint and may not compile until the CSS and cleanup steps above are completed.
