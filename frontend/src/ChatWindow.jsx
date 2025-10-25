import { useContext, useState, useEffect } from "react";
import Chat from "./Chat";
import "./Chatwindow.css";
import { MyContext } from "./MyContext";
import { HashLoader, ScaleLoader } from "react-spinners";

function Chatwindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    prevChats,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    setLoading(true);
    setNewChat(false);

    console.log("message", prompt, "threadId", currThreadId);
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      const result = await response.json();
      console.log("recived resilt:", result);
      setReply(result.reply);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  //append new chat to prevchats
  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "model",
          content: reply,
        },
      ]);
    }
    setPrompt("");
  }, [reply]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen)
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          Cognito<i className="fa-solid fa-angle-down"></i>
        </span>
        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="dropDown">
          {/* <div className="dropDownItem">user email here</div> */}
          <div className="dropDownItem">
            <i className="fa-solid fa-gear"></i>Settings
          </div>
          <div className="dropDownItem">
            <i class="fa-solid fa-circle-up"></i>Upgarde Plan
          </div>
          <div className="dropDownItem">
            <i class="fa-solid fa-right-from-bracket"></i>Log Out
          </div>
        </div>
      )}

      <Chat />

      <ScaleLoader color="#fff" loading={loading}></ScaleLoader>
      <div className="chatInput">
        <div className="inputBox">
          <input
            type="text"
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" ? getReply() : "";
            }}
          />
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">Gognito can make mistakes, so double-check it</p>
      </div>
    </div>
  );
}

export default Chatwindow;
