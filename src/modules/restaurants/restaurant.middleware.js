import { AppError } from "../../common/error/appError.js";
import { catchAsync } from "../../common/error/catchAsync.js";
import { restaurantCreateValidation } from "./restaurant.schema.js";
import { RestaurantServices } from "./restaurant.service.js";

export const createMiddle = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const { hasError, errorMessage, restaurantData } = restaurantCreateValidation(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  restaurantData.userId = sessionUser.id

  req.restaurant = restaurantData
  next()
});

export const verificUserAdmin = catchAsync(async (req,res,next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  const restaurant = await RestaurantServices.restaurantById(id);

  if (!restaurant) {
    return next(new AppError("this is operational error in verific", 400));
  }

  if (restaurant.userId !== sessionUser.id) {
    return next(new AppError("you are not user the restaurant", 400));
  }

  req.restaurant = restaurant
  next()
})