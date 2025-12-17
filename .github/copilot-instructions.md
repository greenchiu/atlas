# Copilot / AI Agent Instructions for Atlas

Purpose: quick, actionable guidance so an AI coding agent is immediately productive in this repo.

- **Project type:** Next.js app-router (app directory) using TypeScript. See [src/app/layout.tsx](src/app/layout.tsx) and [src/app/page.tsx](src/app/page.tsx).
- **Top-level scripts:** use `npm run dev`, `npm run build`, `npm run start`, `npm run lint` (see [package.json](package.json)).

Architecture & conventions

- App router lives under `src/app` — create new routes as `src/app/<route>/page.tsx` (e.g., [src/app/login/page.tsx](src/app/login/page.tsx)).
- Components are server components by default. Use the `'use client'` directive at the top of a file to opt into a client component when necessary.
- Global layout and fonts are managed in [src/app/layout.tsx](src/app/layout.tsx) (fonts via `next/font/google` and CSS variables). If updating fonts, mirror variables used in `layout.tsx`.
- Global CSS is at `src/app/globals.css` — Tailwind/PostCSS are present (see `postcss.config.mjs` and `tailwindcss` in `devDependencies`).

Data, API and integrations

- There are no application API routes in the repo root currently. If adding server endpoints, prefer Next's app-router API under `src/app/api/*/route.ts`.
- External integrations and deployment: this project targets Vercel by default (standard Next.js). Check `next.config.ts` for runtime flags.

Code patterns and examples

- Metadata is exported as `export const metadata` in `layout.tsx` — follow this pattern for route-level metadata.
- Use default exported React components for pages and layouts; keep layout wrappers minimal and deterministic (see [src/app/layout.tsx](src/app/layout.tsx)).
- Route example: to add a `/projects` page add `src/app/projects/page.tsx` (this repo already includes a sample route at [src/app/projects/page.tsx](src/app/projects/page.tsx)).

Developer workflows (how the agent should run/test changes)

- Run local dev server: `npm run dev` (Next will reload on file changes).
- Build and preview: `npm run build` then `npm run start`.
- Run linter: `npm run lint` (project uses `eslint`).

What to avoid / project-specific notes

- Do not add pages under `pages/` — this repo uses the `app/` router.
- Avoid global mutation of document/DOM in server components; move UI interactivity to client components with `'use client'`.
- Don't change font CSS variable names without updating `layout.tsx` where they're declared.

When making PRs

- Keep changes scoped to a route or component. Update `src/app/layout.tsx` only when you intentionally change global layout or fonts.
- If you add runtime configuration in `next.config.ts`, include a short note in the PR describing why (affects server behavior).

Key files to inspect for context

- [src/app/layout.tsx](src/app/layout.tsx)
- [src/app/page.tsx](src/app/page.tsx)
- [src/app/login/page.tsx](src/app/login/page.tsx)
- [src/app/projects/page.tsx](src/app/projects/page.tsx)
- [package.json](package.json)
- [postcss.config.mjs](postcss.config.mjs)
- [tsconfig.json](tsconfig.json)

If anything here is incomplete or you want the agent to follow stricter rules (testing, commit message format, CI hooks), tell me and I'll update this file.
