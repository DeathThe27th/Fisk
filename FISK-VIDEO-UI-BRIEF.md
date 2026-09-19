 # Fisk — video reference breakdown and UI implementation brief

> Read this alongside `fisk-build.md`. The attached 25.37-second video is the visual reference. This document describes its visible design and motion, then translates them into Fisk's existing product. Implement the complete experience in the existing project; do not stop after a static hero or ask for approval between sections.

## 1. Authority and scope

The user loves the reference's style, behavior, and composition. Preserve its recognizable visual language: photographic hero, olive typography, acid-lime accents, white editorial sections, uneven feature compositions, animated miniature interfaces, dark olive FAQ, photographic story section, editorial articles, and pale-lime closing section with an inset olive footer.

This brief takes precedence over vague aesthetic instructions in the previous build plan. Keep that plan's product definition, routes, integrations, authentication, citations, honest data states, and human control. Fisk is **AI Market Intelligence**, not a lender, payments app, or autonomous trading bot. Do not import the reference's funding product or its marketing claims.

Inspect the existing app before editing. Preserve working integrations and continue from the actual implementation state. Locate and use the installed **Impeccable** skill for design execution and refinement. This brief requests a UI implementation, not a new backend architecture or a restart of completed work.

### Evidence boundary

- Source: `From Klickpin.com- 479703797832817653-pin-id-479703797832817653.mp4`.
- Recording: 720 × 540 pixels, 30 fps, approximately 25.37 seconds.
- Inspection: frames sampled throughout the full clip at half-second intervals, with key states examined at the original resolution.
- Exact font family, CSS values, easing curves, DOM structure, and animation triggers cannot be recovered from a compressed recording. Values below are implementation targets, not claims about the source code.
- The video shows desktop scrolling and staged UI changes. It does not establish mobile layouts, keyboard behavior, navigation destinations, hover effects, or whether every motion is scroll-scrubbed versus triggered on entry. Those are explicitly proposed below.
- This brief analyzes visual behavior; it does not make claims about the audio.

## 2. The reference in one precise description

A modern business-finance landing page with an organic green identity. It opens on a dark, warm, full-width photograph, then moves through mostly white sections with near-black olive text. Small pill buttons, closely spaced grotesk headlines, muted mint and lavender panels, vivid yellow-green accents, and miniature financial interfaces repeat across the page. The composition alternates between open editorial layouts and tightly contained cards. Sections arrive with staggered upward reveals; words resolve from pale to solid; miniature UI elements fill in after their containing panel appears. A dark olive FAQ interrupts the white page, a large portrait provides a cinematic pause, and a soft lime wash carries the last call to action into a large olive footer.

The impression is approachable, considered, tactile, and quietly technical. It is neither a dense terminal nor a generic white SaaS page. The photography and irregular compositions are as important as the colors.

## 3. Separate the actual website from the presentation wrapper

The recording contains a browser window floating on a blurred green background. At the opening, the window is approximately x=46–675 and y=47–486. Its translucent browser chrome occupies roughly the top 41 pixels; the actual page begins near y=88. The usable page is about 629 pixels wide in the recording.

**Build the website inside that window.** The outer green backdrop and browser address bar are presentation framing, not application UI. Do not permanently wrap Fisk in a fake browser or constrain it to a tiny landscape rectangle. The real page should occupy the user's viewport.

The blurred organic green treatment does also appear inside a feature tile. It is appropriate there and as a restrained brand texture. Distinguish that genuine page asset from the external video backdrop.

## 4. Timestamped walkthrough of what is visible

Times are approximate scene windows, not animation-duration measurements.

