import { RestaurantModel } from "../restaurants/restaurant.model.js";
import { UserModel } from "../users/user.model.js";
import { ReviewModel } from "./reviews.model.js";

export class ReviewServices {
  static async createNewReview(data) {
    return await ReviewModel.create(data);
  }

  static async reviewByUserId(userId, restaurantId) {
    return await ReviewModel.findOne({
      where: {
        userId: userId,
        restaurantId: restaurantId,
        status: true,
      },
      attributes:["id","userId","restaurantId","comment","rating"],
      include: [
        { model: RestaurantModel, attributes: ["id", "name", "address"] },
        { model: UserModel, attributes: ["id", "name", "email"] },
      ],
    });
  }

  static async reviewById(id) {
    return await ReviewModel.findOne({
      where: {
        id,
        status: true,
      },
      attributes:["id","userId","restaurantId","comment","rating"],
      include: [
        { model: RestaurantModel, attributes: ["id", "name", "address"] },
        { model: UserModel, attributes: ["id", "name", "email"] },
      ],
    });
  }

  static async reviewByRestaurantId(restaurantId) {
    return await ReviewModel.findOne({
      where: {
        restaurantId,
        status: true,
      },
      attributes:["id","userId","restaurantId","comment","rating"],
      include: [
        { model: RestaurantModel, attributes: ["id", "name", "address"] },
        { model: UserModel, attributes: ["id", "name", "email"] },
      ],
    });
  }

  static async allReviewsByUserId(userId) {
    return await ReviewModel.findAll({
      where: {
        userId: userId,
        status: true,
      },
      attributes:["id","userId","restaurantId","comment","rating"],
      include: [
        { model: RestaurantModel, attributes: ["id", "name", "address"] },
        { model: UserModel, attributes: ["id", "name", "email"] },
      ],
    });
  }

  static async reviewUpdate(review, data) {
    return await review.update(data);
  }

  static async deleteReview(review) {
    return await review.update({ status: false });
  }
}
