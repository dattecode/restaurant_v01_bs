import { MealsModel } from "../meals/meals.model.js";
import { UserModel } from "../users/user.model.js";
import { OrdersModel } from "./orders.model.js";

export class OrdersServices {
  static async createOrder(data) {
    return await OrdersModel.create(data);
  }

  static async updateOrder(order) {
    return await order.update({ status: "completed" });
  }

  static async deleteOrder(order) {
    return await order.update({ status: "cancelled" });
  }

  static async getAllOrdersUser(userId) {
    return await OrdersModel.findAll({
      where: {
        userId: userId,
      },
      attributes: ["id", "quantity", "totalPrice", "mealId", "userId","status"],
      include: [
        {
          model: MealsModel,
          attributes: ["price", "id", "name"],
        },
        {
          model: UserModel,
          attributes: ["id", "name", "email"],
        },
      ],
    });
  }

  static async getOrderById(id) {
    return await OrdersModel.findOne({
      where: {
        id,
      },
      attributes: ["id", "quantity", "totalPrice", "mealId", "userId","status"],
      include: [
        {
          model: MealsModel,
          attributes: ["price", "id", "name"],
        },
        {
          model: UserModel,
          attributes: ["id", "name", "email"],
        },
      ],
    });
  }
}
