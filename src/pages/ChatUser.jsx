import React, { useContext, useEffect, useState}  from 'react';
import { Box, useMediaQuery,
    Typography, Divider, useTheme, IconButton,
    InputBase
} from "@mui/material";
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    Twitter,
    LinkedIn,
  } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import WidgetWrapper from '../components/users/styledComponents/WidgetWrapper';
import FlexBetween from '../components/users/styledComponents/FlexBetween';
import { Search } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useParams } from 'react-router-dom';
import UserAvatar from '../components/users/styledComponents/UserAvatar';
import SideBar from '../components/chatUser/SideBar';
import ChatView from '../components/chatUser/ChatView';
import ChatProfile from '../components/chatUser/ChatProfile';


function ChatUser() {

    const navigate = useNavigate();
    let [chatId, setChatId] = useState(null)
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isListOpen, setIsListOpen] = useState(false);
    const classes = useStyles();
    const { palette } = useTheme();
    const { dark, medium, main } = palette.neutral;

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const serverUrl =
    process.env.REACT_APP_ENV === "Development"
      ? "http://localhost:3001/"
      : process.env.REACT_APP_SERVER_URL;
    
    const handleBlur = async (e) => {
        const t = setTimeout(() => setIsListOpen(false), 500);
        clearTimeout(t);
      };
    const handleClick = async (username, e) => {
        e.preventDefault();
        navigate(`/profile/${username}`);
        navigate(0);
      };
    const getSuggestions = async () => {
        const responseData = await fetch(
          serverUrl + `u?searchInput=${searchInput}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          }
        );
        if (responseData.ok) {
          const data = await responseData.json();
          setLoading(false);
          setSuggestions(data);
        } else {
          setLoading(false);
          setSuggestions([]);
        }
      };
    const handleSearchClick = () => {
        if (searchInput.length) {
          setIsListOpen(true);
        }
      };
    
    const handleChange = (event) => {
        setLoading(true);
        setSearchInput(event.target.value);
        if (searchInput.trim().length > 0) {
          setIsListOpen(true);
        } else {
          setIsListOpen(false);
        }
      };
    
    useEffect(() => {
        if (isListOpen) {
          if (searchInput.trim().length > 0) {
            getSuggestions();
          }
        }
      }, [searchInput]);
      const bg = palette.background.alt;

    useEffect(() => {
        setChatId(id)
    },[id])
  return (
    <Box
    width="100%"
    padding="4rem 2%"
    display={isNonMobileScreens ? "flex" : "block"}
    gap="0.5rem"
    justifyContent="space-between"
    sx={{position: "fixed",top: "0"  }}
  >
    <Box flexBasis={isNonMobileScreens ? "26%" : undefined} 
    display={isNonMobileScreens ? "flex" : "none"}
    >
    <SideBar />
    </Box>
    
    

    <Box
      flexBasis={isNonMobileScreens ? "48%" : undefined}
      mt={isNonMobileScreens ? undefined : "2rem"}
      >
      <Box style={{ height: "90vh", overflowY: "auto", }}
       sx={{
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
      >
       <ChatView id = {chatId} />
      {/* <MyPostWidget profilePhotoUrl={auth?.avatar} />
      <PostsWidget username={auth?.fullName} /> */}
      </Box>
    </Box>
    {isNonMobileScreens && (
      <Box flexBasis="26%">
        <ChatProfile />
        {/* <AdWidget /> */}
        {/* <Box m="1rem 0" />
        <Box style={{ maxHeight: "48vh", overflowY: "auto", }}
       sx={{
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}>
        <FollowingListWidget username={auth?.fullName} />
        </Box> */}
      </Box>
    )}
  </Box>
  )
}

const useStyles = makeStyles((theme) => ({
    input: {
      "&:focus": {
        borderColor: "transparent",
        boxShadow: "none",
      },
    },
  }));

export default ChatUser