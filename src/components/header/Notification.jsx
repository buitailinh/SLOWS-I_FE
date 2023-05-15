import React,{useEffect, useContext, useState, useRef} from 'react'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import styled from 'styled-components';
import { AppContext } from '../../utils/context';
import {
    Notifications,
  } from "@mui/icons-material";
import { getNotificationsOfUser, getAllNotificationsOfUser, listenToNotificationsOfUser } from '../../utils/firebase';
import { async } from 'regenerator-runtime';
import { UpdateReadNotificationsRoute } from '../../utils/APIRoutes';
import api from '../../utils/api';
import { Link} from 'react-router-dom';
import ButtonHeader from './ButtonHeader';
import UserAvatar from '../users/styledComponents/UserAvatar';



function Notification() {

    const [anchorEl, setAnchorEl] = useState(false);
    const [numNoti, setNumNoti] = useState(null);
    const [notification, setNotification] = useState([]);
    const ref = useRef(null);
    const { info } = useContext(AppContext);
    const handleClickNotification = async () => {
        if(!anchorEl){

        //    console.log('noto',notification)
        //   await getAllNotifications();
        }
        
      setAnchorEl(!anchorEl);

      if(numNoti){
        setNumNoti(null);
        await api.get(UpdateReadNotificationsRoute);
      }
    };

    const handleClose = () => {
      setAnchorEl(false);
    };

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setAnchorEl(false);
        }
      };

    const getAllNotifications = async() =>{
        if(anchorEl){
        const listNoti = await getAllNotificationsOfUser(info.userId);
        setNotification(listNoti);
        }
    }

      const numNotification = async() =>{
        const num = await  getNotificationsOfUser(info.userId)
        setNumNoti(num.length);
    }

      useEffect(() => { 

        numNotification();

        listenToNotificationsOfUser(info.userId, (notifications) => {
          // console.log(notifications);
          setNumNoti(numNoti+notifications.length);
        });
       

        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, []);
    

      useEffect(() => {
        getAllNotifications();
       },[anchorEl]);

  return (

    <Container ref={ref}>
    <div class="relative w-x-4 text-white" onClick={handleClickNotification}>
    { numNoti >0 && 
        <div class="absolute left-0 top-0 ">
        <span class="relative bg-red-500 rounded-[100%] text-[10px] text-white px-[0.3rem] py-[0.1rem] left-2 top-0 ">{numNoti}</span>
        </div>
    }
    
    <div className="flex flex-col items-center hover:text-black">
            <Notifications sx={{ fontSize: "22px" }}  />
            <ButtonHeader nameButton= {"Dall-e"}/> 
    </div>
        { anchorEl && <div className="absolute flex items-center justify-center" style={{transform: 'translate(-50%, 3%)'}}>
    {/* <div className="relative"> */}
      <div className="absolute top-[-12px] left-[57%] transform -translate-x-1/2" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}>
        <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[12.5px] border-transparent border-white"></div>
      {/* </div> */}
    </div>
        <Paper sx={{ width: 320, maxHeight: 400, overflowY: 'auto' }}  className='Paper'>
          <MenuList dense>

          <MenuItem>
              <ListItemText><h2>Thong bao</h2></ListItemText>
            </MenuItem>
            <Divider />
            {
                notification.map((item) => {
                    return (
                        <MenuItem  style={{ whiteSpace: "normal", wordWrap: "break-word" }}> 
                        { item.type === 'follow' &&
                             <Link to={`/profile/${item.userSend}`} > 
                            <ListItemIcon>
                              {/* <Check /> */}
                              <UserAvatar image={item.photo} size='15px' />
                            </ListItemIcon>
                            <Link to={`/profile/${item.userSend}`}  style={{ marginRight: "0.2rem", color: "blue"}}> 
                            {item.fullname} </Link>
  
                             đã {item.status === 'following' ? 'theo dõi bạn!': 'và bạn đã trở thành bạn bè!'} 
                            </Link>
                            }

              { item.type !== 'follow' && 
                        <Link to={`/post/${item.postId}`} > 
                          <ListItemIcon>
                            {/* <Check /> */}
                            <UserAvatar image={item.photo} size='15px' />
                          </ListItemIcon>
                          <Link to={`/profile/${item.userId}`}  style={{ marginRight: "0.2rem", color: "blue"}}> 
                          {item.fullname} </Link>

                           đã {item.type} bài viết của bạn
                          </Link>
                }
                        </MenuItem>
                      );
                })
            }
            
          </MenuList>
    
          </Paper>
          </div>}
      
  </div>
  </Container>
   
  )
}

const Container = styled.div`
.Paper {
    scrollbar-width: none; /* ẩn thanh cuộn */
    -webkit-overflow-scrolling: touch; /* tạo hiệu ứng cuộn mượt trên iOS */
  }

  .Paper::-webkit-scrollbar {
    display: none; /* ẩn thanh cuộn */
  }

`

export default Notification