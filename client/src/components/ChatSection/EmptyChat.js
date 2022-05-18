import React from "react";
import Image from "../../assets/image.png";
const EmptyChat = () => {
  return (
    <div className="emptyChat">
      <div className="emptyChatImage">
        <img src={Image} />
      </div>
    </div>
  );
};

export default EmptyChat;
