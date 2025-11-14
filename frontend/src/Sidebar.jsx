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
    getAllthreads,
    fetchThreadMessages,
  } = useContext(MyContext);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllthreads();
  }, [getAllthreads]);

  const createNewChat = async () => {
    document.querySelector(".sidebar")?.classList.remove("open");
    document.querySelector(".overlay")?.classList.remove("active");
    setNewChat(true);
    setPrompt("");
    setReply(null);

    const newId = uuidv1();
    setCurrThreadId(newId);
    setPrevChats([]);
    await getAllthreads();
  };

  const changethread = async (newthreadId) => {
    document.querySelector(".sidebar")?.classList.remove("open");
    document.querySelector(".overlay")?.classList.remove("active");

    setCurrThreadId(newthreadId);
    setNewChat(false);

    await fetchThreadMessages(newthreadId);
    setReply(null);
    setPrompt("");
    await getAllthreads();
  };

  const deleteThread = async (threadId) => {
    try {
      let response = await fetch(
        `http://localhost:8080/api/thread/${threadId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok)
        throw new Error(`Error deleting thread: ${response.status}`);

      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId)
      );

      if (threadId === currThreadId) createNewChat();

      await getAllthreads();
    } catch (err) {
      console.error("Error deleting thread:", err);
    }
  };

  return (
    <section className="sidebar">
      <div className="sidebar-header">
        <div className="newChatBtn" onClick={createNewChat}>
          <img
            src="https://i.postimg.cc/SxYnKTyw/blacklogo.png"
            className="logo"
            alt="logo"
          />
          <i className="fa-solid fa-pen-to-square"></i>
        </div>
      </div>

      <ul className="history">
        {allThreads?.map((thread) => (
          <li
            key={thread.threadId}
            onClick={() => changethread(thread.threadId)}
            className={thread.threadId === currThreadId ? "highlighted" : ""}
          >
            {thread.title}
            <i
              className="fa-solid fa-trash deleteBtn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}
            ></i>
          </li>
        ))}
      </ul>

      <div className="sign">
        <p>By darsh ♥</p>
      </div>
    </section>
  );
}

export default Sidebar;
