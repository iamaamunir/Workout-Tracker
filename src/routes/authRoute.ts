import "reflect-metadata";
import * as express from "express";
import { authController } from "../controllers/authController";
const authRouter = express.Router();

authRouter.post("/signup", authController.signup);
export default authRouter;
