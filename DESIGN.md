---
name: Fisk
description: Cat-led editorial market intelligence in monochrome at 80% interface scale.
colors:
  paper: "#ffffff"
  ink: "#232323"
  olive: "#343434"
  olive-deep: "#181818"
  lime: "#ececec"
  lime-soft: "#f7f7f7"
  mint: "#e5e5e5"
  lavender: "#e4e4e4"
  muted: "#676767"
  line: "rgba(35,35,35,.12)"
  graphite: "#141414"
  graphite-2: "#1f1f1f"
  desk-text: "#f4f4f4"
  desk-muted: "#bcbcbc"
  copilot: "#f2f2f2"
  positive: "#636363"
  negative: "#686868"
typography:
  display: { fontFamily: "Manrope Variable, sans-serif", fontSize: "clamp(56px,5.5vw,80px)", fontWeight: 500, lineHeight: 1.02, letterSpacing: "-0.05em" }
  headline: { fontFamily: "Manrope Variable, sans-serif", fontSize: "clamp(34px,3.8vw,54px)", fontWeight: 500, lineHeight: 1.07, letterSpacing: "-0.04em" }
  title: { fontFamily: "Manrope Variable, sans-serif", fontSize: "28px", fontWeight: 500, lineHeight: 1.13, letterSpacing: "-0.03em" }
  body: { fontFamily: "Manrope Variable, sans-serif", fontSize: "15px", fontWeight: 400, lineHeight: 1.6 }
  action: { fontFamily: "Manrope Variable, sans-serif", fontSize: "12px", fontWeight: 600 }
  label: { fontFamily: "JetBrains Mono Variable, monospace", fontSize: "10px" }
rounded: { evidence: "10px", widget: "12px", article: "14px", panel: "16px", composer: "18px", footer-mobile: "22px", footer: "28px", pill: "999px" }
spacing: { micro: "8px", compact: "12px", panel-gap: "18px", grid: "20px", article-gap: "22px", panel: "25px", large-panel: "30px", mobile-section: "75px", section: "130px" }
components:
  button-primary: { backgroundColor: "{colors.olive}", textColor: "{colors.paper}", rounded: "{rounded.pill}", height: "44px", padding: "0 23px" }
  button-lime: { backgroundColor: "{colors.lime}", textColor: "{colors.ink}", rounded: "{rounded.pill}", height: "44px", padding: "0 23px" }
  button-white: { backgroundColor: "{colors.paper}", textColor: "{colors.ink}", rounded: "{rounded.pill}", height: "44px", padding: "0 23px" }
  button-outline: { backgroundColor: "transparent", textColor: "{colors.ink}", rounded: "{rounded.pill}", height: "44px", padding: "0 23px" }
  mint-panel: { backgroundColor: "{colors.mint}", textColor: "{colors.ink}", rounded: "{rounded.panel}", padding: "25px" }
  evidence-chip: { backgroundColor: "#f1f1f1", textColor: "{colors.ink}", rounded: "{rounded.pill}", padding: "8px 10px" }
  hero-input: { backgroundColor: "{colors.paper}", textColor: "{colors.ink}", rounded: "{rounded.pill}", padding: "7px 7px 7px 18px" }
---

# Design System: Fisk

## 2026 Desk identity: The Black Cat Market Directory

The Desk is no longer a bento dashboard. Its default state is a wide, warm-white stock directory: compact navigation, a black market wire, a single editorial hero, searchable sector filters, and a dense four-column field of tall stock cards. No chart exists until a user chooses or names an asset.

Fisk is an original solid-black cat with tall ears, large white eyes, a silver brow notch, and an F-shaped tail gesture. The reusable character states are idle, curious, searching, analysing, alert, skeptical, success, and sleeping. Eye blinks and local pointer tracking may add life, but reduced motion removes them and state meaning is always carried by copy.

The selected-stock workspace is calmer and source-led. It uses one line chart, explicit range controls and freshness, followed by reporting and SEC filings. Chat begins as a compact floating control; on desktop it becomes a persistent right rail, and on mobile a full-height conversation surface. Model names, effort controls, chart-type switching, and decorative bento structure are prohibited.

Desk tokens: paper `#F8FBF8`, forest `#0B3D2E`, Fisk green `#18A66F`, mint `#DDF7E9`, rare lime `#B9F227`, ink `#102019`, muted `#66736C`, line `#DCE7E0`, positive `#11875D`, negative `#E45D68`, and warning `#D89B32`. Manrope remains the interface voice and JetBrains Mono is reserved for tickers, freshness, and compact market metadata. Desk cards use 15–16px corners; pills are reserved for filters and actions.

