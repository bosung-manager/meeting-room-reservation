import { IRoomRepository, IReservationRepository } from "./interfaces";
import { FileRoomRepository } from "./json/room-repo";
import { FileReservationRepository } from "./json/reservation-repo";
// import { PostgresRoomRepository } from "./postgres/room-repo";
// import { PostgresReservationRepository } from "./postgres/reservation-repo";
import { SanityRoomRepository } from "./sanity/room-repo";
import { SanityReservationRepository } from "./sanity/reservation-repo";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK_DB === "true";

export function getRoomRepository(): IRoomRepository {
  if (useMock) {
    return new FileRoomRepository();
  }
  return new SanityRoomRepository();
}

export function getReservationRepository(): IReservationRepository {
  if (useMock) {
    return new FileReservationRepository();
  }
  return new SanityReservationRepository();
}