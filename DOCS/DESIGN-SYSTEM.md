# TAHAK — Design System

**Last updated:** Oct 30, 2026  
This document is the single reference for all visual and UI decisions in TAHAK.  
When asked to make any design change — layout, color, spacing, typography, animation, component style — read this file first and stay within these rules. Do not invent new patterns. Extend what exists.

---

## 1. Design Language

TAHAK's visual identity is grounded in **nature, calm, and cultural depth**. Every design decision should reinforce those three values.

- **Nature** — earthy greens, organic shapes, soft backgrounds, imagery of forests, mountains, and water
- **Calm** — generous whitespace, unhurried transitions, no harsh contrasts on the tourist side
- **Cultural depth** — serif headings with Filipino cultural weight, honest straightforward copy

There are two distinct visual environments in the app that must never bleed into each other:

| Environment | Palette | Audience |
|---|---|---|
| **Tourist UI** | Light greens, warm white, soft borders | Public visitors |
| **Admin UI** | Dark grays (`gray-950/900/800`), emerald accents | Internal admin users |

---

## 2. Color Tokens

All colors are defined as CSS custom properties in `src/styles.css` under `@theme` and consumed as Tailwind utility classes. **Never hardcode hex values** — always use the token class.

### Tourist Palette

| Token | Tailwind class | Hex | Usage |
|---|---|---|---|
| `--color-primary` | `bg-primary` / `text-primary` / `border-primary` | `#15803d` | CTAs, active states, highlights, icons, price tags, focus rings |
| `--color-background` | `bg-background` | `#f0fdf4` | Page backgrounds, section alternates, input backgrounds |
| `--color-accent` | `bg-accent` / `text-accent` | `#064e3b` | Headings, footer background, dark overlays, strong text |
| `--color-border` | `border-border` | `#dcfce7` | Card borders, dividers, input borders |
| `--color-primary-text-color` | `text-primary-text-color` | `#022c22` | Body copy, paragraph text |
| `--color-surface` | `bg-surface` | `#FFFFFF` | Card surfaces, modal backgrounds, form containers |

### Admin Palette

The admin UI does not use the token system above. It uses raw Tailwind gray scale with emerald accents.

| Purpose | Class |
|---|---|
| Page background | `bg-gray-950` |
| Sidebar / card background | `bg-gray-900` |
| Hover states, table rows | `bg-gray-800` / `bg-gray-800/30` |
| Borders | `border-gray-800` |
| Primary text | `text-gray-100` / `text-gray-200` |
| Secondary text / labels | `text-gray-400` / `text-gray-500` |
| Active / accent | `bg-emerald-600` / `text-emerald-500` |
| Danger | `text-red-500` / `bg-red-600` |
| Warning | `text-amber-500` |
| Info | `text-blue-500` |

### Opacity modifiers

Used throughout to create visual hierarchy without additional colors:

- Body text on tourist pages: `opacity-70` to `opacity-85`
- Secondary labels, captions: `opacity-60` to `opacity-70`
- Overlay tints on images: `bg-accent/30`, `bg-black/80`, `bg-black/85`
- Subtle feature tints: `bg-primary/10`, `bg-primary/20`, `bg-emerald-500/10`

---

## 3. Typography

### Font Families

Two fonts only. Do not add others.

| Role | CSS family | Tailwind class | Loaded from |
|---|---|---|---|
| Display / headings | `'Libre'` (Libre Baskerville, serif) | `font-primary-title` | `src/assets/fonts/LibreBaskerville-Regular.ttf` |
| Body / UI text | `'GoogleSans'` (Google Sans, sans-serif) | `font-primary-text` | `src/assets/fonts/GoogleSans-Regular.ttf` |

Body text defaults to Google Sans via the global `body` style — you do not need to apply `font-primary-text` everywhere. Apply `font-primary-title` explicitly on headings and display text.

### Type Scale — Tourist Pages

