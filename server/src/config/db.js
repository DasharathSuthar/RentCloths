import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected !!");
  } catch (error) {
    console.error("MongoDB Error :", error.message);
  }
};

export default connectDB;
