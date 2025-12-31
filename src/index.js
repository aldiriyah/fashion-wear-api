import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./db/connectDB.js";
import notFound from "./middleware/notFound.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import router from "./route/routes.js";

const PORT = process.env.PORT;

const app = express();

// ✅ CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://77.42.74.88:4000",
        "https://smart-wear-fashion.vercel.app",
      ];

      if (!origin) return callback(null, true);

    
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("API is running...");
});

connectDB();
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.use(globalErrorHandler);
app.use(notFound);
