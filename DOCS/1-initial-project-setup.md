Oct 30, 2026

## Initial Project Setup — Full Baseline Codebase

This document records the complete state of the project at the time the AGENTS.md and DOCUMENT system were introduced. All items below were already present in the codebase.

---

### Added

#### Infrastructure & Config
- `package.json` — React 19 + Vite project. Dependencies: `react`, `react-dom`, `react-router-dom`, `@supabase/supabase-js`, `tailwindcss`, `@tailwindcss/vite`, `lucide-react`, `recharts`, `animate.css`.
- `vite.config.js` — Vite config with `@vitejs/plugin-react` and `@tailwindcss/vite` plugins.
- `eslint.config.js` — ESLint with `react-hooks` and `react-refresh` plugins.
- `vercel.json` — Catch-all SPA rewrite rule (`/*` → `/`).
- `.env` — Holds `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (gitignored).
- `index.html` — HTML entry point for Vite.

#### Entry Point & Routing
- `src/main.jsx` — App bootstrap. Renders a 2-second `LoadingScreen` on mount, wraps the tree in `DataProvider` then `LanguageProvider`, and mounts a `createBrowserRouter` with all tourist and admin routes. Root `Layout` component injects `MockGoogleAd` and `SupportChatbot` on all non-admin routes.

#### Global Styles & Design Tokens
- `src/styles.css` — Imports Tailwind CSS v4 and Animate.css. Declares `@font-face` for Libre Baskerville (`font-primary-title`) and Google Sans (`font-primary-text`). Defines `@theme` CSS custom properties: `--color-primary` (#15803d), `--color-background` (#f0fdf4), `--color-accent` (#064e3b), `--color-border` (#dcfce7), `--color-primary-text-color` (#022c22), `--color-surface` (#FFFFFF).

#### Supabase Client
- `src/supaBaseClient.js` — Singleton Supabase client. Reads URL and anon key from `VITE_` environment variables.

#### Contexts
- `src/contexts/DataContext.jsx` — Provides `packages` (6 default tour packages) and `activities` (6 default items) via `useData()`. State is persisted to localStorage under keys `tahak_packages` and `tahak_activities`.
- `src/contexts/LanguageContext.jsx` — Provides `language` (default `EN`), `setLanguage`, and `t` (memoized translations) via `useLanguage()`.
- `src/contexts/translations.js` — Translation strings for EN, UK, FR, KO, JA covering nav labels: `home`, `ourStory`, `packages`, `create`, `partners`, `faqs`, `signIn`.

#### Custom Hooks
- `src/hooks/useInView.jsx` — IntersectionObserver wrapper. Fires when an element enters the viewport. Used for scroll-triggered animations.
- `src/hooks/useScrollPosition.jsx` — Tracks `scrollY`. Consumed by `Header` to switch between transparent and frosted-glass styles.
- `src/hooks/useUnsavedChanges.jsx` — Blocks in-app navigation via `useBlocker` and browser close via `beforeunload` when a form `isDirty`. Accepts optional `isSubmitting` flag to allow submission to proceed.

#### Layouts
- `src/layouts/AdminLayout.jsx` — Dark-themed shell for all `/admin/*` pages. Includes a collapsible sidebar with nav links (Dashboard, Manage Packages, Manage Activities, Bookings, Users, Settings), a top header with a search bar, notification bell (with dropdown and mark-as-read), and an admin profile badge. Renders `<Outlet />` for child pages.
- `src/layouts/MainScreen.jsx` — Full-screen wrapper used by the auth page.

#### Shared Components
- `src/components/Header.jsx` — Fixed navigation bar. Transparent on hero pages, frosted-glass when scrolled (`useScrollPosition`). Contains desktop nav links (using `useLanguage` for labels), a language switcher dropdown (EN/UK/FR/KO/JA with flag emoji), a Sign In CTA button, and a mobile hamburger menu. Exports `NavItem` and uses internal `MobileNavItem`.
- `src/components/Footer.jsx` — Four-column footer with logo, quick links, support links, and contact info (email, Facebook). Uses React Router `Link`.
- `src/components/AccessForm.jsx` — Login/register form. Toggles between sign-in and sign-up modes. Uses Supabase auth (`signInWithPassword`, `signUp`). Contains a hardcoded admin bypass: `admin@tahak.com` / `admin123` navigates directly to `/admin`. Uses `useUnsavedChanges`.
- `src/components/ContactForm.jsx` — Contact/inquiry section rendered at the bottom of several tourist pages.
- `src/components/Button.jsx` — Reusable button primitive.
- `src/components/LoadingScreen.jsx` — Full-screen branded loading splash shown for 2 seconds at app mount.
- `src/components/ScrollToTop.jsx` — Resets scroll to top on every route change.
- `src/components/SupportChatbot.jsx` — Floating chatbot fixed to `bottom-6 right-6`. Keyword-based matching against a static `KNOWLEDGE_BASE` object (~18 topic categories). Shows suggestion chips under the last bot message. 1-second simulated typing delay. Excluded from admin routes.
- `src/components/MockGoogleAd.jsx` — Placeholder ad unit for future monetization. Excluded from admin routes.
- `src/components/Switch.jsx` — Reusable toggle switch UI primitive.

#### Tourist Pages
- `src/pages/TouristPages/Home.jsx` — Landing page (`/`). Hero section, featured packages, CTAs.
- `src/pages/TouristPages/OurStory.jsx` — Brand story and mission (`/our-story`).
- `src/pages/TouristPages/Packages.jsx` — Grid of all packages from `DataContext` (`/packages`). Each card shows image, price badge, duration, group size, description, star rating, and a Book Now button linking to `/booking`.
- `src/pages/TouristPages/Create.jsx` — Custom itinerary builder (`/create`). Uses activities from `DataContext`.
- `src/pages/TouristPages/Partners.jsx` — Community partner showcase (`/partners`).
- `src/pages/TouristPages/FAQs.jsx` — FAQ accordion (`/faqs`).
- `src/pages/TouristPages/Booking.jsx` — Quote request form (`/booking`). Fields: full name, email, phone, number of guests (1–10), travel date, special requests. Client-side `validate()`. Uses `useUnsavedChanges`. On success renders a confirmation screen. Submission is currently simulated with a 1500ms timeout — no backend call.
- `src/pages/TouristPages/PrivacyPolicy.jsx` — Privacy policy page (`/privacy-policy`).
- `src/pages/TouristPages/Profile.jsx` — Authenticated user profile (`/profile`).
- `src/pages/LoginRegister.jsx` — Auth page (`/access`). Renders `AccessForm` over a full-screen background image.

#### Admin Pages
- `src/pages/AdminPages/Dashboard.jsx` — Analytics overview (`/admin`). Stat cards: Total Bookings, Active Users, Total Packages, Revenue. Recharts `AreaChart` for monthly revenue, `PieChart` for package popularity. Recent Activity list and System Management quick-action cards. All data is currently mock/hardcoded.
- `src/pages/AdminPages/ManagePackages.jsx` — Package CRUD (`/admin/packages`). Reads/writes via `DataContext`.
- `src/pages/AdminPages/ManageActivities.jsx` — Activity CRUD (`/admin/activities`). Reads/writes via `DataContext`.

#### Assets
- `src/assets/pictures/` — 12 experience images: audiovisual, bonfire, falls, farm, forestbath, hilot, kawa, mountbanahaw, sound, tea, treeplant, trek.
- `src/assets/PESO/` and `src/assets/DOLLARS/` — Package card images for PHP and USD pricing variants (kapwa, sama, ugnayan × 2 each).
- `src/assets/fonts/Google_Sans/` and `src/assets/fonts/Libre_Baskerville/` — Variable and static font files.
- Social/brand icons: `fb_icon.png`, `ig_icon.png`, `email_icon.png`, `tahak_logo.png`, `tahak_icon.png`.
- Background images: `sta_lucia.jpg`, `mountain.jpg`, `mountainrange.png`, `rocks.webp`, `peace_in_nature.jpg`, `banahaw_circle.avif`, `KALIPI.jpg`, `LABB.jpg`.

#### Project Documentation
- `SYSDESIGN/system-design.md` — Full system design document covering architecture, routing, auth, state management, data flow, deployment, environment variables, known issues, and recommended next steps.
- `AGENTS.md` — Agent knowledge base with project overview, pre-coding checklist, conventions, commands, key file index, and the documentation golden rule.
- `DOCUMENT/1-initial-project-setup.md` — This file.