| Time | Visible scene and behavior | Detail to preserve |
|---|---|---|
| 0.0–0.5s | The dark photographic hero is already present. Navigation and the centered mark become established. A small white panel begins appearing at lower right; headline content begins resolving at lower left. | Background first, content second; spatially separated headline and product proof. |
| 0.5–2.0s | The headline completes over two lines, followed by supporting copy and a lime CTA. The white panel grows into a Cashflow widget, and olive/lime blocks populate its chart. | Staged entrance inside an anchored composition, not a single fade of the entire page. |
| 2.0–3.0s | The page scrolls down. The hero leaves the viewport and a white trust strip appears with a small centered statement and a moving horizontal logo row. | Strong dark-to-white change; generous breathing space. |
| 3.0–5.5s | A two-line heading and buttons settle on the left. Two feature cards appear on the right, with different heights and aligned lower edges. Their internal labels, people/currency widgets, and copy populate after the surfaces appear. The logo strip continues moving. | Asymmetry and staged micro-interface assembly. |
| 6.0–7.0s | A new section heading appears above three cards. The card tops initially arrive at different vertical positions before settling into a shared row. | A staggered upward entrance produces a cascading silhouette. |
| 7.0–9.5s | Left: a green textured card with an inset white chip panel. Center: lavender panel with heading and white financial summary; a monetary value changes toward roughly $153.23. Right: a wider photograph with text overlaid. Chips shift within the left widget. | Three materially different treatments, not repeated feature-card templates. |
| 10.0–11.5s | A split calculator section enters. Left text resolves into two lines; the lime calculator surface grows/reveals on the right. Labels and initial $0.00 appear inside it. | The colored panel is the visual focus; surrounding page remains calm. |
| 11.5–13.0s | Calculator value changes through intermediate amounts to around $1,544.52 while the slider thumb advances right. A separate funding estimate remains visible beneath. | Numeric change and control movement are visually coordinated. A pointer drag is not clearly established. |
| 13.0–14.0s | A full-width dark olive FAQ section arrives with lime-toned typography. Introductory text sits left; four question rows sit right. | Large uninterrupted color field, no white card containers. |
| 14.0–16.0s | The first FAQ opens. Its plus becomes a minus; answer text appears and later rows move down to accommodate it. | Real layout expansion and readable answer reveal. |
| 16.5–18.5s | A full-width portrait enters: a person with curly hair and glasses, indoor greenery, green-tinted lower overlay. Attribution appears above a large quote at lower left. Arrow controls sit near lower right. | Photography fills the section; text sits on the image, not in a separate testimonial card. No completed slide change is shown. |
| 19.0–20.5s | A white articles section appears. Three photographic cards rise into place in a left-to-right stagger. Each has a dark lower overlay with a short white title. | Equal-width editorial tiles with image-first presentation. |
| 21.0–23.0s | A centered two-line closing headline appears over a white-to-pale-lime background. Supporting copy follows, then small overlapping avatars and a dark pill CTA. | The composition narrows and becomes centered after the broader article row. |
| 23.0–25.3s | A large inset olive footer with rounded corners enters. Small brand and navigation sit along its top; contact/location and small social/legal details occupy the lower area. | Footer is a deliberate inset block surrounded by lime, not a full-width black slab. |

## 5. Visual system: precise implementation targets

### Palette

These are approximate starting colors chosen to reproduce the visible relationships. Tune against the supplied video; do not treat them as sampled source tokens.

| Token | Starting value | Role |
|---|---|---|
| `--paper` | `#FFFFFF` | Main editorial sections |
| `--paper-soft` | `#FAFBF6` | Soft neutral transitions |
| `--ink` | `#202800` | Headlines and primary text on light sections |
| `--olive` | `#303A00` | FAQ, footer, primary dark buttons |
| `--olive-deep` | `#141B03` | Dark feature tile |
| `--lime` | `#DFFF52` | Main hero CTA and interactive spotlight panel |
| `--lime-soft` | `#F1FFC0` | Closing background wash |
| `--mint` | `#D5E9E7` | Secondary feature surface |
| `--lavender` | `#E1E3F6` | Contrasting analytical feature surface |
| `--muted` | `#727568` | Secondary labels; adjust for contrast |
| `--line` | `rgba(32,40,0,0.12)` | Quiet borders/dividers |
| `--desk` | `#11150F` | Fisk's related dark research mode |
| `--desk-raised` | `#1B2118` | Raised desk controls/modules |
| `--desk-text` | `#F3F5E9` | Main text on the research desk |

