import React, { useState } from "react";
import { Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
const Chatheader = () => {
  const selectedUser = useSelector((state) => state.data.selectedUser);
  //console.log("chatheader " + selectedUser);
  const [check, setCheck] = useState(false);
  const handleClick = () => {
    setCheck(true);
  };
  return (
    <div className="chatHeader">
      <div className="chatHeader_avatar">
        <ProfileModal user={selectedUser} />
      </div>
      <div className="chatHeader_details">{selectedUser.name}</div>
    </div>
  );
};

export default Chatheader;
