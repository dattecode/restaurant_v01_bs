import express from "express";
import {
  deleteUser,
  getAllOrders,
  loginUser,
  orderById,
  registerUser,
  updateUser,
} from "./user.controler.js";
import { loginCheck, protect } from "./user.middlewares.js";

export const route = express.Router();

route.post("/signup", registerUser);
route.post("/login",loginCheck, loginUser);

route.use(protect)

route.patch("/", updateUser);
route.delete("/", deleteUser);

route.get("/orders", getAllOrders);
route.get("/orders/:id", orderById);
