import "reflect-metadata";
import * as express from "express";
import { authController } from "../controllers/authController";
const authRouter = express.Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
export default authRouter;
