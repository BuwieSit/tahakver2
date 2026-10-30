Oct 30, 2026

## Test Suite — Initial Setup (159 Tests, All Passing)

### Added

#### Test Infrastructure
- `vite.config.js` — Updated to include Vitest configuration block: `environment: 'jsdom'`, `globals: true`, `setupFiles: './src/tests/setup.js'`, `css: false`.
- `package.json` — Added three new scripts: `"test": "vitest --run"`, `"test:watch": "vitest"`, `"test:ui": "vitest --ui"`.
- `src/tests/setup.js` — Global test setup file. Imports `@testing-library/jest-dom` for custom matchers. Mocks all static asset imports (13 image/font files) that Vite handles at build time but jsdom cannot resolve. Calls `localStorage.clear()` in `beforeEach` and `afterEach`.

#### New packages installed (dev)
- `vitest` `^5.0.5` — test runner
- `@vitest/ui` `^5.0.5` — browser UI reporter
- `jsdom` — DOM environment (peer dependency)
- `@testing-library/react` — render/screen/renderHook/act/waitFor/fireEvent
- `@testing-library/user-event` — simulated user interactions
- `@testing-library/jest-dom` — custom DOM matchers

#### Test Files
- `src/tests/translations.test.js` — 14 tests. Covers: all 5 locale codes exported, every required key present in every locale, all values non-empty strings, EN and UK are identical, FR/KO/JA differ from EN on at least one key, specific value spot-checks (`signIn`, `home`).

- `src/tests/LanguageContext.test.jsx` — 7 tests. Covers: default language is `'EN'`, correct EN translations for `signIn` and `home`, switching to FR/KO/JA updates both `language` and `t`, `t` object re-computed after `setLanguage`.

- `src/tests/DataContext.test.jsx` — 16 tests. Covers: 6 default packages and 6 default activities when localStorage is empty, first package title and first activity name/price, localStorage written on mount, localStorage updated when state changes, hydration from localStorage on re-mount, fallback to defaults on invalid JSON (with `console.error` suppressed), `setPackages`/`setActivities` can clear and add, `useData` throws outside provider.

- `src/tests/Button.test.jsx` — 7 tests. Covers: `CtaButton` renders children, `bg-primary` class present, custom `className` appended, no crash without `className`, `onClick` called once on click, no crash without `onClick`, different children text.

- `src/tests/Switch.test.jsx` — 8 tests. Covers: Register and Login buttons rendered, correct `value` attributes, Register always has `bg-primary`, Login never has `bg-primary`, no crash without `onActive`, `onActive` accepted but never called (dead prop documented).

- `src/tests/ContactForm.test.jsx` — 7 tests. Covers: heading rendered, all three inputs present, "Send Message" button present initially, no success message initially, submit changes button to "Sending..." immediately, success message appears after 1500ms, form inputs hidden after success. Uses `fireEvent.submit` + `vi.useFakeTimers()` + `vi.advanceTimersByTime(1500)`.

- `src/tests/BookingValidation.test.js` — 18 tests. Pure unit tests of the extracted `validate()` function from `Booking.jsx`. Covers: valid data returns empty string, fullName empty/too short/null, email missing `@`/empty, phone empty/too short/null, date empty/null, validation priority order (fullName before email, email before phone, phone before date).

- `src/tests/AccessFormValidation.test.js` — 14 tests. Pure unit tests of the extracted `validate()` function from `AccessForm.jsx`. Covers: valid sign-in/sign-up data, email error, password too short, passwords mismatch (sign-up only), confirmPassword not checked in sign-in mode, priority order, admin credentials pass validation (structural check only — bypass happens post-validation in `handleSubmit`).

- `src/tests/ManagePackages.test.js` — 20 tests. Pure unit tests of filter and CRUD logic extracted from `ManagePackages.jsx`. Covers: `filterPackages` — all results, search by title, search by desc, filter by duration, empty result, combined filters; `formatPrice` — string/number behaviour; `addPackage` — length, title, price formatted, numeric id; `updatePackage` — correct item updated, id preserved, array length unchanged; `deletePackage` — correct item removed, others intact, no-op on missing id.

- `src/tests/ManageActivities.test.js` — 26 tests. Pure unit tests of filter and CRUD logic extracted from `ManageActivities.jsx`. Covers: `filterActivities` — all results, search by name only (NOT desc, unlike packages), filter by category, Adventure/Wellness/etc., combined filters; `parsePrice` — numeric string, `"0"`, empty string fallback to 0, non-numeric fallback to 0, truncates decimals; `addActivity` — length, name, price is integer, price 0 on empty, numeric id; `updateActivity` — correct item, id preserved, price converted to integer, array length; `deleteActivity` — correct item removed, others intact, no-op; all 5 categories present in default data.

- `src/tests/useScrollPosition.test.jsx` — 7 tests. Covers: initial `{ scrollX: 0, scrollY: 0 }`, `scrollY` update on scroll event, `scrollX` update on scroll event, `removeEventListener` called on unmount, `addEventListener` called on mount, return shape has both keys, multiple sequential events.

- `src/tests/useInView.test.jsx` — 8 tests. Uses a real `class`-based `IntersectionObserver` mock (not `vi.fn()`) so `new IntersectionObserver()` works. Covers: returns `[ref, isInView]` array, `isInView` starts false, `ref` starts null, `isInView` becomes true on `isIntersecting: true`, stays false on `isIntersecting: false`, one-shot latch (stays true after subsequent false), options forwarded to constructor, `observe` not called when ref is null.

- `src/tests/useUnsavedChanges.test.jsx` — 7 tests. Uses `createMemoryRouter` wrapper (not `MemoryRouter`) because `useBlocker` requires a data router. Covers: `addEventListener('beforeunload')` on mount, `removeEventListener` on unmount, `e.preventDefault()` called when `isDirty: true`, not called when `isDirty: false`, not called when `isDirty: true` + `isSubmitting: true`, `e.returnValue` set to `''` when dirty, hook does not throw.

### Modified

- `vite.config.js` — Added `test` configuration block for Vitest.
- `package.json` — Added `test`, `test:watch`, `test:ui` scripts.
- `AGENTS.md` — Added Section 5 "Testing" with full test table, test commands, and conventions for writing new tests. Renumbered Documentation Rule to Section 6, Key File Index to Section 7. Added `src/tests/` and `src/tests/setup.js` to Key File Index. Updated Commands section with test commands.
- `DOCS/CATALOG.md` — Added 6 new dev package entries (vitest, @vitest/ui, jsdom, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom) and a new "Test Files" section listing all 13 test files with descriptions and counts.
