import "./Chat.css";
import { useContext } from "react";
import { MyContext } from "./MyContext";

function Chat() {
  const { newChat, prevChats } = useContext(MyContext);
  return (
    <>
      {newChat && <h1>Start a new chat!!</h1>}
      <div className="chats">
        {prevChats?.map((chat, idx) => (
          <div
            className={chat.role === "user" ? "userDiv" : "modelDiv"}
            key={idx}
          >
            {chat.role === "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <p className="modelMessage">{chat.content}</p>
            )}
          </div>
        ))}

        {/* <div className="userDiv">
          <p className="userMessage"> User message</p>
        </div>
        <div className="modelDiv">
          <p className="modelMessage">Model message</p>
        </div> */}
      </div>
    </>
  );
}

export default Chat;
