import express from "express";
import {
  createOrder,
  getAllOrdersInUser,
  orderCancelled,
  orderCompleted,
} from "./orders.controller.js";
import { orderCreateMidd, verificOrder } from "./orders.middleware.js";
import { protect } from "../users/user.middlewares.js";

export const route = express.Router();

route.use(protect)

route.post("/", orderCreateMidd, createOrder);
route.patch("/:id", verificOrder, orderCompleted);
route.delete("/:id", verificOrder, orderCancelled);
route.get("/", getAllOrdersInUser);
