import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { UserService } from "../services/UserService.js";

const authUser = async (req, res, next) => {
  try {
    const userService = new UserService();

    const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await userService.findById(decodedToken._id);

    if (!user) {
      throw new ApiError(401, "Invalid accessToken");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export default authUser;
