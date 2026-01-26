# Tasks: Drag and Drop Booking

**Input**: Design documents from `/specs/3-drag-booking/`
**Prerequisites**: plan.md, spec.md

## Phase 1: Drag Logic Implementation (US1, US2)

**Goal**: Implement drag selection visual feedback and state.

- [x] T001 [US1] Add Drag State (`isDragging`, `selectionStart`, `selectionEnd`) to `DailyCalendar.tsx`
- [x] T002 [US1] Implement `onMouseDown` handler to start selection
- [x] T003 [US2] Implement `onMouseEnter` handler to update selection range visually
- [x] T004 [US1] Implement `onMouseUp` handler to finalize selection
- [x] T005 [US1] Implement overlap detection logic (prevent selecting over booked slots)

## Phase 2: Integration & Booking Form Update (US1)

**Goal**: Pass selected range to Booking Form.

- [x] T006 Update `DailyCalendar` props to accept `onRangeSelect` callback
- [x] T007 Update `src/app/page.tsx` to handle range selection and open Booking Form with pre-filled Start/End times
- [x] T008 Update `BookingForm` display to show End Time or Duration

## Dependencies

- Phase 2 depends on Phase 1.
