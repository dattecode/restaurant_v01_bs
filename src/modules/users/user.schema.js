import z from "zod";
import { extractData } from "../../common/utils/extractData.js";

const userSchema = z.object({
  name: z
    .string({
      invalid_type_error: "this type is incorrect",
      required_error: "this camp is requerid",
    })
    .min(3, { message: "name is too short" })
    .max(60, { message: "name is too long" }),
  email: z
    .string({
      invalid_type_error: "this type is incorrect",
      required_error: "this camp is requerid",
    })
    .email({ message: "email invalid" }),
  password: z
    .string({
      invalid_type_error: "this type is incorrect",
      required_error: "this camp is requerid",
    })
    .min(3, { message: "password is too short" })
    .max(60, { message: "password is too long" }),
});

const loginUserSchema = z.object({
  email: z
    .string({
      invalid_type_error: "email format is incorrect",
      required_error: "email is required",
    })
    .email({ message: "invalid email" }),
  password: z
    .string({
      invalid_type_error: "password format is incorrect",
      required_error: "password is required",
    })
    .min(8, { message: "password is too short" })
    .max(15, { message: "password is too long" }),
});

const updateUserSchema = z.object({
  name: z
    .string({
      invalid_type_error: "name format is incorrect",
      required_error: "name is required",
    })
    .min(5, { message: "name is too short" })
    .max(40, { message: "name is too long " }),
  email: z
    .string({
      invalid_type_error: "email format is incorrect",
      required_error: "email is required",
    })
    .email({ message: "invalid email" }),
  role: z.enum(["normal", "admin"]),
});

export const validateUserSchema = (data) => {
  const result = userSchema.safeParse(data);
  const { hasError, errorMessage, data: userData } = extractData(result);
  return { hasError, errorMessage, userData };
};

export const validateLogin = (data) => {
  const result = loginUserSchema.safeParse(data);
  const { hasError, errorMessage, data: loginData } = extractData(result);
  return {
    hasError,
    errorMessage,
    loginData,
  };
};

export const validateUpdate = (data) => {
  const result = updateUserSchema.partial().safeParse(data);
  const { hasError, errorMessage, data: updateData } = extractData(result);
  return {
    hasError,
    errorMessage,
    updateData,
  };
};
