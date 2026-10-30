Oct 30, 2026

## Added DOCS/DESIGN-SYSTEM.md and Updated AGENTS.md

### Added

- `DOCS/DESIGN-SYSTEM.md` — Complete design system reference for TAHAK. Covers 17 sections:
  1. Design language (nature / calm / cultural depth, tourist vs. admin environments)
  2. Color tokens — full table of all six CSS custom property tokens with hex values, Tailwind classes, and usage rules; admin dark palette table
  3. Typography — both font families, full type scale tables for tourist and admin pages
  4. Spacing & layout — page shell structure, section rhythm, all established grid patterns
  5. Border radius — full scale with usage context; notes what not to use
  6. Shadows — all established shadow values per context
  7. Buttons — tourist primary/secondary and all admin button variants with code snippets; hover and disabled states
  8. Form elements — tourist and admin input/textarea/select/label patterns with code snippets; error state
  9. Cards — package card, partner card, FAQ card, feature icon block, stat block, admin stat card patterns
  10. Modals — admin form modal, delete confirmation modal, success toast modal with animation classes
  11. Hero sections — full-bleed image hero and gradient overlay hero patterns
  12. Images — object-cover convention, hover zoom pattern, aspect ratios, avatar circles, overlay rule
  13. Animations — Animate.css scroll-triggered entrance pattern, Tailwind micro-interaction table, native Tailwind animation uses
  14. Navigation bar — four visual states table (hero/non-hero × scrolled/unscrolled)
  15. Responsive design — breakpoint table, key responsive patterns
  16. Icon usage — size scale table for each context
  17. How to extend the design system

### Modified

- `AGENTS.md` — Three updates:
  1. Top callout block expanded to include `DOCS/DESIGN-SYSTEM.md` alongside `DOCS/CATALOG.md` as a required pre-task read.
  2. Section 2 ("Before Writing New Code") updated to direct agents to read `DOCS/DESIGN-SYSTEM.md` for any design change.
  3. Section 6 ("Key File Index") updated to add `DOCS/DESIGN-SYSTEM.md` with a "Read for any design change" label.
