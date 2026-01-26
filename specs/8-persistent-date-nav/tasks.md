# Tasks: Persistent Sidebar Date Navigation

**Input**: Design documents from `/specs/8-persistent-date-nav/`
**Prerequisites**: plan.md, spec.md

## Phase 1: Mini Calendar Component (US1)

**Goal**: Create a standalone monthly calendar widget.

- [x] T001 [US1] Create `src/components/ui/MiniCalendar.tsx` structure
- [x] T002 [US1] Implement month view logic (days grid generation) in `MiniCalendar`
- [x] T003 [US1] Implement navigation (< Month >) logic in `MiniCalendar`
- [x] T004 [US1] Style `MiniCalendar` with Tailwind (small, compact)

## Phase 2: Layout & Integration (US2)

**Goal**: Move navigation to sidebar.

- [x] T005 [US2] Refactor `src/app/page.tsx` to use Flex/Grid layout with Sidebar
- [x] T006 [US2] Integrate `MiniCalendar` into the Sidebar
- [x] T007 [US2] Move `RoomSelector` to Sidebar (Optional but recommended for layout balance) -> *Decision: Move to sidebar for better UX*
- [x] T008 [US2] Hide Sidebar on small screens (Tailwind `hidden md:block`)

## Dependencies

- Phase 2 depends on Phase 1.