Acid lime is a signature accent, not the background of every card. Dark olive should recur often enough to carry the identity. Mint and lavender are supporting materials. Do not replace the palette with blue/purple AI gradients. Keep market-positive and market-negative colors separate from brand lime; an olive/lime illustration must not imply a profitable result.

### Typography

The visible font is a contemporary sans serif with rounded forms, close tracking, and mostly regular/medium weight. The exact family is unverified. Use a comparable licensed grotesk already available in the project; Inter is a practical fallback. Avoid making every heading bold.

At a full desktop width around 1440px, start with:

- Hero headline: 64–80px, weight 450–500 where supported, line-height 0.98–1.04, letter-spacing approximately -0.05em.
- Section heading: 40–48px, weight 450–500, line-height 1.04–1.1, tracking approximately -0.04em.
- Card headline: 22–28px, line-height 1.08–1.18, tracking around -0.025em.
- Body: 15–17px, line-height 1.45–1.6.
- Navigation/button text: 12–14px, medium weight.
- Small metadata: 11–13px, with sufficient contrast.
- Data: tabular numerals; use Fisk's mono face selectively for tickers, timestamps, and numerical detail, not every headline.

Use `clamp()` for fluid sizing. Deliberately control headline line breaks: the reference favors compact two-line blocks, not long centered paragraphs. Keep normal reading text large enough; the tiny body text in the recording is a result of the presentation scale, not a usability target.

### Layout and spacing

The reference combines relatively small horizontal edge gutters with large vertical gaps. At the recording scale, most inner content begins about 16–25px inside the page edges. At normal desktop size, use roughly 40–64px gutters, a content maximum around 1320–1440px, and 100–160px between major sections. Let full-bleed photography and color fields extend beyond the content maximum.

Use a coherent 4/8px spacing system. Card gaps can be 16–24px; card padding 24–32px. Headlines usually sit 32–48px above their visual content. Buttons are close to their associated text rather than floating in unrelated rows.

The design is not a grid of identical bento boxes. Vary the silhouettes: full-bleed hero → narrow strip → split composition → three mixed tiles → split interactive panel → full-bleed dark FAQ → full-bleed photograph → three editorial tiles → centered close → inset footer.

### Corners, borders, and elevation

- Pills: fully rounded, approximately 36–42px tall for a desktop button; preserve usable touch targets.
- Feature/photo cards: about 14–20px radius at normal desktop scale.
- Inset white micro-widgets: about 12–16px radius.
- Footer: about 24–32px radius.
- Full-bleed photographic sections: square outer edges.
- Borders: rare and thin. Secondary buttons may have a delicate outline.
- Shadows: minimal. Most depth comes from image overlays, nested surfaces, and color contrast, not large drop shadows.

### Photography and texture

Warm, candid, natural-light photography is central. The opening image places a smiling person slightly right of center with dark negative space on the left. The lower part has a hazy, defocused foreground effect, allowing white copy to sit comfortably over it. The testimonial portrait is more frontal, with green indoor foliage and room context.

For Fisk, source appropriate licensed assets or use supplied project assets: a person reviewing information, a quiet workspace, a founder/analyst portrait, real-world company/industry photography. Preserve warm organic lighting and human scale. Do not substitute a glowing robot, floating coins, or a giant dashboard screenshot. Do not reuse an identifiable person's image as a claimed Fisk customer.

Implement dark/olive translucent overlays and localized lower gradients to protect text. The reference supports subtle photographic gradients and the pale-lime closing wash; this is compatible with avoiding generic decorative gradient blobs.

## 6. Section-by-section build specification for Fisk

### A. Hero and navigation

