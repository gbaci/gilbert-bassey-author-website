# The Vlogging Course — Landing Page Handoff

**Chosen direction: Direction 1 — "Front Page" (editorial, high-contrast light).**
Build this. The Cinematic direction was dropped; its files are in `archive/` for reference only.

> ⚠️ **Copy is placeholder.** The words, prices, dates, and `[X]` counts will be replaced.
> This handoff is about capturing the **design** — layout, type system, color, spacing, components,
> and responsive behavior. Treat all text as lorem.

---

## What to build from

| File | Role |
|---|---|
| **`direction-1-landing.html`** | ✅ **Canonical design.** Standalone, self-contained HTML — inline styles, exact pixel values, real fonts, working accordion + scroll-reveal. Port this. |
| `assets/gilbert-bw.jpg` | Instructor portrait used in the hero + instructor section. |
| `Vlogging Course.dc.html` | Original prototype (contains all 4 explored directions behind a switcher). Secondary reference only. |
| `Vlogging Course - Mobile.dc.html` | Original mobile prototype. Secondary reference. |
| `archive/` | Dropped Cinematic direction. Ignore unless asked. |

Open `direction-1-landing.html` directly in a browser — it renders with no build step.

---

## Design system

### Color
| Token | Hex | Use |
|---|---|---|
| Ink | `#16130F` | Primary text; inverted band/section backgrounds |
| Warm white | `#F7F4EE` | Page background; text on ink |
| Warm white 2 | `#efe9dd` | Alternating section background ("What you get", FAQ) |
| Red (primary) | `#DD2D1B` | Accent, buttons, eyebrows, numerals, links, rules |
| Red (on-dark) | `#FF6A4D` / `#FF8A72` | Accent on ink backgrounds |
| Muted text | `#4a443b` | Body copy on light |
| Muted text 2 | `#6B655B` / `#9a9388` | Fine print, struck price |
| Hairline | `rgba(22,19,15,.16)` | Borders / dividers on light; `rgba(247,244,238,.14)` on ink |

### Type
- **Archivo** (700/800) — display: H1/H2, nav wordmark, price, stat numerals. Tight tracking (−.02 to −.03em).
- **Newsreader** (400/500, + italic) — serif body voice, the "why different" pull-quote, italic emphasis (`best stories.`, book titles).
- **Space Grotesk** (400–600) — UI/utility: eyebrows (uppercase, `.16em` tracking, 12.5px), nav, buttons, fine print, list numerals.
- Base body font is Newsreader serif; headings switch to Archivo.
- Headings use `clamp()` for fluid sizing — keep those.

### Layout & spacing
- Content max-width **1180px**, centered, **32px** side gutters (banner/nav/most sections).
- Narrower measures: "why different" band 980px, credibility card 900px, learn intro 760px.
- Vertical section rhythm: **104px** top/bottom padding (light sections); inverted bands 108–120px.
- Buttons: red fill, **2px** radius (nearly square — intentional), Space Grotesk 600.
- Rules & 1px grid gaps carry the editorial feel — the "What you get" cards are a 4-up grid with 1px hairline gutters over an ink background.
- Portrait treatment: `aspect-ratio:4/5`, `grayscale(1) contrast(1.05)`, 3px red bar pinned to top edge.

### Components present
Sticky early-bird banner · nav · split hero (copy + portrait) · proof strip · "who it's for" numbered list · inverted pull-quote band · two-column curriculum list · 4-up "what you get" grid · credibility card · inverted instructor split · enroll (price + includes card) · `<details>` FAQ accordion · inverted final CTA + footer.

### Interaction
- **FAQ:** native `<details>/<summary>` accordion, custom `+` marker, default marker hidden.
- **Scroll-reveal:** `[data-reveal]` elements fade + rise 20px via IntersectionObserver. Progressive enhancement — everything is fully visible without JS. Optional to keep.

---

## Responsive
Desktop-first. `direction-1-landing.html` includes media queries (class hooks `d1-hero`, `d1-whofor`, `d1-getgrid`, `d1-learn`, `d1-instructor`, `d1-enroll`, `d1-faq`) that:
- **≤920px:** all multi-column grids collapse to 1 column; curriculum `columns:2` → 1; "what you get" → 2-up.
- **≤560px:** "what you get" → 1-up; nav links hidden (needs a real mobile menu in production); section padding tightened.

These are a sensible baseline, not a finished mobile design — refine breakpoints/menu as needed. The original `Vlogging Course - Mobile.dc.html` shows a mobile-specific take if you want a reference.

---

## Notes for implementation
- Fonts load from Google Fonts (`Archivo`, `Newsreader`, `Space Grotesk`) — swap to self-hosted if the codebase prefers.
- `₦` is the Naira sign — keep it.
- `[X]` marks counts to be filled in (weeks, lesson count, Q&A weeks).
- Prices shown (`₦35,000` / `₦50,000`) are placeholder — confirm final pricing before launch.
- Anchor nav: `#learn`, `#instructor`, `#faq`, `#enroll`.
