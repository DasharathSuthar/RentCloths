import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import connectDB from "./config/db.js";

const app = express();
const port = process.env.PORT || 4000;

await connectDB()

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