**Observed composition:** full-width dark photograph; slim navigation overlaid near the top; small grouped links at left; centered white brand; login, white signup pill, and a menu glyph at right. Large two-line white headline at lower left. Supporting copy and a lime pill sit beneath it. A small white animated financial widget anchors the lower right. A fine vertical detail appears beside the widget; its function is not established.

**Build for Fisk:**

- Desktop hero approximately 82–94svh, with a sensible 620px minimum where viewport height permits.
- Use a three-column navigation grid so `Fisk` is truly centered independently of unequal left/right contents.
- Left links: `Research`, `Market Pulse`, `Methodology`.
- Center: Fisk wordmark/approved mark; do not copy the source brand mark.
- Right: `Sign in`, light `Open Fisk` pill, and a menu button only if it opens a useful navigation menu.
- Main copy: **See what the / market is missing.**
- Supporting copy: **News, filings, and market context—connected into research you can question.**
- Primary lime pill: `Ask Fisk` with a small right arrow. Keep the visible hero CTA compact.
- Preserve the existing plan's natural-language entry: below the core copy, provide a restrained expandable question input, or let `Ask Fisk` reveal/focus it. Do not allow a huge input box to destroy the photographic composition. Example prompts can sit as quiet text/chips below it.
- Bottom-right widget: `Market pulse`, a small freshness/source label, and a miniature chart or catalyst summary. Aim for about 280–320px wide on large desktop, visually secondary to the headline.
- Prefer a neutral illustrative evidence/catalyst graphic for the entrance animation; real price movement must come from actual data. If a snapshot is shown, label it inside the widget.
- A supported example question can be offered as `Explore an example`, visibly marked as a demo when applicable.
- The navigation scrolls out in the reference; do not add a large persistent sticky header simply from habit. If Fisk requires sticky navigation later, use a much quieter separate treatment.

**Entrance order:** photo immediately → navigation → headline → supporting copy/CTA → widget surface → widget labels/graphic. Some overlap is desirable. Keep the functional controls usable immediately, even while decorative entrances finish.

### B. Trust/source strip

**Observed:** small centered rounded caption, then a monochrome horizontal logo row with softly faded edges. Logos move horizontally over the observed interval.

**Fisk translation:** caption `Built on traceable sources.` followed by actual integrated sources such as SEC, Finnhub, and Bitget, where factually supported. Use approved wordmarks or simple typographic labels. Do not imply a partnership or endorsement. Add a compact market-state line if needed to preserve the existing live-ribbon requirement.

Animate only decorative source repetition. Provide a pause mechanism for continuous movement and a static reduced-motion version. Do not move important live prices in a way that makes them hard to read. No invented “500 businesses” or customer count.

### C. Split product introduction

**Observed:** left editorial text occupies roughly 40–45% of the width. On the right, a shorter mint card sits beside a taller almost-black olive card. Their bottom edges align. The dark card contains tiny floating transactional widgets, with some content clipped by its boundary, and lime text near its bottom. The mint card is quieter and includes a pill button.

**Fisk translation:**

- Left heading: **Research beyond / the headline.**
- Two adjacent actions: solid olive `Open the desk` and outlined `How Fisk works`.
- Two short paragraphs with selective emphasis, not a long bullet list.
- Mint card: **See what changed.** A miniature source/catalyst list, and `Explore news` action.
- Taller olive card: **Connect the evidence.** Small overlapping filing, headline, and ticker chips near the top; a clear supporting statement near the bottom.
- Animate the tiny components after their parent surfaces settle. Use `overflow: hidden` to create the same carefully cropped visual abundance.
- Maintain the asymmetry. Do not stretch the mint card to equal height just to satisfy a generic component grid.

### D. Three-panel capability section

**Observed:** one left-aligned headline with a small action at far right. Beneath it, widths are approximately 28% / 28% / 41%, with narrow gaps. Cards share a final height. Left uses soft green texture with a white inset widget; center uses pale lavender with heading and a white data widget; right is a photograph with white title and lower copy.

