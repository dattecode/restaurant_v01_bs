import express, { urlencoded } from "express";
import { AppError } from "./common/error/appError.js";
import { globalErrorHandler } from "./common/error/error.controler.js";
import { enableCors } from "./pluggins/cors.js";
import { router } from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

//origins
const origins = ["http://localhost:3000"];
enableCors(app, origins);

//rutes
app.use("/api/v1", router)

//errors
app.all("*", (req, res, next) => {
  return next(new AppError(`this url is not define ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

export default app;
