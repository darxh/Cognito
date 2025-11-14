import express from "express";
const router = express.Router();
import Thread from "../models/Thread.js";
import getGeminiAPIResponse from "../utils/gemini.js";
import authMiddleware from "../middleware/auth.js";

router.get("/thread", authMiddleware, async (req, res) => {
  try {
    const threads = await Thread.find({ userId: req.userId }).sort({
      updatedAt: -1,
    });

    res.json(threads);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "failed to fetch the all the threads" });
  }
});

router.get("/thread/:threadId", authMiddleware, async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId, userId: req.userId });

    if (!thread) {
      return res
        .status(404)
        .json({ error: "Thread not found or access denied" });
    }

    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "failed to fetch this thread" });
  }
});

router.delete("/thread/:threadId", authMiddleware, async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedThread = await Thread.findOneAndDelete({
      threadId,
      userId: req.userId,
    });

    if (!deletedThread) {
      return res
        .status(404)
        .json({ error: "Thread not found or access denied" });
    }

    return res.status(200).json({ success: "Thread was deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "failed to delete this thread" });
  }
});

router.post("/chat", authMiddleware, async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "missing the required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId, userId: req.userId });

    if (!thread) {
      thread = new Thread({
        threadId,
        title: message.length > 40 ? message.slice(0, 40) + "..." : message,
        userId: req.userId,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({
        role: "user",
        content: message,
      });
    }

    const formattedHistory = thread.messages
      .map((msg) => {
        return `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`;
      })
      .join("\n");

    const finalPrompt = `${formattedHistory}\nUser: ${message}\nAI:`;

    let modelReply;
    try {
      modelReply = await getGeminiAPIResponse(finalPrompt);
    } catch (error) {
      console.error("Gemini API error:", error);
      modelReply = "Sorry, I'm having trouble connecting right now.";
    }

    thread.messages.push({
      role: "model",
      content: modelReply,
    });

    thread.updatedAt = new Date();

    await thread.save();

    res.json({ reply: modelReply });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

export default router;
