# Feature Specification: Persistent Sidebar Date Navigation

**Feature Branch**: `8-persistent-date-nav`
**Created**: 2026-01-09
**Status**: Draft
**Input**: User description: "달력을 굳이 날짜 눌렀을 때 보이게 하지말고 왼쪽으로 빼줘. 평소에도 같이 보여야할 것 같아"

## User Scenarios & Testing

### User Story 1 - Always-Visible Calendar (Priority: P1)

Users need to see the full monthly calendar at all times to quickly understand the current date context and jump to other dates without opening a popup.

**Why this priority**: Improves navigation efficiency and reduces clicks.

**Independent Test**: Verify that a monthly calendar view is visible on the left side of the screen immediately upon loading the page, without any user interaction.

**Acceptance Scenarios**:

1. **Given** the main page layout, **When** viewed on desktop, **Then** a sidebar is visible on the left.
2. **Given** the sidebar, **When** checked, **Then** it contains a mini monthly calendar (Date Picker).
3. **Given** the mini calendar, **When** a date is clicked, **Then** the main Weekly View updates to the selected week.

---

### User Story 2 - Layout Restructuring (Priority: P1)

Users need the main content (Weekly Calendar) to adjust its width to accommodate the new sidebar.

**Why this priority**: Necessary to prevent layout breakage.

**Independent Test**: Check that the main calendar and sidebar sit side-by-side on desktop.

**Acceptance Scenarios**:

1. **Given** the new layout, **When** displayed, **Then** it uses a flex/grid layout with Sidebar (Left) and Main Content (Right).
2. **Given** the DateNavigator (top header), **When** viewed, **Then** it might be simplified or removed if the sidebar replaces its function (or kept for week traversal). *Decision: Keep top navigator for quick prev/next week actions, but sync with sidebar.*

## Requirements

### Functional Requirements

- **FR-001**: System MUST display a persistent sidebar on the left side of the main view (desktop).
- **FR-002**: The sidebar MUST contain a "Mini Calendar" component that is always visible.
- **FR-003**: Selecting a date in the Mini Calendar MUST update the main Weekly Calendar's selected date.
- **FR-004**: The main Weekly Calendar MUST resize to fit the remaining width.
- **FR-005**: Responsive design: On mobile, the sidebar SHOULD be hidden or collapsible (hamburger menu), prioritizing the main calendar.

### Key Entities

- No DB changes. Layout and Component structure changes only.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Date selection can be performed in 1 click (directly on sidebar) instead of 2 (open picker -> select).
- **SC-002**: Layout remains broken-free on standard desktop resolutions (1024px+).
