"use client";

import { useRef } from "react";
import { formatDateRange } from "@/lib/date-utils";

interface DateNavigatorProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export default function DateNavigator({ currentDate, onDateChange }: DateNavigatorProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handlePrevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 7); // Move by week
    onDateChange(prev);
  };

  const handleNextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 7); // Move by week
    onDateChange(next);
  };

  const handleDateClick = () => {
    dateInputRef.current?.showPicker();
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onDateChange(new Date(e.target.value));
    }
  };

  const dateStr = currentDate.toISOString().split("T")[0];

  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <button
        onClick={handlePrevDay}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors text-lg"
        aria-label="Previous Week"
      >
        ←
      </button>

      <div className="relative group cursor-pointer" onClick={handleDateClick}>
        <h2 className="text-xl font-bold text-gray-800 select-none">
          {formatDateRange(currentDate)}
        </h2>
        
        <input
          ref={dateInputRef}
          type="date"
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          value={dateStr}
          onChange={handleDateInputChange}
        />
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
      </div>

      <button
        onClick={handleNextDay}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors text-lg"
        aria-label="Next Week"
      >
        →
      </button>
    </div>
  );
}
