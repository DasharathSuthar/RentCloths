import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const authSeller = async (req, res, next) => {
  try {
    const sellerToken =
      req.cookies?.sellerToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!sellerToken) {
      throw new ApiError(401, "Unauthorized request.");
    }

    const decodedSellerToken = jwt.verify(
      sellerToken,
      process.env.ACCESS_TOKEN_SECRET,
    );

    if (decodedSellerToken.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      throw new ApiError(401, "Unauthorized request.");
    }
  } catch (error) {
    // console.log(error.message);
    throw new ApiError(500, error.message);
  }
};

export default authSeller;
