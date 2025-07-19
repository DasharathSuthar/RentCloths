import { Router } from "express";
import authUser from "../middlewares/authUser.js";
import { addressController } from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post("/add", authUser, addressController.createAddress);
addressRouter.get("/list", authUser, addressController.getAddresses);

export default addressRouter;
