# Proof section — build spec

Replaces the current "40M+ views" section (vlog thumbnail + Key metrics screenshot in two cards).
Approved treatment: **3b, "Number first"** — see `../Proof Section Options.dc.html`, option `#3b`, for the exact markup to port.

## What changes

1. Drop the raw vlog thumbnail card and the full-screen analytics screenshot.
2. Use exactly two images, already cropped to the metric tiles:
   - `assets/proof-365-tiles.jpg` — TikTok, last 365 days
   - `assets/proof-video-tiles.jpg` — one vlog, single-post analysis
3. Each image sits on a cream mat (`background:#F3EFE7`, `padding:7px`) at **150px wide**, left-aligned, with a 3-line grey caption beside it (`Screenshot, / TikTok Studio / · 365 days` and `· one post`). The mat is what keeps the white iOS UI from floating on the black page — keep it.
4. Numbers carry the section, not the screenshots: each block leads with a Libre Caslon Display numeral at 64px in `#E3BE4A`.

## Section structure (mobile, 390px reference)

- Eyebrow: `THE RECEIPTS` — 10.5px, .2em tracking, uppercase, `#E3BE4A`
- H2: "40M+ views. Here's the work behind the number." — Libre Caslon Display 400, 29px, line-height 1.14, `#ECE4D6`
- Intro paragraph — 15px, `#cfc7b6`, bold spans in `#ECE4D6`
- Block 1, above a `1px solid rgba(236,228,214,.16)` top rule:
  - `38.3M` (64px gold serif)
  - "post views in twelve months" — 14.5px `#ECE4D6`
  - "Plus 5.5M likes and 40.3K shares. TikTok, Aug 2025 – Aug 2026." — 12.5px `#9d957f`
  - mat + caption row
- Block 2, same pattern:
  - `65.6s`
  - "average watch time on a four-minute vlog"
  - "That vlog: 2.1M views and 14.8K new followers from one video."
  - mat + caption row
- CTA: `Join the First Cohort` — full-width, `#C9A227` on `#0E0D0B`, 700, 15px, radius 2px

Desktop: same content, two blocks side by side in a 2-column grid; numerals scale up to ~84px, mats to ~200px wide.

## Copy change to note

The old line ended "here are some of the vlogs." It now reads **"Rather than just tell you that, here are the numbers."** — because the exhibits are analytics, not vlogs. Approved.

## Facts in this section (verified against source screenshots, do not alter)

- 38.3M post views, 5.5M likes, 40.3K shares — TikTok, Aug 30 2025 – Aug 29 2026
- One vlog (4:10 runtime): 2.1M views, 65.6s average watch time, 14.8K new followers

## Rejected inputs

Instagram "vlogs" collection list (unreadable at mobile size) and the IG views donut (trends −59%, off-palette purple/pink). Not to be used.
