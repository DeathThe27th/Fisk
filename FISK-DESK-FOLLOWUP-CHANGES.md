# Fisk Desk — Follow-up Changes Only

## Read this first

This is an incremental correction brief for the current Fisk implementation at `https://fisk-nu.vercel.app/desk`.

The previous redesign brief has already been implemented. **Do not restart the redesign, rebuild completed sections, or repeat work that is already present.** Inspect the current repository and live/current Desk first, then make only the changes listed here.

This follow-up contains newer instructions and overrides conflicting colour, card, stock-detail, and mascot-animation guidance from earlier prompts. Preserve all working APIs, authentication, routes, data fetching, navigation, ticker, search, filters, watchlist behavior, floating prompt, and responsive behavior unless a listed correction requires a focused adjustment.

Use the installed Impeccable skill for implementation and the final visual-polish pass. Complete the changes in one continuous execution rather than stopping after phases.

## 1. Change the product from monochrome to Fisk green and white

The current Desk is too black-and-white. Restyle it into a green-and-white Fisk identity while retaining the existing layout and content.

### Required palette

| Token | Use | Hex |
| --- | --- | --- |
| Forest | Primary brand panels, active states, ticker | `#0B3D2E` |
| Fisk green | Buttons, focus, selections | `#18A66F` |
| Mint | Soft AI surfaces and restrained tints | `#DDF7E9` |
| Lime | Rare signal/discovery accent | `#B9F227` |
| Paper | Main page background | `#F8FBF8` |
| White | Cards and elevated surfaces | `#FFFFFF` |
| Ink | Main text and cat silhouette | `#102019` |
| Muted | Secondary text | `#66736C` |
| Border | Dividers and card borders | `#DCE7E0` |
| Market up | Positive movement | `#11875D` |
| Market down | Negative movement | `#E45D68` |
| Warning | Stale/uncertain data | `#D89B32` |

Apply it as follows:

- Navigation remains clean white; use a forest Fisk mark and green active indicator.
- Change the market ticker from black to forest green with white text.
- Change the hero from near-black to a rich forest/mint composition with white or ink text as contrast requires.
- Keep the main canvas warm white.
- Primary actions use forest or Fisk green.
- AI/chat controls use forest green, mint, and white.
- Use lime only as a small discovery highlight; do not cover large surfaces with it.
- Preserve red/coral for negative movement. Never make brand green the only cue for positive data; retain signs, arrows, or labels.
- Avoid blue as a primary brand colour, generic emerald gradients, rainbow pastel cards, and a dark crypto-terminal aesthetic.

## 2. Rebuild only the stock cards to match Daybreak's listing anatomy

The current stock grid exists, so keep the search, filters, stock set, routes, save behavior, and grid logic. Replace the card presentation with the tall visual listing style shown in Daybreak.

Reference: `https://www.daybreakcircles.lol/app`

### Required card anatomy

- Four tall portrait cards per row on large desktop screens.
- Narrow, consistent gaps and equal card heights.
- Rounded white card with a fine border and restrained shadow.
- Large upper identity area taking roughly half the card height.
- Oversized company logo centred in that upper area.
- Use white, pale mint, or an extremely restrained company-aware tint behind the logo.
- Small save/bookmark control in the upper-left corner.
- Dark forest/ink rounded price pill in the upper-right corner containing a small `PRICE` label and the current price.
- Beneath the logo area, show ticker prominently with company name beside it in muted text.
- Add a compact `24h` sparkline across the available width.
- Use green for upward movement and coral/red for downward movement.
- Finish with a thin divider and two-sided metadata footer using fields the app can reliably source: sector/exchange, market cap/data freshness, or symbol/source.
- Make the entire card open the stock while the save button remains independently clickable.
- Add subtle hover lift, border response, logo motion, pressed state, and visible keyboard focus without moving adjacent cards.

Do not invent market values. Keep honest pending, stale, cached, or unavailable states. If card price data is still pending, render a card-shaped skeleton or labelled unavailable state instead of collapsing the design.

### Chart clarification

The default Desk should not contain a large research chart. The small 24-hour sparklines inside stock cards are required. The full interactive chart appears only after a stock is selected or identified through Fisk.

