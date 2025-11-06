import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.MONGO_URI || !process.env.GEMINI_API_KEY) {
  console.error("Missing environment variables. Check .env file.");
  process.exit(1);
}

mongoose.set("strictQuery", false);

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/api", chatRoutes);

app.get("/health", (_, res) => res.status(200).json({ status: "ok" }));

app.use(express.static(path.join(__dirname, "dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

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
