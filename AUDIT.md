# VerboMetrics — Technical SEO / Quality Audit

**Site:** https://verbometrics.com (GitHub Pages, React 19 + Vite + react-snap)
**Repo:** `Msveiti/text-tools-suite` (`main` → Actions build → `gh-pages`)
**Audited:** 25 Nov 2026 · Google Search Console window: 3 months (24 Aug – 22 Nov 2026)
**Auditor method:** live crawl of all routes (HTTP status, redirects, head tags, rendered HTML), Lighthouse, browser console/network, code review of `src/`, `public/`, `js/`, CI workflow.

---

## 0. Scorecard

| Area | Verdict | Headline |
|---|---|---|
| Indexability / canonicalisation | 🔴 Critical | 3 URLs per blog post, canonicals point at the wrong URL, sitemap URLs 301 |
| On-page SEO | 🔴 Critical | Duplicate meta description + OG tags on every page, no `<h1>` on 5 pages, 125–192 words per page |
| UX on legacy pages | 🔴 Critical | Blog posts render **completely unstyled** (`styles.css` 404) with broken `.html` links |
| 404 handling | 🟠 High | Real 404s show the full homepage with `index, follow`; `/404` returns 200 |
| JS health | 🟠 High | `React error #418` (hydration mismatch) on every page → full client re-render/flash |
| Analytics | 🟠 High | GA4 double-counts every page view |
| Functionality | 🟠 High | Contact form has no handler and silently does nothing |
| Performance | 🟡 Medium | Single 388 KB gzip JS bundle for every page; render-blocking CSS font import |
| Accessibility | 🟡 Medium | Lighthouse a11y 93: contrast, heading order, unlabelled icon button, hover-only nav |
| Housekeeping | 🟡 Medium | Whole old static site still committed in `js/`, duplicate/legacy assets, default README |

**Good things that should not be lost:** prerendered HTML for every route (great for crawling), HTTPS + HSTS, `www` → apex redirect, all-internal SPA asset requests return 200, Lighthouse SEO score 100 on tool pages.

---

## 0b. P0 fixes implemented (25 Nov 2026)

The critical batch below is now in the working tree; everything else in this document is still open.

| Fix | What changed |
|---|---|
| Legacy blog duplicates | Deleted `public/blog/*.html`. Each post now exists only as the React/prerendered page at `/blog/<slug>/`. Old `.html` URLs still redirect visitors client-side from `404.html` (search engines will see 404, which is correct for the deleted duplicates). |
| Broken blog styling | Gone with the legacy files: the React blog pages are styled by the app and all internal links are clean URLs (`styles.css`/`text-formatter.html` 404s removed). |
| Duplicate metadata | Removed the static description/OG/Twitter/robots tags from `index.html`. `SEO.tsx` now manages one title, description, canonical, robots, OG and Twitter set per route, with duplicate-tag cleanup. Verified: 19/19 prerendered pages have exactly one of each. |
| Canonical URLs | Canonical, OG URL and sitemap now use the trailing-slash URL that GitHub Pages actually serves. Internal SPA links still work (GH 301s hard navigations). |
| Structured data | Removed the wrong global `BreadcrumbList` and the `SearchAction` pointing at a non-existent `/search`. Kept a single `WebSite`/`Organization` block; `SEO` supports per-route schema. |
| 404 handling | New `NotFound` page (h1, noindex, no canonical, links to tools). React catch-all no longer renders the homepage. `scripts/postbuild.mjs` promotes the prerendered `/404` snapshot to `404.html` and removes `dist/404/` + `dist/200.html`. |
| Missing H1 | Added H1s to home, case-converter, text-diff, lorem-ipsum, contact and the blog index. |
| GA4 double counting | `gtag('config', …, { send_page_view: false })` + exactly one `page_view` per route change in `AnalyticsTracker`. |
| Contact form | Real submit handler (pre-filled mailto fallback), required fields, bound labels, live status message. |
| Hydration error #418 | Root cause was react-snap's snapshot not matching React 19 client output (including the active-nav class on trailing-slash URLs). The app now renders a fresh root instead of hydrating, the header normalises trailing slashes, and metadata is applied in a layout effect. Local verification: 0 console errors on every route and on SPA navigation. |
| React 19 metadata | `react-helmet-async` + React 19 native metadata both caused duplicated or missing head tags during prerender. `SEO.tsx` now manages the head imperatively (idempotent, pre-paint), which is deterministic under react-snap. |
| Build hygiene | `react-snap` now waits for effects, skips third-party requests, disables HTML minification (safer hydration/snapshotting), prerenders `/404`, and runs the postbuild cleanup. |
| Social preview | Added a real 1200×630 `public/og-image.png`. |
| Copy bug | Fixed “Character counter guide for 2026Open VerboMetrics Character Counter”. |
| Blog title | Character-counter post now has a title that matches its H1/intent instead of the unrelated X/Twitter title. |