| Element | Classes | Notes |
|---|---|---|
| Hero title | `text-6xl sm:text-8xl md:text-[10rem] font-primary-title` | Home hero only — the brand mark |
| Page H1 | `text-3xl md:text-5xl font-primary-title text-accent` | e.g. FAQs, Packages page titles |
| Section H2 | `text-3xl md:text-4xl font-primary-title text-accent` | e.g. "What is TahaK?", "Healing Experiences" |
| Section H2 (bold variant) | `text-2xl md:text-3xl font-bold text-accent` | Used when sans-serif bold fits better than serif |
| Card H3 | `text-xl md:text-2xl font-bold text-accent` | Package cards, partner cards |
| Eyebrow label | `text-xs md:text-sm font-bold uppercase tracking-widest text-primary` | Section pre-headings e.g. "Our Essence" |
| Body paragraph | `text-sm md:text-base text-primary-text-color opacity-80 leading-relaxed` | Standard prose |
| Caption / meta | `text-xs text-primary-text-color opacity-60` | Small labels, dates, stats sub-labels |
| Stat number | `text-2xl md:text-3xl font-bold text-primary` | e.g. "1st", "100%" stat blocks |

### Type Scale — Admin Pages

| Element | Classes |
|---|---|
| Page H1 | `text-3xl font-bold text-emerald-500` |
| Section H2 | `text-xl font-bold text-white` |
| Table header | `text-sm uppercase tracking-wider text-gray-400 font-semibold` |
| Body / cell text | `text-sm text-gray-200` / `text-gray-400` |
| Labels (form) | `text-xs font-semibold text-gray-500 uppercase tracking-wider` |
| Badge / tag | `text-[10px] font-bold uppercase tracking-wider` |

---

## 4. Spacing & Layout

### Page structure — Tourist

All tourist pages follow this outer shell:

```jsx
<div className="min-h-screen bg-background">
  <Header />
  <main className="pt-24 md:pt-32 pb-16 md:pb-20 px-6 md:px-10 max-w-[X] mx-auto">
    {/* content */}
  </main>
  <ContactForm />  {/* optional */}
  <Footer />
</div>
```

- `pt-24 md:pt-32` — clears the fixed header
- `px-6 md:px-10` — horizontal page padding
- `max-w-7xl mx-auto` — standard content width (most pages)
- `max-w-4xl mx-auto` — narrow content width (FAQs, Booking form)

### Section rhythm

Sections alternate between `bg-background` and `bg-white` to create visual separation without hard lines.

- Section vertical padding: `py-16 md:py-24`
- Gap between sections within a grid: `gap-8 md:gap-12` (features) or `gap-6 md:gap-8` (cards)
- Gap between a heading block and its content: `mb-12 md:mb-16`

### Grid system

| Pattern | Classes | Used on |
|---|---|---|
| 4-column feature icons | `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12` | Home features |
| 4-column experience cards | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8` | Home gallery |
| 3-column package cards | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10` | Packages page |
| 2-column text + image | `grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center` | OurStory sections |
| 2-column partner cards | `grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10` | Partners page |
| 2-column booking form | `grid lg:grid-cols-2 gap-8 md:gap-16 items-start` | Booking page |

### Page structure — Admin

Admin pages render inside `AdminLayout`'s `<main className="p-8">`. Individual admin pages do not set their own padding — they use `space-y-8` at the root div.

---

## 5. Border Radius

TAHAK uses large, organic radii consistently. Stick to these values:

| Usage | Class |
|---|---|
| Cards, modals, form containers | `rounded-3xl` |
| Smaller cards, FAQ items, form fields | `rounded-2xl` |
| Icon containers, avatar frames, feature icon boxes | `rounded-2xl` |
| Pill buttons, tags, badges | `rounded-full` |
| Small buttons, select inputs | `rounded-xl` |
| Admin modals (large form) | `rounded-[2.5rem]` |
| Admin table container | `rounded-2xl` |
| Image overlays in hero cards | `rounded-3xl` |

**Never use** `rounded-sm`, `rounded`, or `rounded-md` in new tourist-facing UI — these feel too sharp for the brand.

---

## 6. Shadows

