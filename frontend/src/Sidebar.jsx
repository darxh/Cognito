import Chatwindow from "./ChatWindow";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div>
      <section className="sidebar">
        
        {/* new chat button */}
        <button>
          <img src="src/assets/blacklogo.png" className="logo" alt="logo" />
          <span>
            <i className="fa-solid fa-pen-to-square" id="new"></i>
          </span>
        </button>

        {/* history */}
        <ul className="history">
          <li>history1</li>
          <li>history2</li>
          <li>history3</li>
        </ul>

        {/* sign */}
        <div className="sign">
          <p>By drash &hearts;</p>
        </div>
      </section>
    </div>
  );
}

export default Sidebar;
