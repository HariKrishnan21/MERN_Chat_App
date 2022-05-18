import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Chatinput from "./Chatinput";
import $ from "jquery";
const Chatmessage = ({ socket, messages, setMessages }) => {
  const loggedUser = useSelector((state) => state.data.user);
  const currentChat = useSelector((state) => state.data.selectedUser);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  useEffect(() => {
    if (currentChat) {
      fetchMsg();
    }
  }, [currentChat]);
  const fetchMsg = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/message/getmsg",
      {
        from: loggedUser._id,
        to: currentChat._id,
      }
    );
    setMessages(response.data);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="chat-messages">
      {messages.map((message) => {
        return (
          <div ref={scrollRef} key={message._id}>
            <div
              className={`message ${message.fromSelf ? "sended" : "recieved"}`}
            >
              <div className="content ">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chatmessage;
