import { UserService } from "../services/UserService.js";
import { AuthUserService } from "../services/AuthUserService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

class UserController {
  userService = new UserService();
  authUserService = new AuthUserService();

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

  loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and Password both are Required");
    }

    const userCheck = await this.userService.findByEmail(email);
    if (!userCheck) {
      throw new ApiError(404, "User not Found with provided email.");
    }

    const isPasswordCorrect = await this.userService.comparePassword(
      password,
      userCheck.password,
    );

    const user = await this.userService.findById(userCheck._id);

    if (!isPasswordCorrect) {
      throw new ApiError(401, "Password is incorrect.");
    }

    const token = this.authUserService.generateAccessToken(user);

    res
      .status(200)
      .cookie("AccessToken", token, this.cookieOptions)
      .json(new ApiResponse(201, { user, token }, "Login successful."));
  });

  logoutUser = asyncHandler(async (req, res) => {
    res
      .status(200)
      .clearCookie("AccessToken", this.cookieOptions)
      .json(new ApiResponse(201, {}, "User logged out."));
  });

  updateCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { cartItems } = req.body;

    await this.userService.updateCart(userId, cartItems);

    res.status(200).json(new ApiResponse(200, {}, "Cart Updated."));
  });

  userIsAuth = asyncHandler(async (req, res) => {
    const user = await this.userService.findById(req.user._id);

    res.status(201).json(new ApiResponse(201, user, "User is authorized."));
  });
}

export const userController = new UserController();
