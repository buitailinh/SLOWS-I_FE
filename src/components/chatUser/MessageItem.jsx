import React, { useState, useRef, useEffect,useContext , useLayoutEffect}  from 'react'
import styled from 'styled-components'
import UserAvatar from '../users/styledComponents/UserAvatar';
import { AppContext } from './../../utils/context';
import moment from "moment";


function MessageItem({ message, avatarRoom}) {

    const { info} = useContext(AppContext);
    const [msg, setMsg] = useState();
    const [showFloatingText, setShowFloatingText] = useState(false);
    const [showFloatingIcon, setShowFloatingIcon] = useState(false);

    function getTime(date) {
        return moment(date).format("LT");
      }
    
    const showText =() => {
            // document.querySelector(".floating-text").style.display = "block";
            console.log("floating text");
            setShowFloatingText(true);
            setShowFloatingIcon(true);
    
      }
       
    const hideText = ()  =>{
        // document.querySelector(".floating-text").style.display = "none";
        setShowFloatingText(false);
        setShowFloatingIcon(false);
      }

    const showIcon = () => {
        setShowFloatingIcon(true);
    }

    const hideIcon = () =>{
        setShowFloatingIcon(false);
    }

      useEffect(() =>{
        // console.log(message);
            setMsg(message);
      }, [info, message]);
  return (
    <Container >
         <div
              className={`message ${
                message.userSend === info.userId ? "sended" : "recieved"
              }`}
            >
             { message.userSend !== info.userId &&   <UserAvatar image={avatarRoom ? avatarRoom : 'https://res.cloudinary.com/dllwgzvxm/image/upload/v1680174020/blank-profile-picture-973460__340_vurt3r.webp'} size='30px'/>}
              <div className="content " onMouseEnter={showText} onMouseLeave={hideText}>
                <p >{message.textChat}</p>
                <span className={`floating-text  ${showFloatingText ? "show" : ""}`} >{getTime(message.createdAt)}</span>
                <div  className={`absolute flex  justify-between w-[45px] floating-icon ${showFloatingIcon ? "show" : ""}`}>
                    <div style={{ display: 'inline-block' }} className=' translate-y-[-2px]'> <img src="https://img.icons8.com/fluency/48/null/happy.png" className='w-[15px] h-[15px]' /></div>
                    <div style={{ display: 'inline-block' }}> <img src="https://img.icons8.com/officexs/16/null/reply.png" className='w-[11px] h-[11px]'/></div>
                    <div style={{ display: 'inline-block' }}> <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/null/external-Menu-interface-those-icons-lineal-color-those-icons-3.png" className='w-[11px] h-[11px]' /></div>
                </div>
              </div>
             
              { message.userSend === info.userId &&   <UserAvatar image={info.avatar ? info.avatar : 'https://res.cloudinary.com/dllwgzvxm/image/upload/v1680174020/blank-profile-picture-973460__340_vurt3r.webp'} size='30px'/>}
            </div>
    </Container>
  )
}

const Container  = styled.div`

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
      .floating-text {
        position: absolute;
        display: none;
        background-color: #fff;
        padding: 0px;
        border: 1px solid #ddd;
        font-size: 0.5rem;
        border-radius: 5px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        z-index: 999;
        left: -36px;
        top: 5px;

        &.show {
            display: block;
          }
      }
      .floating-icon {
        display: none;

        &.show {
            display: flex;
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
`

export default MessageItem