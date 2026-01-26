import fs from "fs/promises";
import path from "path";
import { MeetingRoom, Reservation } from "@/types";

interface DbSchema {
  rooms: MeetingRoom[];
  reservations: Reservation[];
}

const DB_PATH = path.join(process.cwd(), "local-db.json");

export async function readDb(): Promise<DbSchema> {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading DB:", error);
    return { rooms: [], reservations: [] };
  }
}

export async function writeDb(data: DbSchema): Promise<void> {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing DB:", error);
  }
}
