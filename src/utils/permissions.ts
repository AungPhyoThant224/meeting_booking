import { type User } from "../entities/User";
import { type Booking } from "../entities/Booking";

export const canDeleteBooking = (user: User | null, booking: Booking) => {
  if (!user) return false;
  
  if (user.role === "ADMIN" || user.role === "OWNER") return true;
  
  return booking.userId === user.id;
};