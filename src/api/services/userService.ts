import type Response from "@/entities/Response";
import { type User, type UserResponseData } from "@/entities/User";
import APIClient from "@/api/apiClient";

export const userListService = new APIClient<Response<UserResponseData>>("/users");
export const userUpdateService = new APIClient<Response<User>, { role: string }>("/users");
export const createUserService = new APIClient<Response<User>, any>("/users");
export const deleteUserService = new APIClient<Response<any>>("/users");