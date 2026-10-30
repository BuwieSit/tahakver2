Oct 30, 2026

## Added Engaging Wellness Landing Page

### Added

- `src/pages/TouristPages/LandingPage.jsx` — Implemented comprehensive, immersive landing page for TAHAK as the primary surface visitors browse:
  - **Full-Screen Immersive Hero**: Features Mount Banahaw imagery, prestige badge highlighting TAHAK as the 1st Wellness Tour Operator in Quezon Province, Libre Baskerville display headline, subtext, dual CTAs ("Explore Healing Packages" and "Craft Custom Experience"), trust markers, and an animated scroll indicator.
  - **Our Story Summary & Roots**: Highlights the origin and cultural meaning of TAHAK (*Tahanan* + *Kalikasan* + *Tahak* journey), roots in Sta. Lucia, Dolores, Quezon, accompanied by interactive stat counters (1st Wellness Operator in Quezon, 100% Regenerative Tourism, 4+ Protected Partner Sites) and scroll-triggered animations via `useInView`.
  - **Healing Experiences Showcase**: 6 curated experiences (Forest Bathing, Traditional Ancestral Hilot, Sacred Mountain Trekking, Sound Bath & Meditation, Pristine Waterfalls Cleansing, Mountain Tea & Herbal Ritual) with hover zoom, tags, pricing previews, and a direct link to the custom builder (`/create`).
  - **Triple-Impact Circle (Harmonious Circle)**: 3-pillar interactive ecosystem detailing concrete benefits:
    1. *Benefits to Nature (Kalikasan)* — zero-trace ethics, biodiversity preservation, and reforestation funding alongside LABB.
    2. *Benefits to Local Partners (Kapwa)* — fair livelihoods, women empowerment via KALIPI cooperative, and support for local farm/retreat stewards.
    3. *Benefits to Tourists (Ginhawa)* — burnout relief, sensory detox, authentic ancestral healing wisdom, and unhurried small-group care.
  - **Sanctuaries & Community Partners Showcase**: Highlights Banahaw Circle Nature Retreat, Peace in Nature Farm Resort, LABB, and KALIPI.
  - **High-Conversion Call-To-Action (CTA)**: Large emerald card inviting tourists to book curated packages or reserve directly.
  - Integration with `Header`, `ContactForm`, and `Footer`.

### Modified

- `src/main.jsx`:
  - Routed `LandingPage` as the primary index route (`/`) and aliased `/landing` to it.
  - Preserved classic `Home` at `/home-classic`.
  - Renamed `LoginRegister` import from `LandingPage` to `LoginRegister` for clarity.
- `src/components/Header.jsx`:
  - Added `/landing` to `isHeroPage` check to ensure seamless transparent-to-frosted navbar behavior on the landing page hero.
- `DOCS/CATALOG.md`:
  - Updated Pages Reference to document `LandingPage.jsx` (route: `/`, `/landing`) and `Home.jsx` (`/home-classic`).
