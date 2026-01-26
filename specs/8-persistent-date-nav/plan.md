# Implementation Plan: Persistent Sidebar Date Navigation

**Branch**: `8-persistent-date-nav` | **Date**: 2026-01-09
**Input**: Feature specification from `/specs/8-persistent-date-nav/spec.md`

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: React 18, Tailwind CSS, `date-fns` (Optional, using native)
**Target Platform**: Web (Next.js)

## Constitution Check

- [x] **UX**: Sidebar navigation is a standard pattern for productivity apps.
- [x] **Responsiveness**: Will hide sidebar on mobile.

## Project Structure

### Documentation

```text
specs/8-persistent-date-nav/
├── plan.md
├── tasks.md
└── spec.md
```

### Source Code

```text
src/
├── components/
│   └── ui/
│       └── MiniCalendar.tsx   # New Component (Month View)
├── app/
│   └── page.tsx               # Layout refactor (Flex row)
```

## Implementation Strategy

1. **New Component**: `MiniCalendar` - A simple 7x6 grid showing the current month days.
   - Props: `selectedDate`, `onDateSelect`.
   - Features: Month navigation (< >), highlight selected day.
2. **Page Layout**:
   - Wrap existing content in a flex container.
   - Left: Sidebar (contains `MiniCalendar`, maybe `RoomSelector` too? Spec says "Calendar left", implied RoomSelector might stay or move. Let's move `RoomSelector` to sidebar too for a cleaner "Control Panel" feel, or keep it top. I'll put Calendar in sidebar first as requested.)
   - Right: `WeeklyCalendar`.
3. **Synchronization**: `MiniCalendar` selection updates `selectedDate` state in `page.tsx`.
