import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import * as dotenv from "dotenv";
import { error } from "console";
dotenv.config();

export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

  if (process.env.NODE_ENV === "development") {
    console.error(err);
    return res.status(statusCode).json({
      status: status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  if (process.env.NODE_ENV === "production") {
    return res.status(statusCode).json({
      status: status,
      message:
        err instanceof AppError && err.isOperational
          ? err.message
          : "Something went very wrong!",
    });
  }
  next(err);
};
