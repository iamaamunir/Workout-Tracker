import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";
import { AppError } from "../utils/appError";

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    if (!req.user)
      throw new AppError("Unauthorized", 401, true, "Unauthorized");

    const isUser = await userRepo.findOneBy({ id: req.user.id });
    if (isUser && isUser.role === "Admin") {
      next();
    } else {
      throw new AppError("Access denied", 403, true, "Forbidden");
    }
  } catch (error) {
    throw error;
  }
};
