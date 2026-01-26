"use client";

import { MeetingRoom } from "@/types";

interface RoomListProps {
  rooms: MeetingRoom[];
  onDelete: (id: string) => Promise<void>;
}

export default function RoomList({ rooms, onDelete }: RoomListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이미지</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rooms.map((room) => (
            <tr key={room.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {room.image ? (
                  <img src={room.image} alt={room.name} className="h-10 w-10 rounded-full object-cover border" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                    No Img
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => {
                    if (confirm(`'${room.name}' 회의실을 삭제하시겠습니까?`)) {
                      onDelete(room.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
          {rooms.length === 0 && (
            <tr>
              <td colSpan={3} className="px-6 py-4 text-center text-gray-500 text-sm">
                등록된 회의실이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
