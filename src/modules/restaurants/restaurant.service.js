import { UserModel } from "../users/user.model.js";
import { RestaurantModel } from "./restaurant.model.js";

export class RestaurantServices {
  static async restaurantByUserId(userId) {
    return await RestaurantModel.findOne({
      where: {
        userId,
        status: true,
      },
      attributes: ["id", "name", "address", "userId"],
    });
  }

  static async restaurantById(id) {
    return await RestaurantModel.findOne({
      where: {
        id,
        status: true,
      },
      include: [
        {
          model: UserModel,
          attributes: ["id", "name", "email"],
        },
      ],
    });
  }

  static async getAllrestaurant() {
    return await RestaurantModel.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: UserModel,
          attributes: ["id", "name", "email"],
        },
      ],
    });
  }

  static async createTheRestaurant(data) {
    return await RestaurantModel.create(data);
  }

  static async updateTheRestaurant(restaurant, data) {
    return await restaurant.update(data);
  }

  static async restaurantRating(restaurant, rating, totalVotes) {
    return await restaurant.update({ rating, totalVotes });
  }

  static async deleteRestaurant(restaurant) {
    return await restaurant.update({
      status: false,
    });
  }
}
