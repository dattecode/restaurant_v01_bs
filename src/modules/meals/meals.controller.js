import { AppError } from "../../common/error/appError.js";
import { catchAsync } from "../../common/error/catchAsync.js";
import { RestaurantServices } from "../restaurants/restaurant.service.js";
import { validateMealUpdate } from "./meals.schema.js";
import { MealsServices } from "./meals.service.js";

export const createMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  const newMeal = await MealsServices.createMeal(meal);
  return res.status(200).json({
    message: "connect",
    newMeal,
  });
});

export const getAllMeals = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const restaurant = await RestaurantServices.restaurantByUserId(sessionUser.id)
  
  if (!restaurant) {
    return next(new AppError("this is operational error in verific", 400));
  }

  const allMeals = await MealsServices.getAllMealsByRestaurant(restaurant.id);
  if (!allMeals) {
    return next(new AppError("this is operational error in verific", 400));
  }

  return res.status(200).json({
    message: "connect",
    allMeals,
  });
});

export const mealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await MealsServices.getMealById(id);
  if (!meal) {
    return next(new AppError("this is operational error", 400));
  }

  return res.status(200).json({
    message: "connect",
    meal,
  });
});

export const mealUpdate = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { hasError, errorMessage, mealData } = validateMealUpdate(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const meal = await MealsServices.getMealById(id);

  if (!meal) {
    return next(new AppError("this meat is not create", 400));
  }

  const updateMeal = await MealsServices.updateMeal(meal, mealData);

  return res.status(200).json({
    message: "connect",
    updateMeal,
  });
});

export const mealDelete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await MealsServices.getMealById(id);

  if (!meal) {
    return next(new AppError("this is operational error", 400));
  }

  const deleteMeal = await MealsServices.deleteMeal(meal);

  return res.status(200).json({
    message: "Delete Completed",
  });
});
