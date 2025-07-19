import { Router } from "express";
import { orderController } from "../controllers/order.controller.js";
import authUser from "../middlewares/authUser.js";
import authSeller from "../middlewares/authSeller.js";

const orderRouter = Router();

orderRouter.post("/create", authUser, orderController.createOrder);
orderRouter.get("/user", authUser, orderController.getUserOrder);
orderRouter.get("/id", authUser, orderController.getOrderById);
orderRouter.get("/seller", authSeller, orderController.getAllOrders);

export default orderRouter;
