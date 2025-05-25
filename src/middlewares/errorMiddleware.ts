import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import * as dotenv from "dotenv";
dotenv.config();
import { ZodError } from "zod";
export const errorHandler = (
  err: AppError | Error | ZodError | any,
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

  if (process.env.NODE_ENV === "development") {
    if (err instanceof ZodError) {
      return res.status(400).json({
        status: "fail",
        message: "Validation failed",
        errors: err.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
        stack: err.stack,
      });
    }
    return res.status(statusCode).json({
      status: status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  if (process.env.NODE_ENV === "production") {
    if (err instanceof ZodError) {
      return res.status(400).json({
        status: "fail",
        message: "Validation failed",
        errors: err.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
        stack: err.stack,
      });
    }
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
