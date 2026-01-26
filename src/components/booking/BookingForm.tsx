"use client";

import { useState } from "react";

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, phone: string, agenda?: string, attendees?: string) => Promise<void>;
  selectedDate: Date;
  selectedTime: string; // Start Time
  endTime?: string | null; // Optional End Time (if range selected)
}

export default function BookingForm({ isOpen, onClose, onSubmit, selectedDate, selectedTime, endTime }: BookingFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agenda, setAgenda] = useState("");
  const [attendees, setAttendees] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit(name, phone, agenda, attendees);
      setName("");
      setPhone("");
      setAgenda("");
      setAttendees("");
      onClose();
    } catch (err: any) {
      setError(err.message || "예약 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startTimeStr = new Date(selectedTime).toLocaleTimeString("ko-KR", { hour: '2-digit', minute: '2-digit' });
  const endTimeStr = endTime 
    ? new Date(endTime).toLocaleTimeString("ko-KR", { hour: '2-digit', minute: '2-digit' })
    : new Date(new Date(selectedTime).getTime() + 30 * 60000).toLocaleTimeString("ko-KR", { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4 overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-bold mb-4">회의실 예약</h3>
        <p className="text-gray-600 mb-6">
          {selectedDate.toLocaleDateString("ko-KR")} <br/>
          <span className="font-semibold text-blue-600">{startTimeStr} ~ {endTimeStr}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="예: 김철수"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              휴대폰 번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="예: 010-1234-5678"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              회의 내용 (선택)
            </label>
            <textarea
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
              placeholder="예: 프로젝트 기획 회의"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              참석자 (선택)
            </label>
            <input
              type="text"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="예: 김철수, 이영희, 박민수"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {isSubmitting ? "예약하기" : "예약하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
