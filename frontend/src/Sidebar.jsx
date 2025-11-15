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
        `https://cognito-backend-igvt.onrender.com/api/thread/${threadId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok)
        throw new Error(`Error deleting thread: ${response.status}`);

      // 1. Instant UI Update
      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId)
      );

      // 2. Logic: Keep sidebar OPEN if deleting current chat
      if (threadId === currThreadId) {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        const newId = uuidv1();
        setCurrThreadId(newId);
        setPrevChats([]);
      }

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
            className={thread.threadId === currThreadId ? "highlighted" : ""}
            onClick={() => changethread(thread.threadId)}
          >
            {/* Wrapper for text to handle long titles properly */}
            <span className="thread-title">{thread.title}</span>

            {/* Delete Button wrapped properly for touch targets */}
            <button
              className="deleteBtn"
              onClick={(e) => {
                e.stopPropagation(); // Stops sidebar from closing/switching
                if (
                  window.confirm("Are you sure you want to delete this chat?")
                ) {
                  deleteThread(thread.threadId);
                }
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
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
