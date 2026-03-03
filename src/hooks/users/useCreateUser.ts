import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserService } from "@/api/services/userService";
import { CACHE_KEY_USERS } from "../constant";
import { toaster } from "@/components/ui/toaster";

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createUserService.post(data),
    onSuccess: (res) => {
      if (res.status === 201) {
        toaster.create({ title: "User created", type: "success" });
        queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USERS] });
      }
    },
    onError: (err: any) => {
      toaster.create({
        title: "Error",
        description: err.response?.data?.error || err.response?.data?.errors[0].msg || "Unauthorized or Server Error",
        type: "error",
      });
    },
  });
};

export default useCreateUser;
