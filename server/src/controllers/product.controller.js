import { ProductService } from "../services/ProductService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";

class ProductController {
  productService = new ProductService();

  addProduct = asyncHandler(async (req, res) => {
    const { name, description, price, offerPrice, category } = req.body;

    if (
      [name, description, price, offerPrice, category].some(
        (field) => field?.trim() === "",
      )
    ) {
      throw new ApiError(400, "All Fields Are Required");
    }

    const existsProduct = await this.productService.productByName(
      name.toLowerCase(),
    );

    if (existsProduct) {
      throw new ApiError(401, "Product is already exists with same Name.");
    }

    const productImageLocalPath = req.file?.path;

    if (!productImageLocalPath) {
      throw new ApiError(400, "Product Image file is required.");
    }

    const productImage = await uploadOnCloudinary(productImageLocalPath);

    if (!productImage) {
      throw new ApiError(400, "Issues when uploading file try agains later.");
    }

    const productData = {
      name: name.toLowerCase(),
      description,
      price,
      offerPrice,
      image: productImage.url || "",
      category,
    };
    const product = await this.productService.addProduct(productData);

    if (!product) {
      throw new ApiError(400, "something went wrong when creating a Product");
    }

    res
      .status(201)
      .json(new ApiResponse(201, product, "Product Created Successfully."));
  });

  productList = asyncHandler(async (req, res) => {
    const productList = await this.productService.productList();
    if (!productList) {
      throw new ApiError(400, "something is wrong when facthing Products");
    }
    res
      .status(200)
      .json(
        new ApiResponse(200, productList, "Products fatched successfully."),
      );
  });

  productById = asyncHandler(async (req, res) => {
    const { id } = req.body;

    const productById = await this.productService.productById(id);

    if (!productById) {
      throw new ApiError(400, "Product Id is invalid.");
    }

    res.status(200).json(new ApiResponse(200, productById, "Product fatched."));
  });

  changeStock = asyncHandler(async (req, res) => {
    const { id, inStock } = req.body;
    if (!id) {
      throw new ApiResponse(400, "Product Id Invalid");
    }
    await this.productService.changeStock(id, inStock);

    res.status(200).json(new ApiResponse(200, {}, "Stock Updated"));
  });
}

export const productController = new ProductController();
