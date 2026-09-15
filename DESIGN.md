---
name: Fisk
description: A monochrome market-intelligence atlas built as one evidence-rich research surface.
colors:
  atlas-black: "#050505"
  ink: "#101010"
  graphite: "#242424"
  muted: "#62625e"
  muted-light: "#aaa"
  paper: "#ffffff"
  paper-soft: "#f1f1ed"
  desk-ground: "#ededeb"
  line: "#d8d8d2"
typography:
  display: { fontFamily: "Manrope Variable, sans-serif", fontSize: "clamp(60px, 7.2vw, 96px)", fontWeight: 560, lineHeight: 0.91, letterSpacing: "-0.04em" }
  headline: { fontFamily: "Manrope Variable, sans-serif", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 560, lineHeight: 0.95, letterSpacing: "-0.04em" }
  body: { fontFamily: "Manrope Variable, sans-serif", fontSize: "14px", fontWeight: 400, lineHeight: 1.6 }
  label: { fontFamily: "JetBrains Mono Variable, monospace", fontSize: "9px", fontWeight: 500, lineHeight: 1, letterSpacing: "normal" }
rounded: { control: "9px", action: "11px", prompt: "14px", bento: "15px", pill: "999px" }
spacing: { micro: "8px", compact: "10px", grid: "14px", bento: "28px", shell: "32px", section: "140px" }
components:
  primary-action: { backgroundColor: "{colors.paper}", textColor: "{colors.atlas-black}", rounded: "{rounded.action}", height: "48px", padding: "0 19px" }
  dark-action: { backgroundColor: "{colors.ink}", textColor: "{colors.paper}", rounded: "{rounded.control}", height: "38px", padding: "0 15px" }
  light-bento: { backgroundColor: "{colors.paper}", textColor: "{colors.ink}", rounded: "{rounded.bento}", padding: "28px" }
  dark-bento: { backgroundColor: "{colors.ink}", textColor: "{colors.paper}", rounded: "{rounded.bento}", padding: "22px" }
  prompt-input: { backgroundColor: "{colors.paper}", textColor: "{colors.ink}", rounded: "{rounded.prompt}", padding: "14px" }
---

# Design System: Fisk

## Overview

**Creative North Star: “The Monochrome Market-Intelligence Atlas”**

Fisk is one research surface expressed in two tempos. The landing opens in an exact ThreeUI `particle-drift` dark field with a centered statement, then scrolls through black, graphite, grey, and white into lifted monochrome bento terrain. The desk compresses the same world into a dense but calm cockpit: live reporting at upper left, market structure below it, square stock entry points below that, and a long dark copilot on the right.

This direction is the explicit user request of **2026-09-15**. It replaces the prior visual world; no FORM seed applies. The interface stays evidence-led: source links, provider status, uncertainty, and unavailable states are visible, and fabricated fallback content is forbidden. Provider-specific environment requirements stay isolated; Privy is enabled whenever its public app ID exists.

**Key Characteristics:** monochrome contrast, centered particle hero, black-to-white scroll transition, lifted asymmetric bento, boxed-F identity, compact evidence metadata, calm cockpit density, rich copilot input, and human control.

## Colors

The palette is deliberately achromatic. Hierarchy comes from contrast, tonal stepping, typography, and elevation—not accent color.

- **Atlas Black** (`#050505`): hero ground, translucent landing chrome, and the start of the scroll transition.
- **Ink / Graphite** (`#101010` / `#242424`): primary text, the copilot, and secondary dark bento.
- **Muted / Muted Light** (`#62625e` / `#aaa`): supporting copy and metadata.
- **Paper / Soft Paper** (`#ffffff` / `#f1f1ed`): primary cards and quiet landing terrain.
- **Desk Ground** (`#ededeb`): cockpit canvas behind lifted cards.
- **Line** (`#d8d8d2`): restrained dividers and reporting rows.

**The No Accent Rule.** Do not reintroduce evidence blue, crypto neon, semantic decoration, or tinted gradients. State remains legible through text, icons, contrast, and honest language.

## Typography

**Display and body:** Manrope Variable. **Labels and metadata:** JetBrains Mono Variable.

Manrope carries direct editorial statements and compact interface copy. JetBrains Mono is used sparingly for timestamps, provider status, tickers, counts, and machine-like evidence labels.

