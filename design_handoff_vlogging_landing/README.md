# Handoff: The Vlogging Course — Landing Page (Cinematic direction)

## Overview
Marketing landing page for **The Vlogging Course**, a story-first online vlogging course
taught by Gilbert Bassey (Vlogger of the Year, 2024). The page sells a single cohort-based
course: it explains who it's for, why it's different (story over gear), what you'll learn,
what's included, who the instructor is, pricing, and an FAQ — ending in a final CTA.

**Chosen direction: "Cinematic."** During design we explored four visual directions. The
client picked **Direction 2 — Cinematic**: a dark, warm, editorial look (near-black
background, gold accents, serif display type, full-bleed grayscale portrait). Build only
this direction. The other three directions still live in the source files but should be
ignored.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the
intended look and behavior, **not production code to copy directly**. They use a small
custom template runtime (`support.js`, `<x-dc>`, `{{ }}` holes, `<sc-if>`) that is specific
to the design tool and is **not** meant to ship.

Your task: **recreate the Cinematic design in the existing codebase** (React/Next, Vue, etc.)
using its established components, styling approach, and conventions. If no front-end exists
yet, pick the most appropriate framework and implement there. Treat the HTML as the source
of truth for layout, spacing, color, type, and copy.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy, and interactions are all
specified below and present in the prototype. Recreate the UI pixel-accurately using the
codebase's existing patterns. Exact values are in **Design Tokens**.

## Where to look in the source files

**⭐ Start here — flattened standalone HTML (the ground-truth markup to port):**
- **`cinematic-desktop.html`** — the full desktop Cinematic page as plain HTML: inline styles,
  real pixel values, native `<details>` FAQ, images in `./assets/`. **No custom runtime, no
  build step** — open it in any browser, read the markup directly, port it into your codebase.
- **`cinematic-mobile.html`** — the mobile Cinematic page, same deal (393px-wide layout, fake
  phone status bar removed).

These two files are the canonical reference. Read them first; everything below is supporting
detail. (The `.dc.html` files are the original design-tool prototypes and use a non-standard
runtime — keep them only as a secondary live reference.)

**Original prototype files (secondary):**
- **Desktop:** `Vlogging Course.dc.html` → the block between
  `<!-- DIRECTION 2 — CINEMATIC ... -->` and `<!-- DIRECTION 3 ... -->`
  (inside `<sc-if value="{{ isDir2 }}">`). **Ignore Directions 1, 3, and 4.**
- **Mobile:** `Vlogging Course - Mobile.dc.html` → the phone labeled **"02 — Cinematic"**
  (`<!-- PHONE 2 — CINEMATIC -->`). The phone bezel / status bar is **presentation only**.
- **Image assets:** `assets/gilbert-bw.jpg`, `assets/gilbert-bw3-mqrme1kd.jpg`.

---

## Design Tokens

### Colors
| Token | Hex | Use |
|---|---|---|
| Background (base) | `#0E0D0B` | Page background, hero, cards |
| Background (alt section) | `#0b0a09` | Alternating darker sections (why-different, what-you-get, enroll, final CTA) |
| Text primary | `#ECE4D6` | Headlines, strong body text |
| Text secondary | `#cfc7b6` | Body copy, nav links |
| Text muted | `#9d957f` | Captions, helper text, FAQ answers |
| Text faint | `#6b6557` | Footer, struck-through old price |
| Gold (primary) | `#C9A227` | Buttons, solid CTA fill, numerals, ◆ bullets, borders |
| Gold (bright accent) | `#E3BE4A` | Eyebrow labels, highlighted words, links over dark |
| Hairline border | `rgba(236,228,214,0.14)` | Section dividers, grid gridlines, FAQ rules |
| Gold border (subtle) | `rgba(201,162,39,0.4)` | "What you get" + "Includes" card borders |
| Gold border (faint) | `rgba(201,162,39,0.3–0.32)` | Banner bottom border, hero inner frame |

Selection highlight (global): background `#DD2D1B`, text `#fff` (carried from base styles; optional to keep).

