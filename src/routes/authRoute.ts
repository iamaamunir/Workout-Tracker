import "reflect-metadata";
import * as express from "express";
import { authController } from "../controllers/authController";
import { UserDto } from "../dtos/auth.dto";
const authRouter = express.Router();

authRouter.post("/signup", authController.signup);
export default authRouter;
