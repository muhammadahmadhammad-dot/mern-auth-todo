import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/userRoutes.js";

import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB is connected"))
  .catch((error) => console.log(error));

app.use("/api", router);

app.listen(process.env.PORT, () => console.log("Server is running"));
