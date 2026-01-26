# Tasks: Weekly Calendar View

**Input**: Design documents from `/specs/7-weekly-view/`
**Prerequisites**: plan.md, spec.md

## Phase 1: Infrastructure & Utilities (US1)

- [x] T001 Create `src/lib/date-utils.ts` with week range calculation logic
- [x] T002 Update `GET /api/reservations` to support `startDate` and `endDate` range queries

## Phase 2: UI Implementation (US1)

- [x] T003 Rename `DailyCalendar.tsx` to `WeeklyCalendar.tsx` (and component name)
- [x] T004 Implement 7-column grid layout in `WeeklyCalendar.tsx`
- [x] T005 Update `DateNavigator.tsx` to display week range (e.g. "Jan 5 - Jan 11, 2026")
- [x] T006 Update `DateNavigator` buttons to move by 7 days

## Phase 3: Logic & Integration (US1, US2)

- [x] T007 Update `src/app/page.tsx` to fetch week-long data
- [x] T008 Adjust drag-to-select logic to prevent cross-day selections in `WeeklyCalendar.tsx`
- [x] T009 Ensure Detail Modal and Booking Form still work with the new structure

## Dependencies

- Phase 2 and 3 depend on Phase 1 range queries.
