import { Request as ExpressRequest, Response, NextFunction } from "express";
import { UserDto } from "../dtos/auth.dto";

declare global {
  namespace Express {
    interface Request {
      user?: UserDto;
    }
  }
}
