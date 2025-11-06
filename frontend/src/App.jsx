import "./App.css";
import Chatwindow from "./ChatWindow";
import Sidebar from "./Sidebar";
import { MyContext } from "./MyContext";
import { useState, useCallback } from "react";
import { v1 as uuidv1 } from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const token = localStorage.getItem("token");

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  // Fetch all threads
  const getAllthreads = useCallback(async () => {
    if (!token) return console.error("No token found — user not authenticated"); // 🔧 changed
    try {
      const response = await fetch(`${BACKEND_URL}/api/thread`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const res = await response.json();
      const sortedThreads = res
        .map((thread) => ({
          threadId: thread.threadId,
          title: thread.title,
          updatedAt: thread.updatedAt,
        }))
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setAllThreads(sortedThreads);
    } catch (err) {
      console.error("Error fetching all threads:", err);
    }
  }, [setAllThreads, token, BACKEND_URL]);

  // Fetch messages from a specific thread
  const fetchThreadMessages = async (threadId) => {
    if (!token) return console.error("No token found — user not authenticated"); // 🔧 changed
    try {
      const response = await fetch(`${BACKEND_URL}/api/thread/${threadId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setPrevChats(data);
    } catch (err) {
      console.error("Error fetching thread messages:", err);
    }
  };

  // Send message to backend
  const sendMessage = async () => {
    if (!prompt.trim()) return;
    if (!token) return console.error("No token found — user not authenticated"); // 🔧 changed
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          threadId: currThreadId,
          message: prompt,
        }),
      });

      const data = await response.json();
      setReply(data.reply);
      setPrompt("");
      getAllthreads();

      return data;
    } catch (err) {
      console.error("Error sending message:", err);
      throw err;
    }
  };

  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    allThreads,
    setAllThreads,
    getAllthreads,
    sendMessage,
    fetchThreadMessages,
  };

  return (
    <div className="app">
      <MyContext.Provider value={providerValues}>
        <Sidebar />
        <Chatwindow />
      </MyContext.Provider>
    </div>
  );
}

export default App;
