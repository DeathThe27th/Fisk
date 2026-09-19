# Fisk Branding & Desk Redesign — Codex Implementation Brief

## Mission

Redesign the existing Fisk product into a polished AI market-research experience with an expressive black-cat identity and a stock-discovery Desk inspired closely by the structure, density, proportions, and interaction quality of Daybreak's `/app` page:

- Reference: https://www.daybreakcircles.lol/app
- Preserve Fisk's existing working data integrations, authentication, routing, APIs, research logic, and deployment configuration.
- Use the installed Impeccable skill throughout the visual implementation and final polish pass.
- Work autonomously from inspection through implementation and verification. Do not stop after isolated phases or return a plan in place of the completed redesign.
- Make reasonable implementation decisions when details are not specified. Ask only if a missing decision would fundamentally change the product.

This is a design and UX overhaul of the existing application. It is not permission to replace working features with mockups.

## Instruction Precedence

This document contains the newest product and design direction and **overrides conflicting instructions from earlier Fisk briefs, plans, prompts, comments, and implementation notes**.

In particular:

- Do not follow the previous instruction to make the interface Bento-esque or organize the Desk as a Bento grid.
- Do not follow previous navbar layout, styling, grouping, or behavior instructions where they conflict with the navigation direction in this document.
- Replace the earlier Desk concept with the Daybreak-inspired stock-discovery structure defined below.
- Replace earlier chart visibility rules with the rule in this document: no chart is visible until the user clicks, searches for, or asks about a specific stock.
- Replace earlier AI-input controls with the simplified Fisk input in this document: no model selector, thinking mode, or effort selector.
- Preserve older instructions only when they do not conflict with this brief and still support working product functionality.

When choosing between an older instruction and this file, this file wins. Do not blend superseded Bento or navbar ideas back into the redesign for the sake of compromise.

## Core Product Principle

Fisk is an AI research workbench where humans make the final decision. It should feel intelligent, curious, observant, and precise. The black cat gives the interface personality, while the research experience remains credible and useful.

The final product must feel like one authored world from the landing page through the Desk, stock workspace, AI chat, loading states, empty states, and mobile experience.

## Visual Identity: The Fisk Cat

Use an original expressive black-cat mascot influenced by the broader visual language of the supplied Pinterest references and their related recommendations:

- https://www.pinterest.com/pin/877498308645835452/
- https://www.pinterest.com/pin/705376360433907616/
- https://www.pinterest.com/pin/564005553309567853/
- https://www.pinterest.com/pin/985232855989179742/
- https://www.pinterest.com/pin/1054264594035989842/

The intended visual family includes:

- Solid black silhouette with tall ears.
- Large white expressive eyes.
- Minimal, slightly imperfect hand-drawn lines.
- Curious, suspicious, alert, sleepy, unimpressed, and pleased expressions.
- Occasional stars, question marks, blush marks, scribbles, signal lines, or pixel-style accents.
- A restrained mix of clean vector artwork, grainy monochrome treatments, and simple coloured backgrounds.

Create a consistent Fisk character system instead of repeatedly pasting one image. Give the mascot a small proprietary Fisk detail that persists across expressions, such as a subtle silver eyebrow mark, tiny forehead notch, or an `F`-shaped tail gesture. Keep it subtle and tasteful.

Do not use the referenced Pinterest files as production assets. They are mood and style references. Create original repo-native SVG/CSS illustrations or properly licensed original assets that belong to Fisk's visual system.

### Mascot states

Create a small reusable set of mascot states/components:

| State | Expression and use |
| --- | --- |
| Idle | Calm half-closed eyes with occasional blink |
| Curious | Eyes follow the cursor subtly on hero or empty states |
| Searching | Peeking cat used while retrieving sources |
| Analysing | Narrowed eyes and small moving data marks |
| Alert | Wide eyes for important signals or risk warnings |
| Skeptical | Unimpressed expression for weak evidence or conflicting data |
| Success | Soft star or satisfied-eye treatment |
| Sleeping | Long inactive or waiting state, used sparingly |

The mascot must support `prefers-reduced-motion` and never make critical information depend on animation.

## Motion and Interaction Direction

