import { UserService } from "../services/UserService.js";
import { AuthService } from "../services/AuthService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

class UserController {
  userService = new UserService();
  authService = new AuthService();

  cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  };

  registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required.");
    }

    const exists = await this.userService.findByEmail(email);
    if (exists) {
      throw new ApiError(409, "User already Exists");
    }

    const user = await this.userService.createUser({
      name,
      email,
      password,
    });

    res
      .status(201)
      .json(new ApiResponse(201, user, "User registered successfully."));
  });
}

export const userController = new UserController();
