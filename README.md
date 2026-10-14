# BharatRoots AI

**Discover India's Heritage. Empower Local Entrepreneurs.**

BharatRoots AI is a demonstration platform that promotes Indian traditional products,
supports local artisans, and helps aspiring entrepreneurs start and grow their businesses.

## Pages

- **Home (`/`)** — hero, featured crafts, platform overview, demo statistics.
- **Explore Heritage (`/explore`)** — searchable/filterable catalogue of traditional Indian
  products with product detail pages (`/explore/:id`), favourites, share buttons, and a
  craft-region search.
- **Entrepreneur Dashboard (`/dashboard`)** — business ideas, a step-by-step startup
  checklist (progress saved locally), supplier/mentor guidance, webinars, marketing and
  growth tips.
- **AI Business Assistant (`/assistant`)** — a clearly-labelled **demo** assistant that
  builds a structured business plan from predefined templates (not a real AI model).

## Tech stack

- React 19 + TanStack Start (SSR), Vite, Tailwind CSS v4
- No backend or environment variables required — all data is sample content; favourites
  and checklist progress are stored in `localStorage`.

## Setup

```bash
bun install   # or npm install
bun dev       # or npm run dev
```

## Deploy / GitHub

Push this repository to GitHub and import it into your hosting provider of choice
(e.g. publish directly from Lovable). No secrets or environment variables are needed.

## Notes

- All products, prices, statistics, events and assistant responses are illustrative
  demonstration data.
- No real seller addresses, vendors, authentication or payments are included.
