import { Router } from "express";
import { sellerController } from "../controllers/seller.controller.js";
import authSeller from "../middlewares/authSeller.js";

const sellerRouter = Router();

sellerRouter.post("/login", sellerController.sellerLogin);
sellerRouter.get("/logout", sellerController.sellerLogout);
sellerRouter.get("/isAuth", authSeller, sellerController.sellerIsAuth);
export default sellerRouter;
