# Tasks: Meeting Room Reservation

**Input**: Design documents from `/specs/1-meeting-room-reservation/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/api.yaml

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel
- **[Story]**: [US1] View Schedule, [US2] Book Room, [US3] Cancel, [US4] Admin Access, [US5] Admin Manage
- Includes exact file paths

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Next.js 14 project with TypeScript & Tailwind in `.`
- [x] T002 [P] Configure ESLint and Prettier rules in `.eslintrc.json` and `.prettierrc`
- [ ] T003 [P] Setup Jest and React Testing Library in `jest.config.js` and `jest.setup.js`
- [x] T004 Create project directory structure (components, lib, types) per plan.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure MUST be complete before user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Create shared TypeScript interfaces (MeetingRoom, Reservation) in `src/types/index.ts`
- [x] T006 [P] Implement Repository Interface definitions in `src/lib/repositories/interfaces.ts`
- [x] T007 Implement Local JSON DB Handler (read/write logic) in `src/lib/db/local-json.ts`
- [x] T008 [P] Implement File-based Reservation Repository in `src/lib/repositories/json/reservation-repo.ts`
- [x] T009 [P] Implement File-based Room Repository in `src/lib/repositories/json/room-repo.ts`
- [x] T010 Setup API Route wrapper for error handling in `src/lib/api-wrapper.ts`
- [x] T011 [P] Create mock data file `local-db.json` with initial rooms

**Checkpoint**: Repository pattern ready, local DB reading/writing works.

---

## Phase 3: User Story 1 - View Room Schedule (Priority: P1) 🎯 MVP

**Goal**: Users see room availability via choice chips and calendar.

**Independent Test**: Navigate to `/`, click different room chips, see dummy data.

### Implementation

- [x] T012 [P] [US1] Create API endpoint `GET /api/rooms` in `src/app/api/rooms/route.ts`
- [x] T013 [P] [US1] Create API endpoint `GET /api/reservations` in `src/app/api/reservations/route.ts`
- [x] T014 [US1] Create `RoomSelector` component (Choice Chips) in `src/components/ui/RoomSelector.tsx`
- [x] T015 [US1] Create `DailyCalendar` component (30-min grid) in `src/components/booking/DailyCalendar.tsx`
- [x] T016 [US1] Integrate RoomSelector and Calendar on Main Page in `src/app/page.tsx`
- [x] T017 [US1] Add state management for selected room/date in `src/app/page.tsx`

**Checkpoint**: Main page visualizes room schedules.

---

## Phase 4: User Story 2 - Book Meeting Room (Priority: P1)

**Goal**: Users book 30-min slots with Name/Phone.

**Independent Test**: Click slot, fill form, submit, see updated calendar.

### Implementation

- [x] T018 [P] [US2] Create Booking Modal/Form component in `src/components/booking/BookingForm.tsx`
- [x] T019 [US2] Implement form validation (Name/Phone required) in `src/components/booking/BookingForm.tsx`
- [x] T020 [US2] Create API endpoint `POST /api/reservations` in `src/app/api/reservations/route.ts`
- [x] T021 [US2] Implement double-booking prevention logic in `src/app/api/reservations/route.ts`
- [x] T022 [US2] Connect BookingForm to API on Main Page in `src/app/page.tsx`
- [x] T023 [US2] Add success/error toast notifications in `src/components/ui/Toast.tsx`

**Checkpoint**: End-to-end booking flow works locally.

---

## Phase 5: User Story 3 - Cancel Reservation (Priority: P2)

**Goal**: Users cancel own bookings with credentials.

**Independent Test**: Select booking, enter Name/Phone, verify removal.

### Implementation

- [x] T024 [P] [US3] Create Cancellation Modal/Form in `src/components/booking/CancelForm.tsx`
- [x] T025 [US3] Create API endpoint `DELETE /api/reservations/[id]` in `src/app/api/reservations/[id]/route.ts`
- [x] T026 [US3] Implement validation logic (Name/Phone match) in `src/app/api/reservations/[id]/route.ts`
- [x] T027 [US3] Add "Cancel" button to booked slots in `src/components/booking/DailyCalendar.tsx`
- [x] T028 [US3] Integrate CancelForm with API in `src/components/booking/DailyCalendar.tsx`

**Checkpoint**: Users can manage their own bookings.

---

## Phase 6: User Story 4 - Admin Access & Management (Priority: P2)

**Goal**: Secured admin dashboard.

**Independent Test**: Login at `/admin`, see dashboard.

### Implementation

- [x] T029 [P] [US4] Create Admin Login Page in `src/app/admin/login/page.tsx`
- [x] T030 [US4] Create API endpoint `POST /api/admin/login` (cookie set) in `src/app/api/admin/login/route.ts`
- [x] T031 [US4] Create middleware for Admin protection in `src/middleware.ts`
- [x] T032 [US4] Create Admin Dashboard Layout in `src/app/admin/layout.tsx`
- [x] T033 [US4] Create Admin Dashboard Page with "Manage Rooms" link in `src/app/admin/page.tsx`

**Checkpoint**: Secure admin area established.

---

## Phase 7: User Story 5 - Admin Room Management (Priority: P3)

**Goal**: Admin creates/deletes rooms.

**Independent Test**: Add room in admin, see it on main page.

### Implementation

- [x] T034 [P] [US5] Create Room Management List component in `src/components/admin/RoomList.tsx`
- [x] T035 [US5] Create API endpoint `POST /api/rooms` (Admin only) in `src/app/api/rooms/route.ts`
- [x] T036 [US5] Create API endpoint `DELETE /api/rooms/[id]` (Admin only) in `src/app/api/rooms/[id]/route.ts`
- [x] T037 [US5] Add "Create Room" Form in `src/components/admin/CreateRoomForm.tsx`
- [x] T038 [US5] Integrate Room List and Create Form in `src/app/admin/rooms/page.tsx`

**Checkpoint**: Dynamic room management complete.

---

## Phase 8: Polish & Production Prep

**Purpose**: Ready for Vercel/Neon deployment

- [x] T039 [P] Setup Prisma Schema for Neon in `prisma/schema.prisma`
- [x] T040 Run Prisma migration generation locally
- [x] T041 Implement Prisma/Neon Repository in `src/lib/repositories/postgres/reservation-repo.ts`
- [x] T042 Implement Prisma/Neon Room Repository in `src/lib/repositories/postgres/room-repo.ts`
- [x] T043 Add environment variable switch logic (`NEXT_PUBLIC_USE_MOCK_DB`) in `src/lib/repositories/index.ts`
- [x] T044 Final UI Polish (Tailwind spacing, colors, responsive check)
- [x] T045 Create README deployment instructions

---

## Dependencies

- **Foundational (Phase 2)** blocks ALL user stories.
- **US1 (View)** blocks US2 (Book) and US3 (Cancel) visually, though APIs are independent.
- **US4 (Admin Auth)** blocks US5 (Admin Manage).
- **US2 and US3** are largely independent but share the Calendar component.

## Implementation Strategy

1. **MVP**: Phases 1, 2, 3, 4 (View + Book). This delivers core value.
2. **Self-Service**: Phase 5 (Cancel). Reduces admin burden.
3. **Admin**: Phases 6, 7. Necessary for long-term management.
4. **Prod**: Phase 8. Switch to real DB before launch.
