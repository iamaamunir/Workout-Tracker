import { SignOptions } from "jsonwebtoken";
import * as Jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { UserResponseDto } from "../entities/user";

dotenv.config();

export class jwtTokens {
  static async generateAccessToken(
    userPayload: UserResponseDto
  ): Promise<string> {
    const expiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN;
    const options: SignOptions = {
      expiresIn: Number(expiresIn),
    };

    const accessToken = Jwt.sign(
      { id: userPayload.id, email: userPayload.email },
      process.env.TOKEN_SECRET as string,
      options
    );
    return accessToken;
  }

  static async generateRefreshToken(
    userPayload: UserResponseDto
  ): Promise<string> {
    const expiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN;
    const options: SignOptions = {
      expiresIn: Number(expiresIn),
    };

    const refreshToken = Jwt.sign(
      { id: userPayload.id, email: userPayload.email },
      process.env.TOKEN_SECRET as string,
      options
    );
    return refreshToken;
  }

  static async verifyToken(token: string): Promise<UserResponseDto | null> {
    try {
      const decoded = Jwt.verify(
        token,
        process.env.TOKEN_SECRET as string
      ) as UserResponseDto;
      return decoded;
    } catch (error) {
      console.error("Token verification failed:", error);
      return null;
    }
  }
}
