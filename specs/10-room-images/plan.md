# Implementation Plan: Room Images (Base64)

**Branch**: `10-room-images` | **Date**: 2026-01-09
**Input**: Feature specification from `/specs/10-room-images/spec.md`

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: React 18, Tailwind CSS
**Storage**:
- **Dev**: Update `local-db.json` structure
- **Prod**: Update Prisma Schema
**Target Platform**: Web (Next.js)

## Constitution Check

- [x] **Data**: Storing images in DB is not ideal for scale, but fits the "simple Vercel deployment" constraint without external storage setup. Limit size strictly.

## Project Structure

### Documentation

```text
specs/10-room-images/
├── plan.md
├── tasks.md
└── spec.md
```

### Source Code

```text
src/
├── components/
│   └── admin/
│       └── CreateRoomForm.tsx # Add File Input
│   └── ui/
│       └── RoomSelector.tsx   # Display Thumbnail
├── app/
│   └── api/rooms/route.ts     # Handle image field
├── lib/repositories/          # Update logic
└── prisma/                    # Update schema
```

## Implementation Strategy

1. **Data Layer**: Add `image` field to `MeetingRoom`.
2. **Admin UI**: Add file picker to `CreateRoomForm`. Use `FileReader` to convert to Base64 string.
3. **Validation**: Check file size (< 1MB) before conversion.
4. **Display**: Update `RoomSelector` to show `img` tag if `image` exists.
