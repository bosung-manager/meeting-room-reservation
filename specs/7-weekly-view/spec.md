# Feature Specification: Weekly Calendar View

**Feature Branch**: `7-weekly-view`
**Created**: 2026-01-09
**Status**: Draft
**Input**: User description: "지금 하루씩 보이는데, 처음부터 그냥 일주일 단위로 보이도록 해줄 수 있나?"

## User Scenarios & Testing

### User Story 1 - View Weekly Schedule (Priority: P1)

Users need to see the room availability for the entire week at a glance to plan multi-day meetings or find the best day.

**Why this priority**: Core layout change requested by user.

**Independent Test**: Visit the main page and verify that 7 columns (Mon-Sun) are visible with their respective 30-min slots.

**Acceptance Scenarios**:

1. **Given** the main page, **When** loaded, **Then** the calendar displays 7 columns representing the current week.
2. **Given** the weekly view, **When** navigating, **Then** the view moves forward/backward by 7 days.
3. **Given** a reservation exists on Wednesday, **When** viewing the week, **Then** it is correctly placed in the Wednesday column.

---

### User Story 2 - Interaction within Weekly View (Priority: P1)

Users need to book and view details within the new grid layout.

**Why this priority**: Maintains existing functionality in the new UI.

**Independent Test**: Drag within a specific day column to book a range. Click a booked slot to see details.

**Acceptance Scenarios**:

1. **Given** a day column, **When** dragging across slots, **Then** only slots within that specific day are selected.
2. **Given** a booked slot in any column, **When** clicked, **Then** the Detail Modal opens with correct info.

## Requirements

### Functional Requirements

- **FR-001**: System MUST display a 7-day grid (Weekly View).
- **FR-002**: Navigation buttons MUST move the date by 1 week (7 days).
- **FR-003**: Each day column MUST contain 30-minute slots from 09:00 to 21:00.
- **FR-004**: API calls MUST fetch all reservations for the visible week range.
- **FR-005**: Drag-and-drop selection MUST be restricted to a single day column (no cross-day dragging for now).

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can view room availability for 7 days simultaneously on a desktop screen without vertical scrolling (or minimal scrolling).
- **SC-002**: 100% of existing reservations for the week are correctly visualized in their respective day columns.
