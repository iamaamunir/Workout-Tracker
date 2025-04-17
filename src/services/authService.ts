import "reflect-metadata";

import { User } from "../entities/user";
import { UserDto } from "../dtos/auth.dto";
import { AppDataSource } from "../data-source";
import { encrypt } from "../utils/hash";
import { jwtTokens } from "../utils/jwt";

export class authService {
  static async registerUser(payload: UserDto): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email: payload.email });
    if (user) {
      // TODO: HANDLE ERROR
    }
    const hashedPassword = await encrypt.encryptPassword(payload.password);
    const newUser = userRepository.create({
      firstname: payload.firstname,
      lastname: payload.lastname,
      email: payload.email,
      password: hashedPassword,
      country: payload.country,
      createdAt: new Date(),
    });

    await userRepository.save(newUser);
    return newUser;
  }
}
