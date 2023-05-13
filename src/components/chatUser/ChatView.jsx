import React,  { useState, useRef, useEffect,useContext , useLayoutEffect} from 'react';
import { CircularProgress } from "@mui/material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    Twitter,
    LinkedIn,
  } from "@mui/icons-material";
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { AppContext } from './../../utils/context';
import socket from '../../utils/socket';
import Hero from '../chatAI/Hero';
import ChatInputForm from '../Chat/ChatInputForm';
import api from '../../utils/api';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import WidgetWrapper from '../users/styledComponents/WidgetWrapper';
import { ChatUserRoute } from '../../utils/APIRoutes';
import UserWidget from '../users/user/UserWidget';
import FlexBetween from '../users/styledComponents/FlexBetween';
import UserAvatar from '../users/styledComponents/UserAvatar';
import ChatInput from './ChatInput';
import { friend } from '../../assets';
import MessageItem from './MessageItem';

function ChatView(props) {

    const { id } = props;
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(null);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [nameRoom, setNameRoom] = useState(null);
    const [avatarRoom, setAvatarRoom] = useState(null);
    const [conversationId, setConversationId] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [hasTrial, setHasTrial] = useState(false);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [responseFailed, setResponseFailed] = useState(false);
    const [statusSend, setStatusSend] = useState(false);
    const [chatLog, setChatLog] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const chatLogRef = useRef();
    const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
    const { info, auth} = useContext(AppContext);
    const navigate = useNavigate();
    const idRef = useRef(id);
    const scrollRef = useRef();
    const socketRef = useRef();
    socketRef.current = socket;

    const { palette } = useTheme();
    const { dark, medium, main } = palette.neutral;

    async function fetchChat(){
        if(id){
            const response = await api.get(`${ChatUserRoute}/${id}`);
            if(response.status === 200){
                const data = response.data;
                setUsers(data.users);
                setChatLog(data.messages);
                setNameRoom(data.nameRoom);
               
                setAvatarRoom(data.avatarRoom);

                // if(info)
                // socket.emit('read-msg', {
                //     id: id, userId: info.userId,
                // })
            }
        }
    }
    async function handleSubmit(e) {}

    const handleSendMsg = async (msg) => {
        socketRef.current.emit("send-msg", {
          textChat: msg,
          chatUser: id,
          userSend: info.userId,
        });
      };

    useEffect(() =>{
        if(id){
        fetchChat();

        socketRef.current.emit('joinRoom', {
            userId: info.userId.toString(),
            roomId: id.toString(),
        })
        }
    }, [id]);

    useEffect(() =>{
        if (socketRef.current) {
        socketRef.current.on('recieve-msg', async (response) =>{
            if(info){
            if(response._id === id){
            const isOneInArray = response.users.includes(info.userId);
                if(isOneInArray){
                    // setChatLog((chatLog) => [...chatLog, ...response.messages]);
                    setArrivalMessage(response.messages[0]);
                }
            }
            }
           }) 
        }
        return () => {
            // socketRef.current.disconnect();
          };

    });

    useEffect(() => {
        arrivalMessage && setChatLog((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      }, [chatLog]);

    const showText =() => {
        setTimeout(function () {
            document.querySelector(".floating-text").style.display = "block";
        }, 1000);
      }
       
    const hideText = ()  =>{
        document.querySelector(".floating-text").style.display = "none";
      }
  return (
    <WidgetWrapper className= 'h-full w-full flex flex-col gap-2'>
        <FlexBetween gap="0.5rem" pb="0.1rem">
        <FlexBetween>
          <UserAvatar image={avatarRoom ? avatarRoom : 'https://res.cloudinary.com/dllwgzvxm/image/upload/v1680174020/blank-profile-picture-973460__340_vurt3r.webp'} size='30px'/>
          <Box marginLeft="1rem">
            <Typography
              variant="h5"
              color={dark}
              fontWeight="400"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/profile/${users[0]._id}`)}
            >
              {nameRoom}
            </Typography>
            <FlexBetween paddingTop="0" width="9rem" >
            <Typography
              variant="p"
              color={dark}
              fontWeight="100"
              fontSize='12px'
            >
              DDDDDDD
            </Typography>
            </FlexBetween>
          </Box>
        </FlexBetween>
        <FlexBetween >
            <Box className='mr-3'>
            <CallIcon />
            </Box>
            <Box  className='mr-3'>
            <VideoCallIcon />
            </Box>

            <Box className='mr-3'>
           <ManageAccountsOutlined />
           </Box>
          
           
           </FlexBetween>
      </FlexBetween>

      <Divider />
    <Container className='h-[75vh]'>
    <div className="chat-messages max-h-[75vh]" >

    { chatLog.length === 0 && 
    <div className='flex justify-center items-center flex-col'>
      <img src={friend} alt="" className='20rem' />
      <h3>Let's start this conversation with say "Hi"</h3>
      </div>}
      
      {chatLog.map((message) => {
        return (
          <div ref={scrollRef} key={uuidv4()}>
            {/* <div
              className={`message ${
                message.userSend === info.userId ? "sended" : "recieved"
              }`}
            >
             { message.userSend !== info.userId &&   <UserAvatar image={avatarRoom ? avatarRoom : 'https://res.cloudinary.com/dllwgzvxm/image/upload/v1680174020/blank-profile-picture-973460__340_vurt3r.webp'} size='30px'/>}
              <div className="content ">
                <p onMouseEnter={showText} onMouseLeave={hideText}>{message.textChat}</p>
                <span className={`floating-text`} >Your floating text here</span>
              </div>
             
              { message.userSend === info.userId &&   <UserAvatar image={info.avatar ? info.avatar : 'https://res.cloudinary.com/dllwgzvxm/image/upload/v1680174020/blank-profile-picture-973460__340_vurt3r.webp'} size='30px'/>}
            </div> */}
            <MessageItem message={message} avatarRoom={avatarRoom} />
          </div>
        );
      })}
    </div>
   
  </Container>   
  <ChatInput handleSendMsg={handleSendMsg} />
    </WidgetWrapper>
  )
}

const Container = styled.div`
gap: 0.1rem;
overflow: hidden;
@media screen and (min-width: 720px) and (max-width: 1080px) {
  grid-template-rows: 15% 70% 15%;
}
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  .user-details {
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h3 {
        color: white;
      }
    }
  }
}
.chat-messages {
  margin-bottom: 1rem;
  padding: 1rem 0rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .message {
    display: flex;
    align-items: center;
    .content {
      max-width: 48%;
      overflow-wrap: break-word;
      padding: 0.2rem 0.5rem;
      font-size: 0.9rem;
      border-radius: 1rem;
      position: relative;
      color: #120c0c;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        max-width: 70%;
      }
    }  
   
  }
  .sended {
    justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
      margin-right: 4px;
    }
  }
  .recieved {
    justify-content: flex-start;
    .content {
      background-color: #9900ff20;
      margin-left: 4px;
    }
  }
}
`

export default ChatView