**Fisk translation:** heading **One question. A clearer market picture.** and `Explore the desk →`.

1. **Evidence, connected.** Green texture with an inset white panel. Small chips represent `News`, `Filings`, `Price`, `Macro`, `rToken`. Decorative chip rows may drift gently, but actionable filter chips stay still and keyboard accessible.
2. **Context that adds up.** Lavender surface with compact source coverage, latest evidence time, or a genuine numerical statistic. Preserve the visual count-up only for noncritical demo illustration or a verified value; do not invent a performance metric to imitate the video.
3. **A thesis you can challenge.** Larger photographic tile; white heading at top, concise lower copy about bull/bear cases and invalidation. Link to a relevant research example.

These are three different art-directed panels. Avoid repeated icon → title → paragraph treatment.

### E. Interactive spotlight: replace the finance calculator with research behavior

**Observed:** wide white space, left heading/body/button, bright lime calculator at right. The calculator contains a small title, a label, a large value, a thin slider, then a second result block. Digits and slider position change together.

**Fisk translation:** use this exact composition to demonstrate **Change the question. / See the context change.**

The lime panel can be a `Research horizon` demonstration:

- Label: `Your time horizon`.
- Large value: `1 day`, `1 week`, `1 month`, or `1 year`.
- Accessible discrete slider beneath it.
- Lower result: a real mapping such as `Focus: near-term catalysts`, `Focus: earnings and positioning`, or `Focus: fundamentals and valuation`.
- A small example evidence preview changes with the selected horizon.
- This is a transparent UI demonstration, not a predicted return or fabricated financial calculation.
- CTA: `Research this view` transfers the selected horizon into the desk's prompt/preferences context.

Update immediately from the user's selection. Animate secondary label transitions without delaying the input. If implementing the broader question-to-workspace demonstration required by the build plan, this section is its entry point: it can expand into a compact cited research preview in the same visual system.

Do not add a funding calculator, an estimated investment payout, or a fake accuracy percentage.

### F. Olive FAQ

**Observed:** full-width flat dark olive band. Left: large two-line lime heading and muted supporting copy. Right: four simple rows, each with a plus at the far edge. The first expands inline and pushes the others downward; its indicator becomes a minus. There are no thick dividers or white containers.

**Fisk content:**

- `Does Fisk place trades?`
- `Where does its research come from?`
- `How current is the market data?`
- `Can I challenge or save a thesis?`

Answers must match actual implementation. Use about 42%/50% columns with an airy gap. Open at most one row by default as a deliberate implementation choice; the video does not prove this exclusivity. Animate content height and inner opacity together. Preserve scroll context. Render question buttons with `aria-expanded` and associated answer regions. Use lime/off-white for primary text and a lighter muted olive for secondary text that still passes contrast.

### G. Full-bleed research story

**Observed:** large portrait covering the section, attribution above a sizeable quote near the lower left, green/dark lower overlay, small previous/next controls at lower right. The quote appears progressively. Only one testimonial is shown; a working carousel cannot be verified from the clip.

**Fisk translation:** preserve the cinematic image and text placement. If no real testimonial exists, make this a plainly labelled **Research scenario**, not a fictional endorsement.

Example scene: `Weekend semiconductor catalyst` with **The headline changed. What does that change about the thesis?** Use the existing NVDA flow as an illustrative research prompt, not a claim about a current event. A small `Explore this scenario` action can open its real or labelled demo session.

If there are three supported scenarios, provide manual previous/next controls and a restrained crossfade. No automatic movement is required. Do not invent analyst names, customer portraits, quotes, or a user count.

### H. Newsroom / editorial cards

**Observed:** white background, left heading, small `Show All` link on the right, three equally sized image cards. Titles are white over the darker lower part of each image. The cards enter in a staggered upward sequence and settle at the same top edge.