Motion should make Fisk feel alive and help users understand state changes. Use Framer Motion if it is already installed or is a sensible addition; otherwise use well-structured CSS animation.

Use animation where it improves comprehension:

- Eye blinks at irregular, natural intervals.
- Eyes may subtly track the pointer only inside a limited local region.
- Stock cards rise by a few pixels and sharpen their shadow on hover.
- Saved/watchlisted state morphs cleanly instead of abruptly swapping icons.
- Filter chips animate their active background between positions.
- Search results enter with a short stagger.
- The selected stock card expands/morphs into the stock-workspace header.
- The line chart draws in from left to right when data becomes available.
- The floating Fisk input expands into the right-side conversation panel using shared layout animation.
- Panels, citations, news, and filings appear progressively with restrained opacity and vertical movement.

Avoid constant decorative motion, exaggerated bouncing, parallax everywhere, or animations that compete with research content. Maintain smooth performance and avoid layout shifts.

### Loading behavior

Create several whimsical Fisk loading scenes rather than one repeated spinner. Match the scene to the action:

- Opening the Desk: the cat peeks over a rising panel.
- Opening a stock: the cat's eyes follow the ticker, narrow, then the selected card expands into the workspace.
- Running AI research: the cat scans small floating headlines, filings, and chart points.
- Comparing stocks: two sets of eyes glance between the ticker symbols.
- Saving an item: a tiny star or tail curl confirms the action.

Do not force a five-second wait after every click. The UI must remain responsive:

- Simple controls and toggles respond instantly with micro-feedback.
- Route transitions may use approximately 300–700 ms of motion.
- Opening a stock may use approximately 800–1500 ms when the animation masks real loading.
- AI/data operations keep the themed loading state visible only for the real request duration.
- If data resolves immediately, allow a minimum presentation time of roughly 500–800 ms only where needed to prevent a flash.
- Never delay completed actions merely to show an animation.

Use rotating, action-specific copy such as “Reading the fine print…”, “Checking the numbers…”, “Following the signal…”, and “Looking for conflicting evidence…”. Avoid fake progress percentages.

## Fisk Desk: Default State

The initial Desk must strongly mirror the information hierarchy and visual rhythm of Daybreak's discovery page while being unmistakably Fisk.

### Required page order

1. Fixed or sticky navigation.
2. Slim horizontally scrolling market-news ticker.
3. “Find your next stock” page heading.
4. Large branded hero panel with Fisk copy, an original black-cat composition, and an “Explore stocks” or “Ask Fisk” action.
5. Stock-discovery heading and stock search.
6. Category filter chips.
7. A dense grid containing many stock cards.

The page should feel full of stocks immediately. Do not show a chart in this state. A chart becomes visible only after the user clicks a stock card or asks Fisk about a specific stock.

### Navigation

Keep navigation compact, clear, and product-focused. Reuse the existing routes that matter. Do not copy Daybreak's labels blindly. Likely Fisk destinations include:

- Desk
- Watchlist
- Research or Reports
- Activity
- Profile

Use the Fisk wordmark and a restrained cat-head mark. Preserve existing auth actions.

### Market ticker

The ticker should display current or most recently cached headlines/signals with ticker symbols and sources. It should pause on hover and remain keyboard accessible. Clicking a ticker item should open the relevant stock context or source without creating an unexplained new UI mode.

### Hero

Create a Fisk-specific hero rather than copying Daybreak's artwork or text. Suggested direction:

- Eyebrow: `AI market research desk`
- Heading: `Find the signal. Question the story.`
- Supporting text: `Research stocks, news, filings, and market signals with Fisk at your side.`
- Primary action: `Explore stocks`
- Secondary action: `Ask Fisk`

Use a large original black-cat illustration on the right. The cat can look toward the search field or follow the user's cursor subtly. Keep the composition editorial and premium.

### Search and filters

- Search must filter the card grid by company name and ticker.
- Keyboard focus and clear reset behavior are required.
- Suggested filter groups: All, Technology, Finance, Consumer, Healthcare, Energy, and Crypto-linked.
- Preserve any useful existing asset categories where appropriate.
- Empty search results should use an original curious/peeking Fisk state and a clear reset action.

