# AstroLearn

A full-stack mini-course platform (Persian, RTL) built with **Astro (SSR)**, **Vue**, **Tailwind CSS v4** and **Nano Stores**, to demonstrate Islands Architecture and the Content Layer API.

## What it demonstrates

| Concept | Where |
| :-- | :-- |
| Content Layer: `glob()` and `file()` loaders | `src/content.config.ts` |
| Collection references (course → instructor, lesson → course) and reverse lookup | `src/lib/courses.ts`, `/instructors/[id]` |
| Static prerendering | `/` and `/cart` |
| On-demand SSR (`prerender = false`) with query-string filters | `/courses?q=&level=` |
| Server sessions for enrollment + server-side lesson gating | `src/lib/enrollment.ts`, `/courses/[slug]/[lesson]` |
| Astro Actions (typed RPC, server-side price validation) | `src/actions/index.ts` |
| Islands with different hydration: `client:load`, `client:visible`, `client:only` | `src/components/*.vue` |
| Island persisted across view transitions (`transition:persist`) | Cart badge in `src/layouts/MainLayout.astro` |
| Shared state between independent islands, persisted to localStorage | `src/store/cart.ts`, `src/store/progress.ts` |

## Flow

1. Browse courses, open a course and read its free lesson.
2. Add courses to the cart (the header badge updates; state survives reloads and syncs across tabs).
3. Check out on `/cart`. The `checkout` action re-prices courses on the server and stores the enrollment in the session.
4. Locked lessons are now unlocked; mark lessons complete to fill the course progress bar.

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npx astro check` | Type-check `.astro`, `.vue` and `.ts` files |
| `npm run build` | Build to `./dist/` |
| `node dist/server/entry.mjs` | Run the production server |

## Adding content

- Course: add `src/content/courses/<id>.md` (frontmatter is validated by the schema).
- Lessons: add `src/content/lessons/<course-id>/<nn-slug>.md` with `course: <course-id>`.
- Instructor: add an entry to `src/content/instructors.json`.