**Fisk translation:** heading **What is moving the story.** and `All news →`. Use real source-backed stories. Keep the image-first visual layout, then add source, time, ticker and `Ask Fisk` affordances clearly. If the overlay gets crowded, put metadata beneath the image instead of shrinking it excessively.

Support the existing feed filters and source drawer. A news card opens its story/source or a detail view consistently; `Ask Fisk` is a separate button that passes the story as research context. Do not nest a button inside a card-wide link. Missing images become elegant typographic source tiles, not broken-image placeholders. All three cards must remain useful without animation.

### I. Closing CTA

**Observed:** page background washes from white to pale yellow-green. Centered two-line headline, narrow supporting copy, small overlapping avatar stack, and an olive pill button. Lots of clear space above the footer.

**Fisk translation:** **Bring a question. / Leave with a clearer thesis.**

Supporting copy: **Explore first. Sign in when you want Fisk to remember.**

Action: `Open Fisk →`. Replace unsupported customer avatars with a small source/evidence motif, or omit them. Do not fabricate social proof merely to match the reference.

### J. Inset footer

**Observed:** broad olive rounded rectangle inside the pale-lime end section. Roughly 16px inset at the recording scale. Small white brand upper left; understated navigation upper right; secondary information and social circles lower down. The footer is tall and sparse rather than packed with dense link columns.

**Fisk translation:** Fisk mark, short purpose statement, navigation to Desk/Market Pulse/Methodology, genuine contact/social links where available, data/methodology details, and the existing human-decision disclosure. Keep a 24–48px outer inset on desktop and 16px on mobile. Only show links with real destinations.

## 7. Motion specification

### What gives the source its feel

The page appears to assemble as the viewer reaches each section. Surfaces, text, and details do not all animate at once. Words progress from pale/transparent to readable; cards rise by different amounts; widgets reveal their components; numbers change; the FAQ physically creates space for its answer. Motion supports hierarchy.

The video is a choreographed presentation. Reproduce the visual behavior without assuming a need for scroll hijacking, a fixed timeline, or fake user interactions.

### Proposed animation recipes

| Element | Initial → final | Target timing |
|---|---|---|
| Headline reveal | Word/line opacity 0.15→1, optional y 8→0 | 450–650ms total; 35–65ms stagger |
| Body and actions | Opacity 0→1, y 10→0 | 300–450ms, after headline starts |
| Large feature card | Opacity 0→1, y 36–56→0 | 550–750ms; 90–140ms stagger |
| Widget surface | Clip/reveal or scaleY 0.85→1 with origin bottom | 450–600ms |
| Widget internals | Opacity and y 8–16→0 | 250–400ms; 50–90ms stagger |
| Decorative chart blocks | scaleY 0→1 from baseline | 400–650ms; subtle stagger |
| Display number | Previous→target, tabular digits | 600–1000ms once for illustration |
| FAQ | Height 0→auto; answer opacity 0→1 | 240–340ms |
| Story change | Image/content crossfade | 450–650ms |
| Hover/press | Small color/translation response | 140–200ms |
| Desk module insertion | Layout and opacity transition | 220–360ms |

Suggested entrance easing: `cubic-bezier(0.22, 1, 0.36, 1)`. Use gentle damping for layout springs; no obvious bounce or elastic overshoot.

Use Motion, already required by the Fisk build plan. Trigger each reveal once when the section enters a meaningful portion of the viewport. Start near 15–25% visibility and refine in the actual viewport. Do not repeatedly hide and reveal text as a user scrolls slightly backward.

**Text reveal:** preserve real semantic headings. Decorative split words must not create a broken screen-reader experience. Use a readable accessible label or a separate accessible text node. Line wrapping must remain correct at every width.

**Clip reveals:** animate a wrapper/mask where possible. Avoid scaling text itself, which looks squashed. Reserve actual height animation for components that must push neighbors, especially the FAQ.

**Marquee:** seamless decorative strip, slow enough to read; proposed 25–40-second loop depending on content width. Pause control, pause on hover/focus, static reduced-motion fallback. Do not announce duplicate items to assistive technology.

