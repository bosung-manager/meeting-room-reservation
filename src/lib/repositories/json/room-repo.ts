import { MeetingRoom } from "@/types";
import { IRoomRepository } from "../interfaces";
import { readDb, writeDb } from "../../db/local-json";

// Since uuid might not be installed or needed for local dev, I'll use a simple generator
const generateId = () => Math.random().toString(36).substr(2, 9);

export class FileRoomRepository implements IRoomRepository {
  async getAll(): Promise<MeetingRoom[]> {
    const db = await readDb();
    return db.rooms.filter(r => r.active);
  }

  async getById(id: string): Promise<MeetingRoom | null> {
    const db = await readDb();
    return db.rooms.find(r => r.id === id && r.active) || null;
  }

  async create(room: Omit<MeetingRoom, "id">): Promise<MeetingRoom> {
    const db = await readDb();
    const newRoom: MeetingRoom = { ...room, id: generateId() };
    db.rooms.push(newRoom);
    await writeDb(db);
    return newRoom;
  }

  async delete(id: string): Promise<boolean> {
    const db = await readDb();
    const index = db.rooms.findIndex(r => r.id === id);
    if (index === -1) return false;
    db.rooms[index].active = false; // Soft delete
    await writeDb(db);
    return true;
  }
}