| Usage | Class |
|---|---|
| Tourist cards (resting) | `shadow-sm` |
| Tourist cards (hover) | `shadow-xl` |
| Hero / feature images | `shadow-2xl` |
| CTA buttons | `shadow-xl` |
| Admin cards | `shadow-xl border border-gray-800` |
| Admin modals | `shadow-[0_0_50px_rgba(16,185,129,0.1)]` (emerald glow) |
| Header (scrolled) | `shadow-lg border-b border-primary/10` |
| Bottom ad banner | `shadow-[0_-4px_20px_rgba(0,0,0,0.1)]` |

---

## 7. Buttons

### Primary CTA — Tourist

The canonical CTA is `CtaButton` from `src/components/Button.jsx`. For page-specific context, inline `<button>` elements follow this pattern:

```jsx
// Pill shape (most common for tourist CTAs)
<button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all transform hover:scale-105 shadow-xl">
  Book Now
</button>

// Filled accent (used in forms, confirmation actions)
<button className="w-full p-4 bg-accent text-white rounded-2xl font-bold hover:bg-black transition">
  Send Message
</button>
```

### Secondary / Ghost — Tourist

```jsx
// Frosted glass secondary CTA (Hero overlay)
<button className="inline-flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 px-8 py-4 rounded-full font-bold text-base md:text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg">
  Craft Custom Experience
</button>

// Outlined / subtle (not yet a named component)
<button className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
  Last 30 Days
</button>
```

### Admin buttons

```jsx
// Primary action
<button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20">
  Add New Package
</button>

// Destructive
<button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-900/20">
  Yes, Delete
</button>

// Neutral / cancel
<button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition-all">
  Cancel
</button>

// Icon-only (table row actions)
<button className="p-2 hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-500 rounded-lg transition-all">
  <Edit2 size={18} />
</button>
```

### Button states

- `disabled`: add `disabled:opacity-50` and `disabled` attribute
- Loading: swap label text to "Processing..." / "Sending..." — no spinner component exists yet
- Hover scale: `hover:scale-105` for primary CTAs, `hover:scale-[1.02]` for admin action cards

---

## 8. Form Elements

### Tourist forms (Booking, ContactForm, AccessForm)

```jsx
// Text input
<input className="w-full p-4 border border-border rounded-xl bg-background text-sm focus:border-primary transition" />

// Input with leading icon
<input className="w-full p-4 pl-12 border border-border rounded-xl" />
<div className="absolute left-4 top-4 text-gray-400">{icon}</div>  // icon at top-4 for p-4 inputs

// Textarea
<textarea className="w-full p-4 border border-border rounded-xl text-sm" rows="4" />

// Select
<select className="w-full p-4 border border-border rounded-xl bg-background text-sm" />

// Focus state (applied via Tailwind): focus:border-primary transition
// Error state: display error text in red above the form, e.g.:
<p className="text-red-500 text-center mb-6 bg-red-100 p-3 rounded-xl text-sm">{error}</p>

// Label
<label className="block text-xs md:text-sm font-bold text-accent mb-2">Field Label</label>
```

### Admin forms (inside modals)

```jsx
// Input
<input className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 px-4 text-gray-200 focus:outline-none focus:border-emerald-500 transition-colors" />

// Label
<label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Field Label</label>

// Wrapper spacing
<div className="space-y-1.5"> {/* label + input pair */}
```

---

## 9. Cards

### Tourist package card

```jsx
<div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-border group">
  {/* Image */}
  <div className="relative h-56 md:h-64 overflow-hidden">
    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full font-bold text-primary shadow-sm">
      ₱{price}
    </div>
  </div>
  {/* Content */}
  <div className="p-6 md:p-8">
    {/* meta row: Clock + Users icons */}
    {/* h3 title */}
    {/* desc with line-clamp-2 */}
    {/* bottom row: star rating + Book Now pill button */}
  </div>
</div>
```

### Experience card with dual badges (LandingPage)

```jsx
<div className="group bg-surface rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between">
  <div>
    <div className="relative h-60 overflow-hidden">
      <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      {/* Top-left category tag */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-accent shadow-sm flex items-center gap-1.5">
        {icon}
        <span>{tag}</span>
      </div>
      {/* Bottom-right price badge */}
      <div className="absolute bottom-4 right-4 bg-accent/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-lg">
        {price}
      </div>
    </div>
    <div className="p-6 md:p-8">
      {/* Meta duration, title, description */}
    </div>
  </div>
  <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2">
    <button className="w-full py-3 px-4 rounded-xl border border-primary/30 text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
      View in Packages
    </button>
  </div>
</div>
```

