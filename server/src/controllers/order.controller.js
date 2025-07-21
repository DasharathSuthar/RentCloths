import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OrderService } from "../services/OrderService.js";
import { AddressService } from "../services/AddressService.js";
import { ProductService } from "../services/ProductService.js";

class OrderController {
  orderService = new OrderService();
  addressService = new AddressService();
  productService = new ProductService();

  createOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { items, addressId, rentalStartDate, rentalEndDate, paymentMethod } =
      req.body;

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      typeof addressId !== "string" ||
      addressId.trim() === "" ||
      typeof rentalStartDate !== "string" ||
      rentalStartDate.trim() === "" ||
      typeof rentalEndDate !== "string" ||
      rentalEndDate.trim() === "" ||
      typeof paymentMethod !== "string" ||
      paymentMethod.trim() === ""
    ) {
      throw new ApiError(400, "All fields are required and must be valid.");
    }

    if (!items || items.length === 0) {
      throw new ApiError(400, "No items provided.");
    }

    const address = await this.addressService.getAddressById(addressId);
    if (!address) {
      throw new ApiError(404, "Address not found.");
    }

    let totalAmount = 0;
    for (const item of items) {
      const product = await this.productService.productById(item.product);
      if (!product) {
        throw new ApiError(404, "product not found.");
      }

      const dailyPrice = product.offerPrice || product.price;
      totalAmount += dailyPrice * item.rentalDays * item.quantity;
    }

    const newOrder = await this.orderService.createOrder({
      userId,
      items,
      address: addressId,
      rentalStartDate,
      rentalEndDate,
      paymentMethod,
      totalAmount,
    });

    res.status(201).json(new ApiResponse(201, newOrder, "Order Placed."));
  });

  getUserOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const orders = await this.orderService.getUserOrder(userId);

    if (!orders) {
      throw new ApiError(404, "no such orders.");
    }

    res.status(201).json(new ApiResponse(201, orders, "Orders facthed."));
  });

  getOrderById = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
      throw new ApiError(400, "OrderId must be required.");
    }

    const orderById = await this.orderService.getOrderById(orderId);
    if (!orderById) {
      throw new ApiError(404, "Order not found with this Id");
    }

    res.status(201).json(new ApiResponse(201, orderById, "OrderById facthed."));
  });

  getAllOrders = asyncHandler(async (req, res) => {
    const orders = await this.orderService.getAllOrders();
    if (!orders) {
      throw new ApiError(404, "Orders not found or empty");
    }
    res.status(201).json(new ApiResponse(201, orders, "All orders facthed."));
  });
}

export const orderController = new OrderController();
