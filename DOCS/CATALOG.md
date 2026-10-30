# TAHAK — Component, Hook & Utility Catalog

**Last updated:** Oct 30, 2026  
This is the single source of truth for everything that already exists in `src/`.  
Before writing any new hook, component, context, utility, or layout — search this file first.  
If what you need is here, use it. If it is not here, create it and then add it to this catalog.

---

## Hooks — `src/hooks/`

### `useInView`
**File:** `src/hooks/useInView.jsx`  
**Export:** default  
**Signature:** `const [ref, isInView] = useInView(options?)`  
**What it does:** Wraps `IntersectionObserver`. Attaches to a DOM element via the returned `ref`. Sets `isInView` to `true` the first time the element enters the viewport, then stops observing (fire-once behavior). Pass standard `IntersectionObserver` options (e.g. `{ threshold: 0.2 }`) to control trigger sensitivity.  
**Use it for:** Scroll-triggered entrance animations, lazy-reveal sections.  
**Do not use it for:** Tracking scroll position or window scroll offset — use `useScrollPosition` for that.

---

### `useScrollPosition`
**File:** `src/hooks/useScrollPosition.jsx`  
**Export:** named — `useScrollPosition`  
**Signature:** `const { scrollX, scrollY } = useScrollPosition()`  
**What it does:** Attaches a `scroll` event listener to `window` and returns the current `{ scrollX, scrollY }` values. Updates on every scroll event.  
**Use it for:** Detecting how far down the page the user has scrolled — e.g. switching the `Header` between transparent and frosted-glass at `scrollY > 50`.  
**Do not use it for:** Detecting whether an element is in view — use `useInView` for that.

---

### `useUnsavedChanges`
**File:** `src/hooks/useUnsavedChanges.jsx`  
**Export:** named — `useUnsavedChanges`  
**Signature:** `useUnsavedChanges(isDirty, isSubmitting?)`  
**What it does:** Guards against accidental data loss on forms with unsaved state. Does two things simultaneously:
1. Uses React Router's `useBlocker` to intercept in-app navigation when `isDirty` is true, showing a `window.confirm` dialog.
2. Attaches a `beforeunload` handler to block browser refresh or tab close when `isDirty` is true.