**Verification performed:** `tsc`/lint (pre-existing errors only, see §3.5), production build + react-snap prerender of all 20 routes, per-page head audit (1 title / 1 description / 1 canonical, canonical URL matches the served URL), unique titles and descriptions across pages, browser console clean on `/`, `/verb-finder/`, `/blog/character-counter-guide/`, `/contact/` and on client-side navigation, and GA metadata updating on route change.

**Deploy notes:** push to `main`; after the Action finishes, use GSC URL Inspection for `/`, `/verb-finder/` and the three blog posts and request indexing. Expect the “Page with redirect” and “Alternate page with proper canonical tag” buckets to clear over the next 2–4 weeks. Confirm `https://verbometrics.com/does-not-exist` returns 404 with the new “We couldn’t find that page” page.

---

## 1. What the Search Console screenshot is telling us

3-month totals: **84 clicks / 37.3K impressions / 0.2 % CTR / avg position 10.8**.

Clicks sit at 2–4/day until roughly **17 Oct**, then collapse to 0–1/day while impressions stay at ~300/day. That pattern means the pages are still being served, but they fell out of the click-earning positions (page 2 / bottom of page 1), or the snippets stopped matching intent. Three concrete causes are visible in the code:

1. **The snippet Google can use is the same on every page.** `index.html` hard-codes one `<meta name="description">`, one `og:description` and one `og:title`; react-helmet adds a second description but leaves the generic one first in the DOM. Google very often takes the first tag — so 19 pages compete with "Advanced text utilities for professional creators…".
2. **The pages are thin.** Prerendered body text per tool page is 125–192 words, almost all of it UI chrome. The homepage has **no `<h1>`** at all. There is not enough indexable text for "word counter", "verb finder", "grammar checker" etc. to move past position ~10.
3. **Blog content is split three ways** (see §2.1), so the strongest content (1.7–2k words per post) is signalled to Google under `.html` URLs, not the URLs in the sitemap. The sitemap URLs therefore land in *Page with redirect* / *Alternate page with proper canonical tag* instead of being indexed.

Quick wins on CTR, in order: unique titles/descriptions per page → one canonical URL per post → add 300–600 words of real copy + FAQ to each tool page → fix the broken blog experience.

---

## 2. Critical issues (fix first)

### 2.1 Blog posts exist at three URLs, and the "clean" URL serves the wrong file

| URL | Status | What is served | Canonical it declares |
|---|---|---|---|
| `/blog/character-counter-guide` | 200 | **legacy static file** `public/blog/character-counter-guide.html` | `…/character-counter-guide.html` |
| `/blog/character-counter-guide.html` | 200 | same static file | `…/character-counter-guide.html` |
| `/blog/character-counter-guide/` | 200 | React/react-snap page | `…/character-counter-guide` |

GitHub Pages prefers the physical `x.html` file for the extensionless URL, so the React page is shadowed by the old file. Result: duplicate content + a canonical that points at a second duplicate + sitemap URLs that never win.

Same for `count-words-google-docs` and `word-count-requirements`.

