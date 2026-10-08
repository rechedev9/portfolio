# luisreche.dev

Portfolio for **Luis Reche** — Applied AI Engineer.

One minimal page with an academic, editorial look: Newsreader serif on ivory paper with a cardinal accent. Sections: intro, experience, projects and education, with light and dark mode. Content lives in `src/data/portfolio.ts`.

The illustrations are hand-drawn pixel art painted on `<canvas>` in the theme colours: a plate of Palma under the intro (`src/pixel/palma.ts`) and small animated sprites in the margin (`src/pixel/marginalia.ts`). Sprites are strings where `k` is ink, `m` muted, `r` the accent, `b` the rule colour and `p` the paper. They pause off screen and stay still when the visitor prefers reduced motion.

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

- CV: `public/Luis-Reche-Applied-AI-Engineer-CV.pdf` (same file also at `public/luis-reche-cv.pdf` so older links keep working)
- Edit the CV in `cv/luis-reche.html`, then run `npm run cv` to rebuild both PDFs (set `CHROME_PATH` if Chrome is elsewhere)
- Command palette: `⌘K` / `Ctrl+K`
