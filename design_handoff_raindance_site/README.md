# Handoff: Ali: Raindance — main page, free copy page, sample chapters page

## Overview
A pre-launch campaign page for the novel *Ali: Raindance* by Gilbert Bassey (release day: **1 January 2027**). Visitors get the ebook free by doing one promotional task and sending proof. Approved claimants receive a personal referral link and can earn points toward bigger rewards (early read, signed paperback, signed hardcover, Fan Box).

Build three pages:
1. **Main book page** — `/raindance`. The sales page: hook, story, characters, editions, Founding Patrons, author, FAQ. Spec in **Part A** at the end of this file.
2. **Free copy page** — `/raindance/free` (mobile + desktop). Spec below.
3. **Sample chapters page** — `/raindance/read`. **Build its content from the alpha manuscript** in the repo (the opening chapters). Design guidance below.

How they link:
- Main page secondary CTA `CLAIM A FREE COPY` (hero + closing band) → `/raindance/free`.
- Free page `BUY THE BOOK →` and `Preorder by 31 December →` → `/raindance#editions`.
- Both pages' `READ THE OPENING` / `READ THE OPENING CHAPTERS FIRST →` → `/raindance/read`.
- Founding Patron block is anchored at `/raindance#patrons` (shareable link).

Goal for this first build: a working page the author can open on a phone and share for feedback. It will be refined later, so favour simple, editable implementation over cleverness.

## About the design files
`Raindance Free Copy.dc.html` is a **design reference built in HTML**, not production code. Open it in a browser (it loads `support.js` beside it). It is a canvas of iterations — only these are approved:
- **2a** — mobile layout (390px wide). *Approved.*
- **3a** — desktop layout (1280px wide). *Approved.*

Ignore 1a/1b/1c, 3b, 3c (rejected explorations). Turn 1 still mentions fan art; that task is removed.

Recreate 2a/3a in the site's existing stack and patterns. If the site has no framework, plain HTML/CSS with a small amount of JS is fine.

## Fidelity
**High-fidelity.** Colours, type, spacing and copy are final. Copy must be used verbatim (listed below).

## Responsive behaviour
One page, two layouts. Below ~900px use the 2a (stacked) layout, above use 3a. Max content width 1280px, centred. Mobile hit targets ≥ 44px.

---

## Page structure & copy (both layouts, top to bottom)

### 1. Header
- Left: ATOGAM gold mark (`assets/brand/svg/atogam-mark-gold.svg`), 20px tall mobile / 24px desktop.
- Right (mobile): `BUY THE BOOK →`. Desktop: `THE BOOK` · `READ THE OPENING` · `BUY THE BOOK →` (last one gold). Cinzel 600, 11.5–12px, letter-spacing 0.14em, colour #b9ad97.
- Height 56px mobile / 72px desktop.

### 2. Hero
- Mobile only: ebook image (`mock-ebook.jpg`) 170×170, object-fit cover, centred.
- Kicker: `BEFORE LAUNCH · 1 JANUARY 2027` — Cinzel 600, 10.5px (12px desktop), letter-spacing 0.3em, #a99c86.
- H1: `Get the ebook free. Earn a signed copy.` — Cinzel 600, 27px mobile / 50px desktop, line-height 1.12–1.2, #f1e8d7, `text-wrap: balance`.
- Lead: `Share Ali: Raindance before launch and the ebook is yours. Keep sharing to earn more.` — Spectral 400, 16.5px / 20px, line-height 1.55, #d8cdb9.

