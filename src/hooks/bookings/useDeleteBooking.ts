import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookingService } from "@/api/services/bookingService";
import { CACHE_KEY_BOOKINGS } from "../constant";
import { toaster } from "@/components/ui/toaster";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBookingService.delete(id),
    onSuccess: (res) => {
      if (res.status === 200) {
        toaster.create({ title: "Booking deleted", type: "success" });
        queryClient.invalidateQueries({ queryKey: [CACHE_KEY_BOOKINGS] });
      } else {
        toaster.create({ title: "Error", description: res.message, type: "error" });
      }
    },
    onError: (err: any) => {
      toaster.create({
        title: "Error",
        description: err.response?.data?.error || "Delete failed",
        type: "error",
      });
    },
  });
};

export default useDeleteBooking;