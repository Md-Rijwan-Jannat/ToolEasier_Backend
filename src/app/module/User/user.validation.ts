import { z } from "zod";
import { USER_ROLE, USER_STATUS } from "./user.constant";

// Todo. Create your own zod validation here. Below i show a simple validation that only receive one item from the frontend.

const createUserValidationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email format" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password cannot be more than 20 characters" }),
  role: z
    .enum(Object.keys(USER_ROLE) as [string, ...string[]], {
      errorMap: () => ({ message: "Invalid role" }),
    })
    .optional()
    .default("student"),
});

const updateUserValidationSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email format" })
    .optional(),
  role: z
    .enum(Object.keys(USER_ROLE) as [string, ...string[]], {
      errorMap: () => ({ message: "Invalid role" }),
    })
    .optional(),
  status: z
    .enum(Object.keys(USER_STATUS) as [string, ...string[]], {
      errorMap: () => ({ message: "Invalid status" }),
    })
    .optional(),
});

const changePasswordValidationSchema = z.object({
  currentPassword: z
    .string({
      required_error: "Current password is required",
      invalid_type_error: "Current password must be a string",
    })
    .min(1, { message: "Current password cannot be empty" }),
  newPassword: z
    .string({
      required_error: "New password is required",
      invalid_type_error: "New password must be a string",
    })
    .min(6, { message: "New password must be at least 6 characters" })
    .max(20, { message: "New password cannot be more than 20 characters" }),
});

const changeStatusValidationSchema = z.object({
  status: z.enum(Object.keys(USER_STATUS) as [string, ...string[]], {
    errorMap: () => ({ message: "Invalid status" }),
  }),
});

// You can read my following blog to get deeper understanding about creating different types of zod validation https://dev.to/md_enayeturrahman_2560e3/how-to-create-api-in-an-industry-standard-app-44ck

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
  changePasswordValidationSchema,
  changeStatusValidationSchema,
};
