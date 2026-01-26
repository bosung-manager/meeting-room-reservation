import { NextResponse } from "next/server";
import { getRoomRepository } from "@/lib/repositories";
import { withErrorHandling } from "@/lib/api-wrapper";
import { cookies } from "next/headers";

export const DELETE = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const repo = getRoomRepository();
  const success = await repo.delete(params.id);

  if (!success) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
});
