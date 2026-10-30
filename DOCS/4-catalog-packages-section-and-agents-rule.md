Oct 30, 2026

## Added Package Tracking Rule to AGENTS.md and Packages Section to CATALOG.md

### Added

- `DOCS/CATALOG.md` — New "Packages & Libraries" section appended at the end of the file. Documents all 16 packages currently in `package.json` (both runtime and dev dependencies). Each entry includes the package name, installed version, runtime/dev classification, what it is used for in this project specifically, and any constraints or "do not use for" notes. Establishes the format future agents must follow when adding a new package entry.

### Modified

- `AGENTS.md` — Two updates:
  1. Section 2 ("Is the package already installed?") — Updated to direct agents to check both `package.json` and `DOCS/CATALOG.md` before installing. Added a closing rule: if a package is installed, add it to the catalog; if removed, delete its entry.
  2. Section 5 ("Documentation Rule — Golden Rule") — Added a second "Also update CATALOG.md" rule specifically for packages: when installing or removing a package, update the Packages & Libraries section of the catalog with the package name, version, purpose, and any constraints. This is separate from and in addition to the existing rule about updating the catalog for hooks/components/utilities.
