# Implementation Plan: Weekly Calendar View

**Branch**: `7-weekly-view` | **Date**: 2026-01-09
**Input**: Feature specification from `/specs/7-weekly-view/spec.md`

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: React 18, Tailwind CSS, `date-fns` (Optional, using native for now)
**Target Platform**: Web (Next.js)

## Constitution Check

- [x] **UX**: Improved scannability.
- [x] **Performance**: Single API call for the whole week.

## Project Structure

### Documentation

```text
specs/7-weekly-view/
├── plan.md
├── tasks.md
└── spec.md
```

### Source Code

```text
src/
├── lib/
│   └── date-utils.ts          # New Utility for week calculations
├── components/
│   └── booking/
│       ├── WeeklyCalendar.tsx # Rename/Update from DailyCalendar
│       └── DateNavigator.tsx  # Update to show week range
├── app/
│   └── page.tsx               # Update fetching logic
```

## Implementation Strategy

1. **Date Utilities**: Implement `getStartOfWeek` and `getEndOfWeek`.
2. **Weekly Grid**:
   - Desktop: 7 columns side-by-side.
   - Mobile: Might need horizontal scroll or stack (focus on desktop/tablet first).
3. **Refetching**: Update `page.tsx` to fetch using `startDate` and `endDate` parameters (API already supports date filtering, but might need range support).
   - *Wait*: Current API `GET /api/reservations?date=...` only gets one day.
   - *Modification*: Update API to support `startDate` and `endDate` query params.
4. **Drag Logic**: Ensure `isDragging` only affects the column where it started.
