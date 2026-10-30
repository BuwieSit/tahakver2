October 30, 2026

## Landing Page Design System Consistency Polish

### Modified

- `src/pages/TouristPages/LandingPage.jsx` — Resolved design discrepancies with `DOCS/DESIGN-SYSTEM.md` and elevated UI consistency:
  - **Dual Badges on Experience Cards**: Restored category tag badge (`bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-accent shadow-sm`) at top-left and price badge (`bg-accent/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-lg`) at bottom-right on all 6 experience cards.
  - **Full-Width Card Action Button**: Standardized bottom card CTA to full-width styled button (`border border-primary/30 text-primary hover:bg-primary hover:text-white rounded-xl py-3 px-4 font-bold text-sm`) matching the design system specifications.
  - **Interactive Custom Experience Banner**: Restored the two-column custom builder callout banner (`bg-gradient-to-r from-accent to-primary/90`) directly below the experience grid leading to `/create`.
  - **Floating Highlight Card on Story Media**: Restored floating `#1 Official Pioneer` badge on the Sta. Lucia landscape frame.
  - **Harmonious Circle (Impact Pillars)**: Restored distinctive pillar identity badges (`bg-emerald-100 text-emerald-800` for Nature, `bg-amber-100 text-amber-800` for Partners, and `bg-sky-100 text-sky-800` for Tourists).
  - **Radial Texture on Bottom CTA**: Realigned bottom conversion banner with radial gradient texture (`bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-accent to-accent`).
  - **Design Token & Opacity Alignment**: Replaced arbitrary Tailwind opacity classes with design-system-compliant standard opacity utilities (`opacity-70` to `opacity-85`).