## 3. Refine the existing stock selection into a Daybreak-style research overlay

Do not create a disconnected new product page if the existing stock route can support an overlay state.

- Clicking a card should open a large rounded white research overlay above the existing Desk, similar to Daybreak's `?stock=GOOGL` interaction.
- Keep the Desk visible, softly dimmed and blurred behind the overlay.
- Lock background scrolling while open.
- Provide a clear close control and support Escape, browser back, and a shareable/deep-linkable stock URL.
- Preserve the Desk's search, filters, and scroll position after closing.
- The overlay scrolls independently.
- On mobile it becomes a full-screen research view.
- Keep Fisk-specific content: price context, news, filings, signals, sources, thesis evidence, and the AI conversation.
- Use a **line chart only** for the full chart. Remove any candlestick or chart-type switcher.
- The floating Fisk input should expand into the right-side AI conversation panel when used; preserve the conversation when collapsed.

## 4. Add meaningful cat interactions to the current static mascot

The existing Desk already contains the cat. Do not replace it with an unrelated character or add cats everywhere. Convert it into a small reusable stateful mascot system and add restrained reactions where they improve interaction.

### Required interactions

- Navbar cat mark blinks occasionally at irregular intervals.
- Hero cat eyes subtly follow the pointer only while the pointer is inside the hero.
- One ear may twitch after a longer idle period; do not loop it continuously.
- The tail can curl or point subtly toward the primary CTA.
- Hovering `Explore stocks` makes the cat glance toward the stock grid.
- Activating `Explore stocks` makes it duck/peek while the page scrolls.
- Hovering or focusing `Ask Fisk` makes the cat look toward the floating prompt.
- Focusing the prompt opens/wakes the cat's eyes.
- While stock search results resolve, the eyes scan left and right; on completion they look toward the first result.
- When a stock is selected, the cat focuses on its ticker while the card transitions into the overlay.
- During AI research, the eyes move between small source indicators and blinking pauses.
- Successful save/research uses one short tail curl or a single lime star.
- Errors and conflicting evidence use a skeptical side-eye.
- Empty search/filter results use a peeking cat with a clear reset action.
- During line-chart hover, an optional small workspace cat may follow the active data point with its eyes, but it must never cover the chart.

Implement named animation variants/states so reactions are consistent. Avoid constant motion, full-viewport pointer tracking, bouncing, cats on every stock card, and animations that delay completed actions.

Respect `prefers-reduced-motion`. Critical meaning must never depend on animation.

## 5. Loading behavior

Retain the existing whimsical Fisk loading concept, but connect it to real system state:

- Simple buttons and filters respond instantly.
- Route/overlay transitions may take roughly 300–700 ms.
- Opening stock research may use roughly 800–1200 ms while real data resolves.
- AI research animation runs only for the actual request duration.
- Do not impose a fake five-second wait.
- Use varied scenes such as peeking, scanning sources, comparing tickers, and skeptical checking rather than one repeated spinner.

## 6. Do not redo these completed parts

Unless broken, retain the current:

- Desk navigation and route mapping.
- Market-news ticker logic.
- Page heading and basic hero structure.
- Stock search and category filters.
- Existing list of supported stocks.
- Watchlist/save logic.
- Floating Fisk prompt and its simplified controls.
- Data integrations and cached fallbacks.
- Auth, environment configuration, and deployment setup.

Do not restore the earlier Bento-esque layout or old navbar instructions. New information in this file wins where there is any conflict.

## Verification

Before finishing, verify the focused changes:

- Green-and-white branding is consistently applied on desktop and mobile.
- Stock cards match Daybreak's tall hierarchy and include 24-hour sparklines.
- Pending/unavailable data remains honest and visually intentional.
- Stock selection opens the focused overlay and closing preserves Desk state.
- The full chart is line-only.
- Floating chat expands into the side panel without covering chart controls.
- Cat interactions trigger from the intended controls and remain restrained.
- Reduced-motion mode removes nonessential motion.
- Search, filters, save, stock opening, close/back navigation, chart ranges, AI submit/stop, and citations still work.
- The production build succeeds.

At handoff, report only the files changed, the focused visual/behavioral corrections completed, verification results, and any genuine external data blocker.
