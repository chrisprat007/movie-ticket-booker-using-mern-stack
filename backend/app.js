import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";

// Load environment variables
dotenv.config();

const app = express();

// Set mongoose strictQuery option
mongoose.set('strictQuery', false); // Include this line

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

// MongoDB connection
mongoose.connect(`mongodb+srv://kishore:${process.env.mongo_pass}@cluster0.g39vj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    app.listen(5000, () => {
      console.log("Connected To Database And Server is running on port 5000");
    });
  })
  .catch((e) => console.log(e));
