# Election Compass (Next.js)

An SEO-optimized, accessible civic education assistant that helps users understand election process timelines, voting steps, and FAQs. The app now integrates multiple Google services while still using mock data fallbacks when API keys are unavailable.

## Google services included

- **Google Gemini API** for natural-language election Q&A (`/api/assistant`)
- **Google Civic Information API** for election and polling lookup (`/api/voter-info`)
- **Google Maps Embed** to visualize polling places
- **Google Maps Directions deep links** for turn-by-turn polling-place navigation
- **Google Calendar event links** for election-day reminders
- **Google Programmable Search Engine API** for trusted voter education resources (`/api/civic-resources`)
- **Google Identity Services (GIS)** optional sign-in panel for personalized civic experiences
- **Google Analytics (gtag.js)** for traffic insights (optional)

## Features

- Interactive election assistant with server-side validation (`zod`)
- Address-based voter guidance panel with polling-place map
- Mock election data for timeline, checklist, and FAQ (no DB required)
- SEO coverage: metadata, OpenGraph, Twitter card, robots, sitemap, JSON-LD
- Security-first defaults: strict headers, CSP, disabled `x-powered-by`
- Accessibility: semantic sections, skip link, ARIA live regions, visible focus styles
- Testing with Vitest + React Testing Library

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment:
   ```bash
   cp .env.example .env.local
   ```
3. Run locally:
   ```bash
   npm run dev
   ```

## Environment variables

```bash
GEMINI_API_KEY=
GOOGLE_CIVIC_API_KEY=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
GOOGLE_SEARCH_API_KEY=
GOOGLE_SEARCH_ENGINE_ID=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

If keys are missing, the app gracefully falls back to mock guidance so demos still work in hackathon environments.

## Verification commands

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```
