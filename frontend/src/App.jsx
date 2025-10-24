import "./App.css";
import Chat from "./Chat";
import Chatwindow from "./ChatWindow";
import Sidebar from "./Sidebar";
import { MyContext } from "./MyContext";
import { useState } from "react";
import { v1 as uuid } from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuid());
  const [prevChats, setPrevChats] = useState([]); //storing all chats of curent thread
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

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
  }; //pasiing values

  return (
    <div className="app">
      <MyContext.Provider value={providerValues}>
        <Sidebar></Sidebar>
        <Chatwindow></Chatwindow>
      </MyContext.Provider>
    </div>
  );
}

export default App;
