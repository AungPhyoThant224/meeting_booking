import { useMutation, useQueryClient } from "@tanstack/react-query";
import bookingService from "@/api/services/bookingService";
import { CACHE_KEY_BOOKINGS } from "../constant";
import { toaster } from "@/components/ui/toaster";

const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => bookingService.post(data),
    onSuccess: (res) => {
      if (res.status === 201 || res.status === 200) {
        toaster.create({ title: "Booking created", type: "success" });
        queryClient.invalidateQueries({ queryKey: [CACHE_KEY_BOOKINGS] });
      } else {
        toaster.create({ 
          title: "Booking Failed", 
          description: res.message, 
          type: "error" 
        });
      }
    },
    onError: (err: any) => {
      toaster.create({ 
        title: "Error", 
        description: err.response?.data?.error || "Server Error", 
        type: "error" 
      });
    }
  });
};

export default useCreateBooking;