import { UserModel } from "../../modules/users/user.model.js";
import { ReviewModel } from "../../modules/reviews/reviews.model.js";
import { RestaurantModel } from "../../modules/restaurants/restaurant.model.js";
import { OrdersModel } from "../../modules/orders/orders.model.js";
import { MealsModel } from "../../modules/meals/meals.model.js";

export const InitModel = () => {
  UserModel.hasMany(OrdersModel, { foreignKey: "userId" });
  OrdersModel.belongsTo(UserModel, { foreignKey: "userId" });

  UserModel.hasMany(ReviewModel, { foreignKey: "userId" });
  ReviewModel.belongsTo(UserModel, { foreignKey: "userId" });

  UserModel.hasMany(RestaurantModel, { foreignKey: "userId" });
  RestaurantModel.belongsTo(UserModel, { foreignKey: "userId" });

  MealsModel.hasOne(OrdersModel, { foreignKey: "mealId" });
  OrdersModel.belongsTo(MealsModel, { foreignKey: "mealId" });

  RestaurantModel.hasMany(MealsModel, {
    foreignKey: "restaurantId",
    sourceKey: "id",
  });
  MealsModel.belongsTo(RestaurantModel, {
    foreignKey: "restaurantId",
    targetKey: "id",
  });

  RestaurantModel.hasMany(ReviewModel, { foreignKey: "restaurantId" });
  ReviewModel.belongsTo(RestaurantModel, { foreignKey: "restaurantId" });
};
