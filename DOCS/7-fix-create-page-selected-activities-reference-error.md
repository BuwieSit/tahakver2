Oct 30, 2026

## Fix ReferenceError on Custom Experience Create Page

### Modified

- `src/pages/TouristPages/Create.jsx` — Resolved runtime `ReferenceError: selectedActivities is not defined` and missing `guests` state:
  - Added missing `selectedActivities` and `setSelectedActivities` state via `useState([])`.
  - Added missing `guests` and `setGuests` state via `useState(1)`.
  - Fixed invalid `md:size` props on Lucide icons (`Check`, `Minus`, `Plus`) to use responsive Tailwind sizing classes (`w-3 h-3 md:w-3.5 md:h-3.5` and `w-5 h-5 md:w-6 md:h-6`).
