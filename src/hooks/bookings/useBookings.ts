import { useQuery } from "@tanstack/react-query";
import { bookingListService } from "@/api/services/bookingService";
import { CACHE_KEY_BOOKINGS } from "../constant";

const useBookings = (page: number) => {
  return useQuery({
    queryKey: [CACHE_KEY_BOOKINGS, page],
    queryFn: () => bookingListService.getAll(page),
    placeholderData: (previousData) => previousData,
  });
};

export default useBookings;