### Typography
Two Google Fonts:
- **Libre Caslon Display** (serif, weight 400) — all display headlines (`h1`, `h2`),
  section numerals (01–11), the wordmark, large price figures, and italic book titles.
- **Hanken Grotesk** (sans, weights 400/500/600/700/800) — body copy, eyebrows, nav,
  buttons, FAQ, captions.

Type scale (desktop, from the prototype):
| Element | Font | Size | Weight | Line-height | Notes |
|---|---|---|---|---|---|
| Hero `h1` | Libre Caslon Display | `clamp(40px,5.6vw,84px)` | 400 | 1.04 | letter-spacing −.01em; max-width 18ch; "best stories." in `#E3BE4A` |
| Section `h2` | Libre Caslon Display | `clamp(28px,3.4vw,46px)` | 400 | 1.16 | |
| Instructor `h2` (name) | Libre Caslon Display | `clamp(34px,3.6vw,52px)` | 400 | 1.04 | |
| Final CTA `h2` | Libre Caslon Display | `clamp(40px,6.5vw,92px)` | 400 | 1.02 | |
| "Why different" pull-quote | Libre Caslon Display | `clamp(24px,2.9vw,36px)` | 400 | 1.40 | highlighted clause in `#E3BE4A` |
| Eyebrow label | Hanken Grotesk | 12px | — | — | letter-spacing .26em; uppercase; `#E3BE4A`; often preceded by a 40×1px gold rule |
| Body / list copy | Hanken Grotesk | 18px | 400 | 1.5–1.62 | `#cfc7b6` |
| Hero sub-paragraph | Hanken Grotesk | 21px | 400 | 1.55 | max-width 50ch |
| Price figure | Libre Caslon Display | `clamp(50px,6.5vw,86px)` | 400 | 1 | old price 28px, `#6b6557`, line-through |
| Button label | Hanken Grotesk | 16–18px | 700 | — | |
| Caption / helper | Hanken Grotesk | 13–15px | 400 | 1.5 | `#9d957f` |

Mobile sizes scale down (hero h1 ≈ 33px, body ≈ 15.5px, eyebrow ≈ 10.5px / letter-spacing .2em).

### Spacing & layout
- Content container: `max-width: 1200px; margin: 0 auto` (FAQ / why-different narrower: 1000px).
- Horizontal padding: **54px** desktop section gutters (header same); **20–24px** mobile.
- Vertical section rhythm: **120px** top/bottom padding on most sections; final CTA 130px.
- Grids use **1px gaps with a hairline background** to create gridlines (who-it's-for 2-col;
  what-you-get 4-col with 24px gap and bordered cards instead).

### Borders / radius / effects
- Border radius: **2px** on buttons and bordered cards (deliberately near-square, editorial).
- No drop shadows in content (the only shadow is the mobile phone bezel, which is chrome).
- Hero has a decorative inset frame: `position:absolute; inset:22px; border:1px solid rgba(201,162,39,.32)`.
- Instructor portrait has an inset gold frame: `inset:14px; border:1px solid rgba(201,162,39,.5)`.

---

## Screens / Sections (Cinematic desktop)

Order, top to bottom:

1. **Sticky early-bird banner** — full-width, `#0E0D0B`, bottom border gold-faint. Centered:
   "Save ₦15,000 on The Vlogging Course. Early-bird pricing ends August 1." + "Enroll now →"
   link in `#E3BE4A` (uppercase, .06em). `position: sticky; top: 0; z-index: 50`.

