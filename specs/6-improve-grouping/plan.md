# Implementation Plan: Improved Grouping (Group ID)

**Branch**: `6-improve-grouping` | **Date**: 2026-01-09
**Input**: Feature specification from `/specs/6-improve-grouping/spec.md`

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: React 18, Tailwind CSS, uuid (or internal generator)
**Storage**:
- **Dev**: Update `local-db.json` structure
- **Prod**: Update Prisma Schema
**Target Platform**: Web (Next.js)

## Constitution Check

- [x] **UX**: Visual separation of distinct tasks.
- [x] **Data**: Schema expansion required.

## Project Structure

### Documentation

```text
specs/6-improve-grouping/
├── plan.md
├── tasks.md
└── spec.md
```

### Source Code

```text
src/
├── components/
│   └── booking/
│       └── DailyCalendar.tsx  # Update color logic
├── lib/repositories/          # Update create logic
└── prisma/                    # Update schema
```

## Implementation Strategy

1. **Data Layer**: Update schema to include `groupId`.
2. **Repository**: Ensure `create` generates a unique `groupId`.
   - *Note*: If a drag selection creates multiple 30-min slots in the backend (currently it seems to create one reservation record per selection range? No, current implementation creates ONE record per selection. Wait, let's verify.)
   - *Correction*: The current `DailyCalendar` logic sends `startTime` and `endTime` to the API. The API creates **ONE** reservation record for that range.
   - *Issue*: If the user selects a range, it creates ONE record. If they select another range later, it creates ANOTHER record.
   - *Insight*: Since each booking action creates a distinct record, the `id` of the reservation itself IS unique per transaction. We can just use `id` for coloring!
   - *However*: If we want to support "multi-room" or "multi-day" bookings in the future as a single group, `groupId` is better. But for the current requirement ("same name, different booking"), using the **Reservation ID** is sufficient if one booking = one record.
   - *Check*: Does one drag action create one record? Yes (`POST /api/reservations` takes start/end).
   - *Decision*: I will still add `groupId` to be future-proof and explicit about "grouping", but for now it might map 1:1 with `id`.
   - *Refined Requirement*: "same name, different booking" -> Currently `DailyCalendar` uses `userName`. I will change it to use `groupId` (or `id`).
   - *Let's use `groupId`* to be safe and explicit as per user request.

3. **Frontend**: Update `DailyCalendar` to use `groupId` for `getColorForName`.
