import express from "express";
const router = express.Router();
import Thread from "../models/Thread.js";
import getGeminiAPIResponse from "../utils/gemini.js";
import authMiddleware from "../middleware/auth.js";

// //test
// router.post("/test", async (req, res) => {
//   try {
//     const thread = new Thread({
//       threadId: "9140",
//       title: "Testing new Thread-74",
//     });

//     const response = await thread.save();
//     res.send(response);
//   } catch (err) {
//     console.log("failed to connect the test route", err);
//     return res.status(500).json({ error: "failed to save in DB" });
//   }
// });

//get all the threads
router.get("/thread", authMiddleware, async (req, res) => {
  try {
    // const threads = await Thread.find({}).sort({ updatedAt: -1 });
    const threads = await Thread.find({ userId: req.userId }).sort({
      updatedAt: -1,
    });
    console.log(threads);

    res.json(threads);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "failed to fetch the all the threads" });
  }
});

//to get specific thread
router.get("/thread/:threadId", authMiddleware, async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId, userId: req.userId });

    if (!thread) {
      return res
        .status(404)
        .json({ error: "Thread not found or access denied" });
    }

    console.log(thread);
    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "failed to fetch this thread" });
  }
});

//to delete specific thread
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

    console.log(deletedThread);
    // res.json(deletedThread);
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
    // let thread = await Thread.findOne({ threadId });
    let thread = await Thread.findOne({ threadId, userId: req.userId });

    if (!thread) {
      //creating the new thread in database
      thread = new Thread({
        threadId,
        title: message.length > 40 ? message.slice(0, 40) + "..." : message,
        userId: req.userId,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });
    } else {
      thread.messages.push({
        role: "user",
        content: message,
      });
    }

    let modelReply;
    try {
      modelReply = await getGeminiAPIResponse(message);
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
