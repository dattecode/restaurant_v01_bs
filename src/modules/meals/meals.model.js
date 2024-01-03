import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";


export const MealsModel = sequelize.define("meals_model",{
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
    allowNull:false
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  price:{
    type:DataTypes.FLOAT,
    allowNull:false,
  },
  restaurantId:{
    type:DataTypes.INTEGER,
    allowNull:false,
    field:"restaurant_id"
  },
  status:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:true
  }
})