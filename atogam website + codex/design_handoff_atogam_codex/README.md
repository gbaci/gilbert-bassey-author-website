# Handoff: ATOGAM Codex — "Terminator Rising"

## Overview
The **ATOGAM Codex** is a mobile-first reference index (an encyclopaedia / wiki) for *A Tale of Gods and Men* — a six-book Nigerian epic-fantasy series. It is a companion to the novels, not a marketing site. Its jobs, in order:

1. **Convert novel readers into universe believers** — reward attention, make the world feel deep, coherent, and authored.
2. **Be usable on a phone, on paid mobile data** — light payload, legible at arm's length, no heavy media.
3. **Handle staggered reveal.** Content unlocks with each book release. Entries (and gated sections inside entries) are **spoiler-scoped to a "current-through" version**. A reader who is on Book One must never be spoiled by Book Four material.

This bundle documents the locked visual direction — **"Terminator Rising"** — as a set of hi-fi HTML mockups. It is the design a developer should build.

## About the Design Files
The files here are **design references created in HTML** — prototypes that show intended look, typography, spacing, and interaction. **They are not production code to ship.** The task is to **recreate these designs in the target codebase's environment** (React/Next, SwiftUI, Flutter, etc.) using that project's established patterns, routing, and component libraries. If no codebase exists yet, choose an appropriate stack for a content-driven, mostly-static, SEO-friendly reading experience (e.g. Next.js/Astro with static generation) and implement there.

The prototype is authored as a single "design component" HTML file. Open `Atogam Codex.dc.html` in a browser (keep `support.js` beside it) to view it live. It is organised as a horizontally-scrolling design-review canvas; the direction to build is **Turn 2**, options **2a / 2b / 2c** (see *Files* below). Ignore Turn 1 — it is a superseded earlier exploration that used a different (open-hand) logo.

## Fidelity
**Hi-fi.** Colours, typography, spacing, and interaction states are final and intended to be matched precisely. Reproduce them pixel-close using the codebase's libraries. The two grounds (dark / light) are both final; **dark is the reader's default**, light is the secondary "daylight" face (About page, shareable screenshot, print/appendix).

---

## The Mark
"Terminator Rising" — an **eclipse**: a solid disc split on the horizon, **pale upper hemisphere over a dark lower hemisphere**, enclosed in an **open gold ring**, sitting on a faint **vertical axis** that extends just beyond the ring top and bottom. It is **full-colour and self-contained** — the dark lives *inside* the disc, so the same mark sits correctly on any background (dark night-reading page, light parchment, a white share card). Do **not** make the mark adapt to the page ground.

- **Master asset:** `assets/atogam-mark.png` (256×256, transparent). This is the artist's original.
- **Vector recreation:** `assets/atogam-mark.svg` — use this in the UI so it stays crisp at every size and in the wordmark lockup. It reproduces the PNG.
- **Construction (100×100 viewBox, center 50,50):** open ring `r=39`, stroke `#dca948` width `3`; disc `r=24`, upper hemisphere `#eddaa1`, lower hemisphere `#241a0f`; disc rim stroke `#cf9f3e` width `1.1`; terminator line `#d8ad48` width `1.1`; vertical axis from `y=5` to `y=95` (past the ring) width `1.4`; small crown notch at top-center.
- **Axis colour by ground:** on **dark** use a pale axis `#e8dcb8`; on **light** use a gold axis `#c9a94f` (a cream axis would vanish on parchment). Everything else is identical between grounds.
- **Wordmark lockup:** mark + `Atogam` (Cormorant Garamond small-caps) + `CODEX` (IBM Plex Mono, tracked `.3em`, gold).
- Holds down to **16px**; at that size the rim/terminator/notch may visually merge — that's expected, the ring + two-tone disc still read.

---

## Type System — three voices
| Role | Family | Style |
|---|---|---|
| **Display** | **Cormorant Garamond** | `font-variant: small-caps`, weight 500–600, `letter-spacing: .03em`. Page/entry titles, wordmark. |
| **Body** | **Spectral** | weight 400, `line-height ~1.62`. Reading text; italic Spectral for editorial notes/asides. |
| **Label** | **IBM Plex Mono** | weight 600, UPPERCASE, `letter-spacing .16–.28em`. Eyebrows, section headers, counts, meta, buttons. |
| UI helper | system sans (`-apple-system, "Segoe UI", Roboto, …`) | Status bar, small helper/description text only. |