2. **Hero** (`min-height: clamp(640px,94vh,980px)`, full-bleed) —
   - Background: `assets/gilbert-bw.jpg`, `object-fit: cover; object-position: 72% 12%`,
     filter `grayscale(1) contrast(1.04) brightness(.92)`.
   - Two gradient overlays for legibility: a left-to-right
     `linear-gradient(100deg, rgba(14,13,11,.96) 0%, .78 38%, .22 72%, .5 100%)` and a
     bottom-up `linear-gradient(to top, rgba(14,13,11,.9) 0%, transparent 30%)`.
   - Decorative inset gold frame (`inset:22px`).
   - **Nav** over hero (z-index 4): wordmark "The Vlogging Course" (Libre Caslon Display 21px)
     left; right = Curriculum, Instructor (text links `#cfc7b6`), and an **Enroll** outlined
     button (1px `#C9A227` border, text `#E3BE4A`, 9px 20px, radius 2px).
   - **Hero content** anchored to the bottom (`margin-top:auto`, padding-bottom 90px):
     gold eyebrow with 40px rule → "A [X]-week vlogging course for creators, founders, and
     filmmakers"; `h1` "The creators growing fastest don't have the best cameras. They tell
     the **best stories.**" (last two words `#E3BE4A`); 21px sub-paragraph; CTA row = solid
     gold button "Enroll Now — ₦35,000" (`#C9A227` fill, `#0E0D0B` text, 17px 32px) + caption
     "Early-bird price · ₦15,000 off until August 1 · Starts November 1".

3. **Proof strip** — single centered row, hairline bottom border, uppercase .08em `#cfc7b6`,
   gold ◆ separators: "Over 40 million views ◆ Vlogger of the Year, 2024 ◆ Author of *A
   Decent Man*" (book title in Libre Caslon Display, non-uppercased).

4. **Who it's for** — centered intro (gold eyebrow "Who it's for" + `h2` "If you're building
   something and need people to pay attention, vlogging is your most powerful tool."), then a
   **2×2 grid** (1px hairline gridlines). Each cell: gold serif numeral 01–04, then a sentence
   with a bold lead-in (`#ECE4D6`) over `#cfc7b6` body. Copy (verbatim):
   - 01 **Content creators and influencers** who want to grow their following and keep the audience they have coming back.
   - 02 **Business owners and founders** who want to build a brand people trust by showing the story behind it.
   - 03 **Filmmakers and video pros** who want to build an audience for their work and keep their craft sharp between projects.
   - 04 **Anyone with something to grow:** a name, a brand, a body of work.

5. **Why this course is different** — alt background `#0b0a09`, top+bottom hairline borders,
   centered, max-width 1000px. Gold eyebrow + one large Libre Caslon Display pull-quote
   (clamp 24–36px, line-height 1.4) with the clause "nothing holds attention like a
   well-told story." highlighted in `#E3BE4A`. Full copy:
   > Most vlogging courses teach cameras, settings, and posting schedules. But audiences don't grow from production value or frequency. They grow from attention, and **nothing holds attention like a well-told story.** This course is built by a storyteller, around the real growth lever in vlogging: turning your raw moments into videos people watch to the end, follow, and come back for. Master that and you stop chasing the algorithm. You start feeding it exactly what it rewards.

6. **What you'll learn** (`id="learn"`) — left-aligned intro (gold eyebrow + Libre Caslon
   Display lead 24–34px). Then an **11-item list laid out in 2 CSS columns** (`columns:2;
   column-gap:72px`); each item: `break-inside:avoid`, top hairline rule, gold serif numeral,
   18px body. Items (verbatim):
   1. How watch time drives the algorithm, and how story is what drives watch time.
   2. What actually separates a vlog from staged "reality TV," and why true beats polished every time.
   3. How to find the story in an ordinary day: a character, a goal, the obstacles, the payoff.
   4. Which kind of vlog fits your goals: lifestyle, journey, challenge, travel, and more.
   5. How to be natural and watchable on camera, so viewers connect with you and stay.
   6. How to shoot footage that tells a story, with the camera you already own.
   7. Which moments to capture, and how to frame them, so the story comes together in the edit.
   8. How to edit for watch time: a hook in the first 3 seconds, tight pacing, and cutting everything that drags.
   9. The art of the mini-vlog: short, standalone moments that quietly pull big numbers.
   10. How to record and edit voiceover that carries the story between your clips.
   11. When to post, how to grow, and how to read your analytics without guessing.

   Closing line below the list, Libre Caslon Display 22px, `#E3BE4A`:
   "And a repeatable way of seeing and telling your life that you'll use on every vlog after this one."

