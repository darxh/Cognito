import "./Chat.css";
import { useContext, useRef, useEffect } from "react";
import { MyContext } from "../../context/MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, prevChats } = useContext(MyContext);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const el = chatContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [prevChats]);

  const username = localStorage.getItem("username") || "there";

  return (
    <div className="chats" ref={chatContainerRef}>
      {newChat && (
        <div className="welcome-message">
          <h1>Hello, {username}</h1>
          <p>What can I do for you today?</p>
        </div>
      )}

      {prevChats.map((chat, idx) => (
        <div
          key={idx}
          className={chat.role === "user" ? "userDiv" : "modelDiv"}
        >
          {chat.role === "user" ? (
            <p className="userMessage">{chat.content}</p>
          ) : (
            <div className="modelMessage">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {chat.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Chat;
