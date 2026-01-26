# Data Model: Meeting Room Reservation

## Entities

### MeetingRoom
Represents a physical meeting room.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | UUID or unique slug (e.g., "room-a") |
| name | string | Yes | Display name |
| capacity | number | No | Optional seat count |
| active | boolean | Yes | Soft delete flag |

### Reservation
Represents a booked time slot.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | UUID |
| roomId | string | Yes | Foreign Key to MeetingRoom |
| startTime | string | Yes | ISO 8601 DateTime |
| endTime | string | Yes | ISO 8601 DateTime |
| userName | string | Yes | Booker's name |
| userPhone | string | Yes | Booker's phone (for auth/cancel) |
| createdAt | string | Yes | ISO 8601 DateTime |

## Storage Schemas

### Local JSON (Dev)
```json
{
  "rooms": [
    { "id": "1", "name": "Conference A", "active": true }
  ],
  "reservations": [
    {
      "id": "uuid-1",
      "roomId": "1",
      "startTime": "2026-01-09T10:00:00Z",
      "endTime": "2026-01-09T10:30:00Z",
      "userName": "Kim",
      "userPhone": "010-1234-5678",
      "createdAt": "..."
    }
  ]
}
```

### Prisma Schema (Prod - Neon)
```prisma
model MeetingRoom {
  id           String        @id @default(uuid())
  name         String
  active       Boolean       @default(true)
  reservations Reservation[]
}

model Reservation {
  id        String      @id @default(uuid())
  roomId    String
  room      MeetingRoom @relation(fields: [roomId], references: [id])
  startTime DateTime
  endTime   DateTime
  userName  String
  userPhone String
  createdAt DateTime    @default(now())
}
```
