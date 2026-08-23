# Vlogging Course Landing Page — Handoff (2026-08-23)

## What this is
Two competing designs for "The Vlogging Course" landing page, built side by side so Gilbert can compare them on mobile before picking one:

- **`vlogging-course.html`** — original **Cinematic** design (near-black bg `#0E0D0B`, gold accents `#C9A227`/`#E3BE4A`, Libre Caslon Display + Hanken Grotesk). Dual markup: `.vg-desktop` and `.vg-mobile` blocks toggled at `max-width:768px` (kept deliberately separate — merging via media queries previously broke the hero image positioning).
- **`vlogging-course-2.html`** — alternate **Direction 1 "Front Page"** design (light editorial: warm-white `#F7F4EE`, ink `#16130F`, red `#DD2D1B`, Archivo/Newsreader/Space Grotesk). Single responsive layout, built **mobile-first** (base CSS is the phone layout; `min-width` media queries at 640/700/760/1024px scale it up to desktop). Has `<meta name="robots" content="noindex, nofollow">` since it's an unpublished draft.

Both files carry **identical real copy** — pricing, dates, curriculum, instructor bio, FAQ. Only the visual system differs. No decision has been made yet on which one ships.

**Not yet decided:** which design wins. Whichever loses should be deleted or archived rather than left sitting in the repo root — don't leave two live-looking drafts indefinitely.

## Current state / git
Both files have **uncommitted changes** as of this handoff (see below for what changed). Last commit on `main` is `a280ae2`, in sync with `origin/main`. Note: this sandboxed environment could not push to GitHub earlier in the project (no stored credentials) — Gilbert pushes manually from his own terminal.

## Real content facts (locked, same in both files)
- **Pricing:** ₦15,000 shown as *the* price everywhere, with "Early-bird price until September 7. Regular price: ₦20,000." as supporting copy. No coupon code mentioned anywhere on the page (Gilbert confirmed the early-bird price applies without a manual code — if that's wrong, every price block needs revisiting).
- **Dates:** early-bird ends September 7, 2026 · registration closes September 21, 2026 · cohort begins September 29, 2026.
- **Selar link:** `https://selar.com/1p7rd85219`
- **Pixels:** Facebook `1912184123065613`, TikTok `D7M7BURC77U8ETKS15LG` — both fire `ViewContent` at value 15000 NGN on page load.
- **Curriculum (6 modules = 6 weeks):** Foundations (Week 1), Pre-Vlog (Week 2), Shooting (Week 3), Editing (Week 4), Voiceover (Week 5), Posting & Growth (Week 6). Each module card now carries a small "Week N" tag.
- **Instructor bio:** Vlogger of the Year, 2024 Social Media Awards · 40M+ views across IG/TikTok/FB/YouTube (@onegillianbaci) · author of *A Decent Man* (4.29/5 Goodreads) · short film *Ananze and the Zipman* streaming on Amazon Prime · studied filmmaking at NYFA.
- Footer contact: `gilbert@gilbertbassey.com`
- `tvc-welcome.html` (post-payment redirect page) is separate, unaffected by any of this, uses neutral Georgia styling.

## What changed this session (both files, kept in sync)
1. **Hero cleanup:** removed the redundant "With Gillian Baci (aka Gilbert Bassey)" byline and the "6 weeks · 6 modules · 6 live Q&As" stats line (both restated info shown elsewhere), removed the "First cohort starts September 29" eyebrow line. Subhead now ends on "...that grow your audience" instead of "...people want to keep watching" (growth was missing from the copy).
2. **Section reorder:** "Your life isn't boring..." now comes before the "40M+ views" proof/vlog-thumbnails section (was reversed before).
3. **Pricing simplified:** flipped back and forth a few times this session — final state is ₦15,000 leading everywhere, "Early-bird price until September 7. Regular price: ₦20,000." as the supporting line, **no EARLYBIRD code mentioned**.
4. **Voiceover card:** removed its special highlighted border/background (module 05) — it now matches the other 5 curriculum cards exactly.
5. **Curriculum + weekly schedule merged:** added a "Week N" tag to each of the 6 curriculum cards; deleted the standalone "how six weeks work" section since it just restated the same 6 modules with shorter copy. This was per feedback from Gilbert's assistant, aimed at cutting how much a visitor has to read before the sign-up action.
6. **"What you get" deduped:** deleted the standalone "What you get" section (mid-page); kept only the "Includes" card next to the Enroll price, since the two were nearly word-for-word identical and the Enroll placement is more useful (right where the decision happens).
7. **`vlogging-course-2.html` specific (from earlier in the session, before the above):** proof strip ("Over 40 million views / Vlogger of the Year, 2024 / Author of A Decent Man") removed as redundant with the section right after it; hero restructured into a 3-part CSS grid (`grid-template-areas`) so mobile order is headline/subhead → photo → CTA/price, while desktop keeps the original 2-column split; name caption under hero photo reordered to "Gillian Baci · Gilbert Bassey".

## Still outstanding
- **Design decision:** cinematic vs. front-page — pick one, then delete/archive the other.
- **Vlog thumbnails:** the "40M+ views" section still has 4 placeholder "Add vlog" tiles (2 on the old cinematic mobile layout) in both files — need real vlog screenshots + view counts + links.
- **Deploy:** confirm latest changes are pushed to `origin/main` and Netlify has redeployed (Netlify auto-deploys from git push on this repo — no separate Netlify config file, so a `git push` is the whole deploy step).
- **Selar redirect:** confirm Selar checkout redirects to `tvc-welcome.html` after payment (was still unconfirmed as of the last check).