`isSubmitting` (optional, default `false`) — when true, allows navigation to proceed even if `isDirty` is still set (so a successful submit doesn't get blocked).  
**Use it for:** Any form where losing partially entered data would be disruptive (Booking form, AccessForm, any future admin forms).  
**Do not use it for:** Non-form pages or read-only views.

---

## Components — `src/components/`

### `Header`
**File:** `src/components/Header.jsx`  
**Export:** default + named `NavItem`  
**Props:** none  
**What it does:** Fixed top navigation bar (`position: fixed`, `z-[1000]`). Behavior:
- Reads `useScrollPosition` — switches from fully transparent to `bg-white/90 backdrop-blur-xl` at `scrollY > 50`.
- Reads `useLocation` — applies different text colors on hero pages (`/`, `/our-story`) vs. non-hero pages.
- Reads `useLanguage` — renders nav labels from the `t` translation object and drives the language switcher dropdown (EN / UK / FR / KO / JA with flag emoji).
- Desktop nav: Home, Our Story, Packages, Create, Partners, FAQs.
- Mobile: hamburger menu that slides in from the top.
- Sign In CTA button → links to `/access`.

**Also exports:** `NavItem` (used externally if needed) with props `{ link, active, idleClass, activeClass, isScrolled, isHeroPage, label }`.  
**Used on:** All tourist-facing pages via inclusion in each page's JSX. Never use inside admin pages.

---

### `Footer`
**File:** `src/components/Footer.jsx`  
**Export:** default  
**Props:** none  
**What it does:** Four-column footer on a dark `bg-accent` background. Columns: logo + tagline, Quick Links, Support links, Contacts (email + Facebook). Copyright year is dynamic via `new Date().getFullYear()`.  
**Used on:** All tourist-facing pages. Never use inside admin pages.

---

### `AccessForm`
**File:** `src/components/AccessForm.jsx`  
**Export:** default  
**Props:** none  
**What it does:** Login / register form mounted on the `/access` page. Toggles between sign-in and sign-up modes via local state. Validates email format and password length (min 6 chars); sign-up also checks password confirmation match. Calls `supabase.auth.signInWithPassword()` or `supabase.auth.signUp()`. Hardcoded admin bypass: `admin@tahak.com` / `admin123` navigates to `/admin` without a Supabase call. Uses `useUnsavedChanges` to guard partially filled fields.  
**⚠️ Known issue:** Admin bypass is a dev shortcut — must be replaced with role-based auth before production.

---

### `ContactForm`
**File:** `src/components/ContactForm.jsx`  
**Export:** default  
**Props:** none  
**What it does:** Self-contained "Have other inquiries?" section with Name, Email, and Message fields. Submission is currently simulated with a 1500ms timeout — no backend call. Shows a success message on completion and resets the form.  
**Used on:** Bottom of `Booking`, and any tourist page that needs a general inquiry form.  
**Do not rebuild** a contact/inquiry section from scratch — place this component instead.

---

### `Button` → exports `CtaButton`
**File:** `src/components/Button.jsx`  
**Export:** named — `CtaButton`  
**Props:** `{ children, onClick, className? }`  
**What it does:** Primary call-to-action button. Green background (`bg-primary`), white text, small rounded corners, drop shadow (`shadow-accent`), scales up 5% on hover. `className` prop merges additional Tailwind classes.  
**Use it for:** Primary CTAs that need the standard brand button appearance.  
**Note:** Many pages also use inline `<button>` elements styled directly with Tailwind for context-specific variants (e.g. pill-shaped booking buttons). Use `CtaButton` when you want the canonical brand style.

---

### `LoadingScreen`
**File:** `src/components/LoadingScreen.jsx`  
**Export:** default  
**Props:** none  
**What it does:** Full-screen branded splash (`fixed inset-0 z-[9999]`). Shows the TAHAK logo with concentric pulse rings, an animated progress bar, and the tagline "Finding your way home". Rendered by `App` in `main.jsx` for the first 2 seconds after mount. Not intended to be used outside of that bootstrap context.

---

### `ScrollToTop`
**File:** `src/components/ScrollToTop.jsx`  
**Export:** default  
**Props:** none  
**What it does:** Renders nothing (`return null`). Uses `useLocation` to detect route changes and calls `window.scrollTo(0, 0)` on every `pathname` change. Mounted once inside the root `Layout` in `main.jsx`. Do not mount it more than once.

---

### `SupportChatbot`
**File:** `src/components/SupportChatbot.jsx`  
**Export:** default  
**Props:** none  
**What it does:** Floating chat widget fixed to `bottom-6 right-6` (`z-[10000]`). Toggle button opens/closes the chat window. Keyword-based response engine matches user input against a `KNOWLEDGE_BASE` object with ~18 topic categories (greetings, about, packages, booking, payment, safety, etc.). Each topic has `keywords`, a `response` string, and a `recommendations` array shown as quick-reply chips. Simulates typing with a 1-second delay. Initial messages are pre-seeded.  
**Excluded from:** All `/admin/*` routes — enforced in `main.jsx`'s root `Layout`.  
**Do not:** Add an AI API call here without also updating this catalog entry and `AGENTS.md`.

---

### `MockGoogleAd`
**File:** `src/components/MockGoogleAd.jsx`  
**Export:** default  
**Props:** none  
**What it does:** Bottom-of-screen ad banner (`fixed bottom-0`, `z-[9999]`). Appears 1.5 seconds after mount with an `animate__slideInUp` animation. Has a close button (`X`). Currently displays static hardcoded ad copy for TAHAK itself — it is a placeholder for a real Google AdSense integration.  
**Excluded from:** All `/admin/*` routes — enforced in `main.jsx`'s root `Layout`.

---

### `Switch`
**File:** `src/components/Switch.jsx`  
**Export:** default  
**Props:** `{ onActive }`  
**What it does:** A two-button toggle (Register / Login) styled as a pill with a green active segment. Intended as a mode switcher. Note: `onActive` prop is accepted but the internal `onClick` wiring is not yet implemented — the component renders the UI only.  
**⚠️ Status:** Partially implemented — use with care and complete the wiring if you use it.

---

## Layouts — `src/layouts/`

### `AdminLayout`
**File:** `src/layouts/AdminLayout.jsx`  
**Export:** default  
**Props:** none (wraps child routes via `<Outlet />`)  
**What it does:** Full dark-theme shell for all `/admin/*` pages. Contains:
- **Sidebar** — collapsible (64px wide when open, 20px when collapsed). Nav items: Dashboard, Manage Packages, Manage Activities, Bookings, Users, Settings, Logout. Active route highlighted in `emerald-600`.
- **Top header** — sticky, frosted glass (`bg-gray-900/50 backdrop-blur-md`). Contains a search input, notification bell with dropdown (mark-as-read, 3 mock notifications), and admin profile badge ("Admin Buwie / Super Admin").
- **Main content area** — shifts its left margin based on sidebar state. Renders `<Outlet />`.

**All admin pages must be children of this layout** — it is wired as the parent route for `/admin` in `main.jsx`.

---

### `MainScreen`
**File:** `src/layouts/MainScreen.jsx`  
**Export:** default  
**Props:** `{ children }`  
**What it does:** Minimal full-viewport wrapper (`w-full min-h-screen flex flex-col`). Used exclusively by the `LoginRegister` auth page to ensure the background image fills the screen correctly.

---

## Contexts — `src/contexts/`

### `DataContext` → `useData()`
**File:** `src/contexts/DataContext.jsx`  
**Provider:** `<DataProvider>` (wraps the app in `main.jsx`)  
**Hook:** `useData()` → `{ packages, setPackages, activities, setActivities }`  

**`packages`** — Array of tour package objects. Default shape:
```js
{
  id: number,
  title: string,       // e.g. "Ugnayan: The Connection"
  price: string,       // e.g. "2,500" (no ₱ prefix — pages add it)
  img: importedImage,  // imported asset reference
  duration: string,    // e.g. "Day Trip"
  group: string,       // e.g. "2-4 persons"
  desc: string
}
```

**`activities`** — Array of activity objects. Default shape:
```js
{
  id: number,
  name: string,        // e.g. "Forest Bathing"
  price: number,       // numeric PHP price
  icon: string,        // emoji, e.g. "🌲"
  category: string     // "Wellness" | "Adventure" | "Food" | "Leisure" | "Culture"
}
```

Both arrays persist to `localStorage` (`tahak_packages`, `tahak_activities`). Admin mutations via `setPackages` / `setActivities` write through to localStorage automatically via `useEffect`.  
**⚠️ Scope:** localStorage is per-browser. Changes made in Admin do not persist to the database or other users' sessions.

---

### `LanguageContext` → `useLanguage()`
**File:** `src/contexts/LanguageContext.jsx`  
**Provider:** `<LanguageProvider>` (wraps the app inside `DataProvider` in `main.jsx`)  
**Hook:** `useLanguage()` → `{ language, setLanguage, t }`  

- `language` — current code string: `'EN'` | `'UK'` | `'FR'` | `'KO'` | `'JA'`
- `setLanguage(code)` — updates the active language
- `t` — memoized translation object for the current language

**Translation keys** (defined in `src/contexts/translations.js`):

| Key | Example value (EN) |
|---|---|
| `t.home` | `"Home"` |
| `t.ourStory` | `"Our Story"` |
| `t.packages` | `"Packages"` |
| `t.create` | `"Create"` |
| `t.partners` | `"Partners"` |
| `t.faqs` | `"FAQs"` |
| `t.signIn` | `"Sign In"` |

When adding any new user-facing string, add the key to **all five locales** in `translations.js` before using `t.yourKey` in a component.

---

## Utility Files

### `supaBaseClient`
**File:** `src/supaBaseClient.js`  
**Export:** named — `supabase`  
**What it does:** Creates and exports the single Supabase client instance using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from `.env`. This is the only Supabase client in the project — always import from here.

```js
import { supabase } from '../supaBaseClient';
```

---

## Pages Reference

Pages are not reusable components but are listed here so agents know what already exists and avoid duplicates.

### Tourist Pages — `src/pages/TouristPages/`

| File | Route | Key dependencies |
|---|---|---|
| `LandingPage.jsx` | `/`, `/landing` | `Header`, `Footer`, `ContactForm`, `useInView` |
| `Home.jsx` | `/home-classic` | `Header`, `Footer`, `ContactForm`, `useInView` |
| `OurStory.jsx` | `/our-story` | `Header`, `Footer`, `ContactForm`, `useInView` |
| `Packages.jsx` | `/packages` | `Header`, `Footer`, `ContactForm`, `useData` |
| `Create.jsx` | `/create` | `Header`, `Footer`, `useData` |
| `Partners.jsx` | `/partners` | `Header`, `Footer` |
| `FAQs.jsx` | `/faqs` | `Header`, `Footer` |
| `Booking.jsx` | `/booking` | `Header`, `Footer`, `ContactForm`, `useUnsavedChanges` |
| `PrivacyPolicy.jsx` | `/privacy-policy` | `Header`, `Footer` |
| `Profile.jsx` | `/profile` | `Header`, `Footer` |

`LoginRegister.jsx` lives at `src/pages/LoginRegister.jsx` (route: `/access`) and renders `AccessForm` inside `MainScreen`.

### Admin Pages — `src/pages/AdminPages/`

| File | Route | Key dependencies |
|---|---|---|
| `Dashboard.jsx` | `/admin` | `AdminLayout` (via router), `recharts` — all data is mock |
| `ManagePackages.jsx` | `/admin/packages` | `AdminLayout` (via router), `useData` |
| `ManageActivities.jsx` | `/admin/activities` | `AdminLayout` (via router), `useData` |

Stub routes (placeholder `<div>` only): `/admin/bookings`, `/admin/users`, `/admin/settings`.

---

## Asset Inventory

### Images — `src/assets/pictures/`
`audiovisual.jpg`, `bonfire.jpg`, `falls.jpg`, `farm.jpg`, `forestbath.jpg`, `hilot.png`, `kawa.jpeg`, `mountbanahaw.jpg`, `sound.jpg`, `tea.jpg`, `treeplant.jpg`, `trek.jpg`

### Package Card Images
- `src/assets/PESO/` — `kapwa_1.png`, `kapwa_2.png`, `sama_1.png`, `sama_2.png`, `ugnayan_1.png`, `ugnayan_2.png`
- `src/assets/DOLLARS/` — same six files for USD pricing contexts

### Brand / UI Assets
`src/assets/tahak_logo.png`, `src/assets/email_icon.png`, `src/assets/fb_icon.png`, `src/assets/ig_icon.png`  
`public/tahak_icon.png` (favicon)

### Backgrounds
`src/assets/sta_lucia.jpg`, `src/assets/mountain.jpg`, `src/assets/mountainrange.png`, `src/assets/rocks.webp`, `src/assets/peace_in_nature.jpg`, `src/assets/banahaw_circle.avif`, `src/assets/KALIPI.jpg`, `src/assets/LABB.jpg`

### Fonts — `src/assets/fonts/`
- `Google_Sans/` — variable font (`GoogleSans-VariableFont_GRAD,opsz,wght.ttf`) + full static weight family. Registered as `font-primary-text` / `font-family: 'GoogleSans'`.
- `Libre_Baskerville/` — variable font (`LibreBaskerville-VariableFont_wght.ttf`) + static weights. Registered as `font-primary-title` / `font-family: 'Libre'`.

---

## Keeping This Catalog Current

Whenever you add, rename, or remove any of the above, update this file in the same commit/session.  
Also create a numbered entry in `DOCS/` following the golden rule in `AGENTS.md`.

---

## Packages & Libraries

Every package installed in this project is listed here. Before running `npm install <anything>`, check this section first. If it is already here, use it. If you install something new, add it below before closing your session.

**Format for each entry:**
- Package name (with npm link)
- Installed version (as it appears in `package.json`)
- Runtime or dev dependency
- What it is used for in this project
- Any constraints or "do not use for" notes

---

### `react` — `^19.2.0` · runtime
Core UI library. All components are React functional components using hooks.

---

### `react-dom` — `^19.2.0` · runtime
Renders the React tree into the DOM via `createRoot` in `src/main.jsx`.

---

### `react-router-dom` — `^7.13.0` · runtime
Client-side routing. Uses `createBrowserRouter` and `RouterProvider`. All routes are declared once in `src/main.jsx`.  
**Do not** install a second router or create nested `createBrowserRouter` calls.

---

### `@supabase/supabase-js` — `^2.100.0` · runtime
Supabase JavaScript client. Used for authentication (`supabase.auth.*`) and will be used for database operations (`supabase.from(...)`). The singleton instance lives at `src/supaBaseClient.js` — always import from there, never instantiate a second client.

---

### `tailwindcss` — `^4.1.18` · runtime
Utility-first CSS framework (v4). Loaded via the Vite plugin (`@tailwindcss/vite`). Design tokens are defined in `src/styles.css` under `@theme`.  
**Do not** introduce CSS Modules, styled-components, or Emotion alongside this.

---

### `@tailwindcss/vite` — `^4.1.18` · runtime
Vite plugin that integrates Tailwind CSS v4 into the build pipeline. Configured in `vite.config.js`.

---

### `lucide-react` — `^1.7.0` · runtime
Icon library. The only icon library in the project. Import individual icons by name.  
**Do not** install `react-icons`, `heroicons`, `feather-icons`, or any other icon set.

---

### `recharts` — `^3.8.1` · runtime
Composable charting library built on D3. Used in the Admin Dashboard (`src/pages/AdminPages/Dashboard.jsx`) for the `AreaChart` (revenue) and `PieChart` (package popularity).  
**Do not** install `chart.js`, `victory`, `nivo`, or any other charting library.

---

### `animate.css` — `^4.1.1` · runtime
CSS animation class library. Used for entrance animations via `animate__animated animate__*` class combinations. Imported globally in `src/styles.css`.  
**Do not** install `framer-motion`, `react-spring`, or `gsap` for entrance animations — use this instead.

---

### `vite` — `^7.3.1` · dev
Build tool and dev server. Entry point is `index.html`. Config at `vite.config.js`.

---

### `@vitejs/plugin-react` — `^5.1.1` · dev
Vite plugin that enables React Fast Refresh and JSX transform.

---

### `eslint` — `^9.39.1` · dev
JavaScript linter. Config at `eslint.config.js`.

---

### `eslint-plugin-react-hooks` — `^7.0.1` · dev
Enforces the Rules of Hooks (no conditional hook calls, exhaustive deps warnings).

---

### `eslint-plugin-react-refresh` — `^0.4.24` · dev
Warns when a file exports non-component values that would break React Fast Refresh.

---

### `@eslint/js` — `^9.39.1` · dev
ESLint's official JavaScript rule set. Used as a base config in `eslint.config.js`.

---

### `@types/react` — `^19.2.7` · dev
TypeScript type definitions for React. Present for editor intellisense even though the project uses JSX, not TSX.

---

### `@types/react-dom` — `^19.2.3` · dev
TypeScript type definitions for `react-dom`. Same purpose as above.

---

### `globals` — `^16.5.0` · dev
Provides global variable definitions (browser, node) for ESLint configuration.

---

### `vitest` — `^5.0.5` · dev
Test runner. Configured in `vite.config.js` under the `test` key. Uses jsdom environment.  
Run with `npm test` (single pass) or `npm run test:watch` (watch mode).  
**Do not** add Jest or any other test runner — Vitest is the standard for this project.

---

### `@vitest/ui` — `^5.0.5` · dev
Browser-based test reporter UI. Run with `npm run test:ui`.

---

### `jsdom` — (peer, pulled by vitest) · dev
DOM environment for Vitest. Configured via `environment: 'jsdom'` in `vite.config.js`.

---

### `@testing-library/react` — `^16.x` · dev
React component and hook testing utilities. Provides `render`, `screen`, `renderHook`, `act`, `waitFor`, `fireEvent`.  
Import from `@testing-library/react`.

---

### `@testing-library/user-event` — `^14.x` · dev
Simulates real browser user interactions (typing, clicking). Use `userEvent.setup()` and `await user.click/type`.  
Use `fireEvent` instead when tests involve `vi.useFakeTimers()`.

---

### `@testing-library/jest-dom` — `^6.x` · dev
Custom DOM matchers for Vitest/Jest (`toBeInTheDocument`, `toHaveTextContent`, `toHaveAttribute`, etc.).  
Imported globally via `src/tests/setup.js` — available in all test files without explicit import.

---

## Test Files — `src/tests/`

All tests live in `src/tests/`. One file per subject. 159 tests total, all passing as of Oct 30, 2026.

| File | Subject | Tests |
|---|---|---|
| `setup.js` | Global setup — asset mocks, localStorage clear | — |
| `translations.test.js` | `translations` object — locale codes, keys, values | 14 |
| `LanguageContext.test.jsx` | `LanguageProvider` + `useLanguage` | 7 |
| `DataContext.test.jsx` | `DataProvider` + `useData` — defaults, localStorage, CRUD | 16 |
| `Button.test.jsx` | `CtaButton` component | 7 |
| `Switch.test.jsx` | `Switch` component | 8 |
| `ContactForm.test.jsx` | `ContactForm` render + submission state machine | 7 |
| `BookingValidation.test.js` | Booking `validate()` pure logic | 18 |
| `AccessFormValidation.test.js` | AccessForm `validate()` pure logic | 14 |
| `ManagePackages.test.js` | ManagePackages filter + CRUD pure logic | 20 |
| `ManageActivities.test.js` | ManageActivities filter + CRUD pure logic | 26 |
| `useScrollPosition.test.jsx` | `useScrollPosition` hook | 7 |
| `useInView.test.jsx` | `useInView` hook | 8 |
| `useUnsavedChanges.test.jsx` | `useUnsavedChanges` hook | 7 |