### 3. "What's on offer" box
Mobile: full-width box under the hero. Desktop (3a): right column, 480px wide, vertically centred beside the hero text (grid `1fr 480px`, gap 72px).
- Box: border 1px `oklch(0.85 0.15 85 / 0.5)`, radius 3px, background #17110c.
- Label: `WHAT'S ON OFFER` (Cinzel 600, 10.5–11px, 0.3em, #a99c86).
- Row 1 (highlighted — gold background `oklch(0.85 0.15 85)`, text #1a120c): **The ebook, free** / `On release day, 1 January 2027` / right: `1 TASK`.
- Rows 2–5 (separator 1px rgba(239,228,207,0.12)); title Cinzel 700 #f1e8d7, sub Spectral #b9ad97, cost in gold:
  | Reward | Sub | Cost | Image (desktop thumbnails 64×64) |
  |---|---|---|---|
  | Read it early | Before release. Ends on release day. | 5 points | mock-ebook.jpg |
  | A signed paperback | Signed by Gilbert Bassey | 10 points | mock-paperback.jpg |
  | A signed hardcover | Signed by Gilbert Bassey | 15 points | mock-hardcover.jpg |
  | The Fan Box | Box, cards, front page and bookmark, with a signed paperback | 30 points | mock-collector-box.jpg |
  (Mobile 2a shows no thumbnails; use the 2a text: "Read it early / Before release", etc. Either set of copy is fine on mobile; prefer matching desktop.)
- Footer line: `Every reward is open to everyone who reaches it.` (13.5px #a99c86).

### 4. Three steps
Mobile: stacked rows (number column 34px). Desktop: 3 equal columns under the lead, top border 1px rgba(239,228,207,0.14).
Number: Cinzel 700, 22–24px, gold. Title: Cinzel 700 14.5–15px #f1e8d7. Body: Spectral 14.5–15px #b9ad97.
1. **Do one thing** — Post it, list it, make a video, or make the Rainmaker's mask.
2. **Send proof** — A screenshot or a link, through the form below.
3. **Get the ebook** — Emailed to you on 1 January 2027. Free.

Desktop also shows a gold button `PICK YOUR TASK ↓` (54px tall, scrolls to tasks) and link `READ THE OPENING CHAPTERS FIRST →` (Cinzel 600 12.5px, 0.1em, gold #e9b956). Mobile shows only the link, centred. The link goes to the sample chapters page.

### 5. Tasks + form (paper section)
Background #efe6d4, text #2a2016. Mobile: stacked, padding 36px 22px. Desktop: padding 64px 56px, grid `1fr 440px`, gap 56px — tasks (2×2 grid, gap 14px) left, form card right (background #f7f1e5, border 1px rgba(36,27,18,0.18), padding 28px). Make the form card `position: sticky` on desktop if easy.

Section labels: `STEP 1 · PICK ONE`, `STEP 2 · SEND PROOF` — Cinzel 600 10.5–11px, 0.3em, #8a5a2a.

**Task cards** (selectable; one selected at a time, default = first):
- Unselected: transparent bg, border 1px rgba(36,27,18,0.18). Selected: bg #f7f1e5, border 1px #8a5a2a, plus `◆ Chosen` at top-right (12px #8a5a2a). Radius 3px, padding 16px mobile / 20px desktop.
- Title Cinzel 700 14.5–16px #241b12; body Spectral 14.5–15px, line-height 1.5, #4a3c2c; action button outline 1px rgba(36,27,18,0.35), min-height 36–38px, Cinzel 600 11.5–12px, 0.1em.
- Selecting a card fills the "Task" field in the form.

| Title | Description | Action button |
|---|---|---|
| Post it | Put the cover, a poster or the trailer on your WhatsApp status, Instagram, X or TikTok. Download them here. | GET THE ASSETS |
| Add it to your reading list | Mark Ali: Raindance as Want to Read on Goodreads or StoryGraph. | OPEN GOODREADS |
| Make a video | Ideas: 3 reasons you want to read it · your reaction to the cover · your reaction to the sample · a countdown to release. Every video must send people here: say "link in Gilbert's bio" or put this page's link in your own bio. 3 points each, up to 3 videos. | GET THE POSTERS |
| Make the Rainmaker's mask | Make the mask, take a picture with it and post it with #TheRainmakerLives. 5 points. The best ones are featured here. | GET THE MASK GUIDE |

Action button targets (placeholders until assets exist — leave `TODO` links): asset download page/zip, Goodreads book URL, poster pack, mask guide.

**Form fields** (inputs 48px tall, border 1px rgba(36,27,18,0.25), radius 2px, bg #fbf7ef desktop / #f7f1e5 mobile, Spectral 15px):
1. Name (required)
2. Email (required, valid email)
3. WhatsApp number (required)
4. Task (required; prefilled from the selected card; label "Task" right-aligned 12px #8a7f6d)
5. Referred by (optional) — prefilled from `?r=CODE` in the URL; placeholder `A friend’s name or code`
6. Proof — upload a screenshot **or** paste a link (one of them required). Dashed border, 64px tall: `Upload a screenshot or paste a link`
7. Submit: `CLAIM MY FREE COPY` — 52px, bg #241b12, text #efe4cf, Cinzel 700 14px, 0.12em.
8. Note: `We check every claim by hand and reply within two days.` + `Privacy notice` link (#9c4a2b). 12.5–13px #6f6455.

States: inline validation errors under fields; disabled + "Sending…" on submit; success state replaces the form with: "Thanks. We'll check your proof and email you within two days." (author can edit).

### 6. How points work (dark section)
Desktop: 2 columns (text left, table right), padding 64px 56px. Mobile: stacked, centred heading.
- Kicker: `OPTIONAL · KEEP GOING`
- H2: `How points work` — Cinzel 600 22px / 30px #f1e8d7.
- Body: `When your claim is approved, we email you a personal link. Every friend who claims through it earns you a point. Videos, mask photos and reviews earn more. Reach a level and the reward is yours.`
- Table rows (top border 1px rgba(239,228,207,0.12)), points in gold:
  - A friend claims through your link — 1 point
  - A video (up to 3) — 3 points each
  - A photo with your Rainmaker's mask — 5 points
  - A review after you've read it — 5 points
- Note: `Early reading ends on release day.` (13.5–14px #a99c86)

### 7. Footer
`Want it signed now? Preorder by 31 December →` (link to preorder) and `© 2026 Gilbert Bassey · MoSA Publishing`. Desktop: one row, space-between, top border. Mobile: centred.

---

## Backend / operations (keep it no-code or low-code)
No ambassador dashboard. Recommended setup — use whatever the site already supports if it differs:
- **Form submission** → a Google Sheet (via Tally/Google Forms embed styled to match, Formspree, or a small serverless function writing to Sheets). Store: timestamp, name, email, WhatsApp, task, referred_by, proof file URL/link, status (`pending`/`approved`/`rejected`), personal code, points.
- **Referral codes**: on approval, generate a code (e.g. first name + 2 digits, `CHIDI24`). Personal link: `https://gilbertbassey.com/raindance/free?r=CHIDI24`. The page reads `r` and prefills "Referred by". Points are counted in the sheet (count approved claims per referred_by code + manual additions for videos/mask/reviews).
- **Emails** (MailerLite or Mailchimp, or plain templated sends):
  - *Approval*: confirms the free ebook on 1 Jan 2027, gives the personal link, repeats the points table.
  - *Reward reached*: sent manually when a person crosses 5/10/15/30.
  - *Release day*: ebook delivery.
- **Proof uploads**: images up to ~10 MB; store in Drive/S3/whatever the stack has.
- Privacy: collected data used only to check claims, send the ebook and run the campaign. Link a privacy notice page (author to supply text; stub it).

## Sample chapters page (`/raindance/read`)
No mock exists yet; follow the same visual system.
- **Source text: the alpha manuscript in this repo — use its opening chapters verbatim.** Don't edit the prose.
- Dark background #0f0b08, reading column max-width ~640px, Spectral 19px (mobile 18px), line-height 1.7, #d8cdb9; chapter titles in Cinzel 600, #f1e8d7; generous paragraph spacing. Same header as the free page.
- Simple chapter navigation (jump links or prev/next).
- At the end: heading "Want the rest?" with two buttons — `GET THE EBOOK FREE` (gold, links to `/raindance/free`) and `PREORDER A SIGNED COPY` (outline).
- Linked from the free page ("Read the opening chapters first") and the books page.

## Design tokens
Colours:
- Page bg #0f0b08 · Panel bg #17110c · Paper #efe6d4 · Paper card #f7f1e5 · Input bg #fbf7ef
- Ink (headings) #f1e8d7 · Body #d8cdb9 · Muted #b9ad97 · Faint #a99c86 · Footer #8f8474
- Gold `oklch(0.85 0.15 85)` (≈ #f0c14b; provide hex fallback) · Link gold #e9b956, hover #f6d58a
- On-paper: heading #241b12 · body #4a3c2c · label #8a5a2a · muted #6f6455 / #8a7f6d · link #9c4a2b
- Dark-line rgba(239,228,207,0.12–0.14) · Paper-line rgba(36,27,18,0.14–0.35)

Type (Google Fonts): **Cinzel** 600/700 (headings, labels, buttons — usually uppercase with 0.1–0.3em tracking) · **Spectral** 300–500 (body).
Radii: 2px (inputs/buttons), 3px (cards/boxes). No shadows.
Spacing: mobile side padding 22–26px; desktop 56px; section padding 64px desktop / 32–40px mobile.

## Assets
- `assets/brand/svg/atogam-mark-gold.svg` — brand mark.
- `assets/web/mock-ebook.jpg`, `mock-paperback.jpg`, `mock-hardcover.jpg`, `mock-collector-box.jpg` — product mockups.
- Still needed from the author: poster/trailer/cover download pack, mask guide, Goodreads/StoryGraph URLs, preorder URL, privacy notice text.

## Files
- `Raindance Free Copy.dc.html` — design canvas (see 2a and 3a). Open with `support.js` in the same folder.
- `assets/` — images used by the page.
- `screenshots/mobile-2a.png`, `screenshots/desktop-3a.png` — free page, approved layouts.
- `Raindance Landing v2.dc.html` + `screenshots/landing-mobile-1a.png` — main book page (see Part A).


---

# Part A — Main book page (`/raindance`)

## Design file
`Raindance Landing v2.dc.html` → frame **1a** (390px phone, full page). This is the only frame in that file and it is approved. Screenshot: `screenshots/landing-mobile-1a.png`.
`Raindance Landing.dc.html` (v1) is superseded — not included.

**Copy is final and must be taken verbatim from the design file** (including the full Founding Patron note, character names/titles, FAQ and terms text, which live in the template and the `renderVals()` arrays at the bottom of the file). Text in [square brackets] is an author placeholder — keep it visible as-is so the author can find and replace it.

## Desktop
There is **no desktop mock** for this page. Build it responsively from the mobile design using the free page's desktop (3a) as the reference for scale: 56px side padding, max width 1280px, H1/H2 sizes roughly 1.8× mobile, body 17–20px.
Suggested desktop treatments:
- Hero: full-bleed face-off art (`faceoff-art-1200.jpg`, consider a larger export) at ~720px tall, title lockup and tagline centred over it, the two CTAs side by side.
- Story: single centred column, max-width 720px. Senate quote image full-bleed band.
- Characters: 6 across in one row.
- Editions: ebook / paperback / hardcover as 3 columns; Collector's Box as a wide 2-column card (image left, details right) below.
- Saga + Founding Patrons: two columns — note left (max 640px), patron offer card + seat grid right.
- Author: photo left, bio right. FAQ: centred column max 800px.

## Sections (top to bottom)
1. **Sticky header** (56px): gold ATOGAM mark left; right: outlined gold CTA (`PREORDER` before launch / `GET IT FREE` after) + hamburger menu (menu items: The book, Editions, Free copy, Read the opening, Founding Patrons, FAQ).
2. **Hero** over face-off art with top/bottom dark gradients: `ALI` (Cinzel 700, 76px, gold, text-shadow), gold diamond divider, `RAINDANCE` (Cinzel 600, 19px, letter-spacing 0.4em). Series line `A TALE OF GODS AND MEN · BOOK 1`. Tagline in Spectral italic: "One wants nothing to do with the country. / The other wants to burn it." Primary CTA (gold, 52px) + secondary (outline). Deadline line below.
3. **The story** — two paragraphs; the last sentence highlighted in gold.
4. **Senate art band** (500px) with the Rainmaker quote overlaid.
5. **The characters** — 2-col grid (mobile) of six: gold symbol (44px), name, italic title. Primary CTA after.
6. **Editions** (`id="editions"`) — heading "Own it.", lead line, three edition rows (thumbnail 104×130, name, price, description, CTA link): Ebook ₦5,000, Paperback ₦10,000, Hardcover ₦25,000. Then the **Collector's Box** card (₦70,000, "LIMITED TO 50 · SIGNED AND HAND-NUMBERED", contents list with diamond bullets, row of 8 card slots — 6 symbols + 2 sealed, numbering note, `CLAIM YOUR NUMBER` button). Delivery/refund small print below.
7. **The saga + Founding Patrons** (`id="patrons"`, bg #15100c) — saga statement; 10-seat grid F01–F10 (taken seats filled gold); "A personal note from Gilbert" with short/full toggle (`READ THE FULL NOTE ↓` / `SHORTER NOTE ↑`); offer card: Founding Patron ₦300,000, What you receive, Where your ₦300,000 goes, `BECOME A FOUNDING PATRON`, and "The terms, plainly" accordion (one open at a time).
8. **The author** — photo 132×160, bio, `@onegillianbaci` link.
9. **FAQ** (paper bg #efe6d4) — accordion, first item open by default, one open at a time.
10. **Closing band** over plaza art: tagline + primary and secondary CTAs.
11. **Footer** — mark, © line, links: Contact, Privacy, Terms and refunds, Instagram.

## Behaviour
- **Launch phase switch.** Before 1 Jan 2027 00:00 WAT (UTC+1) vs after. Make this a single config value (`auto` by date, or forced) so the author can flip it:
  | | Before launch | After launch |
  |---|---|---|
  | Header CTA | PREORDER | GET IT FREE |
  | Primary CTA | PREORDER A SIGNED COPY | GET YOUR FREE COPY |
  | Secondary CTA | CLAIM A FREE COPY | BUY THE BOOK |
  | Deadline line | Signed copies until 31 December · Out 1 January 2027 | Out now · Ebook, paperback and hardcover |
  | Editions lead | Preorder by 31 December 2026, 11:59 pm WAT and your paperback or hardcover is signed by the author. After that, standard copies are unsigned. | Available now in ebook, paperback and hardcover. |
  | Paperback / Hardcover desc + CTA | "…Signed when preordered." / PREORDER THE … | no "signed" line / BUY THE … |
  Note: after launch, "GET YOUR FREE COPY" still points to `/raindance/free`; confirm with the author whether the free campaign continues after release.
- **Founding Patron places taken**: a config number 0–10 drives the seat grid and the line (`TEN PLACES · F01–F10` when none taken, else `N OF 10 PLACES LEFT`).
- **Checkout**: edition, Collector's Box and Patron buttons need payment links (Paystack/Flutterwave or whatever the author uses). Leave as `TODO` links if not provided. Collector's Box numbers are assigned manually in order of confirmed payment.
- Accordions: tap target ≥ 54px, `+`/`−` indicator in gold (dark) or #8a5a2a (paper).

## Extra assets for this page
`assets/web/faceoff-art-1200.jpg`, `assets/web/senate-art-1200.jpg`, `assets/plaza-art.jpg`, `assets/atogam-mark-gold.png`, `assets/cards/*-gold-bevel.png` (ali-heart, okoro, abubakar, farida, daniel, rainmaker, lighthouse), `images/gilbert-author-photo2.jpg`. Edition mockups are shared with the free page.

## Still needed from the author (main page)
Payment links, delivery prices and windows, refund policy, contact/support details, final Founding Patron benefits and cost breakdown, Book Two box details.
