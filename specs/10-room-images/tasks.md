# Tasks: Room Images

**Input**: Design documents from `/specs/10-room-images/`
**Prerequisites**: plan.md, spec.md

## Phase 1: Data Layer Updates (US1)

**Goal**: Support storage of Image Base64 string.

- [x] T001 [US1] Update `MeetingRoom` interface in `src/types/index.ts` to include `image?`
- [x] T002 [US1] Update `prisma/schema.prisma` with `image` field and run migration
- [x] T003 [US1] Update `PostgresRoomRepository` to save `image`
- [x] T004 [US1] Update `FileRoomRepository` to save `image`

## Phase 2: Admin UI Implementation (US1)

**Goal**: Upload image during room creation.

- [x] T005 [US1] Update `CreateRoomForm.tsx` to include File Input
- [x] T006 [US1] Implement file selection handler (Base64 conversion + validation)
- [x] T007 [US1] Update `handleCreate` in `AdminRoomsPage` to send image data

## Phase 3: User UI Integration (US2)

**Goal**: Display room images.

- [x] T008 [US2] Update `RoomSelector.tsx` to display image thumbnail
- [x] T009 [US2] Update `RoomList.tsx` (Admin) to display image thumbnail

## Dependencies

- Phase 2 and 3 depend on Phase 1.
