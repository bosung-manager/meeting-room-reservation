# Feature Specification: Search & Spotlight

**Feature Branch**: `9-search-highlight`
**Created**: 2026-01-09
**Status**: Draft
**Input**: User description: "혹시 검색해서 특정 사용자나 회의 내용을 검색해서 스포트라이트 해주는 기능 추가가 되나?"

## User Scenarios & Testing

### User Story 1 - Search Reservations (Priority: P1)

Users need to find specific meetings by typing keywords (e.g., "Alice" or "Project") to quickly locate relevant slots in a busy schedule.

**Why this priority**: Essential for navigating crowded calendars.

**Independent Test**: Type a known meeting title into the search bar. Verify only matching meetings remain visible or are highlighted.

**Acceptance Scenarios**:

1. **Given** the main view, **When** user types into the search bar, **Then** reservations matching the query (Name, Agenda, Attendees) are highlighted.
2. **Given** non-matching reservations, **When** a search is active, **Then** they should be dimmed (opacity reduced) to spotlight the matches.
3. **Given** an empty search bar, **When** cleared, **Then** all reservations return to full opacity.

---

### User Story 2 - Real-time Filtering (Priority: P2)

Users expect instant feedback as they type.

**Why this priority**: Standard UX expectation.

**Independent Test**: Type "A", then "Al", then "Ali". Verify the view updates with each keystroke.

**Acceptance Scenarios**:

1. **Given** the search input, **When** user types, **Then** filtering applies immediately (client-side filter on loaded data).

## Requirements

### Functional Requirements

- **FR-001**: System MUST provide a search input field in the UI (e.g., Sidebar or Top Bar).
- **FR-002**: Search logic MUST match against `userName`, `agenda`, and `attendees` fields.
- **FR-003**: Search MUST be case-insensitive.
- **FR-004**: Matching reservations MUST remain fully opaque.
- **FR-005**: Non-matching reservations MUST have reduced opacity (e.g., 0.3) to create a "spotlight" effect.

### Key Entities

- No DB changes. Frontend filtering logic.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Search results appear instantly (<100ms) for loaded weekly data.
- **SC-002**: Users can clearly distinguish matched items from unmatched items via visual contrast.
