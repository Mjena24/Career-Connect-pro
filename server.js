import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authroutes.js";
import seekerProfileRoutes from "./routes/profileroutes.js";
import employerProfileRoutes from "./routes/employerProfileRoutes.js";
import userRoutes from "./routes/userroutes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/seeker", seekerProfileRoutes);
app.use("/api/employer", employerProfileRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🟢 MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`✅ Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log(err));
