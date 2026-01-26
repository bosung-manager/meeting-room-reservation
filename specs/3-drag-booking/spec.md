# Feature Specification: Drag and Drop Booking

**Feature Branch**: `3-drag-booking`
**Created**: 2026-01-09
**Status**: Draft
**Input**: User description: "버튼으로 하나씩 30분 단위로 예약할게 아니라, 시간표에서 드래그 해서 30분 단위로 예약 할 순 없나? 가령 4 블럭을 드래그하면 2시간이 통째로 예약되게"

## User Scenarios & Testing

### User Story 1 - Drag to Select Time Range (Priority: P1)

Users need to book longer meetings (e.g., 2 hours) efficiently by dragging across multiple 30-minute time slots instead of clicking individually.

**Why this priority**: Improves usability significantly for typical meetings that last longer than 30 minutes.

**Independent Test**: Click on a slot (e.g., 10:00), drag down to another slot (e.g., 12:00), release. Verify that the booking form opens with the correct start time (10:00) and end time (12:00).

**Acceptance Scenarios**:

1. **Given** the daily calendar view, **When** the user clicks and holds on an empty slot, **Then** visual feedback (highlighting) begins.
2. **Given** the user is dragging across multiple empty slots, **When** they move the mouse/finger, **Then** the selection expands/shrinks to cover the contiguous range.
3. **Given** the user releases the drag on an empty slot, **When** the action completes, **Then** the Booking Form opens with the selected start and end times pre-filled.
4. **Given** the user drags over an *already booked* slot, **When** they try to select it, **Then** the selection should either stop at the booked slot or be invalid (cannot overlap).

---

### User Story 2 - Visual Feedback (Priority: P2)

Users need clear visual cues during the drag operation to understand exactly what time range they are selecting.

**Why this priority**: Prevents errors in booking times.

**Independent Test**: Drag across slots and verify they change color/style dynamically before releasing the mouse.

**Acceptance Scenarios**:

1. **Given** a drag operation in progress, **When** the mouse moves over a slot, **Then** that slot and all slots between the start and current position are highlighted.
2. **Given** a selection range, **When** the user releases, **Then** the highlight persists or transitions to the "Booking Form" state.

## Requirements

### Functional Requirements

- **FR-001**: System MUST support mouse drag (click & hold -> move -> release) to select a contiguous range of time slots.
- **FR-002**: System MUST calculate the total duration based on the number of selected 30-minute blocks (e.g., 4 blocks = 2 hours).
- **FR-003**: System MUST prevent selecting a range that includes an already booked slot (overlap check).
- **FR-004**: The Booking Form MUST be populated with the derived Start Time and End Time from the drag selection.
- **FR-005**: Visual highlighting MUST follow the cursor during the drag operation.
- **FR-006**: Touch support SHOULD be considered (long press + drag) if feasible, but mouse interaction is primary.

### Key Entities

- **SelectionState**: Transient UI state containing `startSlot` and `currentSlot`.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can select a 2-hour block (4 slots) in a single drag action taking less than 3 seconds.
- **SC-002**: 100% of valid drag operations result in a Booking Form with correct Start/End times.
- **SC-003**: Invalid selections (overlapping bookings) are visually indicated or prevented 100% of the time.
