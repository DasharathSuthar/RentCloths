import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./src/models/product.model.js";
import { sampleProducts } from "./sampleProducts.js";

dotenv.config(); // load .env file

const MONGO_URI = process.env.MONGODB_URI;

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected...");

    // Clear old data
    await Product.deleteMany();
    console.log("🗑️ Old products removed");

    // Insert new data
    await Product.insertMany(sampleProducts);
    console.log("🎉 Sample products inserted!");

    process.exit();
  } catch (error) {
    console.error("❌ Error while seeding:", error.message);
    process.exit(1);
  }
};

seedProducts();
