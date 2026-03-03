import type Response from "@/entities/Response";
import { type User } from "@/entities/User";
import APIClient from "../apiClient";

export interface AuthData {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export default new APIClient<Response<AuthData>, LoginRequest>("/auth/login");