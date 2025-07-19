import { Order } from "../models/order.model.js";

export class OrderService {
  async createOrder(orderData) {
    return await Order.create(orderData);
  }

  async getUserOrder(userId) {
    return await Order.find({ userId });
  }

  async getOrderById(orderId) {
    return await Order.findById(orderId);
  }

  async getAllOrders() {
    return await Order.find({});
  }
}
