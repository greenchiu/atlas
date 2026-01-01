## Atlas

Atlas is a small Next.js 16 playground that demonstrates:

- A login form with client-side validation for email and password strength.
- A projects gallery that fetches mocked data and can be forced into success/empty/error/loading states via query parameters.
- A glassmorphic global top bar with automatic highlighting of the active route.

The app runs entirely on the Next.js App Router (React 19) and is meant to be a tidy reference for wiring together UI state, URL-driven scenarios, and Tailwind-powered styling.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19.
- **Styling**: Tailwind CSS utilities via `globals.css`.
- **Fonts**: Vercel’s Geist and Geist Mono through `next/font`.
- **Language**: TypeScript.

---

## Project Structure

```
src/app
├── components
│   ├── ProjectListFetcher.tsx  // Scenario-driven mock fetcher UI
│   └── TopBar.tsx              // Glass navigation with active highlighting
├── login/page.tsx              // Validated login form
├── projects/page.tsx           // Projects listing w/ query-controlled states
├── layout.tsx                  // Root layout, fonts, and nav
└── utils/mocks.ts              // Mock API + scenarios for projects
```

---

## Getting Started

```bash
# 1. Install deps
npm install

# 2. Run the dev server
npm run dev

# 3. Visit the app
open http://localhost:3000
```

Node.js 18.18+ (or 20+) is recommended per Next.js 16 requirements.

---

## Available Scripts

| Script           | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `npm run dev`    | Start the Next.js dev server on `http://localhost:3000` |
| `npm run build`  | Create an optimized production build                    |
| `npm run start`  | Run the production server after building                |
| `npm run lint`   | Run ESLint via `next lint`                              |
| `npm run format` | Format sources with Prettier                            |

---

## Mock Project Scenarios

The projects page consumes mocked data from `src/app/utils/mocks.ts`. You can instruct the UI to display a specific state with a query parameter:

| URL example                  | Resulting state                                    |
| ---------------------------- | -------------------------------------------------- |
| `/projects?state=success`    | Fetches a populated list of projects               |
| `/projects?state=empty`      | Simulates an empty API response                    |
| `/projects?state=error`      | Forces the fetcher into its error UI               |
| `/projects?state=loading`    | Shows the loading skeleton without hitting the API |

This makes it easy to QA copy, spacing, and empty/error UX without changing any code. Invalid values fall back to the default success scenario.

---

## Notable UI Pieces

- **TopBar (`src/app/components/TopBar.tsx`)** – Uses `usePathname()` to highlight the active route and mirror the login page’s dark-glass styling.
- **Login page (`src/app/login/page.tsx`)** – Validates email format and password strength before submission, surfacing inline error messages with Tailwind styling.
- **ProjectListFetcher (`src/app/components/ProjectListFetcher.tsx`)** – Demonstrates a union-literal state machine (`'loading' | 'success' | 'empty' | 'error'`) and isolates mock selection logic in one component.

---

## Deployment

The app can be deployed to any environment that supports Node.js 18+ (Vercel, Render, etc.). Build with `npm run build` and serve with `npm run start`, or use Vercel’s Git integration for zero-config deployments.
