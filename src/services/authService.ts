import "reflect-metadata";
import { User } from "../entities/user";
import { UserCreationDto } from "../dtos/auth.dto";
import { AppDataSource } from "../data-source";
import { encrypt } from "../utils/hash";
import { AppError } from "../utils/appError";
import { UserResponseDto } from "../entities/user";

export class authService {
  static async registerUser(
    payload: UserCreationDto
  ): Promise<UserResponseDto> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const isUser = await userRepository.findOneBy({ email: payload.email });
      if (isUser) {
        throw new AppError("Invalid user", 404, true, "failed");
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
        console.error(error);
        throw new AppError("Internal server error", 500, false, "error");
      }
      throw error;
    }
  }
}
