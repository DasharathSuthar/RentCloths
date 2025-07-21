import { Router } from "express";
import authSeller from "../middlewares/authSeller.js";
import { productController } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.js";

const productRouter = Router();

productRouter.post(
  "/addproduct",
  upload.single("image"),
  authSeller,
  productController.addProduct,
);
productRouter.get("/list", productController.productList);
productRouter.get("/id", productController.productById);
productRouter.post("/stock", authSeller, productController.changeStock);

export default productRouter;
