import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
export class UserService {
  async createUser(userData) {
    userData.password = await this.hashPassword(userData.password);
    return await User.create(userData);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