**Fix**
- Delete `public/blog/*.html` (three files, ~99 KB) — the React versions already exist, are prerendered, and are the ones linked from the SPA.
- If you want to preserve link equity for the old `.html` URLs, ship tiny 200-status stubs at those paths with `<link rel="canonical" href="https://verbometrics.com/blog/<slug>/">` + `<meta http-equiv="refresh" content="0;url=…">` (GitHub Pages cannot issue server-side 301s without a proxy/CDN).
- Keep exactly one canonical form (`/blog/<slug>/`) in the sitemap and in the `SEO` component.

### 2.2 Legacy blog pages are visually broken

The static posts load `<link rel="stylesheet" href="../styles.css">` → `https://verbometrics.com/styles.css` → **404**. In the browser: body font falls back to **Times**, the inline Tailwind class names in the article body have no CSS at all, navigation renders as raw blue links.

This is the page a visitor reaches when clicking a blog card on the SPA. That is a direct trust/engagement killer (and a likely contributor to the click collapse).

Also on those pages:
- nav links `/case-converter.html`, `/text-diff.html`, `/lorem-ipsum.html`, `privacy.html`, `terms.html`, `contact.html`, `text-formatter.html` → all **404** (the last one is also a relative URL → `/blog/text-formatter.html`).
- two `<h1>` elements (`logo-text` + article title).

Deleting the files (§2.1) fixes all of this at once.

### 2.3 Duplicate/generic metadata on every SPA page

Verified live on `/verb-finder`:

```
<meta content="Advanced text utilities for professional creators…" name="description">
<meta content="Free online verb identifier…" name="description" data-rh="true">   ← 2 descriptions
<meta content="VerboMetrics | Professional Writing Suite" property="og:title">     ← home page on every URL
<meta content="https://verbometrics.com/" property="og:url">                       ← home URL on every URL
```

Every tool page shares the homepage OG/Twitter card, so every social share looks identical, and Google gets two competing descriptions.

**Fix**
- Move OG/Twitter tags into `src/components/SEO.tsx` (Helmet) and remove them from `index.html`; keep only charset/viewport/favicon/GA there.
- Give each page its own `og:title`, `og:description`, `og:url`, `og:image`.
- Remove the obsolete `<meta name="keywords">`.

### 2.4 Structured data is wrong on every page

`index.html` injects two JSON-LD blocks into **every** prerendered page:

- `BreadcrumbList` = Home → Blog (wrong on all tool pages, missing for blog posts)
- `WebSite` + `Organization` + `SearchAction` pointing to `/search?q={search_term_string}` — **`/search` returns 404**, and the client catch-all renders the homepage for it, so the sitelinks-searchbox action is invalid.

Duplicate `WebSite`/`Organization` schema across 19 URLs also gives Google no clean entity signal.

**Fix:** generate breadcrumb JSON-LD per route, add `SoftwareApplication` (or `WebApplication`) for each tool, `Article` for each post, `FAQPage` where you add FAQs. Drop `SearchAction` unless you actually ship `/search`.

### 2.5 Canonical URLs vs GitHub Pages trailing-slash redirects

`https://verbometrics.com/verb-finder` → **301** → `https://verbometrics.com/verb-finder/` (directory index). The canonical, internal links and sitemap all use the non-slash URL, so:

- every internal navigation costs a 301,
- the sitemap lists URLs that redirect (GSC: *Page with redirect*),
- the declared canonical is not the URL Google ends up on.

Observed for all tool pages (`/case-converter`, `/word-frequency`, …).

**Fix (pick one, be consistent)**
- **A (recommended, least work):** canonicalise on the trailing-slash URL. `SEO.tsx` emits `https://verbometrics.com${cleanPath}/` (except `/`), sitemap and internal `Link to` values use `/verb-finder/`.
- **B:** change the prerender output to flat files (`/verb-finder.html` served at `/verb-finder`) so no directory redirect exists. More build work; avoid unless you need flat URLs.

### 2.6 404 handling is a soft-404 factory