Type scale actually used (px):
- Display hero: `clamp(42, 6vw, 62)` · Entry `<h1>`: `32/1.08` · Index page title: `26` · Card titles: `25–29`
- Body: `17/1.64` (entry), index entry rows `18/1.95`, revealed spoiler body `16.5/1.62`
- Labels: `9.5–11` mono, tracked. Section eyebrow `10/.22em`.

---

## Grounds & Design Tokens

### Dark ground (default)
| Token | Hex | Use |
|---|---|---|
| Ground | `#191410` | page background |
| Panel/raised | `#241a12` | cards; a `#241a12→#160f09` vertical gradient is used on the spec card |
| Deep / bezel | `#120c07`, `#0c0a07` | inset tiles, phone bezel |
| Ink (primary) | `#f1e8d7` | primary text |
| Ink (display) | `#f4ecdb` | titles |
| Body text | `#cbc0ad` | reading copy |
| Muted | `#8f8474`, `#7a7061` | meta, labels |
| Gold | `#d9b25c` (primary), `#c6a052` (counts/label gold) | mark accents, counts, the one "rule" under a name |
| Terracotta | `#c86038` (eyebrow), `#c0653a` (rule), `#d98b52` (links) | category eyebrow, links, spoiler marker |
| Hairlines | `rgba(241,232,215,.07–.16)` | dividers |

### Light ground (secondary "daylight" face)
| Token | Hex | Use |
|---|---|---|
| Paper | `#ece4d3` | page background |
| Card | `#f5efe2` | raised |
| Ink | `#241b12` (display), `#2f271c`, `#3c3226` (body) | text |
| Muted | `#8a7f6d`, `#6f6455`, `#b9ab90` | meta, faint markers |
| Gold | `#b8893a`, `#a97d2c` (counts) | mark, counts |
| Terracotta | `#a8482a` (eyebrow/rule), `#9c4a2b` (links) | eyebrow, links |
| Hairlines | `rgba(36,27,18,.09–.22)` | dividers |

### Shared
- **Radii:** phone bezel `40px` outer / `31px` screen; spec panels `14–18px`; **spoiler box `4px`**; buttons `3px`.
- **Shadows:** phone frame `0 24px 54px -20px rgba(0,0,0,.55–.6)`; spec card `0 30px 60px -28px rgba(0,0,0,.7)`.
- **Spoiler glyph:** `⌁` (U+2141) — the universal marker for gated/spoiler content (eyebrows, and beside gated entries in the index).

---

## Screens / Views

### 1. Index (home)
**Purpose:** browse every entry, grouped by category; understand at a glance how much exists and what is gated.

**Layout (mobile, ~360–390px content):**
- Centered masthead: **mark (~42px)**, wordmark title (Cormorant small-caps `26`), then a mono terracotta version line: **"Current through Raindance · Book One"**.
- Gold hairline, then category groups. Each group: a header row with a **mono uppercase category name (muted)** left and a **gold count** right, then entry rows in **Spectral `18/1.95`**. Thin hairline between groups.
- Categories & counts (18 entries total): **Cosmology & Systems (06)**, **People (08)**, **Organisations & Places (02)**, **Objects (02)**.
- Entries with a **gated section** show a trailing `⌁` in a faint muted colour (e.g. *Zaka — the Rainmaker ⌁*, *Dalinar ⌁*).

### 2. Entry
**Purpose:** read one subject. Spoiler-safe.

**Layout (mobile):**
- Top meta row: small mark (`15px`) + mono uppercase "The Atogam Codex".
- **Category eyebrow** (mono uppercase, terracotta, e.g. "People").
- **Title** — Cormorant small-caps `32`, e.g. *Zaka — the Rainmaker*. Short terracotta rule (`36×2px`) beneath.
- **Body** — Spectral `17/1.64`, several paragraphs, spoiler-free (only public/in-world-ambiguous information).
- **Spoiler gate** (see below).
- **Related** — mono label + Spectral row of links separated by `·`.
- **Footer** — mark + "Current through Raindance"; an italic Spectral line "This entry begins in Raindance, Book One →".

