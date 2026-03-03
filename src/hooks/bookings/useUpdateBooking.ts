import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingService } from "@/api/services/bookingService";
import { CACHE_KEY_BOOKINGS } from "../constant";
import { toaster } from "@/components/ui/toaster";
import { type CreateBookingRequest } from "../../entities/Booking";

const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (udata: { data: CreateBookingRequest; id: string }) => 
      updateBookingService.put(udata),
    onSuccess: (res) => {
      if (res.status === 200) {
        toaster.create({ title: "Booking updated", type: "success" });
        queryClient.invalidateQueries({ queryKey: [CACHE_KEY_BOOKINGS] });
      } else {
        toaster.create({ title: "Update Failed", description: res.message, type: "error" });
      }
    },
    onError: (err: any) => {
      toaster.create({
        title: "Error",
        description: err.response?.data?.error || err.response?.data?.errors[0].msg || "Update failed",
        type: "error",
      });
    },
  });
};

export default useUpdateBooking;