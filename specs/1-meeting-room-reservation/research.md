# Research: Meeting Room Reservation

**Feature Branch**: `1-meeting-room-reservation`
**Date**: 2026-01-09

## 1. Data Storage Strategy (Dual Mode)

### Decision
Implement the **Repository Pattern** to abstract the data layer. This allows switching between a local JSON file (simulating NoSQL) for development and Neon (PostgreSQL) for production without changing business logic.

### Rationale
- **User Requirement**: "Pre-implement with NoSQL (Local), then switch to Neon (Prod)".
- **Flexibility**: Decoupling logic from storage makes testing easier and satisfies the visual dev requirement without needing a local DB server running.
- **Neon Integration**: Neon is fully compatible with Postgres drivers.

### Implementation Details
- **Interface**: `IReservationRepository`, `IRoomRepository`
- **Dev Implementation**: `FileReservationRepository` (reads/writes to `local-db.json`)
- **Prod Implementation**: `NeonReservationRepository` (uses Prisma ORM connected to Neon)
- **Switch**: Controlled by `NEXT_PUBLIC_USE_MOCK_DB=true` or `DATABASE_TYPE=file` env var.

## 2. Technology Stack

### Decision
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database (Prod)**: Prisma ORM + Neon (PostgreSQL)
- **Database (Dev)**: LowDB or simple `fs` based JSON handler
- **Hosting**: Vercel

### Rationale
- **Next.js 14**: Current standard, server components reduce client JS.
- **Tailwind**: Rapid UI development, easy to make "Choice Chips".
- **Prisma**: Type-safe database access, manages connections well for serverless (with appropriate config).

## 3. UI/UX Approach

### Decision
- **Calendar**: Custom CSS Grid implementation for 30-minute slots.
- **Choice Chips**: HTML Radio inputs styled as buttons using Tailwind.
- **Admin**: Protected route `/admin` with simple password middleware/check.

### Rationale
- 3rd party calendar libraries are often too heavy or hard to customize for specific "30-min slot" business logic. A custom grid is lighter and fits the requirement perfectly.
