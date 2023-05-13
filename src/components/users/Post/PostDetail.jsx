import React, { useRef, useEffect, useState, useContext } from 'react'
import Picker from "emoji-picker-react";
import styled from 'styled-components';
import { BsEmojiSmileFill } from "react-icons/bs";
import SpeechRecognition, {
    useSpeechRecognition,
  } from "react-speech-recognition";
import {
    IconButton,
    Typography,
    useTheme,
    Box,
    Checkbox,
    useMediaQuery,
  } from "@mui/material";
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    Favorite,
    FavoriteBorder,
  } from "@mui/icons-material";
import api from '../../../utils/api';
import { AppContext } from '../../../utils/context';
import { postRoute  } from '../../../utils/APIRoutes';
import socket from '../../../utils/socket';
import Following from '../Following/Following';
import FlexBetween from '../styledComponents/FlexBetween';
import LikeBox from '../LikeBox/LikeBox';
import Comment from '../Comment/Comment';
import { fToNow } from '../../../utils/formatData';
import UserAvatar from '../styledComponents/UserAvatar';
import { fShortenNumber } from '../../../utils/formatNumber';
import HeaderPost from './HeaderPost';


function PostDetail({ onClose, postId }) {

    const postDetailRef = useRef(null);
    const emojiRef = useRef(null);
    const microRef = useRef(null);
    const [likeData, setLikeData] = useState([]);
    const [isComments, setIsComments] = useState(true);
    const [commentData, setCommentData] = useState(null);
    const [isLongCaption, setIsLongCaption] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [author, setAuthor] = useState({});
    const [countLikes, setCountLikes] = useState(null);
    const [commentsCount, setCommentsCount] = useState(0);
    const { info = {} } = useContext(AppContext);
    const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
    const [post, setPost] = useState({});
    const [images, setImages] = useState([]);
    const [isAuthor, setIsAuthor] = useState(false);
    const [caption, setCaption] = useState('');

    const { palette } = useTheme();
    const { dark } = palette.primary;
    const { main, medium } = palette.neutral;

    const handleCaptionToggle = () => {
        setIsLongCaption(!isLongCaption);
      };

    const handleCommentToggle = () => {
        setIsComments(!isComments);
      };


    const postDetail = async (id) => {
        const result = await api.get(`${postRoute}/${id}`);
        if (result.status === 200) {
          const postData = result.data;
          setPost(postData);
          setLikeData(postData.likes.length === 0 ? null : post.likes);
          setCountLikes(Object.keys(postData.likes).length);
          
          setCommentData(postData.comments.length === 0 ? null : postData.comments);
          setCommentsCount(Object.keys(postData.comments).length);
    
          setImages(postData.images);
          setAuthor(postData.author);
          setIsAuthor(postData.author._id === info.userId);
          setIsLiked(Boolean(postData.likes.find((like) => like._id === info.userId)));
    
          
          setCaption(postData.content);
        }
      };
    
    const addRemoveLike = async () => {
        socket.emit("likePost", { postId: post._id });
    };

    useEffect(() =>{
        postDetail(postId);

        socket.on("updateLike", async (response) => {
            if (response._id === postId) {
              const likes = response.likes;
              setLikeData(likes.length === 0 ? null : likes);
              setIsLiked(Boolean(likes.find((like) => like._id === info.userId)));
              setCountLikes(Object.keys(likes).length);
            }
          });
        
          socket.on("commentNew", async (response) => {
            if (response._id === postId) {
            setCommentsCount(response.comments.length);
            setCommentData(response.comments);
            }
          });
    },[postId, info])

    useEffect(() => {
        function handleClickOutside(event) {
            if (postDetailRef.current && !postDetailRef.current.contains(event.target)) {
              onClose();
            }
  
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
              setShowEmojiPicker(false);
            }
  
            if (microRef.current && !microRef.current.contains(event.target)) {
              SpeechRecognition.stopListening();
              setIsListening(false);
            }
          }
      
          document.addEventListener('mousedown', handleClickOutside);
      
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
        },[postDetailRef, onClose]);

    useEffect(() =>{
        if(post.likes){
            setLikeData(post.likes.length === 0 ? null : post.likes);
        }
    },[likeData] )


  return (
    <Container className="fixed inset-0 z-20 bg-gray-500 bg-opacity-50 flex items-center justify-center translate-y-6">
  <div className=" bg-white pt-4 rounded-md shadow-lg animate__animated w-[45%] h-[90%]" ref={postDetailRef}
  >
    <div className="flex justify-between px-8 items-center mb-2">
      <div className="flex justify-center items-center">
        <img className="mr-4" src="https://img.icons8.com/fluency/48/null/content.png" />
        <h2 className="text-2xl font-bold relative">Bài viết của 
        { isAuthor ? " bạn": ` ${author.firstName} ${author.lastName}`}
        </h2>
      </div>
      <button className="rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={onClose}>
        <span className="sr-only">Đóng</span>
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <Box
    m="0 0 2rem 0"
    sx={{
      backgroundColor: palette.background.alt,
      borderRadius: "0.75rem",
      padding: isNonMobileScreens
        ? "1.5rem 1.5rem 0.75rem 1.5rem"
        : "1.5rem 0",
      maxHeight: "620px",
      overflowY: 'auto' 
    }}
    className='post-form'
  >
    <Box
      sx={{
        padding: !isNonMobileScreens ? "0 0.75rem" : "",
      }}
    >
      <HeaderPost
        followingId={author._id}
        name= {`${author.firstName} ${author.lastName}`}
        subtitle={""}
        userProfilePhotoUrl={author.avatar}
        isAuthor={isAuthor}
      />
      <Typography fontWeight="200" fontSize="0.6rem" marginLeft="4.5rem" marginTop="-1rem">
        Posted {fToNow(post.createdAt)}
      </Typography>

      {/* post caption  */}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {caption.length > 100
          ? isLongCaption
            ? caption
            : `${caption.substring(0, 100)}...`
          : caption}
      </Typography>

      {caption.length > 100 ? (
        <Typography
          onClick={handleCaptionToggle}
          sx={{
            cursor: "pointer",
            "&:hover": {
              color: palette.light,
            },
          }}
          color={medium}
        >
          {isLongCaption ? "View less" : "view More"}
        </Typography>
      ) : null}
    </Box>

    {images.length>0 ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={images[0]}
          alt={images[0]}
          style={{
            borderRadius: isNonMobileScreens ? "0.75rem" : "0",
            marginTop: "0.75rem",
            height: "100%",
            width: "100%",
          }}
        />
      </div>
    ) : null}

    <FlexBetween mt="0.25rem">
      <FlexBetween gap="1rem">
        <FlexBetween gap="0.3rem">
          <IconButton onClick={addRemoveLike}>
            {isLiked ? (
              <FavoriteOutlined sx={{ color: dark }} />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </IconButton>
          <Typography>{countLikes}</Typography>
        </FlexBetween>

        <FlexBetween gap="0.3rem">
          <IconButton onClick={() => setIsComments(!isComments)}>
            <ChatBubbleOutlineOutlined />
          </IconButton>
          <Typography>{commentsCount}</Typography>
        </FlexBetween>
      </FlexBetween>

      <IconButton>
        <ShareOutlined />
      </IconButton>
    </FlexBetween>

    <Box
      sx={{
        padding: !isNonMobileScreens ? "0 0.75rem" : "",
      }}
    >
      {/* Liked By  */}
      {likeData ? (
        <Typography
        onClick={handleCommentToggle}
        sx={{
          cursor: "pointer",
          mb: "1rem",
          "&:hover": {
            color: palette.background.light,
          },
        }}
        color={medium}
      >
      <LikeBox likes={likeData} likeCount={likeData.length}  />
      </Typography>
      ) : null}

      {/* <Typography fontWeight="200" fontSize="0.79rem" marginBottom="1rem">
        Posted {fToNow(createdAt)}
      </Typography> */}
    </Box>

    {isComments && (
    <Comment
        postId={post._id}
        commentCount={commentsCount}
        commentData = {commentData}
        isNonMobileScreens={isNonMobileScreens}
        style={{ height: '300px'}}
      />) }

    {!isComments &&(
         <Box
         sx={{
           mt: "0.5rem",
           
           alignItems: "center",
           maxHeight: "420px", 
           overflowY: 'auto',
           // padding: '10px',

        
         }}
       >
        <h2>People likes: </h2>

        <Box
    sx={{
      mt: "0.5rem",
      
      alignItems: "center",
      maxHeight: "420px", 
      overflowY: 'auto',
      border: '0.2px solid #ccc',
      padding: '0 10px',
   
    }}
  > 

    {/* {loading && (
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
    )} */}
     
         { likeData?.length > 0 ? likeData.map((c,i) => (
            <FlexBetween sx={{       
             width: "100%",
           }}
           className=" px-2"
           >
              <UserAvatar image={c.avatar} size="32px"/>
             
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
                         onClick={() => navigate(`/profile '' : '/' + username}`)}
                     >
                       {`${c.firstName} ${c.lastName}`}
                     </Box>
                  </Box>
                </Box>
     
                <label>
                <Checkbox
                 size="24"
                 icon={<FavoriteBorder />} 
                 checkedIcon={<Favorite />} 
                 checked={false}
                 onChange={() => onLikeClick(_id)}
                 label="Like"
                />
                <Typography mr={2} color={medium} fontSize="0.75rem">
                         {fShortenNumber(0) || 0} { 0 !== 1 ? 'likes' : 'like'}
                 </Typography>
                 </label>
              </Box> 
           </FlexBetween>
         ))
         : null
     }
     </Box>
         </Box>
    )}

  </Box>

  </div>
</Container>

  )
}

const Container = styled.div`
.post-form {
    height: 700px;
    overflow-y: scroll;
  }
  
  .post-form::-webkit-scrollbar {
    display: none;
  }  
`;

export default PostDetail