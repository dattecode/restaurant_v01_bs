import z from "zod";
import { extractData } from "../../common/utils/extractData.js";

const createRestaurantSchema = z.object({
  name: z
    .string({
      invalid_type_error: "this type is incorrect",
      required_error: "this camp is requerid",
    })
    .min(3, { message: "name is too short" })
    .max(60, { message: "name is too long" }),
  address: z
    .string({
      invalid_type_error: "this type is incorrect",
      required_error: "this camp is requerid",
    })
    .min(5, { message: "address is too short" })
    .max(80, { message: "address is too long" }),
});

export const restaurantCreateValidation = (data) => {
  const result = createRestaurantSchema.safeParse(data)
  const {hasError, errorMessage, data: restaurantData} = extractData(result)
  return {hasError, errorMessage, restaurantData}
}

export const restaurantUpdateValidation = (data) => {
  const result = createRestaurantSchema.partial().safeParse(data)
  const {hasError, errorMessage, data: restaurantData} = extractData(result)
  return {hasError, errorMessage, restaurantData}
}
