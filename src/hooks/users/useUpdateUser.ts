import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userUpdateService } from "@/api/services/userService";
import { CACHE_KEY_USERS } from "../constant";
import { toaster } from "@/components/ui/toaster";

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (udata: { role: string; id: string }) => 
      userUpdateService.patch({ 
        id: `${udata.id}/role`, 
        data: { role: udata.role } 
      }),
    onSuccess: (res) => {
      if (res.status === 200) {
        toaster.create({ title: "Role updated", type: "success" });
        queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USERS] });
      }
    },
    onError: (err: any) => {
      toaster.create({
        title: "Update Failed",
        description: err.response?.data?.error || err.response?.data?.errors[0].msg || "Unauthorized or Server Error",
        type: "error"
      });
    }
  });
};

export default useUpdateUser;