| Request | Status | Body |
|---|---|---|
| `/does-not-exist` | **404** | full homepage ("Professional Word Counter…") |
| `/404` | **200** | same homepage |
| `/404.html` | **200** | same homepage |
| any unknown SPA path (`/search`) | 200 (after client routing) | homepage |

- The error page advertises `<meta name="robots" content="index, follow">`.
- The React catch-all `<Route path="*" element={<WordCounter />} />` turns every typo and every dead legacy link into a homepage duplicate.
- `public/404.html` (the dev file pointing at `/src/main.tsx`) is overwritten by react-snap's homepage copy; the shipped 404 is not a real error page.
- react-snap also emits `dist/404/index.html`, so `/404` is a 200 duplicate.

**Fix**
- Remove the `*` → `WordCounter` route, add a real `NotFound` page with `noindex`, an `<h1>`, links to the top tools (status 404 is already correct from GitHub Pages).
- Delete `dist/404/` and `dist/200.html` from the build output (postbuild cleanup step).
- Give `404.html` `noindex, follow` and no canonical/OG homepage tags.

### 2.7 React hydration error on every page

Console on `/`, `/verb-finder`, `/blog/…`:

```
Error: Minified React error #418  ("Hydration failed because the server rendered HTML
didn't match the client. As a result this tree will be regenerated on the client.")
```

The prerendered tree is thrown away and re-rendered on load. Consequences: visible flash/fade-in (the wrapper runs a 0.8 s `fade-in` again), extra main-thread work, layout-shift risk, and the prerendered markup Google sees is not what users actually get.

`src/main.tsx` calls `hydrateRoot()` whenever `#root` has children. React 19 is stricter than the React version react-snap was designed for, and head-tag injection + the pre-render snapshot makes exact markup matching fragile.

**Fix**
- Find the mismatch first: build, serve `dist`, and diff `document.body.outerHTML` before/after hydration (React logs the first mismatching node in dev).
- Pragmatic options: (a) fix the mismatch (often date/time, random ids, `useId`, or conditional rendering), or (b) call `createRoot().render()` on the pre-rendered container instead of `hydrateRoot` — prerendered HTML still serves crawlers, but no hydration errors. (b) costs a full client render, so prefer (a).

### 2.8 GA4 counts every page view twice

`index.html` sends a manual `page_view` on `DOMContentLoaded` **and** `AnalyticsTracker` calls `gtag('config', …)` on mount/route change, which sends another `page_view`. First load = 2 views; every SPA navigation = 1 (plus the duplicate on hard reloads). Any decision made from these numbers is skewed.

**Fix**
```html
gtag('config', 'G-P2JWKFVB39', { send_page_view: false });
```
and in `AnalyticsTracker` send `gtag('event', 'page_view', { page_path, page_location, page_title })` on route change only. (Also consider `anonymize_ip`/Consent Mode given EU traffic — see §4.6.)

### 2.9 The contact form does nothing

`src/pages/Contact.tsx` renders `<form>` with no `action`, no `onSubmit`, no `preventDefault`. Clicking **Send Message** performs a GET to the current URL — the user's message is silently discarded. There is no success/error state.

**Fix:** point it at a real endpoint (Formspree/Netlify Forms/your own worker), add `required`, labels wired with `htmlFor`, and a visible success message. If you don't want a backend, remove the form and keep the email cards.

### 2.10 Thin pages + missing `<h1>`

| Page | Words in prerendered HTML | `<h1>` |
|---|---|---|
| `/` | 192 | **none** (largest heading is `<h2>Writing Analytics</h2>`) |
| `/verb-finder` | 146 | 1 |
| `/readability-scorer` | 152 | 1 |
| `/word-frequency` | 146 | 1 |
| `/grammar-checker` | 148 | 1 |
| `/case-converter` | 133 | **none** |
| `/text-diff` | 152 | **none** |
| `/lorem-ipsum` | 125 | **none** |
| `/blog` | 176 | **none** (`<h2>` only) |
| `/contact` | 137 | **none** (`<h2>` only) |

