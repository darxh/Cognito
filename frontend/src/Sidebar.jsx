import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
  const {
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChats,
    allThreads,
    setAllThreads,
  } = useContext(MyContext);

  const getAllthreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      console.log(filteredData);
      setAllThreads(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllthreads();
  }, []);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt(" ");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  };

  return (
    <div>
      <section className="sidebar">
        <button onClick={createNewChat}>
          <img src="src/assets/blacklogo.png" className="logo" alt="logo" />
          <span>
            <i className="fa-solid fa-pen-to-square" id="new"></i>
          </span>
        </button>

        <ul className="history">
          {allThreads?.map((thread, idx) => (
            <li key={idx}>{thread.title}</li>
          ))}
        </ul>

        <div className="sign">
          <p>By drash &hearts;</p>
        </div>
      </section>
    </div>
  );
}

export default Sidebar;
