# VerboMetrics

Free writing and text analysis tools — word counter, verb finder, readability scorer, grammar checker, case converter, text diff, lorem ipsum, and more. Built as a React + Vite single-page app, prerendered with react-snap for SEO, and deployed to GitHub Pages.

Live: https://verbometrics.com

## Stack

- React 19 + TypeScript + Vite 7
- React Router 7 (SPA, prerendered per route)
- react-snap (static prerender for crawlers) + postbuild cleanup (`scripts/postbuild.mjs`)
- Tailwind CSS 4
- Google Analytics 4

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | `vite build` + react-snap prerender + postbuild cleanup |
| `npm run lint` | ESLint |
| `npm run preview` | Preview the production build |
| `npx tsc --noEmit` | Type check |

## Adding a tool

1. Create `src/pages/<Tool>.tsx` with a default export and an `<SEO title description path />` block (see `src/components/SEO.tsx`).
2. Register the route in `src/App.tsx` (lazy import + `<Route>`).
3. Add the path to `reactSnap.include` in `package.json`.
4. Add an entry to `public/sitemap.xml`.
5. Add a card to the `tools` array in `src/components/Header.tsx`.

## Adding a blog post

Posts are template literals in `src/App.tsx` passed to `<BlogPost>`. Add the content constant, a route, and an entry to the blog index + sitemap.

## Deploy

Push to `main`. The GitHub Actions workflow builds `dist/` and publishes to `gh-pages`.

## Node

Node 20+ recommended (see `.nvmrc`).
EOF