# Feature Specification: Meeting Details & Attendees

**Feature Branch**: `4-meeting-details`
**Created**: 2026-01-09
**Status**: Draft
**Input**: User description: "회의 예약할 때 회의 세부내역과 참석자 이름 등록하는것도 넣어줘. 그리고 예약된 회의를 눌렀을때는 취소가 바로 나올게 아니라 작성내역이 나오게 해줘야할것 같아"

## User Scenarios & Testing

### User Story 1 - Add Meeting Details (Priority: P1)

Users need to provide context for their reservation (Agenda, Attendees) so others know who is using the room and why.

**Why this priority**: Adds necessary context to bookings.

**Independent Test**: Book a room, fill in "Meeting Agenda" and "Attendees", submit. Verify the data is saved.

**Acceptance Scenarios**:

1. **Given** the Booking Form, **When** the user books a room, **Then** they see fields for "Meeting Agenda" (Description) and "Attendees" (Text input).
2. **Given** the fields are filled, **When** the booking is submitted, **Then** the agenda and attendee list are stored with the reservation.

---

### User Story 2 - View Reservation Details (Priority: P1)

Users need to see the details of an existing reservation before deciding to cancel it.

**Why this priority**: Prevents accidental cancellations and allows verifying meeting details.

**Independent Test**: Click on an existing reservation slot. Verify a "Details Modal" opens showing Agenda, Attendees, and Time.

**Acceptance Scenarios**:

1. **Given** a booked slot, **When** the user clicks it, **Then** a "Reservation Details" modal appears (instead of the Cancel form directly).
2. **Given** the Details modal, **When** viewing, **Then** it displays: Host Name, Phone, Time, Agenda, and Attendees.
3. **Given** the Details modal, **When** the user clicks a "Cancel Reservation" button, **Then** the existing Cancel/Authentication flow is triggered.

## Requirements

### Functional Requirements

- **FR-001**: Booking Form MUST include an optional text field for "Meeting Agenda" (Title/Description).
- **FR-002**: Booking Form MUST include an optional text field for "Attendees" (e.g., comma-separated names).
- **FR-003**: Clicking a booked slot MUST open a read-only Details View instead of the Cancellation Form.
- **FR-004**: The Details View MUST display: Host Name, Host Phone (masked or full), Time Range, Agenda, Attendees.
- **FR-005**: The Details View MUST provide a button to proceed to Cancellation.

### Key Entities

- **Reservation** (Update):
  - `agenda`: string (optional)
  - `attendees`: string (optional)

## Success Criteria

### Measurable Outcomes

- **SC-001**: 100% of new bookings can store and retrieve Agenda and Attendee information.
- **SC-002**: Clicking a booked slot opens the Details view 100% of the time, reducing accidental cancellation clicks.
