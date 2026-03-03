import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserService } from "@/api/services/userService";
import { CACHE_KEY_USERS } from "../constant";
import { toaster } from "@/components/ui/toaster";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUserService.delete(id),
    onSuccess: (res) => {
      if (res.status === 200) {
        toaster.create({ title: "User and their bookings deleted", type: "success" });
        queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USERS] });
      }
    },
    onError: (err: any) => {
      toaster.create({
        title: "Delete Failed",
        description: err.response?.data?.error || err.response?.data?.errors[0].msg || "Unauthorized or Server Error",
        type: "error"
      });
    }
  });
};

export default useDeleteUser;