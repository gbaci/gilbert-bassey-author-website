# Session Handoff (2026-08-25)

Covers: vlogging course landing page (copy + hero fix + CTAs), tvc-welcome.html redesign, A Decent Man page button change. Written so a new chat can pick up without re-deriving context.

## Git state
- Local `main` is in sync with `origin/main` (0 ahead / 0 behind) as of this handoff.
- **One uncommitted change**: `a-decent-man.html` (Selar button rename/reorder — see below).
- This sandbox cannot push to GitHub (no stored credentials) — Gilbert pushes manually from his own terminal. Confirm he's actually pushed recently before assuming anything here is live.
- Note: something in this environment appears to auto-commit periodically with generic messages ("update", "adjust") — git log messages aren't a reliable record of *why* something changed. This doc is the source of truth for intent.

---

## 1. Vlogging Course landing page

Two competing designs still both exist, side by side, **no decision made yet** on which ships:
- **`vlogging-course.html`** — Cinematic (near-black `#0E0D0B`, gold `#C9A227`/`#E3BE4A`, Libre Caslon Display + Hanken Grotesk). Dual markup: `.vg-desktop` / `.vg-mobile` blocks, kept deliberately separate (merging via media queries previously broke hero image positioning).
- **`vlogging-course-2.html`** — Front Page (light editorial, warm-white `#F7F4EE`, red `#DD2D1B`, Archivo/Newsreader/Space Grotesk). Single responsive mobile-first layout. Has `noindex, nofollow` since it's an unpublished draft.

**Whichever loses should eventually be deleted/archived — don't leave two live-looking drafts indefinitely.**

### Copy refinement pass (this session)
Gilbert supplied a full copy brief matching the finalized curriculum. Applied to both files, both breakpoints:
- Hero: new headline + subhead (no course logistics in the hero — those live elsewhere on the page).
- "Your life isn't boring" section: refined body copy, new closing line about vlogging = personal storytelling.
- Foundations, Pre-Vlog, Shooting, Editing, Voiceover module cards: headlines/body rewritten to reflect the actual course philosophy (find the story, capture what matters, cut aggressively, voiceover adds context not narration).
- Posting & Growth card: **left untouched** per the brief.
- Proof section, cohort experience, instructor bio, "who this is for," pricing, dates, FAQ: **left untouched** per the brief.

### Hero — mobile face-overlap fix (cinematic only)
The mobile hero (`vlogging-course.html`, `.vg-mobile`) overlays text on `images/gilbert-bw3.jpg`. Adding a longer headline + subhead pushed content height up, causing text to visually overlap Gilbert's face.

**Final fix** (after a few false starts — see below): the whole hero text stack (h1 + subhead + button + price + fine print) is wrapped in a `<div style="max-width:62%">`. This keeps text confined to the dark/black left portion of the frame, since the photo (`gilbert-bw3.jpg`, roughly square, face+shoulders occupy the right ~40% at most vertical bands) leaves that zone clear. **62% is a confirmed-good value — don't widen it without re-checking against the photo.** Went to 68% briefly to fit "Grow your audience" on one line, Gilbert rejected it and asked to revert to 62%.

Things that were tried and reverted, for context (don't redo these):
- Extracting the subheading out of the hero into a separate solid-background block below the photo — Gilbert rejected this, wanted it to "flow around the face" while staying in place.
- Desktop hero and `vlogging-course-2.html`'s hero were **not touched** — desktop has way more vertical room, and course-2's photo sits in its own grid cell (not behind text), so neither has this problem.

Hero headline final state: forced 3-line break via manual `<br>` tags —
"Grow your audience" / "with vlogs people" / "actually want to watch" (no trailing period — removed across all three hero instances, since no other heading on the page uses one).

Price block in mobile hero: was tiny (13px) and left-aligned; now 26px within the 62% column.

### More CTAs added
Was only 3 "Join the First Cohort" touchpoints (hero, enroll, final CTA). Now 6, alternating weight (button vs. small text link) so it doesn't recreate density problems:
1. Hero (button)
2. After "40M+ views" proof section (small text link)
3. After full curriculum — high-intent moment (solid button)
4. After instructor bio (small text link)
5. Enroll section (button)
6. Final CTA (button)

Applied identically to both breakpoints of `vlogging-course.html` and the single layout of `vlogging-course-2.html`.

### Final CTA simplified
Removed the long paragraph under the headline and the redundant date line after the button. New order: headline → price → "The first cohort begins September 29." → button → footer (nothing else below the button). Headline is now **"Ready to upgrade your vlogging?"** — Gilbert's own line, chosen over a few options I proposed.

### Still outstanding (unchanged from before this session)
- **Design decision**: cinematic vs. front-page — still not picked.
- **Vlog thumbnails**: "Add vlog" placeholder tiles in the proof section, both files — need real screenshots + view counts + links.
- **Deploy**: confirm Gilbert has pushed and Netlify redeployed.
- **Selar redirect**: confirm Selar checkout actually redirects to `tvc-welcome.html` after payment.

### Real content facts (locked, same in both files)
- Pricing: ₦15,000 early-bird until Sept 7, 2026 → ₦20,000 regular. No coupon code.
- Dates: early-bird ends Sept 7 · registration closes Sept 21 · cohort starts Sept 29, 2026.
- Selar link: `https://selar.com/1p7rd85219`
- Pixels: Facebook `1912184123065613`, TikTok `D7M7BURC77U8ETKS15LG` — both fire `ViewContent` at 15000 NGN on load.
- Footer contact: `gilbert@gilbertbassey.com`

---

## 2. tvc-welcome.html (post-payment redirect page)

Previously used generic site styling (Georgia serif, red accent — same as the rest of the site). This session **redesigned it to match the Cinematic vlogging-course.html look** (near-black bg, gold accents `#C9A227`/`#E3BE4A`, Libre Caslon Display + Hanken Grotesk) — Gilbert explicitly picked Cinematic when asked, over Front Page and "leave it neutral."

Added a new step 2, **"join the Telegram groups,"** with two pill-style buttons:
- Info channel: `https://t.me/+4aGXXMv3sEo4MGE0`
- Cohort 1 interactive group: `https://t.me/+LPQSy3HazYdmYjg8`

Steps renumbered 1–4: check email → join Telegram → mark calendar → come ready to work.

Committed. **If the design decision later lands on Front Page instead of Cinematic, this page will need re-skinning to match.**

---

## 3. A Decent Man page (a-decent-man.html) — UNCOMMITTED

Both Selar buttons (paperback section + ebook section) changed:
- Label: "Selar" → **"Buy from me"**
- Position: moved to be the **first** option in each list (ahead of Amazon/Apple Books/Kobo).

This is the one local change not yet committed as of this handoff.
