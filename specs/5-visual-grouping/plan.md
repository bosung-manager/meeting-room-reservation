# Implementation Plan: Visual Grouping of Reservations

**Branch**: `5-visual-grouping` | **Date**: 2026-01-09
**Input**: Feature specification from `/specs/5-visual-grouping/spec.md`

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: React 18, Tailwind CSS
**Storage**: N/A (Frontend logic only)
**Target Platform**: Web (Next.js)

## Constitution Check

- [x] **UX**: Enhances scannability significantly.
- [x] **Code Quality**: Will implement a utility function for deterministic color generation to keep components clean.

## Project Structure

### Documentation

```text
specs/5-visual-grouping/
├── plan.md
├── tasks.md
└── spec.md
```

### Source Code

```text
src/
├── lib/
│   └── utils.ts               # Add getColorByName(name)
├── components/
│   └── booking/
│       └── DailyCalendar.tsx  # Update rendering logic
```

## Implementation Strategy

1. **Color Logic**: Implement `getColorByName(name: string)` in `src/lib/utils.ts`.
   - Use a simple hash of the string to select an index from a predefined color palette array.
   - Palette: Tailwind classes (e.g., `bg-red-100 text-red-800`, `bg-green-100 text-green-800`).
2. **Component Update**: In `DailyCalendar.tsx`, call this function for each reservation and apply the returned classes.