Every tool page is essentially a widget. Google has almost nothing to rank for the query, which matches position ~10.8 with 0.2 % CTR.

**Fix (per tool page):** one `<h1>` containing the primary keyword ("Free Verb Finder — Identify Verbs in Any Text"), a 150–250 word "What this tool does / how to use it" block, a "How it works" section, 3–6 FAQs (with `FAQPage` schema), and 3 internal links. Target 500–800 words minimum; homepage needs a real `<h1>` and a short explainer above/below the tool.

---

## 3. Medium issues

### 3.1 Performance
- One JS chunk: **1,186,897 B raw / 388 KB gzip** on every page (React 19 + recharts + compromise + sentiment). Recharts is only needed by the word counter, compromise/sentiment by the analysis tools.
- `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400..900')` inside `src/index.css` → extra blocking request chain, 6 weights, no `preload`, and `font-display` is Google's default (swap). Self-host a subset or at least drop to 2–3 weights and use `<link rel="preload">`.
- Prerendered HTML is a big win (FCP 200 ms in a warm browser) — protect it; adding more copy should not add client JS.
- **Fix:** `React.lazy()` + `Suspense` per route, load recharts only on `/`, consider `compromise` only for the 6 pages that use it, manual chunking in `vite.config.ts` (`build.rollupOptions.output.manualChunks`), and `npm ci` in CI instead of `npm install --legacy-peer-deps`.

### 3.2 `og:image` is wrong
Declared `1200×630`, actual `public/verbometrics-logo.png` is **96×96**. Every share renders as a tiny/blurry image. Create a real 1200×630 OG card (logo + tagline + tool name), add `og:image:width/height`, and keep `twitter:card=summary_large_image`.

### 3.3 Titles / descriptions
- Several titles exceed the ~60-character SERP budget, e.g. `Word Frequency Counter & Lexical Density Analyzer | VerboMetrics` (68), `Free Readability Checker | Flesch-Kincaid Calculator | VerboMetrics` (72). The brand suffix is appended by `SEO.tsx`, so keep base titles ≤ 45 chars.
- Weak/thin ones: `Text Diff | VerboMetrics`, `Lorem Ipsum | VerboMetrics`, `Blog | VerboMetrics`, `Contact | VerboMetrics`, `Privacy Policy | VerboMetrics` (description is literally the title).
- Several internal descriptions are ≤ 40 chars ("Compare two texts.", "Generate placeholder text.", "Get in touch.").
- Two `seoTitle` variants exist for the same post (`character-counter-guide` clean vs `.html`) — the `.html` one even includes a 🚀 — remove the duplicate route so there is one version.

### 3.4 Accessibility (Lighthouse 93)
- `color-contrast` failures (slate-400 on white, placeholder `text-slate-200`, disabled-looking Clear/Copy).
- `heading-order` skips (`h2` → `h4` in the footer/landing blocks; no `h1` on several pages).
- Mobile menu toggle has **no accessible name** (icon-only `<button>`), no `aria-expanded`/`aria-controls`.
- "Writing Tools" dropdown is hover-only: keyboard/screen-reader users cannot open it. Use a `<button aria-expanded>` + click/focus state (and Escape to close).
- No skip link; `html lang="en"` is correct.

