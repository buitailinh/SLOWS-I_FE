import React, { useContext, useEffect, useState} from 'react';
import WidgetWrapper from '../users/styledComponents/WidgetWrapper';
import FlexBetween from '../users/styledComponents/FlexBetween';
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
import { useNavigate, useParams } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import UserAvatar from '../../components/users/styledComponents/UserAvatar';
import api from '../../utils/api';
import { AppContext } from '../../utils/context';
import { ChatUserRoute} from '../../utils/APIRoutes';
import ListUserChat from './ListUserChat';
import socket from '../../utils/socket';
import { getMsgNotificationDetail } from '../../utils/firebase';



function SideBar() {


    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isListOpen, setIsListOpen] = useState(false);
    const [listMsg, setListMsg] = useState([]);
    const { id } = useParams();
    const [numNotifications, setNumNotifications] = useState([]);
   
    const { info } = useContext(AppContext);
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

    const getListMsg = async() =>{
        const res = await api.get(ChatUserRoute);
        if(res.status === 200){
            const data = res.data.data;
            setListMsg(data);
        }
    }

    const numNotification = async(userId, msgId) =>{
      const num = await  getMsgNotificationDetail(userId, msgId);
      return num;
  }

  const fetchData = async () => {
    const notifications = await Promise.all(
      listMsg.map((msg) => numNotification(info.userId, msg._id))
    );
    setNumNotifications(notifications);

    // console.log('dataaaa', notifications);
  };

  useEffect(() =>{
    if(info)
        getListMsg();
    socket.on('recieve-msg',async(response)=>{
      const isOneInArray = response.users.includes(info?.userId);
      if(isOneInArray)
        getListMsg();
    } )
}, [info]);


  useEffect(() => {
    if(info){
      fetchData();

      if(!id){
        const index = numNotifications.indexOf(0);
        if(listMsg.length !==0){
        if(index>=0){
          const msgId = listMsg[index];
          // console.log('ton tai', msgId)
          navigate(`/chat/${msgId._id}`);
        } else{
          const msgId = listMsg[0];
          // console.log('ko ton tai', msgId)
          navigate(`/chat/${msgId._id}`);
        }
      }
      }
    }
    

    
  }, [listMsg]);

    
    useEffect(() => {
        if (isListOpen) {
          if (searchInput.trim().length > 0) {
            getSuggestions();
          }
        }
      }, [searchInput]);

 
  return (
    <WidgetWrapper className=' w-full mt-0' >
      {/* <div className='fixed -translate-x-6'> */}
      <FlexBetween gap="0.5rem" pb="0.2rem">
        <FlexBetween className='ml-2'>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h4" className=' text-inherit'>Chat</Typography>
      <Box>
        
      </Box>
    </Box>
   
        </FlexBetween>
       <FlexBetween>
        <Box marginRight="10px">
        <img className=' w-5 h-5 ' src="https://img.icons8.com/external-those-icons-fill-those-icons/24/null/external-Menu-interface-those-icons-fill-those-icons-2.png"/>
        </Box>
        <ManageAccountsOutlined />
        </FlexBetween>
     
      </FlexBetween>
      <Box
    sx={{
      position: "relative",
      display: "flex",
      justifyContent: "center",
      paddingBottom: "0.5rem"
    }}
  >
  {isNonMobileScreens ? (
    <FlexBetween
      backgroundColor={"#F0F0F0"}
      borderRadius="9px"
      gap="3rem"
      padding="0.1rem 1.5rem"
    >
      <InputBase
        onBlur={handleBlur}
        value={searchInput}
        onChange={handleChange}
        placeholder="Search..."
        focused
        style={{
            border: "none",
            borderBottom: "1px solid #ccc",
            outline: "none",
          }}
          sx={{
            flexGrow: 1,
            mr: 1,
          }}
        disableUnderline={true}
        classes={{ input: classes.input }}
      />
      <IconButton onClick={handleSearchClick}>
        <Search />
      </IconButton>
    </FlexBetween>
  ) : (
    <FlexBetween
    borderRadius="9px"
    padding="0.1rem 0.1rem"
  >
    <InputBase
      classes={{ input: classes.input }}
      onBlur={handleBlur}
      value={searchInput}
      disableUnderline={true}
      onChange={handleChange}
      placeholder="Search..."

      style={{
          border: "none",
          borderBottom: "1px solid #ccc",
          outline: "none",
          size: "14px",
        }}
      sx={{
          border: 'none',
      }}
    />
    <IconButton onClick={handleSearchClick}>
      <Search />
    </IconButton>
  </FlexBetween>
  )}

    {isListOpen ? (
      <List
        id="search-list"
        sx={{
          overflow: "visible",
          position: "absolute",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          bgcolor: bg,
          mt: 5.8,
          width: "250px",
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: "50%",
            left: "50%",
            width: 10,
            height: 10,
            bgcolor: bg,
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        }}
      >
        {suggestions.length ? (
          suggestions.map(({ username, profilePhotoUrl, occupation }, i) => (
            <MenuItem
              key={uuidv4()}
              onClick={(e) => handleClick(username, e)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#858585",
                  borderRadius: "0.8rem",
                },
              }}
            >
              <FlexBetween gap="1rem">
                <UserAvatar image={profilePhotoUrl} size="32px" />
                <Box sx={{ cursor: "pointer"}}>
                  <Typography color={"#E0E0E0"} variant="h5" fontWeight="500" sx={{ cursor: "pointer" }}>
                    {username.length > 17
                      ? `${username.substring(0, 17)}...`
                      : username}
                  </Typography>
                  <Typography color={"#A3A3A3"} fontSize="0.75rem" sx={{ cursor: "pointer" }}>
                    {occupation.length > 17
                      ? `${occupation.substring(0, 17)}...`
                      : occupation}
                  </Typography>
                </Box>
              </FlexBetween>
            </MenuItem>
          ))
        ) : (
          <MenuItem
            sx={{
              cursor: "default",
              display: "flex",
              justifyContent: "center",
              height: "200px",
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No Results
              </Typography>
            )}
          </MenuItem>
        )}
      </List>
    ) : null}
      </Box>

      <Divider />
      <Box style={{ height: "75vh", overflowY: "auto", marginTop: "0.5rem"}}
       sx={{
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}>
       <ListUserChat listMsg={listMsg} numNoti={numNotifications} />
        
      {/* <UserWidget username={auth?.fullName} profilePhotoUrl={auth?.avatar} /> */}
      {/* </div> */}
      </Box>
      </WidgetWrapper>
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

export default SideBar