7. **What you get** — alt background `#0b0a09`, top hairline. Centered gold eyebrow, then a
   **4-column grid** (24px gap) of bordered cards (`1px rgba(201,162,39,.4)`, min-height 240px).
   Each card: large gold figure/glyph (Libre Caslon Display 40px), title (Libre Caslon Display
   21px), muted description. Cards:
   - **[X] Video Lessons** — Pre-recorded so you can watch at your pace. Yours for life.
   - **[X] Live Q&A Calls** — Weekly calls with Gilbert. Bring your footage, your questions, your stuck points.
   - **✦ Resource Pack** — Shot-list templates, a gear guide, and editing checklists you'll reuse on every vlog.
   - **★ Vlog Reviews** — Standout students get a vlog personally reviewed by Gilbert. Chosen by quality and engagement.

8. **Instructor** (`id="instructor"`) — 2-column grid (1fr 1fr, 72px gap, vertically centered).
   Left: portrait `assets/gilbert-bw.jpg` (aspect 4/5, grayscale, inset gold frame). Right:
   gold eyebrow "You're learning from a Vlogger of the Year", `h2` "Gilbert Bassey", three
   paragraphs (bold lead-ins for the award + storyteller credentials). Mentions: Vlogger of
   the Year 2024 Social Media Awards; 40M+ views (@onegillianbaci); author of *A Decent Man*;
   writes *Lightbringer* newsletter (15,000+ readers).

9. **Enroll** (`id="enroll"`) — alt background `#0b0a09`. 2-column grid (1fr 1fr, 64px gap).
   Left: gold eyebrow "Enroll"; price row "**₦35,000**" (Libre Caslon Display clamp 50–86px)
   with struck-through "₦50,000" (`#6b6557`); "Early-bird price — save ₦15,000" (`#E3BE4A`);
   "One-time payment. Lifetime access."; solid gold "Enroll Now" button; fine print "Early-bird
   price ends August 1. Registration closes September 30. Course starts November 1, 2026."
   Right: a bordered "Includes" panel (`1px rgba(201,162,39,.4)`) — header "Includes" then a
   list with gold ◆ bullets and hairline dividers:
   - [X] video lessons
   - [X] weeks of live Q&A calls
   - Resource pack (templates, gear guide, checklists)
   - Lifetime access to all materials
   - A community of creators on the same journey
   - A chance to have your vlog reviewed 1-on-1 by Gilbert

10. **FAQ** (`id="faq"`) — max-width 1000px, centered `h2` "Frequently asked questions". Native
    `<details>/<summary>` accordions, hairline top borders, summary 19px 600 with a gold "+"
    marker (default list marker hidden). Answers 17px `#9d957f`, max-width 64ch. Questions:
    - When does the course start? — Registration open through Sept 30, 2026; begins Nov 1, 2026; everyone starts together as a cohort.
    - How long do I have access? — Lifetime. Lessons are yours forever; live calls run during the cohort.
    - Do I need an expensive camera? — No. Your phone is enough. People watch for the story, not the gear.
    - I already post and I'm not growing. Will this help? — That's exactly who this is for. The fix is the story.
    - What if I miss a live call? — Every call is recorded and shared with the cohort.
    - Is this for complete beginners? — Yes. You can start from zero.
    - I have another question. — Email gilbert@gilbertbassey.com.

11. **Final CTA** — alt background `#0b0a09`, top hairline, centered. Huge Libre Caslon Display
    `h2` "Ready to grow through vlogging?" (clamp 40–92px), solid gold "Enroll Now — ₦35,000"
    button, then a footer row (hairline top) with "The Vlogging Course — Gilbert Bassey" left
    and "gilbert@gilbertbassey.com" right.

---

## ⭐ Cinematic MOBILE — current/approved state (read this for the mobile build)

The client refined the mobile Cinematic screen directly; it is the **most up-to-date,
approved layout** and in places is **richer than the desktop**. Build mobile from the phone
labeled **"02 — Cinematic"** in `Vlogging Course - Mobile.dc.html` (starts ~line 191). The
phone bezel, status bar, and 9:41 clock are **presentation chrome — do not build them**; only
build the inner screen content.

