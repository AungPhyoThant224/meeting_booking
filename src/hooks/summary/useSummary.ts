import { useQuery } from "@tanstack/react-query";
import summaryService from "@/api/services/summaryService";
import { CACHE_KEY_SUMMARY } from "../constant";

const useSummary = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: [CACHE_KEY_SUMMARY, startDate, endDate],
    queryFn: () => summaryService.getByRange(startDate, endDate),
  });
};

export default useSummary;