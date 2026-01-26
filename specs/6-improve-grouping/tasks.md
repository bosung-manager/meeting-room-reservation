# Tasks: Improved Grouping (Group ID)

**Input**: Design documents from `/specs/6-improve-grouping/`
**Prerequisites**: plan.md, spec.md

## Phase 1: Data Layer Updates (US1)

**Goal**: Support storage of Group ID.

- [x] T001 [US1] Update `Reservation` interface in `src/types/index.ts` to include `groupId`
- [x] T002 [US1] Update `prisma/schema.prisma` with `groupId` and run migration
- [x] T003 [US1] Update `PostgresReservationRepository` to save `groupId`
- [x] T004 [US1] Update `FileReservationRepository` to save `groupId`

## Phase 2: Frontend Integration (US1)

**Goal**: Use Group ID for coloring.

- [x] T005 [US1] Update `DailyCalendar.tsx` to use `reservation.groupId` for `getColorForName`

## Dependencies

- Phase 2 depends on Phase 1.
