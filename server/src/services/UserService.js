import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
export class UserService {
  async createUser(userData) {
    userData.password = await this.hashPassword(userData.password);
    return await User.create(userData);
  }

  async findById(id) {
    return await User.findById(id).select("-password");
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

  async updateCart(userId, cartItems) {
    return await User.findByIdAndUpdate(userId, { cartItems })
  }
}
