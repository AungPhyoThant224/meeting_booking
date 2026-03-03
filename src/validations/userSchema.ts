import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "OWNER", "ADMIN"], "Role is required" ),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;