Oct 30, 2026

## Security Audit — Initial Report

### Added

- `SECURITY.md` — Full security audit report at the workspace root (same level as AGENTS.md). Contains 15 findings across 4 severity levels (2 Critical, 4 High, 5 Medium, 4 Low), each with the exact file and line reference, description of the vulnerability, impact assessment, and a concrete code-level fix. Includes a phased remediation priority order (Phase 1 before any real users, Phase 2 before production launch, Phase 3 production hardening, Phase 4 defense-in-depth) and a changelog table to track when findings are resolved.

  Findings summary:
  - SEC-01 🔴 CRITICAL: Hardcoded admin credentials (admin@tahak.com / admin123) in the client JS bundle — `AccessForm.jsx`
  - SEC-02 🔴 CRITICAL: Admin panel has zero route protection — any visitor can access /admin directly — `main.jsx`
  - SEC-03 🟠 HIGH: Logout does not call supabase.auth.signOut() — session persists after logout — `AdminLayout.jsx`
  - SEC-04 🟠 HIGH: dangerouslySetInnerHTML used to inject a style block — XSS-prone pattern — `LoadingScreen.jsx`
  - SEC-05 🟠 HIGH: 15 npm audit vulnerabilities (11 high) including react-router RCE, vite path traversal, postcss XSS — `package.json`
  - SEC-06 🟠 HIGH: All data mutations are localStorage-only; any browser user can manipulate package/activity data — `DataContext.jsx`
  - SEC-07 🟡 MEDIUM: No server-side input validation on any form — `AccessForm.jsx`, `Booking.jsx`
  - SEC-08 🟡 MEDIUM: Supabase anon key is public; RLS status unverified — `supaBaseClient.js`
  - SEC-09 🟡 MEDIUM: Booking and contact forms silently discard all submissions (fake setTimeout) — `Booking.jsx`, `ContactForm.jsx`
  - SEC-10 🟡 MEDIUM: Price stored as locale-formatted string ("2,500") not a number — causes NaN in arithmetic — `DataContext.jsx`
  - SEC-11 🟡 MEDIUM: Weak email validation using only .includes("@") — `AccessForm.jsx`
  - SEC-12 🔵 LOW: No HTTP security headers (CSP, X-Frame-Options, etc.) — `vercel.json`
  - SEC-13 🔵 LOW: Verbatim Supabase auth error messages enable user enumeration — `AccessForm.jsx`
  - SEC-14 🔵 LOW: No session check / auth state listener on AdminLayout mount — `AdminLayout.jsx`
  - SEC-15 🔵 LOW: package.json project name is "react" (npm namespace collision) — `package.json`

### Modified

- `AGENTS.md` — Added `SECURITY.md` to the Key File Index (Section 6).