### 3.5 Repo / build hygiene
- `js/` is the **entire pre-React site** (≈20 files incl. another `CNAME`, a `robots.txt` that says `https://YOUR-DOMAIN.com/sitemap.xml`, `sitemap.xml`, old `index_old.html`, `index_old1.html`, `text-formatter.html`, `CHECKLIST.md`, `QUICKSTART.md`). Not deployed today (the workflow publishes `dist/` only) but it is a trap for the next deploy change.
- `public/vite.svg` unused; `src/assets/react.svg` unused; `README.md` is the stock Vite template.
- `dist/` in the repo contains `.DS_Store`, `200.html`, `404/` (all artefacts, but `.DS_Store` shows the build was run locally; CI builds cleanly).
- `public/sitemap.xml` has **no `<lastmod>`** and lists non-slash URLs (see §2.5); 16 URLs while the site has 19 routes (contact/privacy/terms intentionally omitted — fine, but the blog index and all posts should have `lastmod`).
- Blog content lives as 3 giant template literals inside `src/App.tsx` (1,767 lines) — move posts to `src/content/*.ts` (or MDX) so the router file is readable and descriptions don't drift between the two route variants.
- Visible copy bug in the character-counter post CTA: `"Character counter guide for 2026Open VerboMetrics Character Counter"` (missing space/closing tag) — line ~63 of `App.tsx`.
- `RedirectOldLinks`, the inline head script, and the 404 script implement the same `.html` rewrite three times; consolidate or delete once legacy URLs are gone.
- No `.nvmrc`/`engines`; no `typecheck` script (`tsc --noEmit`), so TS errors are not gated. `eslint` exists but `npm run lint` is not in CI.

### 3.6 Privacy / trust
- Privacy page says "All text is processed locally in your browser and is never stored on our servers" — true for the tools, but the site loads Google Analytics without consent UI. If you have EU/UK traffic (likely, given the query mix), add a consent banner or switch to a cookieless analytics tool (Plausible/Umami/Cloudflare).
- Support email is a personal Gmail (`yarka20250826@gmail.com`) shown on a "professional suite" site. Use `support@verbometrics.com` (forwarding is free) or a branded form.
- No About page, no author/entity info in schema, no social profiles — weak E-E-A-T signals for a tools site that wants "professional" queries.

---

## 4. Prioritised action plan

### P0 — this week (indexation + revenue-blocking UX)

| # | Action | Files | Effort |
|---|---|---|---|
| 1 | Delete the 3 legacy `public/blog/*.html` (or replace with canonical+refresh stubs); add a postbuild cleanup for `dist/404`, `dist/200.html` | `public/blog/*` | 30 min |
| 2 | Fix duplicate metadata: move OG/Twitter per page into `SEO.tsx`; strip them + `keywords` + static JSON-LD from `index.html` | `index.html`, `SEO.tsx` | 1 h |
| 3 | Pick trailing-slash canonical URLs; update `SEO.tsx`, sitemap, internal links accordingly | `SEO.tsx`, `public/sitemap.xml`, `Header/Footer`, `App.tsx` | 1–2 h |
| 4 | Real 404 page + `noindex`; remove `*` → `WordCounter` fallback; remove `/search` SearchAction | `App.tsx`, `public/404.html` | 1 h |
| 5 | Add `<h1>` to home, case-converter, text-diff, lorem-ipsum, contact, blog index; fix heading order | 6 pages | 1 h |
| 6 | GA4: `send_page_view:false` + one SPA page_view per navigation | `index.html`, `App.tsx` | 30 min |
| 7 | Contact form: wire to a real endpoint or remove | `Contact.tsx` | 30 min |
| 8 | Fix React #418 (diagnose mismatch, then hydrate or client-render) | `main.tsx` | 2–4 h |

### P1 — next 2 weeks (rankings + CTR)

| # | Action | Notes |
|---|---|---|
| 9 | Unique titles (≤ 60 incl. brand) + descriptions (140–155) for all 19 pages | Start with `/verb-finder` ("verb finder" = 895 impressions) and `/` |
| 10 | 300–600 words of copy + FAQ per tool page; homepage explainer | Biggest ranking lever; position 10.8 is exactly the "thin page" symptom |
| 11 | Per-route structured data (BreadcrumbList, SoftwareApplication, Article, FAQPage) | Replaces the wrong global blocks |
| 12 | Code-split routes; lazy-load recharts/compromise; self-host subset Inter | 388 KB → target < 150 KB initial |
| 13 | Real 1200×630 OG image | Fixes all social previews |
| 14 | a11y: nav dropdown keyboard support, labelled menu button, contrast tokens, skip link | Lighthouse 93 → 100 |
| 15 | Add `lastmod` to sitemap and regenerate from routes | Avoid sitemap drift |

