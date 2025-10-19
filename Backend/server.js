import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`server is running on : ${PORT}`);
  connectDB();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected with the Database.");
  } catch (err) {
    console.log("failed to connect with the database", err);
  }
};

//initial testing-stage1
// const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Tell me dad joke",
//   });
//   console.log(response.text);
// }

// main();

//testing with end points -stage2
// app.post("/chat", async (req, res) => {
//   const apiKey = process.env.GEMINI_API_KEY;
//   const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       contents: [
//         {
//           parts: [
//             {
//               text: req.body.message,
//             },
//           ],
//         },
//       ],
//     }),
//   };

//   try {
//     const apiresult = await fetch(URL, options);
//     const data = await apiresult.json();

//     const text = data.candidates[0].content.parts[0].text;
//     console.log(data);
//     res.send(text);
//   } catch (err) {
//     console.log(`error while processing the data`, err);
//     res.status(500).send({ error: "failed to fetch data " });
//   }
// });
