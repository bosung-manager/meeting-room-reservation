import { NextResponse } from "next/server";
import { getReservationRepository } from "@/lib/repositories";
import { withErrorHandling } from "@/lib/api-wrapper";
import { cookies } from "next/headers";

export const DELETE = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  const repo = getReservationRepository();
  const id = params.id;
  const body = await req.json(); // { userName, userPhone }
  
  const reservation = await repo.getById(id);
  
  if (!reservation) {
    return NextResponse.json({ error: "예약을 찾을 수 없습니다." }, { status: 404 });
  }

  // Check Admin Cookie
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (isAdmin) {
    // Admin bypass
    await repo.delete(id);
    return NextResponse.json({ success: true });
  }

  // User Validation
  if (reservation.userName !== body.userName || reservation.userPhone !== body.userPhone) {
    return NextResponse.json({ error: "예약자 정보가 일치하지 않습니다." }, { status: 403 });
  }

  await repo.delete(id);
  return NextResponse.json({ success: true });
});
