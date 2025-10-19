import "./App.css";
import Chat from "./Chat";
import Chatwindow from "./ChatWindow";
import Sidebar from "./Sidebar";
import { MyContext } from "./MyContext";

function App() {
  const providerValues = {}; //pasiing values
  return (
    <div className="app">
      <MyContext.Provider value={providerValues}>
        <Sidebar></Sidebar>
        <Chatwindow></Chatwindow>
      </MyContext.Provider>
    </div>
  );
}

export default App;
