import { Router } from "express";
import { sellerController } from "../controllers/seller.controller.js";

const sellerRouter = Router();

sellerRouter.post("/login", sellerController.sellerLogin);
sellerRouter.get("/logout", sellerController.sellerLogout);

export default sellerRouter;
