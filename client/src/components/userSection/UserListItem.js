import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getSelectedUser } from "../../redux/actions/userAction";
import ScrollArea from "react-scrollbar";
const UserListItem = ({ items }) => {
  const [currentSelected, setCurrentSelected] = useState();
  const [color, setColor] = useState("");
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const handleClick = (item, idx) => {
    setCurrentSelected(item);
    dispatch(getSelectedUser(item));
  };

  return (
    <div className="user_list">
      {items.map((item, idx) => {
        return (
          <div
            className="userProfile"
            onClick={() => handleClick(item, idx)}
            key={idx}
          >
            <Box w="100%" p={4} color="black" backgroundColor={color}>
              <div className="box">
                <div className="avatar">
                  <Avatar src={item.pic} />
                </div>
                <div className="content">
                  <h1>{item.name}</h1>
                  <h2>{item.lastMessage}</h2>
                </div>
              </div>
            </Box>
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

export default UserListItem;
