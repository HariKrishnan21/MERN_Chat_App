import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Chatheader from "./Chatheader";
import Chatinput from "./Chatinput";
import Chatmessage from "./Chatmessage";
import { io } from "socket.io-client";
import "./Chatsection.css";
import EmptyChat from "./EmptyChat";
const Chatpage = () => {
  const selectedUser = useSelector((state) => state.data.selectedUser);
  const currentUser = useSelector((state) => state.data.user);
  const [messages, setMessages] = useState([]);
  const socket = useRef();
  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:5000", {
        transports: ["websocket", "polling", "flashsocket"],
      });
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  return (
    <div className="chatPage">
      {selectedUser._id ? (
        <>
          <Chatheader />
          <Chatmessage
            socket={socket}
            messages={messages}
            setMessages={setMessages}
          />
          <Chatinput
            socket={socket}
            currentUser={currentUser}
            selectedUser={selectedUser}
            messages={messages}
            setMessages={setMessages}
          />
        </>
      ) : (
        <EmptyChat />
      )}
    </div>
  );
};

export default Chatpage;
