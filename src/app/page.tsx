"use client";

import { useEffect, useState } from "react";
import { MeetingRoom, Reservation } from "@/types";
import RoomSelector from "@/components/ui/RoomSelector";
import WeeklyCalendar from "@/components/booking/WeeklyCalendar";
import BookingForm from "@/components/booking/BookingForm";
import CancelForm from "@/components/booking/CancelForm";
import DateNavigator from "@/components/booking/DateNavigator";
import ReservationDetails from "@/components/booking/ReservationDetails";
import MiniCalendar from "@/components/ui/MiniCalendar";
import SearchInput from "@/components/ui/SearchInput";
import { getStartOfWeek, getEndOfWeek } from "@/lib/date-utils";

export default function Home() {
  const [rooms, setRooms] = useState<MeetingRoom[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingSlotTime, setBookingSlotTime] = useState<string | null>(null);
  const [bookingEndTime, setBookingEndTime] = useState<string | null>(null);

  // Cancel Modal State
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  
  // Details Modal State
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const fetchReservations = () => {
    if (selectedRoomId) {
      const start = getStartOfWeek(selectedDate).toISOString();
      const end = getEndOfWeek(selectedDate).toISOString();
      
      fetch(`/api/reservations?roomId=${selectedRoomId}&startDate=${start}&endDate=${end}`)
        .then((res) => res.json())
        .then((data) => {
          setReservations(data);
        });
    }
  };

  useEffect(() => {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        if (data.length > 0) setSelectedRoomId(data[0].id);
      });
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [selectedRoomId, selectedDate]);

  const handleSlotClick = (startTime: string, reservation?: Reservation) => {
    if (reservation) {
      setSelectedReservation(reservation);
      setIsDetailsModalOpen(true);
    } else {
      setBookingSlotTime(startTime);
      setBookingEndTime(null);
      setIsBookingModalOpen(true);
    }
  };

  const handleRangeSelect = (startTime: string, endTime: string) => {
    setBookingSlotTime(startTime);
    setBookingEndTime(endTime);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = async (name: string, phone: string, agenda?: string, attendees?: string) => {
    if (!selectedRoomId || !bookingSlotTime) return;

    const endTime = bookingEndTime || new Date(new Date(bookingSlotTime).getTime() + 30 * 60000).toISOString();

    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId: selectedRoomId,
        startTime: bookingSlotTime,
        endTime,
        userName: name,
        userPhone: phone,
        agenda,
        attendees,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "예약에 실패했습니다.");
    }

    fetchReservations();
    alert("예약이 완료되었습니다!");
  };

  const handleCancelSubmit = async (name: string, phone: string) => {
    if (!selectedReservation) return;

    const res = await fetch(`/api/reservations/${selectedReservation.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: name,
        userPhone: phone,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "취소에 실패했습니다.");
    }

    fetchReservations();
    alert("예약이 취소되었습니다.");
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 p-6 hidden md:flex flex-col gap-8 overflow-y-auto">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-6">미팅룸 예약</h1>
          
          <div className="mb-6">
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
          </div>

          <MiniCalendar 
            selectedDate={selectedDate} 
            onDateSelect={setSelectedDate} 
          />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">회의실 선택</h2>
          <RoomSelector
            rooms={rooms}
            selectedRoomId={selectedRoomId}
            onSelect={setSelectedRoomId}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        <header className="border-b border-gray-200 p-4 flex items-center justify-between">
          <DateNavigator 
            currentDate={selectedDate} 
            onDateChange={setSelectedDate} 
          />
        </header>

        <div className="flex-1 overflow-auto p-6">
          <WeeklyCalendar
            reservations={reservations}
            selectedDate={selectedDate}
            onSlotClick={handleSlotClick}
            onRangeSelect={handleRangeSelect}
            searchQuery={searchQuery}
          />
        </div>
      </main>

      {/* Modals */}
      {bookingSlotTime && (
        <BookingForm
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onSubmit={handleBookingSubmit}
          selectedDate={new Date(bookingSlotTime)}
          selectedTime={bookingSlotTime}
          endTime={bookingEndTime}
        />
      )}

      {selectedReservation && (
        <CancelForm
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          onCancel={handleCancelSubmit}
          reservationInfo={selectedReservation}
        />
      )}

      {selectedReservation && (
        <ReservationDetails
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          reservation={selectedReservation}
          onCancelClick={() => {
            setIsDetailsModalOpen(false);
            setIsCancelModalOpen(true);
          }}
        />
      )}
    </div>
  );
}