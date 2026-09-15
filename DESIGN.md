---
name: Fisk
description: A constellation evidence field and restrained news-research workspace.
colors:
  constellation-black: "#05070d"
  constellation-white: "#f7f8fb"
  constellation-muted: "#a7adba"
  evidence-blue: "#8eb9ff"
  module-blue-pale: "#e9eef8"
  module-blue-bright: "#c9dcff"
  module-navy: "#111827"
  module-slate: "#171b24"
  desk-canvas: "#f7f7f5"
  desk-ground: "#ededeb"
  desk-ink: "#171816"
  desk-sidebar: "#0a0c11"
  desk-line: "#e4e4df"
  error-surface: "#f3e5e1"
  error-ink: "#813c2f"
typography:
  display: { fontFamily: "Manrope Variable, sans-serif", fontSize: "clamp(62px, 8.5vw, 122px)", fontWeight: 560, lineHeight: 0.89, letterSpacing: "-0.04em" }
  headline: { fontFamily: "Manrope Variable, sans-serif", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 560, lineHeight: 0.95, letterSpacing: "-0.04em" }
  body: { fontFamily: "Manrope Variable, sans-serif", fontSize: "15px", fontWeight: 400, lineHeight: 1.6 }
  label: { fontFamily: "JetBrains Mono Variable, monospace", fontSize: "9px", fontWeight: 550, lineHeight: 1, letterSpacing: "0.08em" }
rounded: { compact: "9px", control: "10px", card: "13px", module: "15px", composer: "16px", canvas: "18px", pill: "999px" }
spacing: { micro: "8px", compact: "10px", card-gap: "14px", module: "28px", shell-gutter: "32px", section: "150px" }
components:
  landing-primary-action: { backgroundColor: "#ffffff", textColor: "#080a10", rounded: "{rounded.pill}", height: "46px", padding: "0 19px" }
  landing-secondary-action: { backgroundColor: "rgba(8,11,18,.72)", textColor: "{colors.constellation-white}", rounded: "{rounded.pill}", height: "46px", padding: "0 19px" }
  evidence-card: { backgroundColor: "{colors.module-navy}", textColor: "{colors.constellation-white}", rounded: "{rounded.module}", padding: "28px" }
  news-card: { backgroundColor: "#ffffff", textColor: "{colors.desk-ink}", rounded: "{rounded.card}", padding: "17px 18px" }
  chat-composer: { backgroundColor: "#ffffff", textColor: "{colors.desk-ink}", rounded: "{rounded.composer}", padding: "12px 12px 27px 17px" }
---

# Design System: Fisk

## Overview

**Creative North Star: “The Constellation Evidence Field”**

Fisk pairs two related environments. The public landing is an immersive black evidence field: the exact ThreeUI particle-network surrounds a centered declarative promise, while raised asymmetric blue modules turn the abstract constellation into concrete principles. `/desk` is calm, light, and conversational, with a dark navigation rail and the restraint of a focused writing tool.

This direction comes from the pinned user checkpoint dated **2026-09-15**, not a FORM seed, and replaces the previous mineral-paper observatory world. PRODUCT.md remains authoritative: the voice is precise and evidence-led, current reporting stays source-linked, and missing providers produce honest empty or error states rather than fabricated content.

**Key Characteristics:** centered cosmic hero, cool-blue dimensional modules, news-first evidence, quiet light workspace, dark desktop rail, restrained type, and explicit human control.

## Colors

The landing uses near-black space, white type, and cool evidence blues; the desk inverts to an off-white canvas with a near-black sidebar.

- **Constellation Black** (`#05070d`): landing field and particle-network ground.
- **Evidence Blue** (`#8eb9ff`): brand bars, status dots, control geometry, and highlights.
- **Pale / Bright Evidence Blue** (`#e9eef8` / `#c9dcff`): large editorial and balance modules.
- **Evidence Navy / Control Slate** (`#111827` / `#171b24`): raised dark landing modules.
- **Desk Ground / Canvas / Ink** (`#ededeb` / `#f7f7f5` / `#171816`): quiet workspace frame, surface, and text.
- **Desk Sidebar / Line** (`#0a0c11` / `#e4e4df`): desktop navigation and subtle division.
- **Error Surface / Ink** (`#f3e5e1` / `#813c2f`): candid provider failure messaging.

