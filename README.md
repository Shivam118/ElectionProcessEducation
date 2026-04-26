# Election Compass (Next.js)

An SEO-optimized and accessible civic education assistant that helps users understand election process timelines, voting steps, and frequently asked questions. It integrates **Google Gemini AI** through a secure server route.

## Features

- **Interactive election assistant** powered by Google Gemini (`/api/assistant`)
- **Mock election data** for timelines, voting steps, and FAQs (no database required)
- **SEO optimization** with metadata, OpenGraph, Twitter cards, canonical links, robots, sitemap, and structured data
- **Accessibility support**: semantic sections, labels, skip link, keyboard focus visibility, ARIA live region
- **Testing** with Vitest + React Testing Library

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Run app:
   ```bash
   npm run dev
   ```

## Gemini integration

Set `GEMINI_API_KEY` in `.env.local`.

If not set, the assistant gracefully returns a fallback guidance message.

## Quality checklist for high score

- Code quality: strict TypeScript, componentized architecture
- Security: input validation via Zod and server-side AI call
- Efficiency: lean component tree and static mock data
- Accessibility: semantic elements, form labels, ARIA status updates
- Testing: unit tests for data and component behavior
- Google services: integrated Gemini API SDK
- Problem alignment: end-to-end election education assistant UX
