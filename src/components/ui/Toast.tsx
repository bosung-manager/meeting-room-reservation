"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transform transition-all animate-in fade-in slide-in-from-top-2 ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      <div className="flex items-center gap-2">
        <span>{type === "success" ? "✅" : "⚠️"}</span>
        <p className="font-medium">{message}</p>
        <button onClick={onClose} className="ml-4 hover:opacity-80 font-bold">
          ✕
        </button>
      </div>
    </div>
  );
}
