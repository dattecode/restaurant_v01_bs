import { catchAsync } from "../../common/error/catchAsync.js";
import { verifyPassword } from "../../pluggins/encrypterPass.js";
import { validateLogin } from "./user.schema.js";
import { UserServices } from "./user.services.js";
import { promisify } from "util";
import jwt from "jsonwebtoken"
import envs from "../../config/enviroments/enviorements.js";
import { AppError } from "../../common/error/appError.js";

export const loginCheck = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, loginData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const user = await UserServices.findUserByEmail(loginData.email);
  if (!user) {
    return next(new AppError("this is data is invalid", 417));
  }

  const passwordCheck = verifyPassword(loginData.password, user.password);
  if (!passwordCheck) {
    return next(new AppError("this is operational error", 400));
  }

  req.user = user;
  next();
});

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("Your are not login, please login to access", 401)
    );
  }

  const decodedToken = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED)

  const user = await UserServices.findUserById(decodedToken.id)
  if (!user) {
    return next(new AppError("Your user is invalid", 400));
  }

  req.sessionUser = user;
  next();
});
