import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { BsFillEmojiLaughingFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";
const Chatinput = ({
  socket,
  currentUser,
  selectedUser,
  messages,
  setMessages,
}) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const loggedUser = useSelector((state) => state.data.user);
  const currentChat = useSelector((state) => state.data.selectedUser);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };
  const sendChat = async (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      socket.current.emit("send-msg", {
        to: selectedUser._id,
        from: currentUser._id,
        msg,
      });
      await axios.post("http://localhost:5000/api/message/addmsg", {
        from: currentUser._id,
        to: selectedUser._id,
        message: msg,
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
      setMsg("");
    }
  };

  return (
    <div className="chatInput">
      <div className="chatInputEmoji">
        <BsFillEmojiLaughingFill
          style={{ fontSize: "25px", marginTop: "7px" }}
          onClick={handleEmojiPickerhideShow}
        />
        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
      </div>
      <div className="chatInputField">
        <form onSubmit={(event) => sendChat(event)}>
          <input
            type="text"
            placeholder="Type a message"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button type="submit">
            <IoMdSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatinput;
