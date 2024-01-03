import { AppError } from "../../common/error/appError.js";
import { catchAsync } from "../../common/error/catchAsync.js";
import { MealsServices } from "../meals/meals.service.js";
import { OrdersServices } from "./orders.service.js";

export const orderCreateMidd = catchAsync(async (req, res, next) => {
  const order = req.body;
  const { sessionUser } = req;

  const meal = await MealsServices.getMealById(order.mealId);

  if (!meal) {
    return next(new AppError("this is operational error", 400));
  }

  order.totalPrice = meal.price * order.quantity;
  order.userId = sessionUser.id;

  req.order = order;
  next();
});

export const verificOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  const order = await OrdersServices.getOrderById(id);

  if (!order) {
    return next(new AppError("this order is not active", 400));
  }

  if (order.status === "completed" || order.status === "cancelled") {
    return next(new AppError("your order is completed or cancelled", 400));
  }
  
  if (sessionUser.id !== order.userId) {
    return next(new AppError("you are not user the order", 400));
  }

  req.order = order;
  next();
});
