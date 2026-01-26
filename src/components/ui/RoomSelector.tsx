"use client";

import { MeetingRoom } from "@/types";

interface RoomSelectorProps {
  rooms: MeetingRoom[];
  selectedRoomId: string | null;
  onSelect: (id: string) => void;
}

export default function RoomSelector({ rooms, selectedRoomId, onSelect }: RoomSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      {rooms.map((room) => (
        <button
          key={room.id}
          onClick={() => onSelect(room.id)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left ${
            selectedRoomId === room.id
              ? "bg-blue-50 border-blue-600 ring-1 ring-blue-600"
              : "bg-white border-gray-200 hover:border-blue-400 hover:bg-gray-50"
          }`}
        >
          {room.image ? (
            <img src={room.image} alt={room.name} className="w-10 h-10 rounded-full object-cover border" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
              No Img
            </div>
          )}
          <span className={`font-medium ${selectedRoomId === room.id ? "text-blue-900" : "text-gray-700"}`}>
            {room.name}
          </span>
        </button>
      ))}
    </div>
  );
}
