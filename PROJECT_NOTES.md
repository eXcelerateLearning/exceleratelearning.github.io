# eXcelerate Learning — Website Project Notes

Working memory for Chris + Claude as we iterate on the site.
Last updated: 2026-04-23

---

## 1. Project overview

**Company:** eXcelerate Learning
**Tagline:** "Bespoke solutions, remarkable results."
**What they do:** Bespoke e-learning — SCORM course creation, L&D strategy, LMS setup/management, and (new) AI avatar video production.
**Audiences (split navigation):**
- Higher Education (blue accent) — academic CPD, toolkits, pedagogy-led. PGCHE-qualified, 15+ years.
- Corporate & SME (pink accent) — bespoke training, L&D strategy, LMS setup.

**Contact details currently in files:**
- Email: `hello@exceleratelearning.co.uk` ✓ live
- Address: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ
- Calendly link: placeholder (`https://calendly.com/`)
- LinkedIn: `https://www.linkedin.com/company/105195682` ✓ live business page

---

## 2. File inventory

Located in: `C:\Users\chris\OneDrive\Documents\Claude\Projects\Website Development`

| File | Role |
|---|---|
| `index.html` | Homepage — hero, services (`#services`), expandable 6-card Our Work (`#our-work`), client logo reel, testimonial trio (dramatic zoom hover), CTA band (`#contact`), footer. Inline JS for work-grid toggle. |
| `higher-education.html` | HE landing page — hero with PGCHE credential badge, proof-point stats, "what we build" services, featured HE case study + expandable 4-card HE work grid (`#he-case-study`), university logo reel, CTA. Inline JS for work-grid toggle. |
| `corporate.html` | Corporate/SME landing — hero (red secondary button), process steps, services, "Projects we've impacted" **6-card** dynamic section (`#projects-impacted`, 3 visible + 3 hidden with show-more toggle), CTA. Each impact card now has project name + overview paragraph + pull-quote + client logo slot. Inline JS for scroll observer + work-grid toggle. |
| `about.html` | About page — layered hero image stack (pink/blue shadow layers + floating "15+ years" badge), proof stats, story, four principles, CTA. |
| `privacy-policy.html` | UK GDPR-compliant privacy notice — shared nav/footer, custom scoped prose styles in `<head>`, 12 numbered sections, contact cards, "last updated" banner. |
| `cookie-policy.html` | Companion cookie policy — scoped prose styles, 7 sections, cookie inventory table (name/provider/purpose/lifetime/category) with coloured pills, responsive card layout on mobile. |
| `consent.js` | Shared cookie consent banner. Injects its own CSS + markup, stores choice in first-party `exl_consent` cookie (12-month expiry, SameSite=Lax, Secure on HTTPS), dispatches `exl:consent` event so GA4 can listen for it, exposes `window.exlConsent` API for "Cookie settings" footer links. |
| `styles.css` | Shared stylesheet (~1150 lines now). Original 700 + new components: case-card media, dramatic testimonial zoom, expandable work-grid progressive reveal, impact cards (new richer layout), `.btn-red` variant, about-page layered hero stack. |
| `assets/logos/` | Folder for brand files (see `README.md` inside). Referenced as `assets/logos/excelerate-mark.png` from nav + footer on all pages. |
| `PROJECT_NOTES.md` | This file |

---

## 3. Design system

### Colour palette (CSS variables in `:root`)

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#16162A` | Page background (dark navy) |
| `--surface` | `#1E1E38` | Cards, testimonials, CTA band |
| `--surface-alt` | `#252542` | Secondary surfaces, logo pills |
| `--pink` | `#FF00FB` | Corporate accent, primary CTA |
| `--blue` | `#02A9EB` | Higher Education accent, secondary CTA |
| `--red` | `#FF0063` | Gradient partner to pink |
| `--green` | `#28BAA9` | HE secondary, outcome tags |
| `--yellow` | `#F7D445` | New-service highlight (AI avatar video) |
| `--fg1 / fg2 / fg3` | `#FFFFFF / #9B9BC4 / #5A5A7A` | Text hierarchy |
| `--border` | `rgba(255,255,255,0.07)` | Card borders, dividers |

### Typography
- **Display / headings:** `Rowdies` (weights 400, 700) — cursive display face, used for h1/h2/card titles.
- **Body:** `Open Sans` (weights 400, 600, 700).
- Both loaded via Google Fonts with `preconnect`.

