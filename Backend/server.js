import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 8080;

if (!process.env.MONGO_URI || !process.env.GEMINI_API_KEY) {
  console.error("Missing environment variables. Check .env file.");
  process.exit(1);
}

mongoose.set("strictQuery", false);

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://cognito-01.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/api", chatRoutes);

app.get("/health", (_, res) => res.status(200).json({ status: "ok" }));


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected with the Database");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect with the database", err);
    process.exit(1);
  }
};

connectDB();
