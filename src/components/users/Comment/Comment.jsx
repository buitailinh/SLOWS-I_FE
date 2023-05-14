import React,  { useState, useRef, useEffect, useContext } from 'react'
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
    InputBase,
    IconButton,
    Typography,
    Box,
    useTheme,
    Tooltip,
    CircularProgress,
  } from "@mui/material";
import Menu from '@material-ui/core/Menu';
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";
import MenuItem from '@material-ui/core/MenuItem';  
import { makeStyles } from "@mui/styles";
import { Telegram } from "@mui/icons-material";
import styled from 'styled-components';
import UserAvatar from '../styledComponents/UserAvatar';
import FlexBetween from '../styledComponents/FlexBetween';
import SingleComment from './SingleComment';
import { AppContext } from '../../../utils/context';
import {postCommentsRoute} from '../../../utils/APIRoutes';
import socket from '../../../utils/socket';
import { MentionsInput, Mention } from 'react-mentions';
import Paper from '@mui/material/Paper';
import api from '../../../utils/api';
import { inforUserRoute } from '../../../utils/APIRoutes';
import parse from 'react-html-parser';
import { Link } from 'react-router-dom';


function Comment({ postId, commentCount, isNonMobileScreens, commentData }) {

    const [comments, setComments] = useState(null);
    const [commentList, setCommentList] = useState(commentData);
    const [isComments, setIsComments] = useState(false);
    const [commentBody, setCommentBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [userSelected, setUserSelected] = useState(false);
    const [matchingUsers, setMatchingUsers] = useState([]);
    const [numComment,setNumComment] = useState(10);
    const { info } = useContext(AppContext);
    const classes = useStyles();
    const { palette } = useTheme();
    const { medium } = palette.neutral;
    const commentEndRef = useRef(null);
    const emojiRef = useRef(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  

    const handleEmojiPickerhideShow = () => {
      setShowEmojiPicker(!showEmojiPicker);
    };
  
    const handleEmojiClick = (emojiObject) => {
      let message = commentBody;
      message += emojiObject.emoji;
      setCommentBody(message);
    };

    const handleClose = () => {
      // Thêm class animate__fadeOut khi đóng form
      document.querySelector('.post-form').classList.add('animate__zoomOut');
  
      // Chờ animation hoàn thành rồi mới đóng form
      setTimeout(() => {
        onClose();
      }, 500);
    };


    const handleChange = async(e) => {
      
      setCommentBody(e.target.value);
      const inputText = e.target.value;
    const lastAtPos = inputText.lastIndexOf('@');
    const lastSpacePos = inputText.lastIndexOf(' ');
    if (lastAtPos !== -1 && lastSpacePos < lastAtPos) {
      if (lastAtPos === 0 || inputText.charAt(lastAtPos - 1) === ' ') {
      const searchValue = inputText.substring(lastAtPos + 1).toLowerCase().trim();
      const {data }= await api.get(`${inforUserRoute}?keyword=${searchValue}`)
      const users = data.data || [];
      const matchingUsers =users.filter(user => {
        const username = user.email.toLowerCase();
        return username.includes(searchValue);
      });
      setAnchorEl(e.target);
      setMatchingUsers(matchingUsers);
    } else {
      setAnchorEl(null);
      setMatchingUsers([]);
    }
  } else {
      setAnchorEl(null);
      setMatchingUsers([]);
    }
  };

  const handleCommentToggle = () => {
    // setIsComments(!isComments);
    setNumComment(numComment + 5)
    if(commentList){
      setComments(commentList.length >numComment + 5? commentList.slice(-(numComment + 5)): commentList)
    }
  };

  const scrollToBottom = () => {
    commentEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

    const handleUserSelect = (user) => {
      // Replace the '@username' with the selected user's name
      const atIndex = commentBody.lastIndexOf('@');
  const newCommentBody = commentBody.substring(0, atIndex) + `@${user.username} `;
  setCommentBody(newCommentBody);
  setAnchorEl(null);
  setMatchingUsers([]);
    

    const inputElem = document.getElementById("comment-input");
  const caretPos = atIndex + user.length + 2;
  setCaretPosition(inputElem, caretPos);
    };

    const handleInputFocus = () => {
      const atIndex = commentBody.lastIndexOf('@');
      if (atIndex >= 0 && !matchingUsers.length) {
        const searchValue = commentBody.substring(atIndex + 1).toLowerCase().trim();
        const filteredUsers = users.filter(user => {
          const username = user.email.toLowerCase();
          return username.includes(searchValue);
        });
        setMatchingUsers(filteredUsers);
      }
    };

    const setCaretPosition = (elem, caretPos) => {
      if (elem.createTextRange) {
        const range = elem.createTextRange();
        range.move('character', caretPos);
        range.select();
      } else {
        elem.focus();
        if (elem.selectionStart !== undefined) {
          elem.setSelectionRange(caretPos, caretPos);
        }
      }
    };

    // const convertHtml = (id,text) =>{
    //  return ReactHtmlParser(`<a href="/user/${id}">@${text}</a> `);
    // }
  
    const handleLikeClick = async (commentId) => {
      // try {
      //   //Make API call to update the like state of the comment
      //   const response = await fetch(
      //     SERVER_URL + `p/${postId}/comments/${commentId}/likes`,
      //     {
      //       method: "PATCH",
      //       headers: {
      //         Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({ username }),
      //     }
      //   );
  
      //   const updatedComment = await response.json();
  
      //   //update the state of the comment
      //   setComments((prevComments) => {
      //     const newComments = [...prevComments];
      //     const index = newComments.findIndex(
      //       (c) => c._id === updatedComment._id
      //     );
      //     newComments[index] = updatedComment;
      //     return newComments;
      //   });
      // } catch (err) {
      //   console.error(err);
      // }
    };
  
    const handleClick = async () => {
      setLoading(true);
      // try {
      //   const response = await fetch(SERVER_URL + `p/${postId}/comments`, {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       userId: _id,
      //       username,
      //       postId,
      //       userProfilePhoto: profilePhotoUrl,
      //       commentBody,
      //     }),
      //   });
  
      //   if (response.ok) {
      //     const { comments, post } = await response.json();
  
      //     setComments(comments);
      //     dispatch(setPost({ post })); //To update the state of the comment count on the post itselfßß
      //   }
      // } catch (err) {
      //   console.error(err);
      // }
      const newComment = {
        content: commentBody,
        postId
      }
      socket.emit('createComment', newComment)
      setCommentBody("");
      setLoading(false);
    };
  
    const getComments = async () => {
      if (commentCount > 0) {
        setLoading(true);
        try {
          const response = await fetch(postCommentsRoute + `/${postId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(import.meta.env.VITE_NAME_AT_KEY)}`,
              "Content-Type": "application/json",
            },
          });
  
          if (response.ok) {
            const comments = await response.json();
            setComments(comments);
          }
        } catch (err) {
          console.error(err);
        }
        setCommentBody("");
        setLoading(false);
      } else {
        return;
      }
    };
  
    useEffect(() => {
      // getComments();
      setCommentList(commentData);
      if(commentList){
        setComments(commentList.length >numComment? commentList.slice(-numComment): commentList)
      }
      
      socket.on('commentNew', async(response)=>{
        setCommentList(response.comments);
        setComments(response.comments.length >numComment? response.comments.slice(-(numComment + 1)): response.comments)
        // setComments(commentArray);
        scrollToBottom();
      });

      function handleClickOutside(event) {
        if (emojiRef.current && !emojiRef.current.contains(event.target)) {
          setShowEmojiPicker(false);
        }
      }
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [info, commentData]);

    
  return (
  <Container >
      <Box
      sx={{
        display: "flex",
        padding: "0.5rem 0.8rem",
        border: `1.5px solid ${palette.neutral.light}`,
        borderRadius: isNonMobileScreens ? "2rem" : "1.5rem",
        marginTop: "0.5rem",
      }}
    >
{info && <UserAvatar image={info.avatar} size="32px" />}

      <FlexBetween
        sx={{
          p: "0.5rem 0 0.5rem 0.5rem",
          flexGrow: "1",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
        }}
      >
        <InputBase
         classes={{ input: classes.input }}
          onChange={handleChange}
          onFocus={handleInputFocus}
          value={commentBody}
          size="sm"
          focused
          autoFocus = 'true'
          placeholder="Leave a comment…"
          id='comment-input'
          sx={{
            flexGrow: 1,
            mr: 1,
          }}
        />
      
        {commentBody.length ? (
          <Tooltip title="Post">
            <IconButton
              onClick={handleClick}
              sx={{ "&:hover": { color: palette.primary.dark } }}
            >
              <Telegram />
            </IconButton>
          </Tooltip>
      ) : null} 

<Tooltip title="icon">
      <div className="button-container">
                <div className="emoji" ref={emojiRef}>
                    <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
      </Tooltip>


      </FlexBetween>
      
    <Box sx={{ position: "absolute" }}>
  <Box
    sx={{ top: "50px", left: "-430px", zIndex: 1 }}
  >
      <Paper
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        sx={{ width: 320, maxHeight: 400, overflowY: 'auto' }} 
        className='Menu bg-slate-100'
        style={{transform: 'translate(10%, 10%)' }}
      >
        {matchingUsers.map((user) => (
          <MenuItem key={user.email} onClick={() => handleUserSelect(user)}>
            {/* {user.email} */}
            <FlexBetween sx={{
        // m: "0.7rem 3% 0 3%",        
        width: "100%",
      }}>
         <UserAvatar image={user.avatar} size="32px"/>
        
         <Box
            sx={{
                borderRadius: "1rem",
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexGrow: 1,
                padding: "0.3rem 1.2rem 0.5rem 1rem"
            }}
         >
           <Box
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
           >
             <Box component={"span"}>
                <Box component={"span"}
                    fontWeight={600}
                    mr="0.25rem"
                    color={palette.neutral.dark}
                    sx={{
                      cursor: 'pointer',
                    }}
                >
                  {user.firstName} {user.lastName}
                </Box>
             </Box>
             <Box   
             component={"span"} 
             fontWeight={100}
             fontSize={"8px"}
                color={medium}
                 sx={{
                  display: "flex",
                  fontSize: "10px",
                 }}
                >
                  {user.email}
                </Box>
           </Box>
         </Box> 
      </FlexBetween>
          </MenuItem>
        ))}
      </Paper> 
      </Box>
      </Box>
    </Box>
    {commentData && commentData.length > numComment ?(
      <Box sx={{
        marginTop:"10px",
        display: "flex",
        justifyContent: "space-between",
      }}>
         <h2>Comment: </h2>
        <Typography
          onClick={handleCommentToggle}
          sx={{
            cursor: "pointer",
            mx: "0.5rem",
            "&:hover": {
              color: palette.background.light,
            },
          }}
          color={medium}
        >
                See more comments
        </Typography>

      </Box>
    ): null}
    
    <Box
    sx={{
      mt: "0.5rem",
      
      alignItems: "center",
      maxHeight: "420px", 
      overflowY: 'auto',
      border: '0.2px solid #ccc',
      // padding: '10px',
      paddingX: '15px',
   
    }}
  >
      {/* <Paper
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        sx={{ width: 320, maxHeight: 400, overflowY: 'auto' }}  
        className='Menu'
        style={{transform: 'translate(10%, 5%)', position: 'absolute',top: '0', left: '0' }}
      >
        {matchingUsers.map((user) => (
          <MenuItem key={user} onClick={() => handleUserSelect(user)}>
            {user}
          </MenuItem>
        ))}
      </Paper>  */}

 

    {loading && (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%"
        }}
      >
        <CircularProgress />
      </Box>
    )}


    {comments?.length
      ? comments.map((c, i) => (
          <SingleComment
            comment={c}
            onLikeClick={handleLikeClick}
            key={uuidv4()}
          />
        ))
      : null}
  <div ref={commentEndRef} />
  </Box>

  </Container>
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

const Container = styled.div`

.Menu {
  z-index: 1;
  scrollbar-width: none; /* ẩn thanh cuộn */
  -webkit-overflow-scrolling: touch; /* tạo hiệu ứng cuộn mượt trên iOS */
}

.Menu::-webkit-scrollbar {
  display: none; /* ẩn thanh cuộn */
}

.button-container {
  display: flex;
  align-items: center;
  color: white;
  background-color: #363842;
  border: 1px solid #373942;
  border-radius: 10px;
  padding: 0px;
  gap: 1rem;
  .emoji {
    position: relative;
   
    svg {
      font-size: 1.2rem;
      color: #ffff00c8;
      cursor: pointer;
    }
    .EmojiPickerReact {
      position: absolute;
      top: 30px;
      left: -280px;
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
.button-container:hover {
    background-color: #202123;
    border: 1px solid #202123;
    transition: all 150ms ease-in;
  }

`



export default Comment