import { catchAsync } from "../../common/error/catchAsync.js";
import { ReviewServices } from "./reviews.service.js";
import { AppError } from "../../common/error/appError.js";

export const createReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  const newReview = await ReviewServices.createNewReview(review);
  return res.status(200).json({
    message: "Create Review",
    newReview,
  });
});

export const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { reviewData } = req;

  const newReview = await ReviewServices.reviewUpdate(review, reviewData);

  return res.status(200).json({
    message: "Update Review",
    newReview,
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  const deleteReview = await ReviewServices.deleteReview(review);

  return res.status(200).json({
    message: "Review Delete",
    deleteReview,
  });
});

export const reviewForId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await ReviewServices.reviewById(id);
  if (!review) {
    return next(new AppError("this is review error", 400));
  }

  return res.status(200).json({
    message: "review on",
    review,
  });
});
