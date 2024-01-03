import z from "zod";
import { extractData } from "../../common/utils/extractData.js";

const reviewSchema = z.object({
  comment: z
    .string({
      invalid_type_error: "date format is incorrect",
      required_error: "date is required",
    })
    .min(7, "comment is too short")
    .max(100, "comment is too long"),
  rating: z
    .number({
      invalid_type_error: "number format is incorrect",
      required_error: "number is required",
    })
    .min(1)
    .max(5),
});

export const validateReview = (data) => {
  const result = reviewSchema.safeParse(data);

  const { hasError, errorMessage, data: reviewData } = extractData(result);
  return {
    hasError,
    errorMessage,
    reviewData,
  };
};

export const validateReviewUpdate = (data) => {
  const result = reviewSchema.partial().safeParse(data);

  const { hasError, errorMessage, data: reviewData } = extractData(result);
  return {
    hasError,
    errorMessage,
    reviewData,
  };
};
