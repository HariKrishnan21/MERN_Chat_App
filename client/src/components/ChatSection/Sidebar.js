import React, { useEffect, useState } from "react";
import "./Chatsection.css";
import { Avatar, IconButton, Divider } from "@chakra-ui/react";
import { BellIcon, AddIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import SearchIcon from "@mui/icons-material/Search";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../../redux/actions/userAction";
import Allchats from "../userSection/Allchats";
import axios from "axios";
const Sidebar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  //const [user, setUser] = useState();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.data.user);
  console.log(search);
  useEffect(() => {
    if (User && !User.data) {
      dispatch(getSingleUser());
    }
  }, [dispatch]);
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const searchHandler = async (searchValue) => {
    setSearch(searchValue);
    const result = await axios.post(
      `http://localhost:5000/api/user/search?name=${searchValue}`,
      User
    );
    setSearchResult(result.data);
    //const data = result.data;
    console.log(searchResult);
  };

  //console.log(User);
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Menu>
          <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
            <Avatar size="sm" cursor="pointer" src={User.pic} />
          </MenuButton>
          <MenuList>
            <ProfileModal user={User}>
              <MenuItem>My Profile</MenuItem>
            </ProfileModal>
            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
        <div className="sidebar_headerRight">
          <IconButton sx={{ marginRight: "10px" }}>
            <AddIcon />
          </IconButton>
          <IconButton>
            <BellIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchIcon />
          <input
            placeholder="Search or start new chat"
            type="text"
            value={search}
            onChange={(e) => searchHandler(e.target.value)}
          />
        </div>
      </div>
      <Divider />
      <div className="sidebar_body">
        <div className="sidebar_bodyContainer">
          <Allchats searchResult={searchResult} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
