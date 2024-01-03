import { AppError } from "../../common/error/appError.js";
import { catchAsync } from "../../common/error/catchAsync.js";
import { OrdersServices } from "./orders.service.js";

export const createOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  const newOrder = await OrdersServices.createOrder(order);
  if (!newOrder) {
    return next(new AppError("this is orderError", 400));
  }

  return res.status(200).json({newOrder});
});

export const orderCompleted = catchAsync(async (req, res, next) => {
  const { order } = req;

  const orderCompleted = await OrdersServices.updateOrder(order);

  return res.status(200).json({
    message: "Order Completed",
    orderCompleted,
  });
});

export const orderCancelled = catchAsync(async (req, res, next) => {
  const { order } = req;
  
  const orderCancelled = await OrdersServices.deleteOrder(order);

  return res.status(200).json({
    message: "Order Cancelled",
    orderCancelled,
  });
});

export const getAllOrdersInUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const allOrders = await OrdersServices.getAllOrdersUser(sessionUser.id);

  return res.status(200).json({allOrders});
});
