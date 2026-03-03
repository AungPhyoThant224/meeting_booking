import { type User } from "./User";

export interface Booking {
  id: string;
  userId: string;
  startTime: string; 
  endTime: string;
  createdAt: string;
  user?: User;
}

export interface CreateBookingRequest {
  startTime: string;
  endTime: string;
}

export interface BookingResponseData {
  bookings: Booking[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}