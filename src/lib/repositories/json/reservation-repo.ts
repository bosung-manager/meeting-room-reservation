import { Reservation } from "@/types";
import { IReservationRepository } from "../interfaces";
import { readDb, writeDb } from "../../db/local-json";

const generateId = () => Math.random().toString(36).substr(2, 9);

export class FileReservationRepository implements IReservationRepository {
  async getAll(): Promise<Reservation[]> {
    const db = await readDb();
    return db.reservations;
  }

  async getById(id: string): Promise<Reservation | null> {
    const db = await readDb();
    return db.reservations.find(r => r.id === id) || null;
  }

  async getByRoomId(roomId: string): Promise<Reservation[]> {
    const db = await readDb();
    return db.reservations.filter(r => r.roomId === roomId);
  }

  async getByDate(date: string): Promise<Reservation[]> {
    const db = await readDb();
    return db.reservations.filter(r => r.startTime.startsWith(date));
  }

  async getByRange(startDate: string, endDate: string): Promise<Reservation[]> {
    const db = await readDb();
    return db.reservations.filter(r => {
      const start = new Date(r.startTime);
      return start >= new Date(startDate) && start <= new Date(endDate);
    });
  }

  async create(reservation: Omit<Reservation, "id" | "createdAt">): Promise<Reservation> {
    const db = await readDb();
    const newReservation: Reservation = {
      ...reservation,
      id: generateId(),
      groupId: reservation.groupId || generateId(), // Ensure groupId exists
      createdAt: new Date().toISOString(),
    };
    db.reservations.push(newReservation);
    await writeDb(db);
    return newReservation;
  }

  async delete(id: string): Promise<boolean> {
    const db = await readDb();
    const initialLength = db.reservations.length;
    db.reservations = db.reservations.filter(r => r.id !== id);
    if (db.reservations.length === initialLength) return false;
    await writeDb(db);
    return true;
  }
}
