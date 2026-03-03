import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookingService } from "@/api/services/bookingService";
import { CACHE_KEY_BOOKINGS } from "../constant";
import { toaster } from "@/components/ui/toaster";
import { type CreateBookingRequest } from "@/entities/Booking";

const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookingRequest) => createBookingService.post(data),
    onSuccess: (res) => {
      if (res.status === 201) {
        toaster.create({
          title: "Success",
          description: res.message,
          type: "success",
        });
        queryClient.invalidateQueries({ queryKey: [CACHE_KEY_BOOKINGS] });
      } else {
        toaster.create({
          title: "Failed",
          description: res.message,
          type: "error",
        });
      }
    },
    onError: (error: any) => {
      console.log(error.response);
      
      toaster.create({
        title: "Error",
        description: error.response?.data?.error || error.response?.data?.errors[0].msg || "Something went wrong",
        type: "error",
      });
    },
  });
};

export default useCreateBooking;