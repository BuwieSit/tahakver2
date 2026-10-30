# TAHAK — Agent Knowledge Base

This file is the canonical reference for any agent or developer working in this codebase.
Read it fully before writing new code, adding files, or installing packages.
Its purpose is to prevent duplicate utilities, redundant components, and inconsistent patterns.

> **Before you start any task — read these two files first:**
>
> - **[`DOCS/CATALOG.md`](./DOCS/CATALOG.md)** — every hook, component, layout, context, utility, and page that already exists, with exact signatures and usage rules. If what you need is there, use it. Do not recreate it.
> - **[`DOCS/DESIGN-SYSTEM.md`](./DOCS/DESIGN-SYSTEM.md)** — all visual rules: colors, typography, spacing, border radii, shadows, buttons, cards, animations, and responsive patterns. Any design change must follow this document.
---

## 1. Project Overview

**TAHAK (Tahanan sa Kalikasan)** is a wellness tourism SPA for a tour operator in Sta. Lucia, Quezon, Philippines.
It is a React 19 application built with Vite, styled with Tailwind CSS v4, and backed by Supabase for authentication.
The app is deployed on Vercel with a catch-all SPA rewrite (`/*` → `/index.html`).

Two user roles exist:
- **Tourist** — public-facing pages at the root routes (`/`, `/packages`, `/booking`, etc.)
- **Admin** — internal management portal under `/admin/*`, accessed via a hardcoded credential bypass (see Security section in `SYSDESIGN/system-design.md`)

---

## 2. Before Writing New Code

**First: open and read [`DOCS/CATALOG.md`](./DOCS/CATALOG.md).** It is the authoritative list of everything that already exists — hooks, components, layouts, contexts, utilities, and pages — with their exact file paths, props, signatures, and intended use cases. The tables below are a condensed quick-reference; the catalog has the full detail.

**For any design change: open and read [`DOCS/DESIGN-SYSTEM.md`](./DOCS/DESIGN-SYSTEM.md).** It defines every visual rule in the project — color tokens, typography scale, spacing, border radii, shadows, button variants, card patterns, animation classes, and responsive conventions. Do not invent new visual patterns. Extend what is documented there.

Check these questions in order before creating any new file or utility.

### Does the component already exist?

| If you need...                              | Use this — do not create a new one          | Location                              |
|---------------------------------------------|---------------------------------------------|---------------------------------------|
| Site navigation bar                         | `Header`                                    | `src/components/Header.jsx`           |
| Site footer                                 | `Footer`                                    | `src/components/Footer.jsx`           |
| Login / sign-up form                        | `AccessForm`                                | `src/components/AccessForm.jsx`       |
| Contact / inquiry section                   | `ContactForm`                               | `src/components/ContactForm.jsx`      |
| A reusable button                           | `Button`                                    | `src/components/Button.jsx`           |
| Full-screen loading splash                  | `LoadingScreen`                             | `src/components/LoadingScreen.jsx`    |
| Reset scroll on route change                | `ScrollToTop`                               | `src/components/ScrollToTop.jsx`      |
| Floating support chatbot                    | `SupportChatbot`                            | `src/components/SupportChatbot.jsx`   |
| Google ad placeholder                       | `MockGoogleAd`                              | `src/components/MockGoogleAd.jsx`     |
| Toggle / switch UI element                  | `Switch`                                    | `src/components/Switch.jsx`           |
| Admin sidebar + top header shell            | `AdminLayout`                               | `src/layouts/AdminLayout.jsx`         |
| Full-screen page wrapper (auth page)        | `MainScreen`                                | `src/layouts/MainScreen.jsx`          |

### Does the hook already exist?

| If you need...                                            | Use this — do not create a new one  | Location                              |
|-----------------------------------------------------------|-------------------------------------|---------------------------------------|
| Detect when an element enters the viewport                | `useInView`                         | `src/hooks/useInView.jsx`             |
| Track vertical scroll position (e.g. sticky header)      | `useScrollPosition`                 | `src/hooks/useScrollPosition.jsx`     |
| Block navigation / page close on unsaved form changes     | `useUnsavedChanges`                 | `src/hooks/useUnsavedChanges.jsx`     |

