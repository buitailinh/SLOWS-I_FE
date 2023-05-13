import React, { useState, useRef, useEffect, useContext } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { AppContext } from './../../utils/context';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ImageIcon from '@mui/icons-material/Image';
import GifBoxIcon from '@mui/icons-material/GifBox';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const { info } = useContext(AppContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiRef = useRef(null);



  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  useEffect(() => {
    // getComments();
    // setCommentList(commentData);
    // if(commentList){
    //   setComments(commentList.length >numComment? commentList.slice(-numComment): commentList)
    // }
    
    // socket.on('commentNew', async(response)=>{
    //   setCommentList(response);
    //   setComments(response.length >numComment? response.slice(-(numComment + 1)): commentData)
    //   // setComments(commentArray);
    //   scrollToBottom();
    // });

    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [info]);

  return (
    <Container>
      <div className="button-container">
        <AddBoxIcon style={{ color: 'blue'}} />
        <ImageIcon style={{ color: 'blue'}} />
        <MicIcon style={{ color: 'blue'}} />
        <div className="emoji"  ref={emojiRef}>
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} className="w-4 h-4" style={{ color: 'blue'}} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
        
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="px-1"
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 15% 85%;
  background-color: #E0E5ED;
  padding: 0.2rem 0.5rem;
  border-radius: 0.2rem 0.2rem 0.2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 0.2rem;
    margin-right: 5px;
    .emoji {
      position: relative;
      padding-right: 5px;
      svg {
        font-size: 1.5rem;
        color: black;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -470px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
            background-color: #080420;
            width: 5px;
            &-thumb {
              background-color: #9a86f3;
            }
          }
          .emoji-categories {
            button {
              filter: contrast(0);
            }
          }
          .emoji-search {
            background-color: transparent;
            border-color: #9a86f3;
          }
          .emoji-group:before {
            background-color: #080420;
          }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0rem;
    background-color: #bfdcff;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: black;
      border: none;
      outline: none;
      padding-left: 1rem;
      font-size: 1rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        border: none;
  outline: none;
  border-color: transparent;
  box-shadow: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;