**The Evidence Blue Rule.** Blue connects signals and selected details; it does not become a generic full-screen wash.

## Typography

**Display and body:** Manrope Variable. **Labels and metadata:** JetBrains Mono Variable.

Manrope keeps both worlds direct and contemporary. JetBrains Mono is reserved for source metadata, dates, status labels, and system-like evidence markers.

- **Hero display:** 560, `clamp(62px, 8.5vw, 122px)`, 0.89 line height; 53px on narrow phones.
- **Landing headline:** approximately 510–580, `clamp(48px, 6vw, 80px)`, 0.95.
- **Desk headline:** 42px/1.05; 34px on narrow phones.
- **Body:** 14–17px with 1.5–1.65 line height and restrained measure.
- **Evidence label:** 8–9px mono, medium to semibold, often uppercase.

**The Two Voices Rule.** Natural language uses Manrope; compact source and machine state earns monospace.

## Layout

Landing content uses a centered 1320px shell with 32px desktop gutters. The hero fills at least one small viewport height and centers copy over the full-bleed constellation. Evidence uses an asymmetric three-column, two-row bento with a 14px gap and 150px vertical breathing room. At 820px it becomes two columns; at 560px modules stack and hero actions turn vertical.

The desk is a fixed-height two-column shell: a 260px dark sidebar beside one flexible light canvas. Conversation and composer share a 760px maximum measure. At 820px the sidebar disappears and the canvas becomes an edge-to-edge, prioritized single column.

## Elevation & Depth

The landing is dimensional: the particle field creates atmospheric depth, the nav uses translucent blur, and bento modules lift 7px on hover. Resting bento shadow is `0 26px 70px -38px rgba(0,0,0,.9)`; hover becomes `0 38px 88px -38px rgba(73,115,190,.38)`. The desk is flatter; its composer uses `0 18px 50px -25px rgba(22,25,30,.3)` and news cards gain only a small hover lift.

**The Split-Depth Rule.** Public evidence may feel atmospheric and raised; desk depth exists only to clarify interactive layers.

## Shapes

Full pills identify top-level actions. Bento modules use 15px corners, news cards 13px, composer and message bubbles 16px, and compact controls 9–11px. The desk canvas uses an 18px leading edge against the sidebar. Concentric circles are a signature human-control motif; the brand retains its three rotated rounded bars.

## Components

- **Landing actions:** 46px full pills; primary is white/near-black, secondary is translucent near-black with a quiet white border and blur.
- **Bento:** asymmetric, cool-blue or navy/slate, 15px clipped corners, strong elevation, and distinct internal compositions. Never normalize it into repeated equal cards.
- **News cards:** white, 13px radius, one-pixel neutral border, 17px by 18px padding; publisher and date precede headline and summary.
- **Composer:** one floating white 760px field with 16px corners and a 36px square send control. No model picker or reasoning control.
- **Navigation:** a translucent centered landing pill; a 260px near-black desktop desk rail; a minimal 56px light desk header on mobile.
- **Constellation field:** exact ThreeUI `ConstellationField` `particle-network`, dark and full bleed, behind centered copy and the established radial scrim.
- **Empty/error states:** plainly name source absence or provider failure and never substitute illustrative stories.

## Do's and Don'ts

- **Do** keep the landing centered, dark, atmospheric, and CTA-only in the hero.
- **Do** preserve publisher links, timestamps, uncertainty, error language, and honest empty states.
- **Do** make evidence modules asymmetric, dimensional, and individually composed.
- **Do** keep `/desk` news-first, restrained, and single-column on mobile.
- **Don't** revive the old mineral-paper observatory direction, charts, dense terminal furniture, model selectors, or reasoning controls.
- **Don't** put a chat composer on the landing page.
- **Don't** fabricate demo headlines, fallback data, testimonials, or performance claims.
- **Don't** use crypto-casino neon or decorative market signals without evidence meaning.
