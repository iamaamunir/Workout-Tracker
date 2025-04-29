import { Request as ExpressRequest, Response, NextFunction } from "express";
import { CreateUserDto } from "../dtos/auth.dto";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
    }
  }
}
