import { NextResponse } from "next/server";
import { getReservationRepository } from "@/lib/repositories";
import { withErrorHandling } from "@/lib/api-wrapper";

export const GET = withErrorHandling(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");
  const date = searchParams.get("date");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  
  const repo = getReservationRepository();
  let reservations;
  
  if (startDate && endDate) {
    reservations = await repo.getByRange(startDate, endDate);
    if (roomId) {
      reservations = reservations.filter(r => r.roomId === roomId);
    }
  } else if (roomId) {
    reservations = await repo.getByRoomId(roomId);
  } else if (date) {
    reservations = await repo.getByDate(date);
  } else {
    reservations = await repo.getAll();
  }
  
  return NextResponse.json(reservations);
});

export const POST = withErrorHandling(async (req: Request) => {
  const repo = getReservationRepository();
  const body = await req.json();
  
  // Basic double-booking check
  const existing = await repo.getByRoomId(body.roomId);
  const isConflict = existing.some(r => 
    (body.startTime >= r.startTime && body.startTime < r.endTime) ||
    (body.endTime > r.startTime && body.endTime <= r.endTime)
  );
  
  if (isConflict) {
    return NextResponse.json({ error: "이미 예약된 시간대입니다." }, { status: 409 });
  }

  const reservation = await repo.create(body);
  return NextResponse.json(reservation, { status: 201 });
});
