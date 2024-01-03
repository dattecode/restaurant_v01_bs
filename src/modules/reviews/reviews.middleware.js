import { AppError } from "../../common/error/appError.js";
import { catchAsync } from "../../common/error/catchAsync.js";
import { RestaurantServices } from "../restaurants/restaurant.service.js";
import { validateReview, validateReviewUpdate } from "./review.schema.js";
import { ReviewServices } from "./reviews.service.js";

export const createReviewMiddle = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;
  const { hasError, errorMessage, reviewData } = validateReview(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const verificRv = await ReviewServices.reviewByUserId(sessionUser.id, id);

  console.log(verificRv);
  
  if (verificRv) {
    return next(
      new AppError("You already created a review, please update it", 409)
    );
  }

  const restaurant = await RestaurantServices.restaurantById(id);
  if (!restaurant) {
    return next(new AppError("this is restaurant error in verific", 400));
  }

  const votes = restaurant.totalVotes + 1;
  const newRating =
    (restaurant.rating * restaurant.totalVotes + reviewData.rating) / votes;

  await RestaurantServices.restaurantRating(restaurant, newRating, votes);

  console.log(sessionUser.id);
  reviewData.userId = sessionUser.id;
  reviewData.restaurantId = restaurant.id;
  req.review = reviewData;
  next();
});

export const updateReviewMiddle = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { restaurantId } = req.params;
  const { hasError, errorMessage, reviewData } = validateReviewUpdate(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const review = await ReviewServices.reviewByUserId(sessionUser.id, restaurantId);

  if (!review) {
    return next(new AppError("you need to create a review to update it", 409));
  }

  const restaurant = await RestaurantServices.restaurantById(restaurantId);

  if (!restaurant) {
    return next(new AppError("this is operational error in verific", 400));
  }

  const votes = restaurant.totalVotes;
  const newRating = ((restaurant.rating * votes) + reviewData.rating - review.rating) / votes;  

  await RestaurantServices.restaurantRating(restaurant, newRating, votes);

  req.review = review;
  req.reviewData = reviewData; 
  next();
});

export const deleteReviewMiddle = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { restaurantId } = req.params;
  console.log(restaurantId);
  const review = await ReviewServices.reviewByUserId(sessionUser.id, restaurantId);

  console.log(review);
  if (!review) {
    return next(new AppError("you need to create a review to delete it", 409));
  }
  const restaurant = await RestaurantServices.restaurantById(restaurantId);

  if (!restaurant) {
    return next(new AppError("this is operational error in verific", 400));
  }

  const votes = restaurant.totalVotes - 1;
  const newRating =
    (restaurant.rating * restaurant.totalVotes - review.rating) / votes;

  await RestaurantServices.restaurantRating(restaurant, newRating, votes);

  req.review = review;
  next();
});
