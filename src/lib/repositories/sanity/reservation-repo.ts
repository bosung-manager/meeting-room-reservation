import { Reservation } from "@/types";
import { IReservationRepository } from "../interfaces";
import { client } from "../../sanity/client";

export class SanityReservationRepository implements IReservationRepository {
  private mapDocumentToReservation(doc: any): Reservation {
    return {
      id: doc?._id || "",
      roomId: doc?.roomId || "",
      startTime: doc?.startTime || "",
      endTime: doc?.endTime || "",
      userName: doc?.userName || "",
      userPhone: doc?.userPhone || "",
      agenda: doc?.agenda,
      attendees: doc?.attendees,
      groupId: doc?.groupId || "",
      createdAt: doc?._createdAt || new Date().toISOString(),
    };
  }

  async getAll(): Promise<Reservation[]> {
    try {
      const query = `*[_type == "reservation"] | order(startTime asc)`;
      const docs = await client.fetch(query);
      return Array.isArray(docs) ? docs.map(this.mapDocumentToReservation) : [];
    } catch (error) {
      console.error("Failed to fetch all reservations:", error);
      return [];
    }
  }

  async getById(id: string): Promise<Reservation | null> {
    try {
      const query = `*[_type == "reservation" && _id == $id][0]`;
      const doc = await client.fetch(query, { id });
      return doc ? this.mapDocumentToReservation(doc) : null;
    } catch (error) {
      console.error(`Failed to fetch reservation ${id}:`, error);
      return null;
    }
  }

  async getByRoomId(roomId: string): Promise<Reservation[]> {
    try {
      const query = `*[_type == "reservation" && roomId == $roomId] | order(startTime asc)`;
      const docs = await client.fetch(query, { roomId });
      return Array.isArray(docs) ? docs.map(this.mapDocumentToReservation) : [];
    } catch (error) {
      console.error(`Failed to fetch reservations for room ${roomId}:`, error);
      return [];
    }
  }

  async getByDate(date: string): Promise<Reservation[]> {
    try {
      // String prefix matching for ISO date (YYYY-MM-DD)
      const query = `*[_type == "reservation" && startTime match $date + "*"] | order(startTime asc)`;
      const docs = await client.fetch(query, { date });
      return Array.isArray(docs) ? docs.map(this.mapDocumentToReservation) : [];
    } catch (error) {
      console.error(`Failed to fetch reservations for date ${date}:`, error);
      return [];
    }
  }

  async getByRange(startDate: string, endDate: string): Promise<Reservation[]> {
    try {
      const query = `*[_type == "reservation" && startTime >= $startDate && startTime <= $endDate] | order(startTime asc)`;
      const docs = await client.fetch(query, { startDate, endDate });
      return Array.isArray(docs) ? docs.map(this.mapDocumentToReservation) : [];
    } catch (error) {
      console.error("Failed to fetch reservations by range:", error);
      return [];
    }
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