### Floating highlight card on media frames

```jsx
<div className="absolute -bottom-8 -right-4 sm:-right-8 bg-surface p-6 rounded-3xl shadow-2xl border border-border max-w-xs hidden sm:block">
  <div className="flex items-center gap-3 mb-2">
    <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">
      #1
    </div>
    <span className="text-xs font-bold uppercase tracking-wider text-primary">
      Pioneering Operator
    </span>
  </div>
  <p className="text-xs text-primary-text-color/80 leading-relaxed">
    Short descriptive caption highlighting a badge of honor.
  </p>
</div>
```

### Triple-Impact / Value Pillar card

```jsx
<div className="bg-white rounded-3xl p-8 md:p-10 border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between">
  <div>
    <div className="flex items-center justify-between mb-6">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <span className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full ${badgeColor}`}>
        {badge}
      </span>
    </div>
    <h3 className="text-2xl font-bold text-accent mb-1 font-primary-title">{title}</h3>
    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">{tagline}</p>
    <p className="text-sm text-primary-text-color/80 leading-relaxed mb-6">{description}</p>
    <ul className="space-y-3.5 border-t border-border pt-6">
      {/* bullet items with CheckCircle2 */}
    </ul>
  </div>
</div>
```

### Radial Texture Banner Card (CTA block)

```jsx
<div className="relative rounded-[2.5rem] overflow-hidden bg-accent text-white p-10 sm:p-14 md:p-20 shadow-2xl text-center flex flex-col items-center">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-accent to-accent z-0" />
  <div className="relative z-10 max-w-3xl mx-auto">
    {/* Eyebrow pill, Title, Subtitle, CTA buttons, and Assurance badges */}
  </div>
</div>
```

### Tourist partner/FAQ card

```jsx
// Partner card
<div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center text-center transition-all hover:shadow-md">

// FAQ card
<div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border transition hover:shadow-md">
```

### Feature icon block (Home)

```jsx
<div className="flex flex-col items-center text-center">
  <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6">
    <Icon size={32} />
  </div>
  <h3 className="text-lg md:text-xl font-bold text-accent mb-2">Title</h3>
  <p className="text-sm text-primary-text-color opacity-70">Description</p>
</div>
```

### Stat block (OurStory)

```jsx
<div className="p-6 bg-background rounded-2xl">
  <p className="text-2xl md:text-3xl font-bold text-primary">1st</p>
  <p className="text-xs md:text-sm opacity-60">Label text</p>
</div>
```

### Admin stat card (Dashboard)

```jsx
<div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-xl hover:border-emerald-500/30 transition-all">
  <div className={`w-12 h-12 ${colorClass} rounded-2xl flex items-center justify-center mb-4`}>{icon}</div>
  <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
  <span className="text-2xl font-bold text-gray-100">{value}</span>
  <span className="text-xs font-bold text-emerald-500">{change}</span>
