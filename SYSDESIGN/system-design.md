# TAHAK — System Design Document

**Version:** 1.0  
**Date:** October 30, 2026  
**Author:** System Administrator  
**Project:** TAHAK (Tahanan sa Kalikasan) — Wellness Tourism Web Application  

---

## 1. Overview

TAHAK is a single-page application (SPA) built for a wellness-focused tour operator based in Sta. Lucia, Quezon, Philippines. The platform serves two distinct user roles: **tourists** (public-facing experience) and **administrators** (internal management portal). The app is deployed on **Vercel** and backed by **Supabase** as the authentication and data provider.

---

## 2. Technology Stack

| Layer              | Technology                          | Version   |
|--------------------|-------------------------------------|-----------|
| Frontend Framework | React                               | ^19.2.0   |
| Build Tool         | Vite                                | ^7.3.1    |
| Styling            | Tailwind CSS (via Vite plugin)      | ^4.1.18   |
| Routing            | React Router DOM                    | ^7.13.0   |
| Backend / Auth     | Supabase (`@supabase/supabase-js`)  | ^2.100.0  |
| Charts             | Recharts                            | ^3.8.1    |
| Icons              | Lucide React                        | ^1.7.0    |
| Animations         | Animate.css                         | ^4.1.1    |
| Deployment         | Vercel                              | —         |
| Linting            | ESLint (react-hooks, react-refresh) | ^9.39.1   |

---

## 3. Architecture

