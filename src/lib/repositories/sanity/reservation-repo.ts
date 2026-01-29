import { Reservation } from "@/types";
import { IReservationRepository } from "../interfaces";
import { client } from "../../sanity/client";

export class SanityReservationRepository implements IReservationRepository {
  private mapDocumentToReservation(doc: any): Reservation {
    return {
      id: doc._id,
      roomId: doc.roomId, // Assuming simple string reference for now
      startTime: doc.startTime,
      endTime: doc.endTime,
      userName: doc.userName,
      userPhone: doc.userPhone,
      agenda: doc.agenda,
      attendees: doc.attendees,
      groupId: doc.groupId,
      createdAt: doc._createdAt,
    };
  }

  async getAll(): Promise<Reservation[]> {
    const query = `*[_type == "reservation"] | order(startTime asc)`;
    const docs = await client.fetch(query);
    return docs.map(this.mapDocumentToReservation);
  }

  async getById(id: string): Promise<Reservation | null> {
    const query = `*[_type == "reservation" && _id == $id][0]`;
    const doc = await client.fetch(query, { id });
    return doc ? this.mapDocumentToReservation(doc) : null;
  }

  async getByRoomId(roomId: string): Promise<Reservation[]> {
    const query = `*[_type == "reservation" && roomId == $roomId] | order(startTime asc)`;
    const docs = await client.fetch(query, { roomId });
    return docs.map(this.mapDocumentToReservation);
  }

  async getByDate(date: string): Promise<Reservation[]> {
    // String prefix matching for ISO date (YYYY-MM-DD)
    const query = `*[_type == "reservation" && startTime match $date + "*"] | order(startTime asc)`;
    const docs = await client.fetch(query, { date });
    return docs.map(this.mapDocumentToReservation);
  }

  async getByRange(startDate: string, endDate: string): Promise<Reservation[]> {
    const query = `*[_type == "reservation" && startTime >= $startDate && startTime <= $endDate] | order(startTime asc)`;
    const docs = await client.fetch(query, { startDate, endDate });
    return docs.map(this.mapDocumentToReservation);
  }

  async create(reservation: Omit<Reservation, "id" | "createdAt">): Promise<Reservation> {
    const doc = {
      _type: "reservation",
      roomId: reservation.roomId,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      userName: reservation.userName,
      userPhone: reservation.userPhone,
      agenda: reservation.agenda,
      attendees: reservation.attendees,
      groupId: reservation.groupId || `group-${Date.now()}`, // Fallback if missing
    };

    const created = await client.create(doc);

    return {
      ...reservation,
      id: created._id,
      groupId: doc.groupId,
      createdAt: created._createdAt,
    };
  }

  async delete(id: string): Promise<boolean> {
    try {
      await client.delete(id);
      return true;
    } catch (e) {
      console.error("Delete reservation failed", e);
      return false;
    }
  }
}
