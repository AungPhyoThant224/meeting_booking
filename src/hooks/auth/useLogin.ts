import { useMutation } from "@tanstack/react-query";
import authService, { type LoginRequest } from "@/api/services/authService";
import { useAuthStore } from "../../store/useAuthStore";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.post(data),
    onSuccess: (response) => {
      if (response.status === 200) {
        setAuth(response.data.user, response.data.token);
        
        toaster.create({
          title: "Login Successful",
          description: `Welcome back, ${response.data.user.name}`,
          type: "success",
          duration: 3000,
        });

        navigate("/bookings");
      } else {
        toaster.create({
          title: "Login Failed",
          description: response.message,
          type: "error",
          duration: 3000,
        });
      }
    },
    onError: (error: any) => {
      toaster.create({
        title: "Error",
        description: error.response?.data?.error || "Something went wrong",
        type: "error",
      });
    },
  });
};

export default useLogin;