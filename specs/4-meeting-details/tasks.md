# Tasks: Meeting Details & Attendees

**Input**: Design documents from `/specs/4-meeting-details/`
**Prerequisites**: plan.md, spec.md

## Phase 1: Data Layer Updates (US1)

**Goal**: Support storage of Agenda and Attendees.

- [x] T001 [US1] Update `Reservation` interface in `src/types/index.ts`
- [x] T002 [US1] Update `prisma/schema.prisma` with new fields and run migration
- [x] T003 [US1] Update `PostgresReservationRepository` to save/retrieve new fields
- [x] T004 [US1] Update `FileReservationRepository` to save/retrieve new fields

## Phase 2: Booking Form Update (US1)

**Goal**: Allow input of new fields.

- [x] T005 [US1] Add Agenda and Attendees input fields to `src/components/booking/BookingForm.tsx`
- [x] T006 [US1] Update `handleBookingSubmit` in `src/app/page.tsx` to pass new fields

## Phase 3: Details View Implementation (US2)

**Goal**: Show details instead of immediate cancel.

- [x] T007 [US2] Create `ReservationDetails.tsx` component in `src/components/booking/ReservationDetails.tsx`
- [x] T008 [US2] Update `src/app/page.tsx` to open `ReservationDetails` on slot click
- [x] T009 [US2] Connect "Cancel" button in `ReservationDetails` to open `CancelForm`

## Dependencies

- Phase 2 and 3 depend on Phase 1 data structure changes.
