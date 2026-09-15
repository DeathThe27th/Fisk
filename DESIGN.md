---
name: Fisk
description: An evidence observatory for decision-ready market research.
colors:
  spectral-violet: "#6357e8"
  spectral-violet-deep: "#4b41c2"
  mineral-paper: "#f2f0e9"
  bright-paper: "#faf9f5"
  charcoal-ink: "#161719"
  graphite: "#111315"
  graphite-raised: "#181b1e"
  graphite-line: "#2a2e32"
  evidence-green: "#147a68"
  risk-red: "#b65545"
  session-gold: "#b68b2c"
typography:
  display:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "clamp(4rem, 6.4vw, 6.1875rem)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "clamp(2.625rem, 5vw, 4.5rem)"
    fontWeight: 550
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  measurement:
    fontFamily: "JetBrains Mono Variable, monospace"
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1
rounded:
  control: "9px"
  module: "12px"
  surface: "15px"
  pill: "999px"
spacing:
  tight: "8px"
  module: "20px"
  section: "140px"
components:
  button-primary:
    backgroundColor: "{colors.charcoal-ink}"
    textColor: "{colors.bright-paper}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "0 18px"
  card-light:
    backgroundColor: "{colors.bright-paper}"
    textColor: "{colors.charcoal-ink}"
    rounded: "{rounded.surface}"
  card-dark:
    backgroundColor: "{colors.graphite-raised}"
    textColor: "{colors.mineral-paper}"
    rounded: "{rounded.module}"
---

# Design System: Fisk

## Overview

**Creative North Star: “The Evidence Observatory”**

Fisk turns market questions into observable evidence bands. Public pages feel like an authored journal printed on mineral paper; the research desk reverses into graphite for concentrated analysis. Spectral violet marks questions, synthesis, and active controls while evidence status retains distinct green, red, and gold signals.

**Key Characteristics:** monumental editorial claims, precise instrument labels, asymmetrical story composition, circular observation geometry, and honest source states.

## Colors

The palette moves between warm mineral paper and dense graphite with one controlled spectral accent.

- **Spectral Violet** (`#6357e8`): active questions, selected states, and synthesis emphasis.
- **Mineral Paper** (`#f2f0e9`): primary editorial field.
- **Charcoal Ink** (`#161719`): public text and dark actions.
- **Graphite** (`#111315`): research desk field.
- **Evidence Green / Risk Red / Session Gold**: semantic data states that always appear with text.

**The Spectral Rarity Rule.** Violet identifies attention or active reasoning; it does not wash whole surfaces.

## Typography

Manrope carries editorial voice and large claims. JetBrains Mono is reserved for prices, timestamps, source states, symbols, and compact instrument controls.

- **Display:** 600 weight, up to 99px, 0.94 line height, `-0.04em` tracking.
- **Section headline:** 550 weight, 42–72px, 1.02 line height.
- **Body:** 15–18px with 1.6 line height and restrained measure.
- **Measurement:** 7–11px mono with medium weight.

**The Two Voices Rule.** Prose stays in Manrope; values and machine states earn monospace.

## Layout

Public pages use a centered container capped at 1320px with generous 140px section separation. Composition favors one dominant story beside narrower evidence modules. The desk uses a three-column rail, canvas, and activity panel; under 1050px the watch rail drops, and under 720px the desk becomes one column with the composer fixed above the bottom edge.

## Elevation & Depth

Most structure comes from tonal layers and one-pixel dividers. Shadows belong to raised input, aperture, packet, drawer, and floating-composer surfaces; they use a visible vertical offset and soft blur.

## Shapes

Circular apertures and dots describe observation and status. Functional modules use 12–15px corners, inputs use 9–15px corners, and full pills are limited to compact actions, filters, and freshness badges.

## Components

- **Buttons:** compact, high-contrast, fully rounded actions with a small upward hover response and clear violet focus outline.
- **Cards:** editorial modules use flat paper tones; desk modules use stepped graphite tones and sparse borders.
- **Inputs:** bright paper or raised graphite fields with visible borders, 9–15px corners, and violet focus state.
- **Evidence objects:** directly addressable rows with provider, timestamp, freshness, and source link.
- **Market chart:** full-width instrument panel with mono controls and text-labelled freshness.
- **Navigation:** quiet text links on public pages; the desk reserves navigation density for symbols and current context.

## Do's and Don'ts

### Do

- **Do** pair every market colour with a written direction or state.
- **Do** let one story or research question dominate each viewport.
- **Do** preserve source, freshness, and uncertainty near every material claim.
- **Do** reflow mobile into a prioritized sequence rather than shrinking the desktop grid.

### Don't

- **Don't** use violet as general decoration or a full-page wash.
- **Don't** use monospace for editorial prose.
- **Don't** imply trading, custody, certainty, or unlabelled live data.
- **Don't** replace the varied evidence hierarchy with repeated equal cards.

