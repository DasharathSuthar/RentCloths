import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/RentCloths`);
    console.log("DB Connected !!");
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDB;
