"use client";

import { useState, useEffect } from "react";

interface MiniCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export default function MiniCalendar({ selectedDate, onDateSelect }: MiniCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  useEffect(() => {
    setCurrentMonth(new Date(selectedDate));
  }, [selectedDate]);

  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const generateCalendarGrid = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfWeek = daysInMonth[0].getDay(); // 0 (Sun) - 6 (Sat)
    
    const prefixDays = Array.from({ length: firstDayOfWeek }, (_, i) => {
      const d = new Date(year, month, 0); // Last day of prev month
      d.setDate(d.getDate() - (firstDayOfWeek - 1 - i));
      return { date: d, isCurrentMonth: false };
    });

    const currentDays = daysInMonth.map(d => ({ date: d, isCurrentMonth: true }));

    const remainingSlots = 42 - (prefixDays.length + currentDays.length);
    const suffixDays = Array.from({ length: remainingSlots }, (_, i) => {
      const d = new Date(year, month + 1, 1);
      d.setDate(d.getDate() + i);
      return { date: d, isCurrentMonth: false };
    });

    return [...prefixDays, ...currentDays, ...suffixDays];
  };

  const handlePrevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };

  const isSelected = (d: Date) => {
    return d.toDateString() === selectedDate.toDateString();
  };

  const isToday = (d: Date) => {
    return d.toDateString() === new Date().toDateString();
  };

  const days = generateCalendarGrid();
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded text-gray-600">
          ←
        </button>
        <span className="text-sm font-bold text-gray-800">
          {currentMonth.toLocaleDateString("ko-KR", { year: 'numeric', month: 'long' })}
        </span>
        <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded text-gray-600">
          →
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2 text-center">
        {weekDays.map(d => (
          <div key={d} className="text-xs text-gray-400 font-medium">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {days.map(({ date, isCurrentMonth }, idx) => (
          <button
            key={idx}
            onClick={() => onDateSelect(date)}
            className={`
              h-8 w-8 mx-auto flex items-center justify-center rounded-full text-sm transition-colors
              ${!isCurrentMonth ? "text-gray-300" : "text-gray-700"}
              ${isSelected(date) ? "bg-blue-600 text-white font-bold hover:bg-blue-700" : "hover:bg-gray-100"}
              ${isToday(date) && !isSelected(date) ? "text-blue-600 font-bold bg-blue-50" : ""}
            `}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
}