Stock selection is a deep-linkable overlay over the preserved discovery Desk. Tall listing cards use provider-backed 24-hour sparklines when available and explicitly label unavailable data. The landing hero uses the same black Fisk mascot as the product, with a lime brow notch and restrained contextual eye, ear, and tail reactions.

## Overview

**Creative North Star: “The Olive Editorial Research Desk”**

Fisk makes evidence approachable through an observant cat identity, open white layouts, tightly set medium-weight type, and small composed research widgets. Charcoal ink and silver highlights connect the public editorial experience to a focused dark charcoal research desk. Distinct grey surfaces distinguish supporting evidence panels rather than becoming status colors.

The supplied video and FISK-VIDEO-UI-BRIEF.md establish the editorial foundation. The approved cat identity refinement preserves its layout, palette, spacing, responsive composition and native scrolling. The visual system serves a precise, calm, evidence-led product: questions lead to cited research, uncertainty stays visible, and the user makes the decision. Product capabilities remain governed by PRODUCT.md and functioning integrations; illustrations are not proof of live coverage or performance.

**Key Characteristics:**

- Observant cat identity
- Asymmetric composition
- Restrained medium-weight headlines
- Charcoal/silver contrast
- Soft pills
- Miniature evidence widgets
- Tonal depth
- Readable research density

## Colors

Charcoal forms the identity; white gives editorial breathing room and silver signals intent.

- **Primary:** charcoal for actions, navigation destinations, FAQ and footer; silver for hero intent, horizon demonstration, and active chart controls.
- **Secondary:** light grey and silver provide distinct editorial panel surfaces. They do not encode financial gains or losses.
- **Neutral:** ink and muted text on paper; olive-deep beneath supporting evidence; graphite and graphite-2 on working surfaces, with desk-text and desk-muted for readable content. The light copilot uses its own pale grey surface.
- **Financial semantics:** preserve positive green and negative red for direction. Source, freshness, and availability must also be stated in text.

**The Evidence Stays Visible Rule.** Keep source labels, freshness and honest provider states beside the material they qualify.

## Typography

Manrope Variable is the display and body family. JetBrains Mono Variable supports tickers, evidence labels and compact counters. Headlines use weight 500, close tracking, and controlled line breaks; body and actions remain quietly legible.

The frontmatter records the desktop hierarchy. At widths up to 1199px the hero is 64px; at widths up to 767px it is 46px and section headings are 35px. Above 1600px the hero is 86px. Marketing display type does not determine desk data density. The horizon value uses tabular digits and a 68px desktop / 58px mobile treatment.

## Layout

The desktop editorial shell is at most 1320px, with total horizontal subtraction of 112px. At 1199px and below it subtracts 72px; at 767px and below it subtracts 44px. Native scrolling remains the navigation model.

The hero uses a three-column navigation, lower-left copy, and lower-right white evidence widget. Its warm cat illustration and charcoal gradient establish contrast. Intro panels retain different heights; capability panels use .85/.85/1.3 columns, becoming two columns at tablet and one on mobile. Horizon and FAQ use split compositions; newsroom uses three equal image-first columns before stacking. Large editorial sections commonly use 100–140px spacing, falling to approximately 65–75px on mobile.

Mobile changes composition: the mark moves left, navigation condenses, the hero illustration sits above lower copy, and the evidence widget enters document flow. The desk prioritizes one content column with a fixed collapsible composer at the bottom, 10px inset. Keep content clear of the expanded composer and ensure evidence remains reachable above it.

## Elevation & Depth

Depth comes mainly from composed imagery, gradients, tonal surfaces and small inset widgets. Resting marketing and desk cards have minimal or no shadows. The connected-evidence photo alone uses a blurred overlay; this is not a general glass treatment.

Overlay exceptions are functional: the navigation menu uses `0 12px 40px #00000022`, news drawer `-10px 0 40px #00000022`, research evidence drawer `0 20px 70px #00000066`, and mobile composer `0 8px 35px #00000055`. Do not spread overlay elevation to every panel.

**The Overlay Elevation Rule.** Reserve pronounced shadows for functional overlays and the fixed mobile composer.

## Shapes

Actions and chips are pills. Evidence widgets use 10–12px corners; article photos use 14px and major panels 16px. The mobile composer uses 18px. The inset footer uses 28px desktop / 22px mobile corners. Borders remain thin and quiet; circular arrow controls provide compact secondary movement.

## Components

