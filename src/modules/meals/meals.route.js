import express from "express";
import { verificUserAdmin } from "../restaurants/restaurant.middleware.js";
import { mealsCreateMidd } from "./meals.middleware.js";
import {
  createMeal,
  getAllMeals,
  mealById,
  mealDelete,
  mealUpdate,
} from "./meals.controller.js";
import { protect } from "../users/user.middlewares.js";

export const route = express.Router();

route.use(protect)

route.get("/", getAllMeals);
route.post("/:id", verificUserAdmin, mealsCreateMidd, createMeal);
route.get("/:id", mealById);
route.patch("/:id", mealUpdate);
route.delete("/:id", mealDelete);