### Signature visual treatments
- Subtle SVG noise texture overlay on `body::before`.
- Large blurred radial glows in hero sections (pink / blue / green tints).
- Gradient text (`.grad` = pink→red, `.grad-blue` = blue→green) on headline highlights.
- Cards gently float via `@keyframes cardFloat` (5s) with staggered delays.
- Glow-on-hover on cards, colour-coded by modifier class (`c-pink`, `c-blue`, `c-green`, `c-yellow`).
- Continuous horizontal client-logo reel (`.logo-reel`) with a drifting radial glow trail and mask-image edge fade.
- Testimonial trio has pulsing aura (`quotePulsePink` / Blue / Green).
- Respects `prefers-reduced-motion`.

### Component library (CSS classes)
- Layout: `.site`, `.nav`, `.hero`, `.section`, `.section-sm`, `.divider-grad`, `.cta-band`, `.footer`
- Nav: `.nav-logo`, `.nav-link` (+ `.he`, `.corp`, `.active`), `.nav-cta`, `.nav-li`, `.nav-toggle` (hamburger)
- Grids: `.grid-2`, `.grid-3`, `.grid-4`
- Cards: `.card` (+ colour modifiers), `.aud-card`, `.case-card`, `.quote-card` (q1/q2/q3), `.logo-card` (+ `.dark-card`)
- Buttons: `.btn-primary` (pink gradient), `.btn-secondary` (blue), `.btn-li` (LinkedIn)
- Misc: `.eyebrow`, `.sec-eyebrow`, `.cred-badge`, `.proof-row` / `.proof-item`, `.video-ph`, `.process-row`

### Responsive breakpoints
- Tablet: `max-width: 1024px` — grids collapse, hero layouts stack, footer 2-col. Testimonial zoom downgrades to gentle lift. About hero reduces gap + stack margin.
- Impact grid mid: `max-width: 1200px` & `min-width: 769px` → 2 columns.
- About hero stack: `max-width: 860px` → stacks to single column + image shrinks.
- Mobile: `max-width: 640-768px` — hamburger nav, single-column everything, CTA buttons stack full-width, impact grid 1 col, logo reel slows + shrinks cards.
- Narrow mobile: `max-width: 560px` — about hero stack shrinks further, inner shadow layers tighten inset offsets.

---

## 4. Conventions observed in the HTML

- All four pages share one stylesheet and a near-identical `<nav>` block — the `.active` class moves to mark the current page.
- Edit markers use a pencil emoji comment: `<!-- ✏️ EDIT: ... -->` to flag swappable copy/links (headline text, CTA URLs, email, nav text, etc.).
- Video blocks are placeholders (`.video-ph`) with a replacement snippet commented above — intent is to swap in real `<video>` embeds later.
- Client logos are placeholder text in `.logo-card` divs; a comment notes the logos must be duplicated across both `.reel-copy` halves so the scroll loops seamlessly.
- Anchor targets: `#services`, `#our-work`, `#contact` — `scroll-margin-top: 80px` is set so the sticky nav doesn't cover them.

---

## 5. Known placeholders / TODOs still open

