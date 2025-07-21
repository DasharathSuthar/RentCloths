import { AuthSellerService } from "../services/AuthSellerService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

class SellerController {
  authSellerService = new AuthSellerService();

  cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  };

  sellerLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Email and Password both are Required");
    }

    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const sellerToken =
        this.authSellerService.generateSellerAccessToken(email);

      return res
        .status(200)
        .cookie("sellerToken", sellerToken, this.cookieOptions)
        .json(
          new ApiResponse(200, { token: sellerToken }, "Seller Login success."),
        );
    } else {
      throw new ApiError(400, "Not Authorized with this email and Password");
    }
  });

  sellerIsAuth = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, {}, "seller is Authorized."));
  });

  sellerLogout = asyncHandler(async (req, res) => {
    res
      .status(200)
      .clearCookie("sellerToken", this.cookieOptions)
      .json(new ApiResponse(200, {}, "seller logout"));
  });
}

export const sellerController = new SellerController();
