import { useQuery } from "@tanstack/react-query";
import { userListService } from "@/api/services/userService";
import { CACHE_KEY_USERS } from "../constant";

const useUsers = (page: number) => {
  return useQuery({
    queryKey: [CACHE_KEY_USERS, page],
    queryFn: () => userListService.getAll(page),
  });
};

export default useUsers;