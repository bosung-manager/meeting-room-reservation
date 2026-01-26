export interface MeetingRoom {
  id: string;
  name: string;
  active: boolean;
  capacity?: number;
  image?: string; // Base64 Data URI
}

export interface Reservation {
  id: string;
  roomId: string;
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
  userName: string;
  userPhone: string;
  agenda?: string;
  attendees?: string;
  groupId: string; // New field for visual grouping
  createdAt: string;
}
