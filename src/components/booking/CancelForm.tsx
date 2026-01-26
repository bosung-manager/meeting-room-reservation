"use client";

import { useState } from "react";

interface CancelFormProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: (name: string, phone: string) => Promise<void>;
  reservationInfo: {
    userName: string; // 마스킹된 이름만 보여주거나, 아예 안 보여줄 수도 있음. 여기선 확인용으로 안 보여줌.
    startTime: string;
  };
}

export default function CancelForm({ isOpen, onClose, onCancel, reservationInfo }: CancelFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onCancel(name, phone);
      setName("");
      setPhone("");
      onClose();
    } catch (err: any) {
      setError(err.message || "취소 정보가 일치하지 않습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeStr = new Date(reservationInfo.startTime).toLocaleTimeString("ko-KR", { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4 border-l-4 border-red-500">
        <h3 className="text-xl font-bold mb-4 text-red-600">예약 취소</h3>
        <p className="text-gray-600 mb-6">
          {timeStr} 예약을 취소하시려면 예약자 정보를 입력해주세요.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              예약자 이름
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="예약 시 입력한 이름"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              예약자 휴대폰 번호
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="예약 시 입력한 번호"
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
              닫기
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-red-300"
            >
              {isSubmitting ? "확인중..." : "예약 취소하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
