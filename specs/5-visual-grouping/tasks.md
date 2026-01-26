# Tasks: Visual Grouping of Reservations

**Input**: Design documents from `/specs/5-visual-grouping/`
**Prerequisites**: plan.md, spec.md

## Phase 1: Color Logic (US1, US2)

**Goal**: Deterministic color assignment.

- [x] T001 [US1] Create color palette and `getColorForName` function in `src/lib/utils.ts`
- [x] T002 [US2] Ensure palette colors have good contrast (e.g., pastel bg with dark text)

## Phase 2: Integration (US1)

**Goal**: Apply colors to calendar.

- [x] T003 [US1] Update `DailyCalendar.tsx` to apply dynamic classes to booked slots
- [x] T004 [US1] Ensure drag selection (blue) still overrides or works with grouped colors (drag usually overrides)

## Dependencies

- Phase 2 depends on Phase 1.
