import express from "express";
import { route as userRoute } from "../modules/users/users.route.js";
import { route as mealRoute } from "../modules/meals/meals.route.js";
import { route as orderRoute } from "../modules/orders/orders.route.js";
import { route as restaurantRoute } from "../modules/restaurants/restaurants.route.js";
import { route as reviewRoute } from "../modules/reviews/reviews.router.js";


export const router = express.Router()

router.use("/users", userRoute)
router.use("/meals", mealRoute)
router.use("/restaurant", restaurantRoute)
router.use("/orders", orderRoute)
router.use("/reviews", reviewRoute)