</div>
```

---

## 10. Modals

### Admin form modal

- Backdrop: `fixed inset-0 bg-black/85 backdrop-blur-md` — click to close
- Container: `bg-gray-900 border border-emerald-500/30 rounded-[2.5rem] max-w-lg w-full`
- Header: `p-8 border-b border-gray-800` with title + X close button
- Body: `p-8 space-y-5`
- Entrance animation: `animate__animated animate__zoomIn animate__faster`

### Admin delete confirmation modal

- Container: `bg-gray-900 border border-gray-800 rounded-3xl max-w-sm w-full`
- Centered icon in colored circle + message + two action buttons
- Entrance animation: `animate__animated animate__headShake animate__faster`

### Admin success toast modal

- Container: `bg-emerald-600 rounded-3xl max-w-xs w-full`
- Centered icon + title + message — auto-dismisses after 3 seconds
- Entrance animation: `animate__animated animate__bounceIn`

---

## 11. Hero Sections

### Full-screen immersive wellness hero (LandingPage)

```jsx
<section className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden">
  <img className="absolute inset-0 w-full h-full object-cover z-0 scale-105 transition-transform duration-1000 ease-out" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-accent/50 to-accent/90 z-10" />
  <div className="relative z-20 text-center text-white px-6 md:px-12 max-w-5xl mx-auto pt-24 pb-16 flex flex-col items-center">
    {/* Prestige pill eyebrow badge with icon */}
    <div className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-md border border-white/25 px-5 py-2 rounded-full mb-6 text-xs md:text-sm font-semibold tracking-wide shadow-lg">
      <Award className="w-4 h-4 text-emerald-300" />
      <span>The 1st Wellness Tour Operator in Quezon Province</span>
    </div>
    {/* Display H1 in Libre Baskerville */}
    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-primary-title font-normal leading-[1.1] mb-6 drop-shadow-2xl">
      A Sanctuary for <span className="italic font-light text-emerald-200">Your Healing Soul</span>
    </h1>
    {/* Subtitle */}
    <p className="text-base sm:text-lg md:text-2xl font-primary-text font-normal text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
      ...
    </p>
    {/* Dual CTAs (solid primary pill + frosted glass pill) */}
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full justify-center">
      {/* Primary solid pill + secondary frosted glass pill */}
    </div>
    {/* Trust signals row */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-10 mt-14 pt-10 border-t border-white/20 w-full max-w-3xl">
      {/* CheckCircle2 items */}
    </div>
  </div>
</section>
```

### Full-screen image hero (Home)

```jsx
<section className="relative h-screen flex items-center justify-center overflow-hidden">
  <img className="absolute inset-0 w-full h-full object-cover z-0" />
  <div className="absolute inset-0 bg-accent/30 z-10" />  {/* tint overlay */}
  <div className="relative z-20 text-center text-white px-6">
    {/* content */}
  </div>
</section>
```

### Gradient overlay hero (OurStory)

```jsx
<section className="relative py-32 md:py-48 px-6 md:px-10 overflow-hidden text-white">
  <img className="absolute inset-0 w-full h-full object-cover z-0" />
  <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-primary/40 z-10" />
  <div className="max-w-7xl mx-auto relative z-20 text-center">
    {/* content */}
  </div>
</section>
```

**Rule:** Hero text is always `text-white`. Content sits at `z-20`, overlay at `z-10`, image at `z-0`.  
Overlay tints use `bg-accent/30` for full-bleed dark tint, or the directional gradient pattern for text-over-image legibility.

---

## 12. Images

- All images use `object-cover` to fill their containers without distortion.
- Image containers use `overflow-hidden` to clip zoom effects cleanly.
- Card hover image zoom: `transition-transform duration-500 group-hover:scale-110` on `<img>`, `group` on the card wrapper.
- Aspect ratios: experience cards use `aspect-[3/4]` (portrait), content images use natural container height.
- Partner logos/avatars: circular, `rounded-full`, `border-4 border-primary/20`, `w-32 h-32 md:w-48 md:h-48`.
- Background images always have an overlay layer — never place text directly on a bare photo.

---

## 13. Animations

### Entrance animations (Animate.css)

Applied on scroll using `useInView`. The element starts `opacity-0` and gets the class once visible:

```jsx
const [ref, isInView] = useInView({ threshold: 0.3 });

<h2
  ref={ref}
  className={`... ${isInView ? "animate__animated animate__fadeInLeft" : "opacity-0"}`}
>
```

Common classes used:
- `animate__fadeIn` — general fade (admin pages, modals)
- `animate__fadeInLeft` — headings entering from the left (Home)
- `animate__slideInUp` — bottom-entry (MockGoogleAd)
- `animate__zoomIn animate__faster` — admin form modals
- `animate__bounceIn` — success toast
- `animate__headShake animate__faster` — delete confirmation modal
- `animate__fadeInUp animate__faster` — chatbot window

All Animate.css classes require the base classes: `animate__animated {effect}`.

### Staggered entrances on lists/grids

To animate grids naturally without simultaneous jumps, combine `useInView` with inline `animationDelay`:

```jsx
{items.map((item, idx) => (
  <div
    key={idx}
    className={`... ${isInView ? "animate__animated animate__fadeInUp" : "opacity-0"}`}
    style={{ animationDelay: `${idx * 100}ms` }}
  >
    {/* content */}
  </div>
))}
```

### Tailwind transitions (micro-interactions)

| Pattern | Classes |
|---|---|
| Card lift on hover | `hover:-translate-y-2 transition-all` |
| Button scale | `hover:scale-105 active:scale-95 transition-all` |
| Image zoom in card | `transition-transform duration-500 group-hover:scale-110` |
| Color / opacity fade | `transition-colors` / `transition-opacity` |
| Admin sidebar collapse | `transition-all duration-300` |
| Header background switch | `transition-all duration-500 ease-in-out` |

### Tailwind native animations

| Usage | Classes |
|---|---|
| Logo pulse rings on loading screen | `animate-ping` / `animate-pulse` |
| Scroll indicator bounce | `animate-bounce` |
| Online dot in chatbot | `animate-pulse` |
| Typing dots in chatbot | `animate-bounce` with `[animation-delay:0.2s]`, `[animation-delay:0.4s]` |
| Loading bar sweep | Custom `@keyframes loading` defined inline in `LoadingScreen.jsx` |

---

## 14. Navigation Bar Behavior

The `Header` component has four visual states driven by `useScrollPosition` and `useLocation`:

| Condition | Background | Text color |
|---|---|---|
| Hero page (`/`, `/our-story`) + not scrolled | `bg-transparent` | `text-white` |
| Hero page + scrolled past 50px | `bg-white/90 backdrop-blur-xl shadow-lg` | `text-accent` |
| Non-hero page + not scrolled | `bg-transparent` | `text-accent` |
| Non-hero page + scrolled past 50px | `bg-white/90 backdrop-blur-xl shadow-lg` | `text-accent` |

Active nav link: gets a small dot indicator below it (`.absolute -bottom-1`) colored `bg-primary` (scrolled/non-hero) or `bg-white` (hero/unscrolled).

---

## 15. Responsive Design Approach

TAHAK is mobile-first. The base classes style for mobile and `md:` / `lg:` prefixes add progressively for larger screens.

| Breakpoint | Use |
|---|---|
| (base) | Mobile — single column, smaller text, tighter padding |
| `sm:` | Small tablets — 2-column grids begin |
| `md:` | Tablets / small laptops — full nav visible, larger headings, expanded padding |
| `lg:` | Desktops — 3-4 column grids, side-by-side layouts |

Key responsive patterns:
- Padding: `px-6 md:px-10`, `py-16 md:py-24`, `p-6 md:p-8`, `pt-24 md:pt-32`
- Text: `text-3xl md:text-5xl`, `text-sm md:text-base`, `text-xs md:text-sm`
- Grid columns: always start at 1, expand at `sm:` or `md:`
- `hidden md:block` / `hidden lg:block` for elements that only show on larger screens
- `order-1 md:order-2` for reordering columns between mobile and desktop

---

## 16. Icon Usage

Icons come exclusively from `lucide-react`. Standard sizes:

| Context | Size |
|---|---|
| Feature icons in icon blocks | `size={32}` |
| Form field leading icons | `size={18}` — `size={20}` |
| Navigation / header icons | `size={14}` — `size={20}` |
| Admin sidebar nav items | `size={20}` |
| Admin table action icons | `size={18}` |
| Admin header (bell, search) | `size={18}` — `size={20}` |
| Chatbot icons | `size={20}` — `size={28}` (toggle button) |

Icon containers on the tourist side use `bg-primary/20 rounded-2xl` with `text-primary`.  
Icon containers on the admin side use `bg-{color}/10 rounded-xl` with matching text color.

---

## 17. Adding to the Design System

When you introduce a new visual pattern that is used in more than one place:

1. Apply it consistently using the tokens and conventions in this document.
2. Add it to the relevant section here.
3. Update `DOCS/CATALOG.md` if a new component was created to encapsulate it.
4. Create a numbered change log entry in `DOCS/` per the golden rule in `AGENTS.md`.
