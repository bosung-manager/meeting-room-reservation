# Tasks: Search & Spotlight

**Input**: Design documents from `/specs/9-search-highlight/`
**Prerequisites**: plan.md, spec.md

## Phase 1: UI Components (US1)

**Goal**: Add search input.

- [x] T001 [US1] Create `src/components/ui/SearchInput.tsx`
- [x] T002 [US1] Add `SearchInput` to Sidebar in `src/app/page.tsx`
- [x] T003 [US1] Add `searchQuery` state to `src/app/page.tsx`

## Phase 2: Logic & Visuals (US1, US2)

**Goal**: Implement spotlight logic.

- [x] T004 [US1] Update `WeeklyCalendar` props to accept `searchQuery`
- [x] T005 [US1] Implement filtering logic in `WeeklyCalendar` (match name, agenda, attendees)
- [x] T006 [US2] Apply visual spotlight styles (opacity/ring) based on match status

## Dependencies

- Phase 2 depends on Phase 1 state setup.
