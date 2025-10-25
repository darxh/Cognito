// import "./Chat.css";
// import { useContext, useState, useEffect } from "react";
// import { MyContext } from "./MyContext";
// import ReactMarkdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";

// function Chat() {
//   const { newChat, prevChats, reply } = useContext(MyContext);
//   const [latestReply, setLatestReply] = useState("");

//   useEffect(() => {
//     if (!reply) {
//       setLatestReply("");
//       return;
//     }

//     // if (!prevChats?.length) return;

//     const content = reply.split(" ");
//     let idx = 0;

//     const interval = setInterval(() => {
//       setLatestReply(content.slice(0, idx + 1).join(" "));

//       idx++;
//       if (idx >= content.length) {
//         clearTimeout(interval);
//       }
//     }, 40);

//     return () => clearInterval(interval);
//   }, [reply]);

//   return (
//     <>
//       {newChat && <h1>Start a new chat!!</h1>}
//       <div className="chats">
//         {prevChats?.map((chat, idx) => (
//           <div
//             className={chat.role === "user" ? "userDiv" : "modelDiv"}
//             key={idx}
//           >
//             {chat.role === "user" ? (
//               <p className="userMessage">{chat.content}</p>
//             ) : (
//               <ReactMarkdown rehypePlugins={rehypeHighlight}>
//                 {chat.content}
//               </ReactMarkdown>
//             )}
//           </div>
//         ))}

//         {prevChats.length > 0 && (
//           <>
//             {latestReply === null ? (
//               <div className="modelDiv" key={"non-typing"}>
//                 <ReactMarkdown rehypePlugins={rehypeHighlight}>
//                   {prevChats[prevChats.length - 1].content}
//                 </ReactMarkdown>
//               </div>
//             ) : (
//               <div className="modelDiv" key={"typing"}>
//                 <ReactMarkdown rehypePlugins={rehypeHighlight}>
//                   {latestReply}
//                 </ReactMarkdown>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default Chat;

import "./Chat.css";
import { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, prevChats, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!reply) {
      setLatestReply("");
      setIsAnimating(false);
      return;
    }

    setIsAnimating(true);
    setLatestReply("");
    const content = reply.split(" ");
    let idx = 0;

    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));

      idx++;
      if (idx >= content.length) {
        clearTimeout(interval);
        setIsAnimating(false);
      }
    }, 40);

    return () => {
      clearInterval(interval);
      setIsAnimating(false);
    };
  }, [reply]);

  //auto scroll effect
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [prevChats, latestReply]);

  return (
    <>
      {newChat && <h1>Start a new chat!!</h1>}
      <div className="chats" ref={chatContainerRef}>
        {prevChats?.map((chat, idx) => (
          <div
            className={chat.role === "user" ? "userDiv" : "modelDiv"}
            key={idx}
          >
            {chat.role === "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <ReactMarkdown rehypePlugins={rehypeHighlight}>
                {chat.content}
              </ReactMarkdown>
            )}
          </div>
        ))}

        {isAnimating && latestReply && (
          <div className="modelDiv" key="animating-reply">
            <ReactMarkdown rehypePlugins={rehypeHighlight}>
              {latestReply}
            </ReactMarkdown>
          </div>
        )}
        
      </div>
    </>
  );
}

export default Chat;