### 3.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│                                                                 │
│   React 19 SPA (Vite)                                           │
│   ┌──────────────┐   ┌──────────────┐   ┌──────────────────┐   │
│   │  Tourist UI  │   │   Admin UI   │   │  Global Contexts  │  │
│   │  (Public)    │   │  (/admin/*)  │   │  DataContext      │  │
│   └──────────────┘   └──────────────┘   │  LanguageContext  │  │
│                                         └──────────────────┘   │
│                    React Router DOM                             │
│                  (createBrowserRouter)                          │
└───────────────────────────┬─────────────────────────────────────┘
                            │  HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SUPABASE (BaaS)                          │
│                                                                 │
│   ┌─────────────────┐         ┌──────────────────────────────┐  │
│   │  Auth Service   │         │    PostgreSQL Database       │  │
│   │  (email/pass)   │         │    (users, bookings, etc.)   │  │
│   └─────────────────┘         └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      VERCEL (Hosting)                           │
│   Static asset CDN + SPA rewrite rule (`/*` → `/index.html`)   │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Application Bootstrap

`main.jsx` is the entry point. On load it:
1. Renders a `<LoadingScreen>` for 2 seconds to simulate initialization.
2. Wraps the entire app in `<DataProvider>` then `<LanguageProvider>`.
3. Mounts a `<RouterProvider>` with `createBrowserRouter`.
4. A root `<Layout>` component injects `<MockGoogleAd>` and `<SupportChatbot>` on all non-admin routes.

---

## 4. Routing Structure

All routes live under a single root path (`/`) handled by the `Layout` component.

```
/                     → Home (Tourist landing page)
/our-story            → OurStory
/packages             → Packages (experience catalog)
/create               → Create (custom itinerary builder)
/partners             → Partners
/faqs                 → FAQs
/booking              → Booking (quote request form)
/privacy-policy       → PrivacyPolicy
/profile              → Profile (authenticated user)
/access               → LoginRegister (auth page)

/admin                → AdminLayout (wrapper)
  /admin/             → Dashboard (analytics overview)
  /admin/packages     → ManagePackages
  /admin/activities   → ManageActivities
  /admin/bookings     → (Coming Soon placeholder)
  /admin/users        → (Coming Soon placeholder)
  /admin/settings     → (Coming Soon placeholder)
```

Admin routes are wrapped in a dedicated `<AdminLayout>` and are excluded from the `MockGoogleAd` and `SupportChatbot` overlays.

---

## 5. Authentication

Authentication is handled by **Supabase Auth** (email/password strategy).

### 5.1 Sign-Up Flow
1. User submits email, password, and full name via `AccessForm`.
2. Client calls `supabase.auth.signUp()` with `full_name` stored in `user_metadata`.
3. On success, user is redirected to `/` (Home).

### 5.2 Sign-In Flow
1. Client calls `supabase.auth.signInWithPassword()`.
2. On success, user is redirected to `/`.

### 5.3 Admin Access
- **Hardcoded bypass** in `AccessForm.jsx`: credentials `admin@tahak.com` / `admin123` skip Supabase entirely and redirect directly to `/admin`.
- ⚠️ **Security Note:** This is a development-convenience shortcut. Before production hardening, admin authentication must be moved to a proper role-based system (e.g., Supabase RLS with an `admin` role or a server-side check).

### 5.4 Supabase Client Configuration
Located at `src/supaBaseClient.js`. Reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from environment variables (`.env`).

---

## 6. State Management

The app uses React's built-in Context API. There is no external state management library (no Redux, Zustand, etc.).

### 6.1 DataContext (`src/contexts/DataContext.jsx`)
- **Scope:** Global
- **Manages:** `packages` (tour packages array) and `activities` (individual activity items)
- **Persistence:** Both states are synced to `localStorage` via `useEffect`. On initialization, state is hydrated from `localStorage` with a fallback to hardcoded defaults if none exist.
- **Consumers:** `Packages.jsx`, `ManagePackages.jsx`, `ManageActivities.jsx`, `Create.jsx`
- **Known limitation:** localStorage is client-only and per-browser. Changes made in the Admin panel do not propagate to other users' sessions — this reflects the current development stage.

### 6.2 LanguageContext (`src/contexts/LanguageContext.jsx`)
- **Scope:** Global
- **Manages:** `language` (default: `'EN'`), `t` (memoized translation object)
- **Source:** Translation strings live in `src/contexts/translations.js`
- **Consumers:** Any component using `useLanguage()` hook

---

## 7. Component Inventory

### 7.1 Shared / Global Components (`src/components/`)

| Component         | Purpose                                                             |
|-------------------|---------------------------------------------------------------------|
| `Header.jsx`      | Site-wide navigation bar                                            |
| `Footer.jsx`      | Site-wide footer                                                    |
| `AccessForm.jsx`  | Login / Register form with Supabase auth integration               |
| `ContactForm.jsx` | Contact / inquiry form section                                      |
| `Button.jsx`      | Reusable button primitive                                           |
| `LoadingScreen.jsx` | Full-screen loading splash on initial app mount (2s timer)       |
| `ScrollToTop.jsx` | Resets scroll position to top on route change                       |
| `SupportChatbot.jsx` | Floating in-app chatbot with keyword-based knowledge base        |
| `MockGoogleAd.jsx` | Placeholder for ad monetization (non-admin routes only)           |
| `Switch.jsx`      | Reusable toggle switch UI primitive                                 |

### 7.2 Tourist Pages (`src/pages/TouristPages/`)

| Page              | Route            | Description                                        |
|-------------------|------------------|----------------------------------------------------|
| `Home.jsx`        | `/`              | Landing page — hero, featured packages, CTA        |
| `OurStory.jsx`    | `/our-story`     | Brand story and mission narrative                  |
| `Packages.jsx`    | `/packages`      | Grid display of all packages from `DataContext`    |
| `Create.jsx`      | `/create`        | Custom itinerary builder using activities list     |
| `Partners.jsx`    | `/partners`      | Community partner showcase                         |
| `FAQs.jsx`        | `/faqs`          | Frequently asked questions accordion               |
| `Booking.jsx`     | `/booking`       | Quote request form (name, email, phone, date, guests, notes) |
| `PrivacyPolicy.jsx` | `/privacy-policy` | Legal privacy policy page                       |
| `Profile.jsx`     | `/profile`       | Authenticated user profile and booking history     |

### 7.3 Admin Pages (`src/pages/AdminPages/`)

| Page                  | Route               | Description                                     |
|-----------------------|---------------------|-------------------------------------------------|
| `Dashboard.jsx`       | `/admin`            | KPI stats cards + Recharts area/pie charts (mock data) |
| `ManagePackages.jsx`  | `/admin/packages`   | CRUD for tour packages via `DataContext`         |
| `ManageActivities.jsx`| `/admin/activities` | CRUD for individual activities via `DataContext` |

### 7.4 Layouts (`src/layouts/`)

| Layout            | Used By                          | Purpose                              |
|-------------------|----------------------------------|--------------------------------------|
| `AdminLayout.jsx` | All `/admin/*` routes            | Dark-themed sidebar + header wrapper |
| `MainScreen.jsx`  | `LoginRegister.jsx`              | Full-screen wrapper                  |

---

## 8. Custom Hooks (`src/hooks/`)

| Hook                    | Purpose                                                                 |
|-------------------------|-------------------------------------------------------------------------|
| `useInView.jsx`         | IntersectionObserver wrapper — fires callback when element enters viewport (used for scroll animations) |
| `useScrollPosition.jsx` | Tracks vertical scroll position — used by `Header` to apply sticky/transparent styles |
| `useUnsavedChanges.jsx` | Attaches a `beforeunload` listener when a form is "dirty", preventing accidental navigation |

---

## 9. Support Chatbot

`SupportChatbot.jsx` is a fully client-side, keyword-matching chatbot. It uses no external AI API.

- **Trigger:** Floating button (`MessageCircle` icon) fixed to `bottom-6 right-6`
- **Knowledge base:** A static `KNOWLEDGE_BASE` JavaScript object with ~18 topic categories
- **Matching logic:** Iterates `KNOWLEDGE_BASE` entries and checks if any `keywords` array entry is a substring of the user's input (lowercased)
- **Recommendations:** Each topic carries a `recommendations` array shown as suggestion chips under the last bot message
- **Response delay:** 1000ms simulated typing indicator
- **Excluded from:** `/admin/*` routes

---

## 10. Data Flow

### 10.1 Package & Activity CRUD (Admin → Tourist)

```
Admin Panel
  ManagePackages / ManageActivities
        │ setPackages / setActivities (via DataContext)
        ▼
   DataContext state (React in-memory)
        │ useEffect sync
        ▼
   localStorage ('tahak_packages', 'tahak_activities')
        │ rehydrated on page load
        ▼
   Tourist Pages
  (Packages.jsx, Create.jsx)
```

> All data mutations from the admin panel currently persist to `localStorage` only. There is no Supabase database write for packages/activities at this time.

### 10.2 Booking Request Flow

```
Tourist fills Booking form (/booking)
        │ validate() — client-side checks
        ▼
   setTimeout(1500ms) — simulated submission
        │
        ▼
   Success state → "Request Received" confirmation UI
```

> ⚠️ The booking form does not currently submit to any backend (Supabase or otherwise). It simulates a submission with a timer. This is a known gap for production readiness.

---

## 11. Environment Variables

Stored in `.env` (gitignored). Required variables:

| Variable               | Description                          |
|------------------------|--------------------------------------|
| `VITE_SUPABASE_URL`    | Supabase project URL                 |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous public API key  |

All Vite environment variables must be prefixed with `VITE_` to be accessible in the browser bundle.

---

## 12. Deployment

The project is deployed on **Vercel**.

`vercel.json` configures a catch-all SPA rewrite rule:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```
This ensures all client-side routes (e.g., `/packages`, `/admin`) return `index.html` so React Router can handle them without a 404.

### Build Commands
```
npm run dev        # Local development server (Vite)
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run lint       # ESLint check
```

---

## 13. Asset Organization

```
src/assets/
├── pictures/         # Experience images (forestbath, farm, trek, tea, etc.)
├── PESO/             # Package images in Philippine Peso denomination
├── DOLLARS/          # Package images in US Dollar denomination
├── fonts/
│   ├── Google_Sans/  # Primary UI font (variable + static weights)
│   └── Libre_Baskerville/ # Serif accent font
└── [social icons, logos, background images]
```

---

## 14. Known Issues & Technical Debt

| # | Issue | Severity | Notes |
|---|-------|----------|-------|
| 1 | Hardcoded admin credentials in `AccessForm.jsx` | HIGH | Must be replaced with Supabase role-based auth before production |
| 2 | Booking form submits to no backend | HIGH | Needs Supabase table + real form submission logic |
| 3 | Package/activity data stored in `localStorage` only | MEDIUM | Admin changes are not persisted to a database; data is per-browser |
| 4 | Admin dashboard displays mock/static data | MEDIUM | Revenue, booking counts, and recent activity are all hardcoded |
| 5 | No route guards on `/admin` routes | HIGH | Any user who knows the URL can access the admin panel |
| 6 | No authentication state check on `/profile` | MEDIUM | Profile page should redirect unauthenticated users to `/access` |
| 7 | `Admin/bookings`, `Admin/users`, `Admin/settings` are stubs | LOW | Placeholder `div` elements, not yet implemented |

---

## 15. Recommended Next Steps

1. **Protect admin routes** — implement a higher-order component or loader that checks Supabase session and user role before rendering admin pages.
2. **Wire bookings to Supabase** — create a `bookings` table, submit form data via `supabase.from('bookings').insert(...)`, and surface real data on the Dashboard.
3. **Move packages/activities to Supabase** — migrate from localStorage to a `packages` and `activities` table so admin changes are live for all users.
4. **Replace hardcoded admin login** — assign an `admin` custom claim or role in Supabase and enforce it server-side.
5. **Implement `/profile`** — show a user's active and past bookings by querying the `bookings` table filtered by `user_id`.
6. **Add loading/error states** — most pages assume data is always available; add skeleton loaders and error boundaries.

---

*End of System Design Document*
