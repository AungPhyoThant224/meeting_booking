import type Response from "@/entities/Response";
import { type BookingResponseData } from "@/entities/Booking";
import APIClient from "@/api/apiClient";

export default new APIClient<Response<BookingResponseData>>("/bookings");