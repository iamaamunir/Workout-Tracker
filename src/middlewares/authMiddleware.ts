import { Response, Request, NextFunction } from "express";
import { jwtTokens } from "../utils/jwt";
import "../types/custom-request";
export const authMiddleware = async (
  res: Response,
  req: Request,
  next: NextFunction
) => {
  const token: string | undefined = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    // TODO: Proper error handling
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = await jwtTokens.verifyToken(token);
    if (!decoded) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    // TODO: Proper error handling
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Forbidden" });
  }
};
