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
    Info,
  } from "@mui/icons-material";
import Styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import UserAvatar from '../../components/users/styledComponents/UserAvatar';
import api from '../../utils/api';
import { AppContext } from '../../utils/context';
import { ChatUserRoute} from '../../utils/APIRoutes';
import socket from '../../utils/socket';


function ListUserChat() {

    const [listMsg, setListMsg] = useState([]);
    const {info} = useContext(AppContext);
    const { palette } = useTheme();
    const { dark, medium, main } = palette.neutral;
    const navigate = useNavigate();


    const getListMsg = async() =>{
        const res = await api.get(ChatUserRoute);
        if(res.status === 200){
            const data = res.data.data;
            setListMsg(data);
        }
    }

    useEffect(() =>{
        if(info)
            getListMsg();
        socket.on('recieve-msg',async(response)=>{
          const isOneInArray = response.users.includes(info?.userId);
          if(isOneInArray)
            getListMsg();
        } )
    }, [info]);
  return (
    <Container >
         { listMsg.map((msg, index) =>(
              <FlexBetween gap="1rem" mb="0.5rem" px="0.5rem"
              sx={{
                  "&:hover": {
                      backgroundColor: "#f2f2",
                    },
              }}
              onClick={() => navigate(`/chat/${msg._id}`)}
          >
            <FlexBetween gap="1rem">
              {/* <Twitter /> */}
              <UserAvatar image={msg.avatarRoom} size="30px" />
              <Box>
                <Typography color={main} fontWeight="550" fontSize='0.8rem'>
                 { msg.nameRoom[0]}
                </Typography>
                <Typography color={medium}>
                {
                    msg.messages[0] ? (msg.messages[0].textChat ?
                     (msg.messages[0].userSend === info.userId ?  'Bạn: ' + msg.messages[0].textChat.substring(0,22) + ( msg.messages[0].textChat.length> 22? " ...": ''): msg.messages[0].textChat) 
                    : ' đã gửi hình ảnh') : 'Hãy kết nối với họ'
                }</Typography>
              </Box>
            </FlexBetween>
            <div className='flex w-5 h-5'>
            { 2 >0 && 
        <div class=" left-0 top-0 ">
        <span class=" bg-slate-300 rounded-[100%] text-[10px] text-white px-[0.3rem] py-[0.1rem] left-2 top-0 ">{2}</span>
        </div>
    }
            </div>
          </FlexBetween>
         )) }
      
    </Container>
  )
}

const Container = Styled.div``;

export default ListUserChat