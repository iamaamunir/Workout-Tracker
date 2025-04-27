import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import * as crypto from "crypto";
import { User } from "../entities/user";
import { AppDataSource } from "../data-source";
dotenv.config();

export class encrypt {
  static async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  static async hashRefreshToken(
    refreshToken: string,
    user: User
  ): Promise<string> {
    const authSecret = process.env.AUTH_REFRESH_TOKEN_SECRET;
    const userRepository = AppDataSource.getRepository(User);
    if (!authSecret) {
      throw new Error("AUTH_REFRESH_TOKEN_SECRET is not set");
    }
    const rTknHash = crypto
      .createHmac("sha256", authSecret)
      .update(refreshToken)
      .digest("hex");
    user.refreshToken = user.refreshToken
      ? [...user.refreshToken, rTknHash]
      : [rTknHash];
    await userRepository.save(user);
    return refreshToken;
  }
}
