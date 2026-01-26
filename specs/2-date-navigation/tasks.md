# Tasks: Date Navigation

**Input**: Design documents from `/specs/2-date-navigation/`
**Prerequisites**: plan.md, spec.md

## Phase 1: Date Navigator Component (US1, US2)

**Goal**: Create a reusable component for date navigation.

- [x] T001 [US1] Create `DateNavigator.tsx` component structure in `src/components/booking/DateNavigator.tsx`
- [x] T002 [US1] Implement Prev/Next Day button logic in `DateNavigator.tsx`
- [x] T003 [US2] Add hidden Date Input trigger for "Month/Year" navigation in `DateNavigator.tsx`
- [x] T004 [P] Style the component with Tailwind (centered, clear buttons)

## Phase 2: Integration (US1)

**Goal**: Connect navigator to the main page state.

- [x] T005 Integrate `DateNavigator` into `src/app/page.tsx` replacing the static header
- [x] T006 Ensure `selectedDate` state updates correctly propagate to `DailyCalendar`

## Dependencies

- No blocking dependencies. Can be implemented immediately.
