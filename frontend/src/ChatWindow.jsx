import { useContext, useState, useEffect } from "react";
import Chat from "./Chat";
import "./ChatWindow.css";
import { MyContext } from "./MyContext";
import { ScaleLoader } from "react-spinners";

function Chatwindow() {
  const { prompt, setPrompt, reply, prevChats, setPrevChats, sendMessage } =
    useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    setPrevChats((prevChats) => [
      ...prevChats,
      { role: "user", content: prompt },
    ]);

    setLoading(true);

    try {
      await sendMessage();
    } catch (err) {
      console.error("Error while sending:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        { role: "model", content: reply },
      ]);
      setPrompt("");
    }
  }, [reply]);

  const handleProfileClick = () => setIsOpen(!isOpen);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");
    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");
  };

  const closeSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <div className="leftNav">
          <i className="fa-solid fa-bars hamburger" onClick={toggleSidebar}></i>

          <span className="appTitle">
            Cognito <i className="fa-solid fa-angle-down"></i>
          </span>
        </div>

        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            <i className="fa-solid fa-gear"></i> Settings
          </div>
          <div className="dropDownItem">
            <i className="fa-solid fa-circle-up"></i> Upgrade Plan
          </div>
          <div className="dropDownItem" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket"></i> Log Out
          </div>
        </div>
      )}

      <Chat />

      {loading && (
        <div className="loader-container">
          <ScaleLoader color="#ffffff" loading={true} />
        </div>
      )}

      <div className="chatInput">
        <div className="inputBox">
          <input
            type="text"
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <div id="submit" onClick={handleSend}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">Cognito can make mistakes, so double-check it</p>
      </div>

      <div className="overlay" onClick={closeSidebar}></div>
    </div>
  );
}

export default Chatwindow;
