import React from "react";
import Sidebar from "../../components/ChatSection/Sidebar";
import Chatpage from "../../components/ChatSection/Chatpage";
import "./Chat.css";
const Chat = () => {
  return (
    <div className="chat">
      <div className="chat_header">
        <Sidebar />
        <Chatpage />
      </div>
    </div>
  );
};

export default Chat;
