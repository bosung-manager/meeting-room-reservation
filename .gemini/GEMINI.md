# Project Context: Meeting Room Reservation

## Current Feature
- **Name**: Meeting Room Reservation
- **Branch**: `1-meeting-room-reservation`
- **Spec**: `specs/1-meeting-room-reservation/spec.md`

## Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database Strategy**:
  - **Dev**: Local JSON file (Repository Pattern: `JsonReservationRepository`)
  - **Prod**: Neon PostgreSQL (Repository Pattern: `NeonReservationRepository`)
- **Hosting**: Vercel

## Key Decisions
- Use Repository Pattern to switch between "NoSQL" (local file) and Postgres (Neon).
- No Auth for booking (Name/Phone only).
- Admin static password "00001".
