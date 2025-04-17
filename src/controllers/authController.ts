import { Response, Request, NextFunction } from "express";
import { authService } from "../services/authService";
import { UserSchema } from "../dtos/auth.dto";

export class authController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const validateData = UserSchema.parse(req.body);
      if (validateData.password !== validateData.confirmPassword) {
        //TODO: handle error
      }
      const newUser = await authService.registerUser(validateData);
    } catch (error) {
      next(error);
    }
  }
}
