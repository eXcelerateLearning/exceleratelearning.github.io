# eXcelerate Learning — website

Static website for **eXcelerate Learning Ltd** — bespoke e-learning for Higher Education and corporate teams.

Hosted at **https://exceleratelearning.github.io/** via GitHub Pages. Custom domain (`exceleratelearning.co.uk`) to follow once DNS is migrated from the current Wix host.

---

## What's in here

| File | Role |
|---|---|
| `index.html` | Homepage — hero, services, expandable 6-card work grid, client logo reel, testimonial trio, CTA band |
| `higher-education.html` | HE landing page — hero with PGCHE badge, proof stats, featured case study + expandable 4-card HE work grid, university logo reel |
| `corporate.html` | Corporate / SME landing — hero, process, services, "Projects we've impacted" 6-card section with scroll-triggered reveals |
| `about.html` | About page — layered hero image stack, proof stats, story, four principles |
| `privacy-policy.html` | UK GDPR-compliant privacy notice |
| `cookie-policy.html` | Cookie policy + inventory table |
| `styles.css` | Shared stylesheet for all pages (design tokens, layout, components, responsive breakpoints) |
| `consent.js` | Self-injecting cookie consent banner — first-party cookie, 12-month expiry, dispatches `exl:consent` event for GA4 |
| `assets/logos/` | Brand marks (see `assets/logos/README.md`) |
| `PROJECT_NOTES.md` | Working notes — design system reference, open TODOs, deployment plan, decisions log |
| `.nojekyll` | Tells GitHub Pages **not** to run Jekyll — important because we use vanilla static HTML |
| `.gitattributes` | Normalises line endings to LF for web |
| `.gitignore` | Excludes local backups, OS junk, editor files |

---

## Local development

It's plain HTML — no build step. Either:

- **Simplest:** double-click any `.html` file to open it in your browser.
- **Better (for testing relative paths properly):** serve from a local HTTP server:
  ```
  # Python 3
  python -m http.server 8000
  # or Node
  npx serve
  ```
  Then visit http://localhost:8000/

---

## Deployment

The repo is named `exceleratelearning.github.io` and lives under the `eXcelerateLearning` organisation, so **GitHub Pages auto-serves `main` branch root at https://exceleratelearning.github.io/** — no extra configuration needed.

**Deploy cycle:**
1. Edit files locally.
2. `git add -A && git commit -m "your message" && git push`
3. GitHub Pages rebuilds within 30–90 seconds.

**Custom domain (future):**
1. Add a `CNAME` file at repo root containing `exceleratelearning.co.uk` (one line, no protocol).
2. At Names.co.uk DNS, point the domain:
   - `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` CNAME → `exceleratelearning.github.io`
3. In repo Settings → Pages → Custom domain, enter `exceleratelearning.co.uk` and tick "Enforce HTTPS" once DNS propagates (usually <1 hour).
4. Retire the current Wix site once the new one is confirmed live on the domain.

Full deployment + analytics plan: see `PROJECT_NOTES.md` section 9.

---

## Content conventions

- Editable copy and swappable links in the HTML are flagged with `<!-- ✏️ EDIT: ... -->` comments.
- Each page has a media-placeholder snippet above `.video-ph` and `.case-img` blocks showing how to swap in real video / images.
- Client logo reels must have each logo duplicated across both `.reel-copy` halves so the scroll loops seamlessly.

See `PROJECT_NOTES.md` for the design system reference, open TODOs, and decisions log.

---

## Legal

- **Privacy:** see [`privacy-policy.html`](./privacy-policy.html) (UK GDPR / DPA 2018).
- **Cookies:** see [`cookie-policy.html`](./cookie-policy.html) (UK GDPR + PECR). The consent banner in `consent.js` blocks optional analytics by default until the user accepts.

---

© eXcelerate Learning Ltd
