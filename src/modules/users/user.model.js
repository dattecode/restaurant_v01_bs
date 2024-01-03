import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";
import { encypterPassword } from "../../pluggins/encrypterPass.js";

export const UserModel = sequelize.define(
  "user_model",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("normal", "admin"),
      allowNull: false,
      defaultValue: "normal",
    },
    status:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true
    }
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await encypterPassword(user.password);
      },
    },
  }
);