### Hero image treatment (client's manual edit — keep exactly)
- Image: **`assets/gilbert-bw3-mqrme1kd.jpg`** (a different, preferred portrait than the
  desktop's `gilbert-bw.jpg`). In the source the `src` is `./gilbert-bw3-mqrme1kd.jpg`
  (project root); it is included here under `assets/`.
- Treatment on the hero `<img>` (absolute, behind the content):
  - `object-fit: cover; object-position: center top`
  - `width: 708px; height: 100%` (≈2× the 369px screen — intentional oversize)
  - `top: -100px` (pulls the framing up so the face sits high)
  - `transform: scale(1.2) translateY(11%); transform-origin: center top`
  - `filter: grayscale(1) contrast(1.03) brightness(.84)`
- Two stacked gradient overlays for legibility:
  - top-down: `linear-gradient(to bottom, rgba(14,13,11,.92) 0%, .36 15%, 0 34%)`
  - bottom-up (stronger): `linear-gradient(to top, rgba(14,13,11,.98) 0%, .92 23%, .45 53%, 0 76%)`
- Decorative inset gold frame inside the hero: `inset:14px` (nudged `left:10px; top:-103px`
  in the prototype), `border:1px solid rgba(201,162,39,.34)`, `border-radius:6px`.
- Hero min-height: **680px**. Hero content (eyebrow → h1 → sub → save-pill row → CTA → fine
  print) is anchored to the bottom via `margin-top:auto`, padding `0 24px 36px`.

### Mobile section order (note the differences vs desktop)
1. Hero (as above) — eyebrow "A [X]-week course", h1 (33px), sub (15.5px), a row with a
   gold **"SAVE ₦15,000"** pill + "Early-bird ends Aug 1", solid gold "Enroll Now — ₦35,000"
   button, "Regular ₦50,000 · Course starts November 1".
2. Proof strip (stacked, centered): Over 40 million views ◆ Vlogger of the Year, 2024 ◆ Author of *A Decent Man*.
3. Who it's for — centered intro + the four numbered items stacked (01–04, hairline rules).
4. Why this course is different — `#0b0a09`, top/bottom hairline, 19px Libre Caslon pull-quote.
5. **What you'll learn → 6-MODULE CURRICULUM (canonical — richer than desktop).** Intro lead,
   a meta line "6 modules · [X] lessons", then **six bordered module cards** (`1px
   rgba(201,162,39,.38)`, 22px padding). Each card: gold serif module number + serif module
   title, a one-line description, and a `·`-separated list of lesson titles in muted text.
   **Module 05 (Voiceover) is visually emphasized** — stronger border `rgba(201,162,39,.55)`
   and a faint gold wash `background: rgba(201,162,39,.05)`. Modules + lessons:
   - **01 Foundations** — What a vlog really is, the types that fit your goals, and whether vlogging is right for you. · *What a vlog is & isn't · Types of vlog · Should you be a vlogger?*
   - **02 Pre-vlog** — The mindset and the storytelling method before you ever hit record. · *Mindset · How to tell a story · Tools · What to vlog · What makes a good vlog*
   - **03 Shooting** — Capture footage that tells a story with the camera you already own. · *How to shoot · Shooting in blocks · What to shoot*
   - **04 Editing** — Cut for watch time, nail the hook, and master the mini-vlog. · *How to edit · The 3-second hook · Watch time · Mini-vlogs*
   - **05 Voiceover** *(emphasized)* — The other engine of watch time, and often more important than the footage itself. It carries the story between your clips and can quietly fix almost anything your shooting got wrong. · *The secret to engaging voiceovers · Recording · Editing*
   - **06 Posting & Growth** — When to post, how to grow, and how to read your numbers without guessing. · *When to post · Growth hacks · Analytics*

   Closing line (Libre Caslon 16.5px, `#E3BE4A`): "And a repeatable way of seeing and telling
   your life that you'll use on every vlog after this one."
6. What you get — `#0b0a09`, four bordered cards stacked (Video Lessons, Live Q&A Calls, Resource Pack, Vlog Reviews).
7. Instructor — portrait (`assets/gilbert-bw.jpg`, 4/5, inset gold frame) then eyebrow, "Gilbert Bassey", three paragraphs.
8. Enroll — `#0b0a09`, price block (₦35,000 / struck ₦50,000), bordered "Includes" panel (6 ◆ rows), solid gold "Enroll Now", fine print.
9. FAQ — centered title, native `<details>` accordions with gold "+" markers (same 7 Q&As as desktop).

> **Recommendation:** treat the mobile's **6-module curriculum** as the real course structure
> and bring it up to the **desktop** too (the desktop currently shows a flat 11-point list).
> Confirm the module/lesson breakdown with the client before finalizing.

---

> **`[X]` placeholders** appear deliberately (course length in weeks, number of lessons, number
> of Q&A calls). These are unknowns to be filled in with real numbers before launch — wire them
> to data/CMS rather than hard-coding.

## Interactions & Behavior
- **Scroll reveal:** elements marked `data-reveal` in the prototype fade/slide in on scroll
  (handled by a small IntersectionObserver in the prototype's logic). Re-implement as a light
  fade-up on enter (≈300–500ms, ease-out, ~16px translateY). Purely decorative — content must
  be readable without JS.
- **Smooth scrolling** to in-page anchors (`#learn`, `#instructor`, `#enroll`, `#faq`) via
  nav and banner links (`html{scroll-behavior:smooth}`).
- **FAQ:** native `<details>` toggle; the "+" marker can rotate/turn to "–" on open (optional
  polish — prototype keeps a static "+").
- **Buttons/links over dark:** the solid gold CTA and outlined Enroll button — add a subtle
  hover (e.g. slight brightness/opacity shift). The prototype doesn't define explicit hover
  states, so use the codebase's standard button hover treatment in the same gold palette.
- **Responsive:** desktop multi-column grids collapse to single column on narrow viewports;
  hero text reflows; gutters shrink to ~20–24px. See the mobile reference for the intended
  one-column stack, type sizes, and the dark hero with the portrait bleeding from the top.

## State Management
Essentially a static marketing page — no app state. The only dynamic needs:
- **Course variables** (`[X]` values): weeks, lesson count, Q&A call count — from config/CMS.
- **Enroll CTAs** should point to the real checkout/registration URL (all are `#enroll`/`#`
  placeholders in the prototype).
- Optional: gate or hide the early-bird banner/pricing after the deadline (Aug 1) — a date
  check, if desired.

## Assets
- `assets/gilbert-bw3-mqrme1kd.jpg` — **preferred hero portrait for mobile Cinematic** (the
  client's chosen image; see the hero-treatment notes above). Referenced as
  `./gilbert-bw3-mqrme1kd.jpg` in the mobile source.
- `assets/gilbert-bw.jpg` — instructor portrait (Gilbert Bassey). Used full-bleed in the
  **desktop** hero (grayscale, high object-position) and in the instructor section of both
  (4/5 portrait crop). Supply high-res originals for production; the design intentionally
  renders them grayscale with a slight contrast bump.
- No icon set is required — the design uses typographic glyphs only (◆, ✦, ★, +, →) and serif
  numerals. Substitute with the codebase's icon system if preferred, keeping the gold color.

## Fonts to load
- Libre Caslon Display (400)
- Hanken Grotesk (400, 500, 600, 700, 800)

Both from Google Fonts. Self-host if the codebase self-hosts fonts.

## Files in this bundle
- **`cinematic-desktop.html`** — ⭐ flattened standalone desktop page (port from this).
- **`cinematic-mobile.html`** — ⭐ flattened standalone mobile page (port from this).
- `Vlogging Course.dc.html` — original desktop prototype (all 4 directions; build Direction 2 only).
- `Vlogging Course - Mobile.dc.html` — original mobile prototype (build "02 — Cinematic").
- `assets/gilbert-bw.jpg` — instructor portrait (desktop hero + both instructor sections).
- `assets/gilbert-bw3-mqrme1kd.jpg` — preferred mobile-Cinematic hero portrait (client's edit).
- `README.md` — this document.