- [x] ~~Email address~~ — updated to `hello@exceleratelearning.co.uk` across all pages
- [x] ~~LinkedIn URL~~ — set to business page `https://www.linkedin.com/company/105195682` everywhere
- [ ] Calendly URL (currently bare `https://calendly.com/`)
- [ ] Logo files — HTML references `assets/logos/excelerate-mark.png` but files not yet dropped into the folder. `onerror` on the `<img>` hides the broken icon until real files arrive. Chris will host via GitHub; replace relative paths with raw GitHub URLs when ready.
- [ ] Client logos for corporate impact cards — `assets/clients/*.png` referenced, graceful emoji fallback baked in.
- [ ] About-page hero image — `assets/about/about-hero.jpg` referenced, fallback block renders if missing.
- [x] ~~Privacy Policy page~~ — `privacy-policy.html` live. Ported + improved the Wix content to meet UK GDPR (added legal basis, full rights list, ICO complaint route, international transfers note, retention schedule, automated decision-making statement, concrete contact details). **Recommend a solicitor cast an eye over it before launch.**
- [x] ~~Cookie Policy page~~ — `cookie-policy.html` live. Cookie inventory table covers `exl_consent`, GA4 `_ga`/`_ga_*`, Cloudflare Web Analytics (cookie-free), `__cf_bm` bot-management, and Calendly on click.
- [x] ~~Policy pages linked from footers~~ — all 4 existing pages + both policy pages now have Privacy Policy, Cookie Policy, and Cookie settings links.
- [x] ~~Cookie consent banner~~ — `consent.js` on every page. Accept / Reject, persisted to `exl_consent` cookie for 12 months, dispatches `exl:consent` event for GA4 to hook into when added.
- [ ] Homepage client logo reel — still text placeholders ("CLIENT ONE" … "CLIENT EIGHT")
- [ ] HE university logo reel — text placeholders (UNIVERSITY ONE, RUSSELL GROUP INSTITUTION, etc.)
- [ ] Project images/videos in case-cards + impact-cards — every card has `✏️ EDIT` comment showing how to drop an `<img>` or `<video>` in. Add `class="has-media"` on `.case-img` / leave as-is on `.impact-media` to activate the overlay gradient.
- [ ] New project card content (homepage cards 3–6, HE cards 1–4, corporate impact cards 1–3) — placeholder copy written by Claude to demonstrate the pattern; Chris to replace with real project details, quotes, stats.
- [ ] Hero videos on index + HE + corporate pages — still placeholder blocks
- [x] ~~Privacy Policy link in homepage footer~~ — now points to `privacy-policy.html`

---

## 6. Design system additions (CSS)

New CSS components added to `styles.css` (after the existing mobile breakpoint):

- **Case-card media** — `.case-img img` / `.case-img video` auto-fill, `.case-img.has-media::after` dark-gradient overlay, hover scale(1.06).
- **Testimonial zoom** — `.quote-card:hover` scales to 1.5x with coloured glow; non-hovered siblings dim/blur/shrink. Disabled on mobile.
- **Expandable work-grid** — `.work-grid` with `data-reveal="teaser"` (faded + gradient mask) and `data-reveal="hidden"` (display: none). `.is-expanded` class reveals everything. Paired `.work-toggle` button with show/hide label swap.
- **Impact cards** — `.impact-card` with IntersectionObserver-driven fade-up entry (`.in-view`), staggered delays, image/video media area with `.impact-stat` badge and `.impact-quote` pull-quote.
- **Red button variant** — `.btn-red` for the corporate "See our corporate work" CTA.
- **About hero layered stack** (new) — `.about-hero-layout` grid + `.about-hero-stack` with `::before` (pink shadow layer) and `::after` (blue shadow layer) offset for depth, plus `.about-hero-badge` floating accent. Full responsive cascade at 1024 / 860 / 560px.
- **Impact card v2** (new richer layout) — `.impact-client-logo` absolute in top-right of media, project name moved to top of body, new `.impact-overview` muted paragraph, `.impact-quote` redesigned as pink-tinted pull-quote pill, `.impact-attribution` pinned to bottom via `margin-top: auto`. Reveal state `.impact-card[data-reveal="hidden"]` shared with work-grid toggle.
- **Nav scrollspy** — `data-scrollspy="services"` / `data-scrollspy="our-work"` attributes on the homepage nav links, driven by an IntersectionObserver that adds/removes `.active` based on which section is visible.

Three small vanilla-JS helpers live inline in `index.html`, `higher-education.html`, `corporate.html`:
- `toggleWorkGrid(btn, gridId)` — toggles `.is-expanded` on both work-grids and impact-grid
- IntersectionObserver over `.impact-card` — adds `.in-view` when they scroll into view
- Scrollspy observer (homepage only) — highlights the correct nav link based on the visible section

---

## 7. Working log

