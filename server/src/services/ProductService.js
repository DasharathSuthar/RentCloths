import { Product } from "../models/product.model.js";

export class ProductService {
  async addProduct(productData) {
    return await Product.create(productData);
  }

  async productById(productId) {
    return await Product.findById(productId);
  }

  async productByName(productName) {
    return await Product.findOne({ name: productName });
  }

  async productList() {
    return await Product.find({});
  }

  async changeStock(productId, inStock) {
    return await Product.findByIdAndUpdate(productId, { inStock });
  }
}
