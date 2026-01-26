# Feature Specification: Room Images

**Feature Branch**: `10-room-images`
**Created**: 2026-01-09
**Status**: Draft
**Input**: User description: "회의실 이미지 넣을수 있나? 근데 넣고나면 vercel에 업로드 하는것도 고려해야하는데" (Decision: Use Base64 for MVP simplicity/portability)

## User Scenarios & Testing

### User Story 1 - Add Room Image (Priority: P1)

Admins need to upload an image when creating a meeting room so that users can see what the room looks like.

**Why this priority**: Enhances the information available about rooms.

**Independent Test**:
1. Go to Admin > Manage Rooms.
2. Fill in room name "Room A".
3. Select an image file (e.g., a small PNG).
4. Click "Add".
5. Verify the room appears in the list with the image.

**Acceptance Scenarios**:

1. **Given** the Create Room form, **When** admin selects an image file, **Then** it is processed (converted to Base64) and ready for submission.
2. **Given** a new room with an image, **When** saved, **Then** the image data is persisted in the database.

---

### User Story 2 - View Room Image (Priority: P1)

Users need to see the room image when selecting a room to make an informed choice.

**Why this priority**: Visual confirmation of the room.

**Independent Test**: Go to the main page. Verify the Room Selector shows thumbnails or a tooltip with the room image.

**Acceptance Scenarios**:

1. **Given** the Room Selector (Sidebar), **When** a room has an image, **Then** a small thumbnail is displayed next to the name OR the image is shown in the booking context.
2. **Given** the Admin Room List, **When** viewing rooms, **Then** the image thumbnail is visible.

## Requirements

### Functional Requirements

- **FR-001**: `MeetingRoom` entity MUST include an `image` field (String, mapping to Base64).
- **FR-002**: Admin "Create Room" form MUST accept file input (images only).
- **FR-003**: System MUST convert uploaded images to Base64 string on the client side before sending to API.
- **FR-004**: System MUST limit image size (e.g., < 1MB) to prevent DB bloat (client-side check).
- **FR-005**: Room Selector UI MUST display the image (thumbnail size).

### Key Entities

- **MeetingRoom** (Update):
  - `image`: string (Base64 data URI) - Optional

## Success Criteria

### Measurable Outcomes

- **SC-001**: Uploading a 500KB image results in a successful room creation.
- **SC-002**: Room images persist after server restart (since they are in the DB/JSON).
