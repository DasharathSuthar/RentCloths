import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import connectDB from "./config/db.js";
import sellerRouter from "./routes/seller.routes.js";
import productRouter from "./routes/product.routes.js";
import addressRouter from "./routes/address.routes.js";

const app = express();
const port = process.env.PORT || 4000;

await connectDB();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Api is Working");
});

app.use("/api/users", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/products", productRouter);
app.use("/api/addresses", addressRouter);

// // error handling
// app.all('*', (req, res, next) => {
//     next(new ApiError(404, `Route ${req.originalUrl} not found`))
// })

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
