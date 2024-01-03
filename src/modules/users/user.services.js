import { UserModel } from "./user.model.js";

export class UserServices {
  static async findAllUsers() {
    return await UserModel.findAll({
      where: {
        status: true,
      },
      attributes: ["id", "name", "email", "role"],
    });
  }

  static async findUserById(id) {
    return await UserModel.findOne({
      where: {
        id,
        status: true,
      },
    });
  }

  static async findUserByEmail(email) {
    return await UserModel.findOne({
      where: {
        email,
        status: true,
      },
    });
  }

  static async createTheUser(data) {
    return await UserModel.create(data);
  }

  static async updateTheUser(user, data) {
    return await user.update(data);
  }

  static async deleteTheUser(user) {
    return await user.update({
      status: false,
      attributes: ["id", "name", "email", "status"],
    });
  }
}
