import express from "express";
const router = express.Router();
import Thread from "../models/Thread.js";


//test
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "91120",
      title: "Testing new Thread-3",
    });

    const response = await thread.save();
    res.send(response);
  } catch (err) {
    console.log("faild to connect the test route", err);
    res.status(500).json({ error: "failed to save in DB" });
  }
});

export default router;
