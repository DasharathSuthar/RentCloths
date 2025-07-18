import jwt from "jsonwebtoken";

export class AuthUserService {
  generateAccessToken(user) {
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      },
    );
  }
}
