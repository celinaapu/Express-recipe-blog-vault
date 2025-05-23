import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./api/routes/auth";
import userRoute from "./api/routes/users";
import recipeRoute from "./api/routes/recipes";
// import searchRoute from "../src/api/routes/search";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

declare global {
  namespace Express {
    export interface Request {
      user: {
        username: string;
        email: string;
        password: string;
        _id: string;
        id: string;
        gender: string;
        isAdmin: boolean;
        profileImage?: string;
        socialhandle?: {
          instagram: string;
          facebook: string;
          whatsapp: string;
        };
      };
      isAuthenticated?: boolean;
    }
  }
}

// const MONGODB_URL = process.env.process.env.MONGODB_URL;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
  } catch (error) {
    throw error;
  }
};

// app.use(
//   cors({
//     origin: "*",
//   })
// );

app.use(
  cors({
    origin: "http://localhost:3000", // your frontend origin

    credentials: true, // allow cookies, auth headers
  })
);
const swaggerUi = require("swagger-ui-express");

var options = {
  swaggerOptions: {
    url: "http://petstore.swagger.io/v2/swagger.json",
  },
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(null, options));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/recipe", recipeRoute);
// app.use("/api/search", searchRoute);

app.listen(5000, () => {
  connect();
  mongoose.connection.on("connected", () => {
    return console.log("✅ Connected to MongoDB");
  });
  mongoose.connection.on("disconnected", () => {
    return console.log("❌ MongoDB connection error");
  });
  mongoose.connection.on("error", () => {
    return console.log("❌ Fix Mongodb connection error");
  });
  console.log("server running on port 5000");
});