### Stock-card grid

Match Daybreak's spacious vertical cards and dense grid rhythm:

- Four columns on large desktop screens where space allows.
- Two columns on tablet.
- One column or a compact two-column treatment on mobile, chosen based on readable card width.
- Large logo/identity area.
- Price pill near the upper edge.
- Save/watchlist action.
- Ticker and company name.
- Current price and daily percentage movement.
- One useful lower metadata row based on available data, such as sector, market cap, exchange, or data freshness.

Do not expose blockchain-specific metadata unless it is genuinely relevant to Fisk's current product. Use real data from existing integrations and graceful cached/demo fallback states already supported by the project. Clearly distinguish unavailable data instead of inventing values.

Give selected, positive, negative, loading, unavailable, and watchlisted cards distinct but restrained states. Avoid making every card visually loud.

## Entering a Stock Workspace

There are two entry paths:

1. The user clicks a stock card.
2. The user searches for or asks Fisk about a named stock/ticker.

Both paths resolve the asset, run the appropriate themed transition, and open the same stock workspace. The active stock becomes shared context for the chart, news, filings, signals, and AI conversation.

If the user's message is ambiguous, Fisk should ask a compact clarification instead of opening the wrong ticker.

## Stock Workspace

The workspace should be focused, data-rich, and calmer than the discovery grid.

### Header

- Back to Desk.
- Company logo, name, and ticker.
- Current price, absolute move, and percentage move.
- Market state/data freshness where available.
- Save/watchlist action.

The clicked card should visually expand or morph into this header where practical.

### Chart

Use a **line chart only**. Do not provide candlestick, area, bar, or chart-type switching.

- The line remains visually clear across light and dark surfaces.
- Include range controls such as 1D, 1W, 1M, 3M, 1Y, and 5Y when the API supports them.
- Tooltip shows timestamp/date, price, and change from the selected range start.
- Up/down colour should be readable and accessible; do not rely on colour alone.
- Animate the line drawing only when first entering or changing the asset, not on every small state update.
- Handle loading, sparse data, API failure, and cached data explicitly.
- The chart must not exist on the default Desk and must not reserve empty space before an asset is selected.

### Research content

Organize available content into clear sections or tabs without turning the page into a maze:

- Overview
- News
- Filings
- Signals
- Fundamentals
- Saved research/notes if already supported

Preserve existing working research, stress-testing, evidence, citation, and source functionality. Make citations easy to inspect. Maintain the principle that Fisk assists research and the human makes the decision.

## Floating Fisk Chat

Adapt the supplied `PromptInput` design from the attached component into Fisk's actual AI interface.

### Keep

- Compact collapsed pill/card.
- Spring-based expansion.
- Auto-growing textarea.
- Enter to send and Shift+Enter for newline.
- Image attachment picker, thumbnails, removal, and preview modal if attachments are supported by the backend.
- Voice input and live waveform when genuinely supported.
- Morphing microphone/send/stop action.
- Smooth attachment and focus transitions.

### Remove

- Model selector.
- Model names and third-party model icons.
- Thinking/effort selector.
- Internal AI settings.
- Demo logging.
- Fake or simulated speech transcription. If microphone/speech recognition is unavailable or denied, show a useful fallback message; do not fabricate user speech.
- The gradient demo-page background from the supplied sample.

### Desk behavior

On the default stock-discovery Desk, place the compact prompt accessibly near the bottom centre without hiding stock cards or mobile navigation. It may use rotating placeholder suggestions, but respect reduced motion and stop rotation while focused.

Suggested prompts:

- `Ask Fisk about a company…`
- `What stock are you watching?`
- `Compare NVDA and AMD…`
- `What moved the market today?`

If a prompt identifies a stock, resolve it and open that stock's workspace while starting the conversation.

### Workspace behavior: floating to panel

The user chose a floating chat that expands into a right-side panel.

