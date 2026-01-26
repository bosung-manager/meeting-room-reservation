import { MeetingRoom } from "@/types";
import { IRoomRepository } from "../interfaces";
import { prisma } from "../../db/prisma";

export class PostgresRoomRepository implements IRoomRepository {
  async getAll(): Promise<MeetingRoom[]> {
    const data = await prisma.meetingRoom.findMany({
      where: { active: true },
    });
    return data.map(r => ({ ...r, image: r.image || undefined }));
  }

  async getById(id: string): Promise<MeetingRoom | null> {
    const r = await prisma.meetingRoom.findFirst({
      where: { id, active: true },
    });
    if (!r) return null;
    return { ...r, image: r.image || undefined };
  }

  async create(room: Omit<MeetingRoom, "id">): Promise<MeetingRoom> {
    const newRoom = await prisma.meetingRoom.create({
      data: {
        name: room.name,
        active: room.active,
        image: room.image,
      },
    });
    return { ...newRoom, capacity: undefined, image: newRoom.image || undefined };
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.meetingRoom.update({
        where: { id },
        data: { active: false },
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}
