import { MeetingRoom, Reservation } from "@/types";

export interface IRoomRepository {
  getAll(): Promise<MeetingRoom[]>;
  getById(id: string): Promise<MeetingRoom | null>;
  create(room: Omit<MeetingRoom, "id">): Promise<MeetingRoom>;
  delete(id: string): Promise<boolean>;
}

export interface IReservationRepository {
  getAll(): Promise<Reservation[]>;
  getByRoomId(roomId: string): Promise<Reservation[]>;
  getByDate(date: string): Promise<Reservation[]>; // date as YYYY-MM-DD
  getByRange(startDate: string, endDate: string): Promise<Reservation[]>;
  create(reservation: Omit<Reservation, "id" | "createdAt">): Promise<Reservation>;
  delete(id: string): Promise<boolean>;
  getById(id: string): Promise<Reservation | null>;
}
