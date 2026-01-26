# Implementation Plan: Drag and Drop Booking

**Branch**: `3-drag-booking` | **Date**: 2026-01-09
**Input**: Feature specification from `/specs/3-drag-booking/spec.md`

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: React 18
**Storage**: N/A (UI state only)
**Target Platform**: Web (Next.js)
**Constraints**:
- Must work with the existing `DailyCalendar` grid structure.
- Must handle overlapping with existing reservations (prevent invalid selection).
- Touch events might be tricky with simple mouse events, focus on Mouse for MVP but add basic Touch handlers if easy.

## Constitution Check

- [x] **UX**: Direct manipulation (drag) is a superior UX pattern for range selection.
- [x] **Code Quality**: Will encapsulate drag logic in a custom hook or within the Calendar component cleanly.

## Project Structure

### Documentation

```text
specs/3-drag-booking/
├── plan.md
├── tasks.md
└── spec.md
```

### Source Code

```text
src/
├── components/
│   └── booking/
│       └── DailyCalendar.tsx  # Update with Drag Logic
├── app/
│   └── page.tsx               # Update handleSlotClick to support Range
```

## Implementation Strategy

1. **State Management**: Add `isDragging`, `dragStartSlot`, `dragCurrentSlot` state to `DailyCalendar`.
2. **Event Handlers**: Add `onMouseDown`, `onMouseEnter`, `onMouseUp` to slots.
3. **Validation**: Check for overlaps with existing reservations during drag.
4. **Visuals**: Apply a distinct class (e.g., `bg-blue-200`) to slots within the drag range.
5. **Completion**: On `onMouseUp`, verify valid range and trigger `onSlotRangeSelect(start, end)`.
