import "reflect-metadata";
import { User } from "../entities/user";
import { UserCreationDto } from "../dtos/auth.dto";
import { AppDataSource } from "../data-source";
import { encrypt } from "../utils/hash";
import { AppError } from "../utils/appError";
import {
  UserResponseDto,
  UserLoginDto,
  loginResponseDto,
} from "../entities/user";
import { jwtTokens } from "../utils/jwt";

export class authService {
  static async registerUser(
    payload: UserCreationDto
  ): Promise<UserResponseDto> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const isUser = await userRepository.findOneBy({ email: payload.email });
      if (isUser) {
        throw new AppError("User already exists", 409, true, "conflict");
      }
      const hashedPassword = await encrypt.encryptPassword(payload.password);
      const userData = {
        firstname: payload.firstname,
        lastname: payload.lastname,
        email: payload.email,
        phone: payload.phone,
        password: hashedPassword,
        country: payload.country,
        createdAt: new Date(),
      };

      const userCreated = await userRepository.save(userData);
      const { password, ...userProfile } = userCreated;
      return userProfile;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error("Unexpected error during user registration:", error);
        throw new AppError("Internal server error", 500, false, "error");
      }
      throw error;
    }
  }

  static async loginUser(payload: UserLoginDto): Promise<loginResponseDto> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const isUser = await userRepository.findOneBy({ email: payload.email });
      if (!isUser) {
        throw new AppError("Invalid credentials", 404, true, "Not found");
      }
      const isPasswordVerified = await encrypt.comparePassword(
        payload.password,
        isUser.password
      );
      if (!isPasswordVerified) {
        throw new AppError("Invalid credentials", 401, true, "Not found");
      }
      let accessToken: string;
      let refreshToken: string;
      try {
        accessToken = await jwtTokens.generateAccessToken(isUser);
        refreshToken = await jwtTokens.generateRefreshToken(isUser);
      } catch (error) {
        throw new AppError(
          "Failed to generate token",
          500,
          false,
          "token_error"
        );
      }
      return { accessToken: accessToken, refreshToken: refreshToken };
    } catch (error) {
      console.error(error);
      if (!(error instanceof AppError)) {
        console.error("Error trying to login");
        throw new AppError("Internal server error", 500, false, "error");
      }
      throw error;
    }
  }
}
