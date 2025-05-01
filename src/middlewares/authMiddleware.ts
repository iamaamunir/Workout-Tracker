import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtTokens } from "../utils/jwt";
import { AppError } from "../utils/appError";
import "../types/custom-request";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | any> => {
  const token: string | undefined = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    throw new AppError("Token missing", 404, true, "Not found");
  }

  try {
    const decoded = await jwtTokens.verifyToken(token);
    // console.log(decoded);
    if (!decoded) {
      throw new AppError("Token Error", 403, true, "Forbidden");
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
