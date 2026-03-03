import type Response from "@/entities/Response";
import {
  type Booking,
  type BookingResponseData,
  type CreateBookingRequest,
} from "@/entities/Booking";
import APIClient from "@/api/apiClient";

export const bookingListService = new APIClient<Response<BookingResponseData>>(
  "/bookings",
);

export const createBookingService = new APIClient<
  Response<Booking>,
  CreateBookingRequest
>("/bookings");

export const deleteBookingService = new APIClient<Response<any>>("/bookings");
