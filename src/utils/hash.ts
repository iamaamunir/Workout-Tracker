
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";


dotenv.config();

export class encrypt {
  static async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  static async comparePassword(
    hashedPassword: string,
    password: string
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}
