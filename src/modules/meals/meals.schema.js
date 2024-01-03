import z from "zod";
import { extractData } from "../../common/utils/extractData.js";

const mealSchema = z.object({
  name: z
    .string({
      invalid_type_error: "name format is incorrect",
      required_error: "name is required",
    })
    .min(7, "date is too short")
    .max(50, "date is too long"),
  price: z.number({
    invalid_type_error: "price format is incorrect",
    required_error: "price is required",
  }),
});

export const validateMealCreate = (data) => {
  const result = mealSchema.safeParse(data);
  const { hasError, errorMessage, data: mealData } = extractData(result);
  return { hasError, errorMessage, mealData };
};

export const validateMealUpdate = (data) => {
  const result = mealSchema.partial().safeParse(data);
  const { hasError, errorMessage, data: mealData } = extractData(result);
  return { hasError, errorMessage, mealData };
};
