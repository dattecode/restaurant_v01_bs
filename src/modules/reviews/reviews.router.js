import express from "express";
import {
  createReviewMiddle,
  deleteReviewMiddle,
  updateReviewMiddle,
} from "./reviews.middleware.js";
import { createReview, deleteReview, reviewForId, updateReview } from "./reviews.controller.js";
import { protect } from "../users/user.middlewares.js";

export const route = express.Router();

route.use(protect);

route.post("/:id", createReviewMiddle, createReview);
route.patch("/:restaurantId", updateReviewMiddle, updateReview);
route.delete("/:restaurantId", deleteReviewMiddle, deleteReview);
route.get("/:id", reviewForId)