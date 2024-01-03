import { catchAsync } from "../../common/error/catchAsync.js";
import { validateMealCreate } from "./meals.schema.js";

export const mealsCreateMidd = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { hasError, errorMessage, mealData } = validateMealCreate(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  mealData.restaurantId = restaurant.id;
  req.meal = mealData
  next()
});
