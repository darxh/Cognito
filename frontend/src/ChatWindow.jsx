import Chat from "./Chat";
import "./Chatwindow.css";

function Chatwindow() {
  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          Cognito<i class="fa-solid fa-angle-down"></i>
        </span>
        <div className="userIcon">
          <span>
            <i class="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      <Chat />

      <div className="chatInput">
        <div className="userInput">
          <input type="text" placeholder="Ask anything" />
          <div id="submit">
            <i class="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">Gognito can make mistakes, so double-check it</p>
      </div>
    </div>
  );
}

export default Chatwindow;
