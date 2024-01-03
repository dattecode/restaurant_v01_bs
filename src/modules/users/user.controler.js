import { AppError } from "../../common/error/appError.js";
import { catchAsync } from "../../common/error/catchAsync.js";
import { generateJWT } from "../../pluggins/generate-jwt.js";
import { OrdersServices } from "../orders/orders.service.js";
import { validateUpdate, validateUserSchema } from "./user.schema.js";
import { UserServices } from "./user.services.js";

export const registerUser = catchAsync(async (req, res, next) => {
  const user = req.body;

  const emailUse = await UserServices.findUserByEmail(user.email);

  if (emailUse) {
    return next(new AppError("this email is invalid", 409));
  }

  const { hasError, errorMessage, userData } = validateUserSchema(user);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const newUser = await UserServices.createTheUser(userData);

  return res.status(201).json({
    message: "connecting",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

export const loginUser = catchAsync(async (req, res, next) => {
  const user = req.user;

  const token = await generateJWT(user.id);

  return res.status(200).json({
    message: "connecting",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const user = req.sessionUser;
  const { hasError, errorMessage, updateData } = validateUpdate(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  if (updateData.email === user.email || updateData.name === user.name) {
    return next(new AppError("The email or name cannot be equal", 400));
  }

  const updateUser = await UserServices.updateTheUser(user, updateData);

  return res.status(200).json({
    message: "connecting",
    updateUser,
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const user = req.sessionUser;

  const deleteUser = await UserServices.deleteTheUser(user);

  return res.status(200).json({
    message: "Update Completed",
    deleteUser,
  });
});

export const getAllOrders = catchAsync(async (req, res, next) => {
  const user = req.sessionUser;

  const orders = await OrdersServices.getAllOrdersUser(user.id);
  if (!orders) {
    return next(new AppError("orders is null", 409));
  }

  return res.status(200).json({
    message: "connecting",
    orders,
  });
});

export const orderById = catchAsync(async (req, res, next) => {
  const user = req.sessionUser;
  const { id } = req.params;

  const order = await OrdersServices.getOrderById(id);
  if (!order) {
    return next(new AppError("orders is null", 409));
  }

  if(order.userId !== user.id){
    return next(new AppError("your are not user the order", 409));
  }

  return res.status(200).json({
    message: "connecting",
    order
  });
});
