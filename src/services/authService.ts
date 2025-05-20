import { User } from "../entities/user";
import { UserCreationDto } from "../dtos/auth.dto";
import { AppDataSource } from "../data-source";
import { encrypt } from "../utils/hash";
import { AppError } from "../utils/appError";
import {
  UserResponseDto,
  UserLoginDto,
  loginResponseDto,
} from "../dtos/auth.dto";
import { jwtTokens } from "../utils/jwt";
import { Role } from "../types/user";

export class authService {
  static async registerUser(
    payload: UserCreationDto
  ): Promise<UserResponseDto | void> {
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
        role: payload.role as Role,
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
      let isPasswordVerified;
      if (payload.password) {
        isPasswordVerified = await encrypt.comparePassword(
          payload.password,
          isUser.password
        );
      }
      if (!isPasswordVerified) {
        throw new AppError("Invalid credentials", 401, true, "Unauthorized");
      }

      let accessToken: string;
      let refreshToken: string;

      try {
        accessToken = await jwtTokens.generateAccessToken({
          id: isUser.id,
          email: isUser.email,
        });
        refreshToken = await jwtTokens.generateRefreshToken({
          id: isUser.id,
          email: isUser.email,
        });
      } catch (error) {
        throw new AppError(
          "Failed to generate token",
          500,
          false,
          "token_error"
        );
      }
      encrypt.hashRefreshToken(refreshToken, isUser);
      return { accessToken: accessToken, refreshToken: refreshToken };
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error("Error trying to login");
        throw new AppError("Internal server error", 500, false, "error");
      }
      throw error;
    }
  }
}
