# luisreche.dev

Portfolio for **Luis Reche**, Applied AI Product Engineer.

One scroll-driven page on a flat cream background: a title page with the statement, then experience, projects, stack, education and contact. A log in the margin stamps one line per shipped product as the reader passes it. Content lives in `src/data/portfolio.ts`, the scroll kit in `src/scroll/` (copied in, not edited) and the plan behind the page in `docs/scroll-plan.md`.

`vite build` prerenders the home page into `index.html`, so the copy is in the HTML before any JavaScript runs.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- React Router

## Commands

```bash
npm install
npm run dev
npm run build
npm run typecheck
npm run lint
```

## Content

- CV source: `public/cv/index.html`. It is served as a web page at `/cv/` and printed to two A4 pages with headless Chrome into both PDF paths below. Its screen styles sit in `@media screen`, so they do not reach the PDF
- CV: `public/Luis-Reche-Applied-AI-Engineer-CV.pdf` (same file also at `public/luis-reche-cv.pdf` so older links keep working)
- Command palette: `⌘K` / `Ctrl+K`
