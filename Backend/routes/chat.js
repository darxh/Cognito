import express from "express";
const router = express.Router();
import Thread from "../models/Thread.js";

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

export default router;
