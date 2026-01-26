"use client";

import { Reservation } from "@/types";

interface ReservationDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  onCancelClick: () => void;
  reservation: Reservation;
}

export default function ReservationDetails({ isOpen, onClose, onCancelClick, reservation }: ReservationDetailsProps) {
  if (!isOpen) return null;

  const dateStr = new Date(reservation.startTime).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const startTimeStr = new Date(reservation.startTime).toLocaleTimeString("ko-KR", { hour: '2-digit', minute: '2-digit' });
  const endTimeStr = new Date(reservation.endTime).toLocaleTimeString("ko-KR", { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold mb-1">예약 상세 정보</h3>
        <p className="text-sm text-gray-500 mb-6">
          {dateStr}
        </p>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-blue-600 font-semibold mb-1">시간</p>
            <p className="text-lg font-bold text-blue-900">{startTimeStr} ~ {endTimeStr}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">예약자</p>
            <p className="text-gray-900 font-medium">{reservation.userName}</p>
          </div>

          {reservation.agenda && (
            <div>
              <p className="text-sm text-gray-500 mb-1">회의 내용</p>
              <div className="bg-gray-50 p-3 rounded-md text-gray-800 text-sm whitespace-pre-wrap">
                {reservation.agenda}
              </div>
            </div>
          )}

          {reservation.attendees && (
            <div>
              <p className="text-sm text-gray-500 mb-1">참석자</p>
              <p className="text-gray-800 text-sm">{reservation.attendees}</p>
            </div>
          )}
        </div>

        <div className="mt-8 pt-4 border-t flex justify-end">
          <button
            onClick={() => {
              onClose();
              onCancelClick();
            }}
            className="text-red-500 hover:text-red-700 text-sm font-medium hover:underline"
          >
            예약 취소하기
          </button>
        </div>
      </div>
    </div>
  );
}
