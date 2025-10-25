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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      // console.log(filteredData);
      setAllThreads(filteredData);
    } catch (err) {
      console.error("Error fetching all threads:", err);
    }
  };

  useEffect(() => {
    getAllthreads();
  }, []);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  };

  const changethread = async (newthreadId) => {
    setCurrThreadId(newthreadId);

    try {
      let response = await fetch(
        `http://localhost:8080/api/thread/${newthreadId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      console.log("Fetched messages for thread:", res);
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
      setPrompt("");
    } catch (err) {
      console.error("Error fetching thread details:", err);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      let response = await fetch(
        `http://localhost:8080/api/thread/${threadId}`,
        { method: "DELETE" }
      );
      const res = await response.json();
      console.log("Fetched messages for thread:", res);

      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId)
      );

      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (err) {
      console.error("Error in deleting this thread:", err);
    }
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
            <li
              key={idx}
              onClick={() => changethread(thread.threadId)}
              className={thread.threadId === currThreadId ? "highlighted" : ""}
            >
              {thread.title}
              <i
                className=" fa-solid fa-trash"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteThread(thread.threadId);
                }}
              ></i>
            </li>
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
