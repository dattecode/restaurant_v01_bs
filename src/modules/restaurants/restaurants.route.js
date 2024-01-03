import express from "express";
import {
  allsRestaurant,
  createRestaurant,
  deleteRestaurant,
  getRestaurantById,
  updateRestaurant,
} from "./restaurant.controller.js";
import { createMiddle, verificUserAdmin } from "./restaurant.middleware.js";
import { protect } from "../users/user.middlewares.js";

export const route = express.Router();

route.get("/:id", getRestaurantById);
route.get("/", allsRestaurant);

route.use(protect);

route.post("/", createMiddle, createRestaurant);
route.patch("/:id", verificUserAdmin, updateRestaurant);
route.delete("/:id", verificUserAdmin, deleteRestaurant);
