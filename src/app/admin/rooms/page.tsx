"use client";

import { useEffect, useState } from "react";
import { MeetingRoom } from "@/types";
import RoomList from "@/components/admin/RoomList";
import CreateRoomForm from "@/components/admin/CreateRoomForm";

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<MeetingRoom[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      const res = await fetch("/api/rooms");
      const data = await res.json();
      setRooms(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreate = async (name: string, image?: string) => {
    const res = await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image }),
    });

    if (res.ok) {
      alert("회의실이 추가되었습니다.");
      fetchRooms();
    } else {
      alert("회의실 추가 실패");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/rooms/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("회의실이 삭제되었습니다.");
      fetchRooms();
    } else {
      alert("회의실 삭제 실패");
    }
  };

  if (loading) return <div className="p-8 text-center">로딩 중...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">회의실 관리</h2>
      </div>

      <CreateRoomForm onCreate={handleCreate} />
      <RoomList rooms={rooms} onDelete={handleDelete} />
    </div>
  );
}
