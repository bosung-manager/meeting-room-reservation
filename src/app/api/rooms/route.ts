import { NextResponse } from "next/server";
import { getRoomRepository } from "@/lib/repositories";
import { withErrorHandling } from "@/lib/api-wrapper";
import { cookies } from "next/headers";

export const GET = withErrorHandling(async () => {
  const repo = getRoomRepository();
  const rooms = await repo.getAll();
  return NextResponse.json(rooms);
});

export const POST = withErrorHandling(async (req: Request) => {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const repo = getRoomRepository();
  const body = await req.json();
  
  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const room = await repo.create({ ...body, active: true });
  return NextResponse.json(room, { status: 201 });
});