- Initially show a compact floating Fisk input so the line chart retains maximum width.
- Opening or sending from it should smoothly expand it into a persistent right-side conversation panel.
- The main research area should resize fluidly; do not cover essential chart controls.
- Preserve the conversation when the panel is collapsed and reopened.
- Provide an obvious collapse action.
- On mobile, use a bottom sheet or full-height conversation view rather than squeezing a narrow side panel.
- The cat avatar may blink while idle, look toward new source cards, and narrow its eyes while analysing.
- Streaming responses should show readable incremental output, a stop action, sources/citations, retry behavior, and clear errors.

## Product-Wide Interaction Quality

Apply the same level of care from top to bottom:

- Consistent focus rings and keyboard order.
- Buttons need visible hover, pressed, disabled, loading, and success states.
- Use skeletons that reflect the final layout.
- Avoid cumulative layout shift.
- Preserve scroll position when returning from a workspace to the Desk.
- Use optimistic feedback for watchlist saves with rollback on failure.
- Provide clear empty, offline, cached, permission-denied, rate-limited, and error states.
- All motion must degrade gracefully under `prefers-reduced-motion`.
- Maintain sufficient contrast and meaningful accessible labels.
- Touch targets should be comfortably sized on mobile.
- Do not hide essential actions behind hover-only interactions.

## Responsive Expectations

Desktop should deliver the Daybreak-inspired wide discovery grid and spacious stock workspace. Tablet should reduce columns cleanly. Mobile should feel intentionally designed:

- Compact sticky header.
- Horizontally scrollable ticker and filters.
- Readable stock cards with no tiny metadata.
- Search remains easy to reach.
- Floating chat stays above bottom navigation/safe areas.
- Workspace chart receives full width.
- AI conversation becomes a bottom sheet or dedicated view.

Test at representative desktop, tablet, and mobile widths.

## Implementation Guidance

1. Inspect the repository, framework, routes, existing design tokens, data loaders, and AI/chat architecture before editing.
2. Identify which existing components and behaviors must be preserved.
3. Build reusable primitives for the Fisk mascot states, stock cards, loading scenes, ticker, filters, floating prompt, conversation panel, and line chart shell.
4. Reuse the project's current component conventions. If it already uses shadcn/Tailwind/TypeScript, integrate naturally rather than re-scaffolding the app.
5. Adapt the supplied chat component to the existing project; do not paste its demo wrapper, model selector, effort selector, fake voice behavior, or invalid theme-variable mappings.
6. Keep API secrets server-side and preserve existing environment-variable conventions.
7. Use actual existing data routes and cached fallbacks. Do not hard-code convincing-looking market values into production paths.
8. Keep the implementation maintainable. Centralize motion timing, easing, colours, spacing, and mascot states.
9. Avoid unnecessary dependencies. Prefer the existing stack where it already solves the problem.
10. Do not interrupt execution after each section. Complete the coherent redesign, then report the result and any real external blocker.

## Acceptance Criteria

The redesign is complete only when all of the following are true:

- Fisk has a consistent original black-cat identity across the product.
- The cat has multiple meaningful states and subtle eye animation.
- The default Desk clearly resembles Daybreak's discovery structure while remaining branded as Fisk.
- The Desk contains a large, useful stock-card grid.
- No chart is visible before a stock is selected or identified in chat.
- Clicking or asking about a stock opens the same research workspace.
- The workspace uses a line chart exclusively.
- The supplied AI input has been integrated and simplified appropriately.
- No model or thinking-mode selector remains.
- Chat floats initially and expands into a right-side panel on desktop.
- Mobile chat uses an appropriate bottom-sheet/full-view treatment.
- Loading experiences are whimsical, varied, responsive, and tied to real state.
- Navigation, saving, filtering, searching, chart ranges, AI submission, stopping, citations, errors, and back navigation work.
- Existing authentication, APIs, research features, and deployment behavior remain functional.
- The site is responsive, keyboard accessible, reduced-motion compatible, and visually polished.
- The production build succeeds and the primary user journeys have been manually verified.

## Final Handoff

When finished, provide a concise report containing:

- What changed visually and functionally.
- The routes and components changed.
- Which real data sources are connected in each section.
- What was verified on desktop and mobile.
- Any remaining limitation caused by a missing external credential, API approval, or unavailable upstream data.

Do not describe incomplete placeholder UI as finished.
