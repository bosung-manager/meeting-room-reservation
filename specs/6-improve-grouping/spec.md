# Feature Specification: Improved Visual Grouping (Group ID)

**Feature Branch**: `6-improve-grouping`
**Created**: 2026-01-09
**Status**: Draft
**Input**: User description: "ㄱㄱ 그리고 문서화 시킨후에 나한테 확인요청 받지 말고 바로 개발 시작해 좀" (Context: Use Group ID to distinguish bookings even by same user)

## User Scenarios & Testing

### User Story 1 - Distinguish Separate Bookings (Priority: P1)

Users need to see different booking transactions as distinct visual blocks, even if made by the same person.

**Why this priority**: Clarifies the schedule structure. A 2-hour meeting and a separate 1-hour meeting by "Alice" should look different.

**Independent Test**:
1. Make a reservation for Alice (10:00-11:00).
2. Make another reservation for Alice (13:00-14:00).
3. Verify they have different background colors.

**Acceptance Scenarios**:

1. **Given** a new reservation is created, **When** it is saved, **Then** a unique `groupId` is generated.
2. **Given** multiple slots created in a single drag action, **When** saved, **Then** they share the same `groupId`.
3. **Given** the calendar view, **When** rendering colors, **Then** the color is determined by `groupId` (not `userName`).

## Requirements

### Functional Requirements

- **FR-001**: `Reservation` entity MUST include a `groupId` field (UUID).
- **FR-002**: The `create` method in repositories MUST generate a `groupId` for each new booking transaction.
- **FR-003**: The color generation logic MUST use `groupId` as the seed instead of `userName`.
- **FR-004**: Multi-slot bookings (via drag) MUST share the same `groupId`.

### Key Entities

- **Reservation** (Update):
  - `groupId`: string (UUID)

## Success Criteria

### Measurable Outcomes

- **SC-001**: Two separate bookings by the same user result in two different visual colors (high probability).