- **Brand mark:** a minimal terminal-like stroke cat head, fine whiskers, light eyes on accented placements, and a notch in the anatomical left ear. Keep the angular outline readable at compact navigation and avatar sizes; use the shared `FiskCatMark` rather than a separate cat glyph.
- **Brand illustrations:** the same adult olive cat in the master imagery has lime eyes, an ivory muzzle, a notched anatomical left ear, precise whiskers and a hooked tail. `public/images/fisk-observes.png` and `public/images/fisk-examines.png` show a warm walnut research study; use the established hero and two supporting image frames without changing their proportions. Preserve embedded generation prompts as asset provenance. These illustrations establish identity; actual newsroom images remain editorial reporting.
- **Action restraint:** keep the top and closing blank-desk entries, focused hero question input, contextual horizon/scenario/article research, authentication, original source access and functional navigation. Avoid repeated generic desk buttons and inert affordances. A shared URL alone does not make a useful action redundant; retain distinct context and accessibility controls.
- **Buttons:** charcoal, silver, white and outlined pill variants share 44px minimum height and 23px horizontal padding. Hover changes tone; arrows move 2px. Visible keyboard focus uses a 2px grey outline with 4px offset.
- **Inputs:** the hero prompt is a white pill with a silver circular submit control. The working composer is a white bordered field on pale grey, with a charcoal circular send action. Preserve labels, disabled behavior, local attachment notices and real error states.
- **Chips:** soft olive evidence pills with occasional lime selections; news filters use explicit pressed states. Decorative evidence illustrations must remain identifiable as illustrations.
- **Cards:** light grey, charcoal, silver and photographic panels have distinct compositions. A white miniature widget can sit inside a colored panel. News cards open a source drawer; their separate Ask Fisk action passes the actual story into research.
- **Navigation:** centered brand in independent desktop columns, then mark and controls on mobile. Authentication uses light Privy appearance with olive accent, email/Google entry, and no wallet UI.
- **Research horizon:** a silver demonstration panel pairs discrete time selection with an immediate focus/evidence preview and transfers the selected horizon into the desk question. It is not a return calculator.
- **FAQ and research story:** inline expanding FAQ rows retain context; manual scenario controls change clearly labelled illustrative questions. The story is not a testimonial.
- **Desk and evidence:** reporting and chart surfaces use dark charcoal density; the copilot is light. Citations expose provider, freshness and source details. Mobile composer collapse/expand is a real accessible control, not a decorative handle.
- **Motion:** once-only section reveal uses 700ms and cubic-bezier(0.22,1,0.36,1). Source drift is a pausable 36s loop. Essential content is initially readable. Reduced motion completes all content statically, removes drift and hover transforms, and preserves functional controls.

## Do's and Don'ts

- **Do** compose brand illustrations and reporting imagery with sufficient neutral shading for readable text.
- **Do** preserve the shared cat anatomy and warm study across brand appearances, while keeping factual news images tied to their reporting.
- **Do** preserve asymmetric heights and different panel roles.
- **Do** keep timestamps, uncertainty, source links and provider failures visible.
- **Do** use public exploration before authentication; sign-in supports remembering and personalization.
- **Don't** return to the monochrome particle hero or generic centered gradient composition.
- **Don't** invent customer logos, endorsements, live values, coverage statistics or predicted returns.
- **Don't** add repeated generic desk actions or decorative controls that imply unavailable behavior.
- **Don't** turn every surface into identical cards, large shadows or glass panels.
- **Don't** make essential content wait for motion or repeatedly hide content during scrolling.

## Monochrome theme and scale

The latest user direction replaces colored UI surfaces with black, white and tonal greys, preserving composition and cat anatomy. Legacy olive/lime/mint/lavender token names now hold neutral values. Brand and editorial imagery are shown in grayscale without modifying master raster assets. The root uses CSS zoom .8 for the requested 80% interface scale; browser zoom remains user-controlled. Chart direction remains distinguishable through contrasting candle shades and existing labels.

## Cat voice

Fisk is quietly curious, observant and mildly deadpan: “A nose for news. An eye for evidence.” Use a few natural cat references in marketing and assistant first-use/loading copy, such as paper trails, chasing tails and laser pointers. Keep navigation, sources, financial findings, uncertainty and error recovery literal. Avoid pun-heavy controls, profit jokes, or changing cited editorial copy.

Introduce the cat explicitly as Fisk, the user’s AI research assistant. Fisk can speak in first person in assistant-owned empty and loading states; published research and publisher content keep their own factual voice. Lead the hero with “Meet Fisk. Your research cat.” and retain “A nose for news. An eye for evidence.” as the supporting brand line.