Each of Index and Entry exists in **both grounds** (dark = 2b, light = 2c) — identical structure and copy, only the palette differs.

---

## Interactions & Behavior

### Spoiler gate (core mechanic)
Inline, no modal, no blur-peek.
- **Closed state:** a bordered box (`4px` radius, faint terracotta-tinted fill). Contents: mono terracotta eyebrow **"⌁ Spoiler · Raindance"**; a **plain-language description of the risk in sans** ("Reveals how the Rainmaker's story ends — his name, his death, and who he was."); an outlined **"Reveal ⌁"** button. The description names *what kind* of spoiler it is so the reader consents knowingly.
- **Open state:** box is replaced by a **left terracotta border rule** (`2px`, padding-left `17px`); eyebrow becomes **"⌁ Revealed · Raindance"**; the revealed text renders in Spectral `16.5/1.62`; a quiet mono **"Hide ⌁"** control collapses it again.
- Reveal/Hide toggles in place — no navigation, no layout jump beyond the expand.

### Version indicator ("staggered reveal")
- Every surface is stamped with the reader's **"Current through <Book/section>"** position (mono, terracotta on the index masthead; muted in entry footers).
- The `⌁` marker in the index flags entries that contain gated sections the reader has not unlocked.
- Entries note where they **begin** ("This entry begins in Raindance, Book One") so a reader knows an entry is safe to open at their position.

### Links & navigation
- Related links and inline cross-references are Spectral, terracotta (`#d98b52` dark / `#9c4a2b` light). Define default `a` / `a:hover` from these — do not leave browser-blue.
- Index row → Entry. Entry Related → other Entry.

### Not yet designed (roadmap — do not block on these)
- **Arrival threshold / admission** (a first-visit gate that sets the reader's "current-through" position) — placement was being explored (threshold vs. quiet end-of-entry). Build the version-position *state* now; the admission UI comes next.
- Short/long entry variants (Atom, Ali), desktop layout, and the scaled index for the 60+ entry target.

---

## State Management
- `theme`: `dark` (default) | `light`. Persist choice.
- `currentThrough`: the reader's unlocked version (e.g. `"raindance-b1"`). Drives which entries/sections are gated and every "Current through …" stamp. Set via the (future) admission step; default to the earliest published position.
- Per-entry `spoilerRevealed[entryId][sectionId]`: boolean, toggled by Reveal/Hide. May persist per session.
- Content is static/authored (CMS or MDX). Each **entry** has: id, category, title, public body, and zero-or-more **gated sections** each carrying a `minVersion` (unlock point) + a short risk description + the revealed body. Each **section**'s visibility = `currentThrough >= minVersion`.

## Assets
- `assets/atogam-mark.png` — **master logo**, artist original (256×256, transparent). Original filename: `ATOGAM_Codex_Icon_TerminatorRising_FullColour_256.png`.
- `assets/atogam-mark.svg` — vector recreation for UI use (crisp at all sizes; swap the axis stroke colour per ground as noted under *The Mark*).
- **Fonts (Google Fonts):** Cormorant Garamond (400,500,600 + italics), Spectral (300,400,500,600 + italics), IBM Plex Mono (400,500,600).
- No photographic/illustrative assets — the codex is type-and-mark only by design (data-cost discipline).

## Files
- `Atogam Codex.dc.html` — the design prototype. **Build from Turn 2:**
  - **2a** — mark & full type/colour system spec (this is your token reference, rendered).
  - **2b** — **dark ground** (default): Index + Zaka entry, spoiler **closed** and **open**.
  - **2c** — **light ground**: Index + Zaka entry (spoiler closed).
  - *(Turn 1 is a superseded exploration with a different logo — ignore.)*
- `support.js` — runtime required to open the prototype locally; not part of the product.
- `assets/` — logo master + vector.

All copy in the prototype (the Zaka entry, category names, counts) is **real content from Book One** and can be used as-is for implementation/tests.
