import { AppError } from "../../common/error/appError.js";
import { catchAsync } from "../../common/error/catchAsync.js";
import { RestaurantModel } from "./restaurant.model.js";
import { restaurantUpdateValidation } from "./restaurant.schema.js";
import { RestaurantServices } from "./restaurant.service.js";

export const getRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await RestaurantServices.restaurantById(id);

  if (!restaurant) {
    return next(new AppError("this is operational error", 400));
  }

  return res.status(200).json({
    message: "connect",
    restaurant,
  });
});

export const allsRestaurant = catchAsync(async (req, res, next) => {
  const allRestaurants = await RestaurantServices.getAllrestaurant();
  console.log(RestaurantModel.associations);
  return res.status(200).json({
    message: "connect",
    restaurants: allRestaurants,
  });
});

export const createRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  const newRestaurant = await RestaurantServices.createTheRestaurant(
    restaurant
  );
  return res.status(200).json({
    message: "connect",
    newRestaurant,
  });
});

export const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  const { hasError, errorMessage, restaurantData } = restaurantUpdateValidation(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const restaurantUpdate = await RestaurantServices.updateTheRestaurant(
    restaurant,
    restaurantData
  );

  return res.status(200).json({
    message: "connect",
    restaurantUpdate,
  });
});

export const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  const deleteRestaurant = await RestaurantServices.deleteRestaurant(
    restaurant
  );
  return res.status(200).json({
    message: "connect",
    deleteRestaurant,
  });
});
