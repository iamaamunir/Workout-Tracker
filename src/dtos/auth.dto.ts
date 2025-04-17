import { z } from "zod";

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

    phone: z.string().optional(),

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

export type UserDto = z.infer<typeof UserSchema>;
