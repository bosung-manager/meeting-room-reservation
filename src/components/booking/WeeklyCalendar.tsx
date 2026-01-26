"use client";

import { useState } from "react";
import { Reservation } from "@/types";
import { getColorForName } from "@/lib/utils";
import { getDaysInWeek } from "@/lib/date-utils";

interface WeeklyCalendarProps {
  reservations: Reservation[];
  selectedDate: Date;
  onSlotClick?: (startTime: string, reservation?: Reservation) => void;
  onRangeSelect?: (startTime: string, endTime: string) => void;
  searchQuery?: string;
}

export default function WeeklyCalendar({ reservations, selectedDate, onSlotClick, onRangeSelect, searchQuery = "" }: WeeklyCalendarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectionStart, setSelectionStart] = useState<string | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<string | null>(null);
  const [dragDay, setDragDay] = useState<string | null>(null); // Limit drag to one day

  const checkMatch = (reservation: Reservation) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      reservation.userName.toLowerCase().includes(query) ||
      (reservation.agenda?.toLowerCase() || "").includes(query) ||
      (reservation.attendees?.toLowerCase() || "").includes(query)
    );
  };

  const days = getDaysInWeek(selectedDate);
  const timeLabels: string[] = [];
  const startHour = 9;
  const endHour = 21;

  for (let h = startHour; h < endHour; h++) {
    timeLabels.push(`${h.toString().padStart(2, '0')}:00`);
    timeLabels.push(`${h.toString().padStart(2, '0')}:30`);
  }

  const getReservation = (slotStart: Date) => {
    return reservations.find(r => {
      const start = new Date(r.startTime);
      const end = new Date(r.endTime);
      return slotStart >= start && slotStart < end;
    });
  };

  const isSlotInSelection = (slot: Date) => {
    if (!selectionStart || !selectionEnd) return false;
    const start = new Date(selectionStart < selectionEnd ? selectionStart : selectionEnd);
    const end = new Date(selectionStart < selectionEnd ? selectionEnd : selectionStart);
    return slot >= start && slot <= end;
  };

  const handleMouseDown = (slotTime: string, hasReservation: boolean) => {
    if (hasReservation) return;
    setIsDragging(true);
    setSelectionStart(slotTime);
    setSelectionEnd(slotTime);
    setDragDay(new Date(slotTime).toDateString());
  };

  const handleMouseEnter = (slotTime: string) => {
    if (!isDragging || !selectionStart) return;
    // Only allow dragging within the same day
    if (new Date(slotTime).toDateString() !== dragDay) return;
    setSelectionEnd(slotTime);
  };

  const handleMouseUp = () => {
    if (!isDragging || !selectionStart || !selectionEnd) {
      resetDrag();
      return;
    }

    const startStr = selectionStart < selectionEnd ? selectionStart : selectionEnd;
    const endStr = selectionStart < selectionEnd ? selectionEnd : selectionStart;
    const finalEndTime = new Date(new Date(endStr).getTime() + 30 * 60000).toISOString();

    const hasOverlap = reservations.some(r => {
      const rStart = r.startTime;
      const rEnd = r.endTime;
      return (startStr >= rStart && startStr < rEnd) || (finalEndTime > rStart && finalEndTime <= rEnd);
    });

    if (!hasOverlap && onRangeSelect) {
      onRangeSelect(startStr, finalEndTime);
    } else if (!hasOverlap && onSlotClick && startStr === endStr) {
       onSlotClick(startStr);
    }

    resetDrag();
  };

  const resetDrag = () => {
    setIsDragging(false);
    setSelectionStart(null);
    setSelectionEnd(null);
    setDragDay(null);
  };

  return (
    <div className="w-full max-w-7xl bg-white rounded-lg shadow overflow-x-auto select-none" onMouseUp={handleMouseUp}>
      <div className="min-w-[800px]">
        {/* Header: Days */}
        <div className="grid grid-cols-8 border-b bg-gray-50">
          <div className="p-4 border-r"></div>
          {days.map((day) => (
            <div key={day.toISOString()} className="p-4 text-center border-r last:border-r-0">
              <p className="text-xs text-gray-500 uppercase font-semibold">
                {day.toLocaleDateString("ko-KR", { weekday: 'short' })}
              </p>
              <p className={`text-lg font-bold ${day.toDateString() === new Date().toDateString() ? "text-blue-600" : "text-gray-800"}`}>
                {day.getDate()}
              </p>
            </div>
          ))}
        </div>

        {/* Body: Time Slots */}
        <div className="relative">
          {timeLabels.map((label, labelIdx) => (
            <div key={label} className="grid grid-cols-8 border-b last:border-b-0 group">
              {/* Time Label Column */}
              <div className="p-2 text-right pr-4 text-xs text-gray-400 font-medium bg-gray-50 border-r flex items-center justify-end h-12">
                {labelIdx % 2 === 0 ? label : ""}
              </div>

              {/* Day Columns */}
              {days.map((day) => {
                const slotDate = new Date(day);
                const [h, m] = label.split(":");
                slotDate.setHours(parseInt(h), parseInt(m), 0, 0);
                const slotStr = slotDate.toISOString();
                const reservation = getReservation(slotDate);
                const isSelected = isSlotInSelection(slotDate);
                const colorClass = reservation ? getColorForName(reservation.groupId || reservation.userName) : "";
                
                const isMatched = reservation ? checkMatch(reservation) : false;
                const dimClass = searchQuery && reservation && !isMatched ? "opacity-20 grayscale" : "opacity-100";
                const highlightClass = searchQuery && reservation && isMatched ? "ring-2 ring-offset-1 ring-yellow-400 z-10" : "";

                return (
                  <div
                    key={`${day.toISOString()}-${label}`}
                    onMouseDown={() => handleMouseDown(slotStr, !!reservation)}
                    onMouseEnter={() => handleMouseEnter(slotStr)}
                    className={`h-12 border-r last:border-r-0 transition-all relative group/slot ${
                      reservation 
                        ? `${colorClass} cursor-pointer hover:brightness-95 ${dimClass} ${highlightClass}` 
                        : isSelected 
                          ? "bg-blue-200"
                          : "hover:bg-blue-50 cursor-pointer"
                    }`}
                    onClick={() => {
                      if (reservation && onSlotClick) onSlotClick(slotStr, reservation);
                    }}
                  >
                    {reservation && (
                      <div className="p-1 h-full overflow-hidden text-[10px] leading-tight">
                        <p className="font-bold truncate">{reservation.userName}</p>
                        <p className="opacity-80 truncate">{reservation.agenda}</p>
                      </div>
                    )}
                    {!reservation && isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] text-blue-700 font-bold">선택 중</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}