`useUnsavedChanges(isDirty, isSubmitting?)` — accepts a boolean dirty flag and an optional submitting flag.
It handles both in-app navigation (via React Router's `useBlocker`) and browser close/refresh (`beforeunload`).

### Does the context / global state already exist?

| If you need...                                     | Use this                    | Location                              |
|----------------------------------------------------|-----------------------------|---------------------------------------|
| The packages array or activities array             | `useData()` from DataContext | `src/contexts/DataContext.jsx`        |
| Current language, setter, or translation strings  | `useLanguage()` from LanguageContext | `src/contexts/LanguageContext.jsx` |

`DataContext` stores `packages` and `activities`. Both are persisted to `localStorage` under the keys
`tahak_packages` and `tahak_activities`. Do not introduce a second localStorage key for the same data.

`LanguageContext` exposes `{ language, setLanguage, t }`. `t` is a memoized object of translated strings for the
active language. Supported language codes: `EN`, `UK`, `FR`, `KO`, `JA`.
When adding new UI strings that face the user, add them to **all five locales** in `src/contexts/translations.js`.

### Does the page already exist?

Tourist routes: `Home`, `OurStory`, `Packages`, `Create`, `Partners`, `FAQs`, `Booking`, `PrivacyPolicy`, `Profile`, `LoginRegister`
Admin routes: `Dashboard`, `ManagePackages`, `ManageActivities`

All routes are declared in `src/main.jsx`. Add new routes there — do not create a second router.

### Is the package already installed?

Check `package.json` **and the Packages & Libraries section of [`DOCS/CATALOG.md`](./DOCS/CATALOG.md)** before installing anything. The catalog entry for each package also notes its intended use and any constraints that `package.json` alone does not show.

Already available:

| Need                     | Already installed as               |
|--------------------------|------------------------------------|
| HTTP / API client        | `@supabase/supabase-js` (use this) |
| Charts / data viz        | `recharts`                         |
| Icons                    | `lucide-react`                     |
| CSS animations           | `animate.css`                      |
| Routing                  | `react-router-dom`                 |
| Styling utility classes  | `tailwindcss` (v4, Vite plugin)    |

Do not install `axios`, `react-query`, `zustand`, `redux`, `chart.js`, `react-icons`, or any icon/chart/animation library
unless the existing ones genuinely cannot satisfy the requirement.

**If you do install a new package:** add it to the Packages & Libraries section of `DOCS/CATALOG.md` in the same session. If you remove one, delete its entry.

### Does the Supabase client already exist?

The singleton client is at `src/supaBaseClient.js`. Import from there — do not instantiate a second client.

```js
import { supabase } from '../supaBaseClient';
```

---

## 3. Conventions

### File & Folder Structure

```
src/
├── assets/          Static images and fonts — no JS logic here
├── components/      Shared, reusable UI components (no page-level logic)
├── contexts/        React Context providers and their hooks
├── hooks/           Custom React hooks (no JSX rendering)
├── layouts/         Wrapper shells (AdminLayout, MainScreen)
├── pages/
│   ├── AdminPages/  Admin-only pages (Dashboard, ManagePackages, ManageActivities)
│   └── TouristPages/ Public pages (Home, Packages, Booking, etc.)
├── main.jsx         App entry point, router definition, context wrapping
├── styles.css       Global styles, Tailwind import, font-face declarations, CSS variables
└── supaBaseClient.js Supabase singleton
```

- **Components** live in `src/components/` only if they are reusable across multiple pages.
  Page-specific sub-components can be defined as local functions at the bottom of the page file (see `StatCard` and `ActionCard` in `Dashboard.jsx`, or `InputField` in `Booking.jsx`).
- **Hooks** live in `src/hooks/` and must not render JSX.
- **New pages** go into `src/pages/TouristPages/` or `src/pages/AdminPages/` depending on audience.

### Naming

- React components: `PascalCase` — both the file name and the exported function.
- Hooks: `camelCase` prefixed with `use` — e.g. `useMyHook.jsx`.
- Context files: `PascalCase` with `Context` suffix — e.g. `DataContext.jsx`.
- Utility / plain JS files: `camelCase` — e.g. `supaBaseClient.js`, `translations.js`.
- Assets: lowercase with underscores or hyphens as needed.

### Styling

- **Tailwind CSS v4** is the only styling system. Do not introduce CSS Modules, styled-components, or Emotion.
- CSS custom properties (design tokens) are defined in `src/styles.css` under `@theme`. Use these tokens via Tailwind classes rather than hardcoding hex values:

| Token                    | Tailwind class example          | Value     |
|--------------------------|---------------------------------|-----------|
| `--color-primary`        | `bg-primary`, `text-primary`    | `#15803d` |
| `--color-background`     | `bg-background`                 | `#f0fdf4` |
| `--color-accent`         | `bg-accent`, `text-accent`      | `#064e3b` |
| `--color-border`         | `border-border`                 | `#dcfce7` |
| `--color-primary-text-color` | `text-primary-text-color`   | `#022c22` |
| `--color-surface`        | `bg-surface`                    | `#FFFFFF` |
| `--font-primary-title`   | `font-primary-title`            | Libre Baskerville serif |
| `--font-primary-text`    | `font-primary-text`             | Google Sans sans-serif  |

- Tourist-facing UI uses the light green palette (`background`, `primary`, `accent`, `border`).
- Admin UI uses a dark palette (`bg-gray-950`, `bg-gray-900`, `bg-gray-800`) with `emerald-500/600` as the accent.
  Do not mix the tourist light palette into admin pages.

- Animations: use `animate.css` classes (e.g. `animate__animated animate__fadeIn`) for entrance effects.
  Tailwind's `transition-*` and `hover:scale-*` utilities are used for micro-interactions.

### Typography

Two font families are loaded globally in `styles.css`:
- `font-primary-title` → Libre Baskerville (serif) — used for page and section headings.
- `font-primary-text` / body default → Google Sans (sans-serif) — used for body copy and UI labels.

Do not import or embed additional fonts.

### Icons

Use `lucide-react` exclusively. Import individual icons by name:

```jsx
import { CalendarCheck, Users, Package } from 'lucide-react';
```

Do not install `react-icons`, `heroicons`, `feather-icons`, or any other icon library.

### Routing

All routes are defined once in `src/main.jsx` inside the `createBrowserRouter` call. To add a new route:
1. Import the page component.
2. Add the route object in the appropriate location in the children array (tourist or admin).
3. Do not create nested routers or a second `createBrowserRouter`.

### Forms

- Validate client-side before any async action. Return a string error message from a `validate()` function, display it above or near the form.
- Use `useUnsavedChanges(isDirty)` on any form where losing progress would be disruptive.
- The `isDirty` flag should be a computed boolean based on whether any controlled field differs from its default.

### Supabase

- Auth calls use `supabase.auth.signInWithPassword()` and `supabase.auth.signUp()`.
- Database calls use `supabase.from('table_name').select/insert/update/delete()`.
- Always handle the `error` destructured from the response. Do not silently swallow errors.
- Environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` must be present in `.env`.
  Never hardcode these values in source files.

### Admin vs. Tourist Separation

- The root `Layout` in `main.jsx` checks `location.pathname.startsWith('/admin')` and conditionally renders
  `MockGoogleAd` and `SupportChatbot`. These overlays must never appear on admin pages.
- Admin pages must always be children of the `AdminLayout` route so they inherit the sidebar and top header.
- Do not import or use `Header` or `Footer` inside any admin page — those are tourist-facing components.

---

## 4. Commands

Run these from the project root (`d:\tahakv2\tahakver2`).

```powershell
# Start local development server
npm run dev

# Production build (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview

# Run ESLint
npm run lint

# Run all tests once (CI mode)
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with the Vitest UI (browser-based reporter)
npm run test:ui
```

---

## 5. Testing

The project uses **Vitest** with **@testing-library/react** and **jsdom**.

### Test location

All test files live in `src/tests/`. The folder is flat — one file per subject.

### Running tests

```powershell
npm test              # single run, exits with code 0 (pass) or 1 (fail)
npm run test:watch    # re-runs on file save
npm run test:ui       # opens browser UI at localhost
```

### Test files

| File | What it covers | Tests |
|---|---|---|
| `translations.test.js` | All 5 locale codes, every required key, EN=UK parity, correct values | 14 |
| `LanguageContext.test.jsx` | Default language, translation lookup, `setLanguage` switching, memoization | 7 |
| `DataContext.test.jsx` | Default data, localStorage read/write/hydration, invalid JSON fallback, CRUD via setters, `useData` guard | 16 |
| `Button.test.jsx` | `CtaButton` render, className merge, onClick, no-onClick safety | 7 |
| `Switch.test.jsx` | Button labels, values, static active styling, dead `onActive` prop | 8 |
| `ContactForm.test.jsx` | Initial render, submit → "Sending...", 1500ms timeout → success, form hidden after submit | 7 |
| `BookingValidation.test.js` | `validate()` logic: fullName, email, phone, date — all valid/invalid cases, priority order | 18 |
| `AccessFormValidation.test.js` | `validate()` logic: sign-in / sign-up modes, all error strings, admin credentials pass validation | 14 |
| `ManagePackages.test.js` | Filter by title/desc/duration, price formatting, add/update/delete CRUD logic | 20 |
| `ManageActivities.test.js` | Filter by name/category, `parseInt` price parsing, add/update/delete CRUD logic, all 5 categories | 26 |
| `useScrollPosition.test.jsx` | Initial state, scroll event updates `scrollX`/`scrollY`, listener add/remove on mount/unmount | 7 |
| `useInView.test.jsx` | Initial state, `isIntersecting` true/false, one-shot latch, options forwarding, no observe before ref attaches | 8 |
| `useUnsavedChanges.test.jsx` | `beforeunload` add/remove, `preventDefault` when dirty, suppressed when `isSubmitting`, `returnValue` set | 7 |

**Total: 159 tests across 13 files. All passing.**

### Conventions for new tests

- **Pure logic** (validation functions, filter functions, CRUD helpers): extract to a plain `.test.js` file and test without React. See `BookingValidation.test.js` and `ManagePackages.test.js`.
- **Hooks**: use `renderHook` from `@testing-library/react`. Hooks that use `useBlocker` require a `createMemoryRouter` wrapper — see `useUnsavedChanges.test.jsx`.
- **Components**: use `render` + `screen` queries from `@testing-library/react`. Prefer `getByRole` and `getByText` over `getByTestId`.
- **Timers**: call `vi.useFakeTimers()` before rendering, use `fireEvent` (not `userEvent`) to submit forms when fake timers are active, advance with `act(() => { vi.advanceTimersByTime(ms); })`, always call `vi.useRealTimers()` at the end.
- **IntersectionObserver mock**: use a real `class` (not `vi.fn()`) so `new IntersectionObserver()` works — see `useInView.test.jsx`.
- **localStorage**: `setup.js` calls `localStorage.clear()` in `beforeEach` and `afterEach` automatically.
- **Asset imports**: all image/font imports are mocked in `src/tests/setup.js`. Add new ones there if a new asset causes an import error.
- **Supabase**: mock `../supaBaseClient` with `vi.mock` in any test that imports a component which calls Supabase.
- When you add a new component, hook, or utility, add a corresponding test file and update this table.

---

## 6. Documentation Rule — GOLDEN RULE

**Every change made to this codebase must be documented. No exceptions.**

After completing any addition, modification, or removal of functionality, create a new `.md` file inside the `DOCs/` folder before considering the task done.

### How to name the file

1. List the existing files in `DOCs/` and find the highest number prefix currently used.
2. Increment by 1 for your new file.
3. Append a short kebab-case description of what you added.

**Format:** `{number}-{short-description}.md`

**Examples:**
- `1-initial-project-setup.md`
- `2-admin-dashboard-charts.md`
- `3-booking-form-validation.md`
- `4-supabase-auth-integration.md`

If `DOCS/` is empty, your file is `1-{description}.md`.

### What to write inside the file

The document must begin with the date and then list every functional addition or change made in that session.

**Required format:**

```
{Month} {Day}, {Year}

## {Generalized title of the work done}

### Added
- ...

### Modified
- ...

### Removed
- ...
```

Only include sections that apply. If nothing was removed, omit the Removed section.
Be specific: name the files created or changed, describe what they do, and note any new routes, context keys, localStorage keys, or packages introduced.

### When to create the document

- After adding a new component, page, hook, or context
- After modifying existing functionality (not just fixing a typo)
- After adding or removing a package
- After changing a route
- After updating design tokens or global styles
- After any change to `AGENTS.md` or `SYSDESIGN/system-design.md` itself

**Also update [`DOCS/CATALOG.md`](./DOCS/CATALOG.md)** whenever you add, rename, or remove a hook, component, layout, context, or utility. The catalog and the change log work together — the catalog reflects the current state, the numbered docs reflect the history.

**Also update [`DOCS/CATALOG.md`](./DOCS/CATALOG.md) when you install or remove a package.** Add it to the Packages & Libraries section of the catalog with its package name, version (as installed), what it is used for, and any usage constraints. If you remove a package, delete its entry. This keeps the catalog the single place agents check before reaching for `npm install`.

**Do not batch undocumented changes across multiple sessions.** Each work session gets its own numbered document.

---

## 7. Key File Index (Quick Reference)

| File                                  | What it does                                         |
|---------------------------------------|------------------------------------------------------|
| `src/main.jsx`                        | Entry point — router, context wrapping, layout shell |
| `src/supaBaseClient.js`               | Supabase singleton — import this for all DB/auth     |
| `src/styles.css`                      | Global styles, design tokens, font declarations      |
| `src/contexts/DataContext.jsx`        | Global packages + activities state (localStorage)    |
| `src/contexts/LanguageContext.jsx`    | Global language state + `t` translation object       |
| `src/contexts/translations.js`       | All translated UI strings for EN/UK/FR/KO/JA         |
| `src/layouts/AdminLayout.jsx`         | Admin sidebar, top header, notifications panel       |
| `src/layouts/MainScreen.jsx`          | Full-screen wrapper for the auth page                |
| `src/components/AccessForm.jsx`       | Login + register form with Supabase auth             |
| `src/components/SupportChatbot.jsx`   | Floating chatbot with keyword knowledge base         |
| `src/hooks/useUnsavedChanges.jsx`     | Form navigation guard (blocker + beforeunload)       |
| `src/hooks/useScrollPosition.jsx`     | Scroll Y tracker used by Header for sticky behavior  |
| `src/hooks/useInView.jsx`             | Viewport intersection observer for scroll animations |
| `SYSDESIGN/system-design.md`         | Full system design document with architecture diagrams, data flow, and known issues |
| `SECURITY.md`                        | Security audit report — 15 findings, remediation priority order, and fix changelog  |
| `src/tests/setup.js`                 | Vitest global setup — asset mocks, localStorage clear |
| `src/tests/`                         | All test files — 159 tests across 13 files |
| `DOCS/CATALOG.md`                    | **Read first** — complete inventory of every hook, component, layout, context, and utility |
| `DOCS/DESIGN-SYSTEM.md`              | **Read for any design change** — colors, typography, spacing, components, animations        |
| `DOCS/`                              | Change log folder — every work session produces one numbered `.md` file here               |
| `AGENTS.md`                          | This file — agent knowledge base, conventions, and the documentation golden rule    |
