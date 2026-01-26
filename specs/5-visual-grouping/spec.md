# Feature Specification: Visual Grouping of Reservations

**Feature Branch**: `5-visual-grouping`
**Created**: 2026-01-09
**Status**: Draft
**Input**: User description: "같은 이름으로 여러개 예약하면 구분이 안돼. 같은 예약끼리 묶여보이도록 시각적으로 표시되게 해줘"

## User Scenarios & Testing

### User Story 1 - Consistent Color per User (Priority: P1)

Users need to quickly identify all reservations made by the same person (or same name) to understand who is booking what.

**Why this priority**: Improves readability of the schedule, especially when one person books multiple disjoint slots.

**Independent Test**: Create two reservations with the name "Alice" and one with "Bob". Verify "Alice" slots share the same color, while "Bob" has a different color.

**Acceptance Scenarios**:

1. **Given** multiple reservations on the calendar, **When** viewed, **Then** reservations with the same `userName` MUST have the same background/border color.
2. **Given** a new reservation is added, **When** the name matches an existing one, **Then** it inherits the existing color.
3. **Given** a reservation with a unique name, **When** added, **Then** it gets a distinct color from a predefined palette.

---

### User Story 2 - Visual Distinctness (Priority: P2)

Users need the colors to be visually distinct enough to tell different users apart, but readable (text contrast).

**Why this priority**: Ensure accessibility and clarity.

**Independent Test**: Add 5 different users. Verify text is readable on all background colors.

**Acceptance Scenarios**:

1. **Given** a generated color, **When** displayed, **Then** the text color (black/white) must have sufficient contrast.
2. **Given** more users than colors in the palette, **When** assigned, **Then** colors can repeat (cycle) but adjacent slots should ideally not clash (though name logic takes precedence).

## Requirements

### Functional Requirements

- **FR-001**: System MUST deterministically generate or assign a color based on the `userName`.
- **FR-002**: The `DailyCalendar` component MUST apply this color to the reservation slot background.
- **FR-003**: The color assignment MUST be consistent across re-renders (same name = same color always).
- **FR-004**: A predefined palette of at least 6-8 distinct pastel/soft colors SHOULD be used to ensure good UI aesthetics.

### Key Entities

- No DB changes. Purely frontend presentation logic.

## Success Criteria

### Measurable Outcomes

- **SC-001**: 100% of reservations with the exact same `userName` string appear with the same visual style.
