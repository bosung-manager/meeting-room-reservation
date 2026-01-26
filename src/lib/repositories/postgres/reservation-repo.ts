import { Reservation } from "@/types";
import { IReservationRepository } from "../interfaces";
import { prisma } from "../../db/prisma";

const generateId = () => Math.random().toString(36).substr(2, 9);

export class PostgresReservationRepository implements IReservationRepository {
  async getAll(): Promise<Reservation[]> {
    const data = await prisma.reservation.findMany();
    return data.map(r => ({ 
      ...r, 
      startTime: r.startTime.toISOString(), 
      endTime: r.endTime.toISOString(), 
      createdAt: r.createdAt.toISOString(),
      agenda: r.agenda || undefined,
      attendees: r.attendees || undefined,
      groupId: r.groupId
    }));
  }

  async getById(id: string): Promise<Reservation | null> {
    const r = await prisma.reservation.findUnique({ where: { id } });
    if (!r) return null;
    return { 
      ...r, 
      startTime: r.startTime.toISOString(), 
      endTime: r.endTime.toISOString(), 
      createdAt: r.createdAt.toISOString(),
      agenda: r.agenda || undefined,
      attendees: r.attendees || undefined,
      groupId: r.groupId
    };
  }

  async getByRoomId(roomId: string): Promise<Reservation[]> {
    const data = await prisma.reservation.findMany({ where: { roomId } });
    return data.map(r => ({ 
      ...r, 
      startTime: r.startTime.toISOString(), 
      endTime: r.endTime.toISOString(), 
      createdAt: r.createdAt.toISOString(),
      agenda: r.agenda || undefined,
      attendees: r.attendees || undefined,
      groupId: r.groupId
    }));
  }

  async getByDate(date: string): Promise<Reservation[]> {
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const data = await prisma.reservation.findMany({
      where: {
        startTime: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
    return data.map(r => ({ 
      ...r, 
      startTime: r.startTime.toISOString(), 
      endTime: r.endTime.toISOString(), 
      createdAt: r.createdAt.toISOString(),
      agenda: r.agenda || undefined,
      attendees: r.attendees || undefined,
      groupId: r.groupId
    }));
  }

  async getByRange(startDate: string, endDate: string): Promise<Reservation[]> {
    const data = await prisma.reservation.findMany({
      where: {
        startTime: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
    return data.map(r => ({ 
      ...r, 
      startTime: r.startTime.toISOString(), 
      endTime: r.endTime.toISOString(), 
      createdAt: r.createdAt.toISOString(),
      agenda: r.agenda || undefined,
      attendees: r.attendees || undefined,
      groupId: r.groupId
    }));
  }

  async create(reservation: Omit<Reservation, "id" | "createdAt">): Promise<Reservation> {
    const groupId = reservation.groupId || generateId();
    const r = await prisma.reservation.create({
      data: {
        roomId: reservation.roomId,
        startTime: new Date(reservation.startTime),
        endTime: new Date(reservation.endTime),
        userName: reservation.userName,
        userPhone: reservation.userPhone,
        agenda: reservation.agenda,
        attendees: reservation.attendees,
        groupId: groupId,
      },
    });
    return { 
      ...r, 
      startTime: r.startTime.toISOString(), 
      endTime: r.endTime.toISOString(), 
      createdAt: r.createdAt.toISOString(),
      agenda: r.agenda || undefined,
      attendees: r.attendees || undefined,
      groupId: r.groupId
    };
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.reservation.delete({ where: { id } });
      return true;
    } catch (e) {
      return false;
    }
  }
}