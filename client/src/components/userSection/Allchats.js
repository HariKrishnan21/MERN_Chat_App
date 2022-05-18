import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserListItem from "./UserListItem";
import "./userSection.css";

const Allchats = ({ searchResult }) => {
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [contacts, setContacts] = useState([]);
  const toast = useToast();
  useEffect(() => {
    fetchChats();
  }, []);
  const fetchChats = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/user/allUsers/${loggedUser._id}`
      );
      setContacts(data);
      console.log(contacts);
      //setChats(data); want to store in redux
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      console.log(error);
    }
  };

  return (
    <div className="user-list-item">
      {searchResult.length > 0 ? (
        <UserListItem items={searchResult} />
      ) : (
        <UserListItem items={contacts} />
      )}
    </div>
  );
};

export default Allchats;
