import { z } from "zod";

// Complete user schema (for database models, JWT payloads, etc.)
export const UserSchema = z
  .object({
    id: z.string().uuid({ message: "Invalid user ID" }),
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters long",
    }),
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    phone: z.string(),
    country: z.string().optional(),
    createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid creation date format",
    }),
    updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid update date format",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Request validation schema (for user registration/creation)
export const CreateUserSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
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

// export type UserDto = z.infer<typeof UserSchema>;
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UserCreationDto = Omit<CreateUserDto, "confirmPassword">;
