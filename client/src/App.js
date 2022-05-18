import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chats/Chat";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/chats" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
