# Implementation Plan: Search & Spotlight

**Branch**: `9-search-highlight` | **Date**: 2026-01-09
**Input**: Feature specification from `/specs/9-search-highlight/spec.md`

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: React 18, Tailwind CSS
**Storage**: N/A (UI state only)
**Target Platform**: Web (Next.js)

## Constitution Check

- [x] **UX**: Real-time feedback is critical.
- [x] **Performance**: Client-side filtering is efficient for weekly data volume.

## Project Structure

### Documentation

```text
specs/9-search-highlight/
├── plan.md
├── tasks.md
└── spec.md
```

### Source Code

```text
src/
├── components/
│   └── ui/
│       └── SearchInput.tsx    # New Component
├── components/
│   └── booking/
│       └── WeeklyCalendar.tsx # Update rendering logic
├── app/
│   └── page.tsx               # Manage search state
```

## Implementation Strategy

1. **State**: Add `searchQuery` state to `page.tsx`.
2. **Component**: Create `SearchInput` in sidebar.
3. **Prop Drilling**: Pass `searchQuery` to `WeeklyCalendar`.
4. **Rendering**: In `WeeklyCalendar`, check each reservation against `searchQuery`.
   - If query exists and NO match: Apply `opacity-30`.
   - If query exists and match: Apply `opacity-100 ring-2 ring-yellow-400` (optional ring for emphasis).
   - If query empty: `opacity-100`.