**Hover states — proposed, not observed:** button darkening/lightening with arrow translation of 2–3px; photo crop scales only slightly, about 1.02; underline or color shift for text links. No large levitating cards or dramatic tilts.

**Reduced motion:** static completed headings/cards; no marquee, count-up, drifting chips, or automatic parallax. FAQ still opens and functions with an immediate or very short transition. Never hide essential information pending an animation.

**Scrolling:** keep native scrolling. A smoothly edited demonstration is not evidence that the original uses a third-party smooth-scroll engine. Do not add one unless a verified need arises. Animate opacity/transform rather than recalculating many layout positions on every scroll event.

## 8. Extend the identity into Fisk's research desk

The video shows a landing page, not a research application. The following is an intentional Fisk extension, not an observed source screen.

Keep the existing desk architecture: chart/thesis in the main area, collapsible AI panel at right, optional watchlist at left, adaptive research modules and evidence drawer. Carry across the same grotesk type, pills, radii, restrained motion, olive undertones, and lime accent.

- Dark desk uses green-tinted graphite, not blue-black.
- Use lime for active intent/selection and the primary ask action. Preserve explicit financial up/down semantics.
- Maintain readable densities: substantial chart and thesis area, compact metadata, no oversized marketing headings inside every data card.
- Right composer should feel like the landing's white micro-widget translated into a dark working surface.
- News, filings, bull/bear reasoning and invalidation each get a clear role in the hierarchy; avoid a wall of visually equal boxes.
- Source and freshness labels remain visible and quiet, never removed for visual cleanliness.
- Research progress uses actual tool events and short descriptions, not random cycling “thinking” claims.
- Animate arriving modules in place while preserving scroll position and user focus. Do not rearrange a card someone is reading just because another request resolves.
- Clicking a citation opens the evidence drawer without losing the current question.
- Public-to-desk transition can briefly crossfade shared colors/surfaces, but should never delay navigation for a cinematic sequence.

## 9. Responsive behavior — inferred implementation, not shown in video

### Wide desktop, approximately 1200px and up

Use the full compositions. Keep the center wordmark, two-column intro, 3-panel capability row, split interactive section/FAQ, and three article tiles. Keep the desk's optional context rail only while the chart has useful space.

### Tablet, approximately 768–1199px

Condense navigation. Scale hero typography with `clamp()`. Keep the widget smaller or move it below the copy before it overlaps the face. Capability cards can use two columns with the photographic tile spanning the next row. Preserve the intro card height difference if space permits.

### Mobile, below approximately 768px

- Header: Fisk mark at left, primary action and menu at right.
- Hero: retain photography, but intentionally choose a crop with room for text. Copy can sit in the lower portion over a stronger lower gradient. The miniature product panel moves into flow beneath the copy or immediately below the hero; it must not obscure the face.
- Headline approximately 40–52px depending on width; section headings approximately 30–36px.
- Gutters 20–24px; section spacing roughly 64–88px.
- Split sections become text followed by visual.
- Feature and article cards stack rather than shrinking into illegibility.
- FAQ becomes heading above full-width question rows.
- Story quote gets a controlled width and sufficient image overlay.
- Footer becomes a short stacked layout.
- Desk becomes one prioritized content column, with a bottom-sheet composer as already specified in the product plan.
- Keep touch targets at least 44×44px where possible and visible focus states.

Do not scale the entire desktop page down to fit a phone. Make real responsive compositions.

## 10. Practical component structure

Use these as responsibilities, not mandatory filenames or a reason to rewrite functioning components:

