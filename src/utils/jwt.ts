import jwt, { SignOptions } from "jsonwebtoken";
import { StringValue } from "ms";
import * as dotenv from "dotenv";
import { UserResponseDto } from "../dtos/auth.dto";
import { AppError } from "./appError";

dotenv.config();

export class jwtTokens {
  static async generateAccessToken({
    id,
    email,
  }: {
    id: string;
    email: string;
  }): Promise<string> {
    const secret = process.env.TOKEN_SECRET;

    const expiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN;
    if (!secret) throw new Error("TOKEN_SECRET is not defined");

    const options: SignOptions = {
      expiresIn: expiresIn as StringValue,
    };
    console.log("Options prepared:", JSON.stringify(options));

    console.log("About to sign JWT");
    try {
      const accessToken = jwt.sign({ id, email }, secret, options);
      console.log("JWT signed successfully");
      return accessToken;
    } catch (error) {
      console.error("JWT signing failed:", error);
      throw error;
    }
  }

  static async generateRefreshToken({
    id,
    email,
  }: {
    id: string;
    email: string;
  }): Promise<string> {
    const expiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN;
    const secret = process.env.AUTH_REFRESH_TOKEN_SECRET;
    if (!secret) throw new Error("TOKEN_SECRET is not defined");

    const options: SignOptions = {
      expiresIn: expiresIn as StringValue,
    };

    const refreshToken = jwt.sign({ id, email }, secret, options);
    return refreshToken;
  }

  static async verifyToken(
    token: string
  ): Promise<{ id: string; email: string } | null> {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as {
        id: string;
        email: string;
      };
      return decoded;
    } catch (error: any) {
      if (error.name === "JsonWebTokenError") {
        throw new AppError(
          "Token verfication failed",
          403,
          true,
          "Invalid token"
        );
      }
      if (error.name === "TokenExpiredError") {
        throw new AppError("Token Expired", 403, true, "Jwt expired");
      }
      console.error("Token verification failed:", error);
      return null;
    }
  }
}
