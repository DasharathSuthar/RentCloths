import jwt from "jsonwebtoken";

export class AuthSellerService {
  generateSellerAccessToken(email) {
    return jwt.sign(
      {
        email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      },
    );
  }
}