- `MarketingShell` / `FiskNavigation`
- `PhotographicHero` / `MarketPulsePreview`
- `SourceStrip`
- `ProductIntroduction` / `EvidenceMiniature`
- `CapabilityPanels`
- `ResearchHorizonDemo`
- `ResearchPreview` for the existing question-to-workspace requirement
- `FaqSection` / `FaqItem`
- `ResearchStory`
- `NewsroomSection` / `EditorialNewsCard`
- `ClosingInvitation` / `InsetFooter`
- Shared `Reveal`, `StaggerGroup`, `PillButton`, `SourceBadge`, and design tokens

Keep the page server-renderable. Scope client components to motion and actual interaction. Use the project's image optimization, responsive image sizes, and reserved aspect ratios. Preload only the necessary hero image; lazy-load later photography. No video background is required: the reference establishes a photographic appearance, not a need for background video.

Reuse the existing Motion and chart stack. Do not install several animation packages to achieve ordinary reveals. Real charts retain their proper data model and accessible summary; miniature marketing illustrations can use lightweight SVG/CSS.

Build ordinary loading, empty, error, stale and demo states in the same palette. The beautiful page must still explain a missing provider without inventing data.

## 11. Functional behavior to wire

Every visible control needs a real outcome:

| Control | Required outcome |
|---|---|
| Hero `Ask Fisk` | Reveal/focus a working prompt field or open the desk with its content |
| Example prompt | Populate and start the supported research/demo flow |
| `Open Fisk` | Existing desk/auth flow with exploration preserved |
| Source name | Appropriate source or methodology destination |
| Research horizon | Update the visible focus and pass selection into research |
| FAQ row | Expand/collapse its real answer |
| Scenario arrows | Change among available scenarios; omit arrows if only one exists |
| News card | Open the appropriate article/detail destination |
| `Ask Fisk` on news | Attach actual story context and source to research |
| Citation | Open evidence details and source link |
| Footer navigation | Navigate to existing routes |

Preserve authentication only where the product requires saving/personalization. Do not make the reference's signup treatment an excuse to block public exploration.

## 12. Mistakes that would lose the reference

1. Keeping only the lime color while discarding the photographic and editorial composition.
2. Replacing the hero with centered text on a blank gradient.
3. Turning every section into the same three cards.
4. Using heavy bold text instead of tightly set regular/medium headlines.
5. Equalizing the deliberately uneven intro cards.
6. Animating whole sections as single blocks, losing the internal sequence.
7. Making all animations springy, floaty, or endlessly looping.
8. Confusing the external browser mockup with the actual website.
9. Adding oversized shadows, glass blur everywhere, glowing edges, or excessive borders.
10. Copying financing language and numbers into a research product.
11. Inventing customer logos, testimonials, live prices, source coverage, or success metrics.
12. Making text unreadably tiny because it looked small in the recording.
13. Using motion that repeatedly hides useful content or moves the page while a user interacts.
14. Ending the build after a landing-page screenshot while buttons and research paths remain disconnected.

## 13. Completion and focused verification

Complete the implementation autonomously in the existing project. Apply Impeccable's relevant refinement workflow. Do not pause between page sections or produce a broad new test suite for styling.

Verify the main desktop composition and one narrow mobile viewport; check the actual prompt-to-research path, slider, FAQ, news interaction and evidence drawer. Check reduced motion and keyboard access to the principal controls. Run the project's normal type/build checks once the implementation is assembled and fix concrete failures. Preserve the original build plan's required integration checks when changing those integrations.

Compare the finished page to the reference in this order:

1. **Silhouette:** same sequence of open white layouts, asymmetric panels, dark block and full-width imagery?
2. **Hierarchy:** photographic hero leads, type feels close and deliberate, actions remain small and clear?
3. **Palette:** olive/lime is unmistakable, with mint/lavender used sparingly?
4. **Motion:** sections and widget contents arrive in distinct, restrained stages?
5. **Behavior:** the interface actually works and keeps Fisk's data/citation rules?
6. **Adaptation:** mobile feels intentionally composed and the desk belongs to the same brand?

Deliver a finished Fisk interface, not a literal clone of a finance company's content. The reference supplies the design language; Fisk supplies the purpose and interactions.