### P2 — cleanup / durability

| # | Action |
|---|---|
| 16 | Delete `js/` legacy tree, `index_old*.html`, `text-formatter.*`, `CHECKLIST.md`, `QUICKSTART.md`, duplicate `js/robots.txt`+`sitemap.xml`+`CNAME` |
| 17 | Delete `public/vite.svg`, `src/assets/react.svg`, unused `App.css`, stale `dist/*` artefacts |
| 18 | Rewrite `README.md` (stack, scripts, deploy flow, env, how to add a tool/post) |
| 19 | Move blog posts to `src/content/`; fix the "2026Open" copy bug; remove the `.html` route duplicates |
| 20 | CI: `npm ci`, add `typecheck` + `lint` steps, pin Node via `.nvmrc`/`engines` |
| 21 | Analytics consent / cookieless analytics; branded support email; About + author schema |
| 22 | Add tests for `utils/textLogic` (word/character counting edge cases: emoji, CJK, hyphenated words) |

---

## 5. Validation checklist after fixes

```bash
# 1. One canonical per page, no duplicate meta
curl -sL https://verbometrics.com/verb-finder/ | grep -c 'name="description"'   # 1
curl -sL https://verbometrics.com/verb-finder/ | grep -o '<link[^>]*canonical[^>]*>'

# 2. Sitemap URLs resolve 200 directly (no 301)
curl -s https://verbometrics.com/sitemap.xml | grep -o '<loc>[^<]*' | cut -c6- | \
  while read u; do printf "%s " "$u"; curl -s -o /dev/null -w "%{http_code}\n" "$u"; done

# 3. Unknown URLs are 404 and not the homepage
curl -s https://verbometrics.com/nope | grep -o '<title>[^<]*</title>'   # "Page not found"

# 4. No hydration errors, one GA page_view per navigation
#    (open devtools console; in GA4 Realtime, one page_view per route change)
```

In Search Console, after deploying: **URL Inspection → Request indexing** for `/`, `/verb-finder/`, and the three blog posts; confirm *Pages* drops the "Alternate page with proper canonical tag" and "Page with redirect" buckets over 2–4 weeks; re-check CTR on “verb finder” / “verb identifier” once the new descriptions are live.

---

## 6. Reference: exact evidence collected

```
/                       200  canonical https://verbometrics.com (helmet) + static description x2
/verb-finder            200→301 /verb-finder/   h1 ✓   static desc + helmet desc (2)
/case-converter         →301 /case-converter/   h1 ✗
/word-frequency         →301 /word-frequency/   h1 ✓   ~146 words
/grammar-checker        →301 /grammar-checker/  h1 ✓
/text-diff              →301 /text-diff/        h1 ✗
/lorem-ipsum            →301 /lorem-ipsum/      h1 ✗
/blog                   →301 /blog/             h1 ✗   ~176 words
/blog/<slug>            200  legacy static file, canonical → /blog/<slug>.html
/blog/<slug>.html       200  legacy static file, self-canonical
/blog/<slug>/           200  React version, canonical → /blog/<slug>
/nonexistent            404  full homepage body, robots index,follow
/404, /404.html, /404/  200  homepage duplicate
/search?q=verb          404  (SearchAction target)
/styles.css             404  (referenced by all 3 legacy blog posts)
/text-formatter.html    404  (linked from legacy posts, relative → /blog/text-formatter.html)
/privacy.html /terms.html /contact.html /lorem-ipsum.html /case-converter.html  → 404
JS: 1,186,897 B raw / 388 KB gzip single chunk; CSS 55,654 B raw / 9.4 KB gzip
Logo: 96×96 png, advertised as og:image 1200×630
Lighthouse (/verb-finder): accessibility 0.93, best-practices 1.0, SEO 1.0
Console: React error #418 on /, /verb-finder, /blog/<slug> (each load)
```