| Date | Change | Notes |
|---|---|---|
| 2026-04-22 | Created `PROJECT_NOTES.md` | Initial audit of files + design system inventory |
| 2026-04-22 | Email updated everywhere | `hello@excelerate-learning.com` → `hello@exceleratelearning.co.uk` (12 replacements across 4 HTML files) |
| 2026-04-22 | Logo placeholders added | `<img>` tags with `src="assets/logos/excelerate-mark.png"` in nav + footer on all 4 pages, with `onerror` fallback. `assets/logos/` folder created with README. |
| 2026-04-22 | Case-cards gained image/video support | CSS: `.case-img img/video` positioned absolutely, auto-fill, hover scale. `.case-img.has-media` adds dark-gradient overlay. |
| 2026-04-22 | Testimonial cards now zoom dramatically on hover | `scale(1.5)` + raised z-index + stronger coloured glow; other cards dim/blur/shrink to focus the eye. Mobile softened. |
| 2026-04-22 | Homepage "Our Work" expanded to 6 cards with toggle | 2 full + 2 teaser (faded) + 2 hidden. "See all our work" → "Show less" button toggles `.is-expanded` class. New placeholder projects: PGCert conversion, FCA compliance, international student induction, maritime onboarding. |
| 2026-04-22 | Corporate "See our corporate work" button → red, anchored within page | Changed `btn-secondary` → `btn-red`, href from `index.html#our-work` → `#projects-impacted` |
| 2026-04-22 | Corporate page: new "Projects we've impacted" section | Replaces empty "Companies we've worked with" logo-grid. 3 dynamic cards with media slot, impact-stat badge, pull-quote, project name + attribution. Fade-up on scroll via IntersectionObserver. Also fixed a pre-existing missing `</div>` bug in the old section. |
| 2026-04-22 | HE page: 4 additional "work we're proud of" cards with toggle | Featured big card stays. Below: 2 teaser + 2 hidden cards, "See more HE work" button toggles reveal. New placeholder projects: PGR supervisor development, learning analytics, research integrity + GenAI, assessment literacy. |
| 2026-04-22 | HE page: universities logo reel added | Replaces empty `.logo-grid` with the same `.logo-reel` component used on homepage. Placeholder university cards, duplicated across two halves for seamless loop. |
| 2026-04-22 | LinkedIn URLs switched to business page | `https://www.linkedin.com/company/105195682` replaces bare placeholder across all 4 pages (nav + CTA band + footer). |
| 2026-04-22 | Nav scrollspy fix | Removed hard-coded `.active` from Services. Added `data-scrollspy="services"` + `data-scrollspy="our-work"` attributes and an IntersectionObserver so the correct nav link highlights based on the section in view. |
| 2026-04-22 | Corporate impact cards expanded to 6 + richer layout | 3 visible + 3 hidden (Retail Customer Excellence / NHS Clinical Induction / Renewables Certification). Card restructure: project name moved to top, added overview paragraph, redesigned quote as pink-tinted pull-quote, client logo top-right of media area. "Show 3 more projects" toggle button. |
| 2026-04-22 | About page layered hero image | New two-col `.about-hero-layout` with text left, `.about-hero-stack` right. Image has pink + blue shadow layer (`::before`/`::after`) offset behind for depth, plus a floating `15+ years` badge. Stacks to single column below 860px. |
| 2026-04-22 | Mobile optimisation audit | Verified mobile behaviour across all new components: nav hamburger (≤640), hero grid stacking (≤1024), work-grid single col (≤640), impact grid 2→1 col (1200/768), about hero stack (860/560), testimonial zoom softened (≤1024), logo reels slower + smaller cards (≤640). |
| 2026-04-23 | Privacy Policy page added | `privacy-policy.html` — ported the live Wix copy and tightened for UK GDPR. New sections: who we are (with registered address), legal basis for processing (contract / legitimate interests / consent / legal obligation), international transfers, full UK GDPR rights list (7 rights), right to complain to the ICO with phone + link, named third-party processors (email / Calendly / GA4 / Cloudflare / hosting / payments), concrete retention periods, automated decision-making statement. |
| 2026-04-23 | Cookie Policy page added | `cookie-policy.html` — 7 sections + inventory table of every cookie/tech on the site. Pill categories (Essential / Optional analytics / Anonymous / Third-party on click). Responsive card-stack table layout at ≤640px. |
| 2026-04-23 | Cookie consent banner added | `consent.js` — self-injecting banner with Accept all / Reject optional / Close buttons. First-party `exl_consent` cookie (12 months, SameSite=Lax, Secure). Close defaults to reject-optional (safer under PECR). Dispatches `window` `exl:consent` CustomEvent on decision + on every subsequent page load. |
| 2026-04-23 | Footers updated across all pages | Privacy Policy + Cookie Policy + Cookie settings links added to the Company column of footers on `index.html`, `about.html`, `higher-education.html`, `corporate.html`. Old `href="#"` Privacy stub on homepage replaced. |

---

## 8. Things to decide / do next