- **Hero display:** 560, `clamp(60px, 7.2vw, 96px)`, 0.91 line height, `-0.04em`; 50px on narrow phones.
- **Section headline:** 560, `clamp(48px, 6vw, 80px)`, 0.95 line height.
- **Desk lead:** `clamp(28px, 3vw, 46px)`, 1.02 line height.
- **Body:** 12–17px, usually 1.55–1.65 line height, with controlled measure.
- **Evidence label:** 8–10px monospace; use for metadata rather than body prose.

**The Two Voices Rule.** Human-readable interpretation uses Manrope; compact evidence and system state earn monospace.

## Layout

Landing content sits in a centered shell with 32px desktop gutters. The hero is at least `100svh`, full bleed, and centers a statement up to 1040px wide over the particle field. The page background performs the transition from black through graphite and grey to white. Its bento uses three unequal columns, two rows, a 15px gap, and 140px top breathing room; it collapses to two columns at 1040px and a single stack at 640px.

The desk has 14px outer padding and a sticky 62px navigation bento. Its main grid is `minmax(0, 1fr) 390px`: evidence occupies the left canvas and the copilot owns the long right rail. News begins with a 1.25/0.75 split, followed by the chart and a four-column row of near-square stock tiles. At 1040px the copilot moves first above evidence; at 640px outer gaps reduce to 8px and news becomes one column. This mobile order—copilot, then evidence—is mandatory.

## Elevation & Depth

The system uses lifted paper on a tonal ground. The shared raised shadow is `0 24px 60px -34px rgba(0,0,0,.42), 0 4px 14px -7px rgba(0,0,0,.18)`. Landing bentos rise 8px on hover; stock tiles rise 6px. Hero depth comes from particle drift, a radial scrim, translucent navigation, and the tonal transition. The prompt has `0 20px 50px -28px #000` and moves 3px upward on focus. Reduced motion removes nonessential transforms.

**The Useful Depth Rule.** Shadows separate functional surfaces and establish terrain; they are never ornamental glow.

## Shapes

The signature mark is a 28px rounded square containing a geometric F and terminal dot. Bento cards use 15px corners, the prompt and mobile copilot use 14px, compact controls use 8–11px, and source chips alone use full pills. Silhouettes stay rectilinear and architectural; circles are reserved for human-control rings and small status indicators.

## Components

### Actions

- Hero actions are 48px high with 11px corners; the primary is paper on black and the secondary is translucent black with a quiet white border.
- Desk authentication is a compact black button with 9px corners. Focus uses a 2px `currentColor` outline offset by 4px.

### Bento Surfaces

- Landing modules are unequal and individually composed: white lead, black evidence, warm-grey balance, graphite control.
- Desk cards are white 15px surfaces on `#ededeb`; preserve the lead-news/chart/stock hierarchy.
- Never normalize these into a repetitive equal-card grid.

### Fisk Copilot

- The desktop copilot is a sticky 390px-wide, near-viewport-height black bento at right; on compact and mobile layouts it becomes the first surface.
- Answers show the question, direct answer, thesis, compact findings, and linked provider chips. Loading and errors remain explicit.
- The restored rich `PromptInput` includes multiline entry, Fisk Qwen identity, toggled research effort, up to four image/PDF attachments, keyboard submission, and a disabled send state. Attachments are described honestly when the run uses only written input.

### News, Chart, and Stock Tiles

- Upper-left live news owns the strongest desk headline; adjacent cards provide two supporting stories with source links.
- The source-labelled chart sits directly below news. Four near-square stock tiles form the lower row.
- If providers return nothing, show a candid unavailable/reconnecting state. Never synthesize stories, candles, prices, or claims.

### Navigation and Brand

- Landing navigation is a centered translucent 980px bar over the hero. Desk navigation is a sticky white bento.
- Use the boxed-F mark with the FISK wordmark; do not restore the former rotated-bar symbol.

## Do's and Don'ts

- **Do** preserve the exact ThreeUI `ConstellationField` `particle-drift` variant in dark mode.
- **Do** preserve the centered hero and visible black-to-white page transition.
- **Do** keep the desk dense, quiet, bento-based, and copilot-first on mobile.
- **Do** expose sources, freshness, provider errors, uncertainty, and human final control.
- **Do** enable authentication whenever a Privy app ID is available while keeping provider configuration isolated.
- **Don't** reintroduce the prior blue constellation/sidebar world or its rotated-bar logo.
- **Don't** remove the chart, stock tiles, model identity, effort control, or attachment affordances.
- **Don't** fabricate fallback news, market data, testimonials, performance claims, or research evidence.
