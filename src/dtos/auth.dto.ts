import { z } from "zod";

export const CreateUserSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    role: z.enum(["User", "Admin"]).default("User"),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters long",
    }),
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    phone: z.string(),
    country: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginUserSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type LoginUserDto = z.infer<typeof LoginUserSchema>;
export type UserCreationDto = Omit<CreateUserDto, "confirmPassword">;

export interface UserLoginDto {
  password?: string;
  email?: string;
}

export interface loginResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface UserResponseDto {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  country?: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  role?: string;
}
