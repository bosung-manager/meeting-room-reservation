import { IRoomRepository, IReservationRepository } from "./interfaces";
import { FileRoomRepository } from "./json/room-repo";
import { FileReservationRepository } from "./json/reservation-repo";
import { PostgresRoomRepository } from "./postgres/room-repo";
import { PostgresReservationRepository } from "./postgres/reservation-repo";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK_DB !== "false";

export function getRoomRepository(): IRoomRepository {
  if (useMock) {
    return new FileRoomRepository();
  }
  return new PostgresRoomRepository();
}

export function getReservationRepository(): IReservationRepository {
  if (useMock) {
    return new FileReservationRepository();
  }
  return new PostgresReservationRepository();
}