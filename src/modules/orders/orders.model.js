import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

export const OrdersModel = sequelize.define("orders_model", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  mealId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "meal_id",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "cancelled", "completed"),
    allowNull: false,
    defaultValue: "active",
  },
});
