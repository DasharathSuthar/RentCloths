import express from "express";
import { userController } from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/logout", userController.logoutUser);
userRouter.post("/update", authUser, userController.updateCart);
userRouter.get("/isAuth", authUser, userController.userIsAuth);

export default userRouter;
