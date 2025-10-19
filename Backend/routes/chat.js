import express from "express";
const router = express.Router();
import Thread from "../models/Thread.js";
import getGeminiAPIResponse from "../utils/gemini.js";

//test
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "914",
      title: "Testing new Thread-4",
    });

    const response = await thread.save();
    res.send(response);
  } catch (err) {
    console.log("faild to connect the test route", err);
    res.status(500).json({ error: "failed to save in DB" });
  }
});

//get all the threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    console.log(threads);
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch the all the threads" });
  }
});

//to get specific thread
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });

    if (!thread) {
      res.status(404).json({ error: "Thread not found" });
    }

    console.log(thread);
    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch this thread" });
  }
});

//to delete specific thread
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });

    if (!deletedThread) {
      res.status(404).json({ error: "Thread not found" });
    }
    res.status(200).json({ success: "Thread was deleted" });

    console.log(deletedThread);
    // res.json(deletedThread);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to delete this thread" });
  }
});

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    res.status(404).json({ error: "missing the required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      //creating the new thread in database
      thread = new Thread({
        threadId,
        title: message,
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

    const modelReply = await getGeminiAPIResponse(message);

    thread.messages.push({
      role: "model",
      content: modelReply,
    });
    thread.updatedAt = new Date();

    await thread.save();
    res.json({ reply: modelReply });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "something went wrong" });
  }
});

export default router;