1. **Real assets** — drop the actual logo files into `assets/logos/`, or swap the `<img src>` values for GitHub raw URLs once the repo is live.
2. **Replace placeholder content** — the 4 new homepage cards, 4 new HE cards, and 6 impact cards have Claude-written placeholder copy, quotes and stats. Swap for real project details. Search for `✏️ EDIT` comments to find them.
3. **Real Calendly URL** — still a bare placeholder across all pages.
4. **GitHub setup** — recommended: keep paths relative (`assets/…`) and commit the media files into the repo. Simpler, cache-friendly, no broken links if the repo ever moves.
5. **Hero videos** — the `.video-ph` placeholder blocks on homepage, HE and corporate are still waiting for real avatar videos.
6. **Solicitor review of Privacy Policy** — I improved the Wix version to meet UK GDPR basics, but a real lawyer should sanity-check it before launch, particularly the retention periods (I've put sensible defaults — 24 months for enquiry correspondence, 6 years for client records per HMRC, 14 months for analytics) and the named third parties.
7. **GA4 wiring** — `consent.js` dispatches `exl:consent` events with `detail.analytics === 'granted'`. Listener pattern is documented at the top of `consent.js`. Drop the gtag.js loader inside that listener when Chris has the Measurement ID.

---

## 9. Deployment plan (weekend)

**Hosting migration — Wix (Names.co.uk domain) → GitHub Pages (free).**

Steps:
1. Create GitHub repo, push the 4 HTML files + `styles.css` + `assets/`.
2. Enable GitHub Pages in repo Settings → Pages (deploy from `main`).
3. Add a `CNAME` file at the repo root containing `exceleratelearning.co.uk`.
4. At Names.co.uk (DNS), point the domain at GitHub Pages:
   - A records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` CNAME → `<username>.github.io`
5. Tick "Enforce HTTPS" once DNS propagates (usually <1 hour).
6. Delete Wix site (or point it elsewhere first as backup) after confirmation.

### Analytics stack (recommended)
- **Google Analytics 4** — full traffic + behaviour data. Free. Snippet goes in `<head>` on every page. Needs Measurement ID (`G-XXXXXXXXXX`).
- **Cloudflare Web Analytics** — privacy-first, cookie-free, GDPR-clean. Free. Complementary to GA4.
- **Google Search Console** — tracks search impressions + queries. Free. Verified via DNS TXT record or HTML file.

Also add on launch:
- `sitemap.xml` at root (list of all 4 pages + privacy/data pages).
- `robots.txt` at root (`User-agent: * / Allow: /`).
- Open Graph + Twitter Card meta tags for link previews.

### Cookie / consent considerations
- GA4 sets cookies → **needs a cookie banner under UK GDPR / PECR**. Add a lightweight consent banner (e.g. Cookie Consent by Osano, or a custom 30-line one).
- Cloudflare Web Analytics is cookie-free — no banner required for that alone.
- Strategy: fire GA4 only after consent, fire Cloudflare always.

---

## 10. Wix → static site: comparison notes

What we lose going from Wix to a static hand-built site:
- **Built-in cookie/consent banner** — Wix includes one. We need to add our own (small job, one-time).
- **Built-in form handler** — Wix handles contact form submissions to an inbox. On a static site, contact forms need a third-party (Formspree, Netlify Forms, Google Forms embed). Current site uses `mailto:` links which sidesteps this entirely.
- **Blog / CMS UI** — if Chris ever wants to add blog posts via a browser, Wix has an editor built-in. On GitHub Pages we'd either (a) edit markdown files + rebuild, (b) add a headless CMS like Decap/Netlify CMS, or (c) stay static and skip blogging.
- **Built-in SEO tooling** — Wix surfaces basic SEO fields per page. We get more control hand-coding (meta, OG, schema.org) but it's manual.
- **Point-and-click editing** — non-devs can't edit live. Every change goes through this workflow (Chris + Claude edits → commit → deploys).
- **Scheduled publishing, built-in image CDN, email marketing integrations** — all gone.

What we gain:
- Free hosting vs Wix monthly fee.
- Full design control (no Wix template constraints).
- Fast — static HTML loads instantly; Wix sites are heavy with framework JS.
- Real version control (every change is a commit).
- Portable — we can move to Cloudflare Pages, Netlify, Vercel, anywhere else with no lock-in.
- Better privacy story (no Wix tracking by default).

Verdict: fine trade for a site at this scale. The only real friction is the contact form + cookie banner, both one-time jobs.
