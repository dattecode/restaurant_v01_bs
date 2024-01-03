import { RestaurantModel } from "../restaurants/restaurant.model.js";
import { MealsModel } from "./meals.model.js";

export class MealsServices {

  static async getAllMealsByRestaurant(restaurantId) {
    return await MealsModel.findAll({
      where: {
        restaurantId: restaurantId,
        status: true,
      },
      attributes:["id","name","restaurantId","price"],
      include:[{
        model:RestaurantModel,
        attributes:["id","name","address","userId"]
      }]
    });
  }

  static async getMealById(id) {
    return await MealsModel.findOne({
      where: {
        id,
        status: true,
      },
      attributes:["id","name","restaurantId","price"],
      include:[{
        model:RestaurantModel,
        attributes:["id","name","address","userId"]
      }]
    });
  }

  static async createMeal(data){
    return await MealsModel.create(data)
  }

  static async updateMeal(meal, data) {
    return await meal.update(data);
  }

  static async deleteMeal(meal) {
    return await meal.update({ status: false });
  }
}
