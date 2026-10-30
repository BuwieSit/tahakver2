Oct 30, 2026

## Added DOCS/CATALOG.md and Updated AGENTS.md with Catalog Reference

### Added

- `DOCS/CATALOG.md` — Full catalog of every hook, component, layout, context, utility, and page in the project. Each entry includes: file path, export type, props/signature, a description of what it does, what to use it for, and what not to use it for. Also documents the data shapes for `DataContext` (packages and activities objects), all `LanguageContext` translation keys, asset inventory (images, fonts, icons), and a pages reference table. This file is the authoritative "what exists" document agents must read before writing new code.

### Modified

- `AGENTS.md` — Four updates:
  1. Added a prominent callout block at the very top directing agents to read `DOCS/CATALOG.md` before starting any task.
  2. Updated Section 2 ("Before Writing New Code") to open with an explicit instruction to read the catalog, clarifying that the lookup tables in AGENTS.md are a condensed quick-reference and the catalog has full detail.
  3. Updated Section 5 ("Documentation Rule — Golden Rule") to add a rule requiring agents to also update `DOCS/CATALOG.md` whenever they add, rename, or remove a hook, component, layout, context, or utility.
  4. Updated Section 6 ("Key File Index") to add `DOCS/CATALOG.md` as a prominent entry with a "Read first" label, and corrected the `DOCS/` folder reference (was incorrectly pointing to `DOCUMENT/`).
