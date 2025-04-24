import { Response, Request, NextFunction } from "express";
import { authService } from "../services/authService";
import { CreateUserSchema } from "../dtos/auth.dto";
import { AppError } from "../utils/appError";
import { ResponseHandler } from "../utils/response";

export class authController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const validateData = CreateUserSchema.parse(req.body);
      if (validateData.password !== validateData.confirmPassword) {
        throw new AppError(
          "Password and confirm password do not match",
          406,
          true,
          "failed"
        );
      }
      const { confirmPassword, ...userData } = validateData;
      const newUser = await authService.registerUser(userData);
      const response = new ResponseHandler(
        newUser,
        "User created successfully",
        201,
        null,
        "success"
      );
      response.send(res);
    } catch (error) {
      next(error);
    }
  }
}
