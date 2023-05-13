import React, { useState, useRef, useEffect,useContext }  from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import {
    IconButton,
    Typography,
    useTheme,
    Box,
    useMediaQuery,
  } from "@mui/material";
import FlexBetween from '../styledComponents/FlexBetween';
import Following from '../Following/Following';
import LikeBox from '../LikeBox/LikeBox';
import Comment from '../Comment/Comment';
import { fToNow } from '../../../utils/formatData';
import { AppContext } from '../../../utils/context';
import { postUpdateLikesRoute } from '../../../utils/APIRoutes';
import socket from '../../../utils/socket';
import { inforUserRoute}  from '../../../utils/APIRoutes';
import api from '../../../utils/api';
import PostDetail from './PostDetail';
import LikeDetail from './LikeDetail';
import HeaderPost from './HeaderPost';

function SinglePostWidget(
    {
        postId,
        postUserId,
        postAuthorFullName,
        postAuthorUserName,
        location,
        caption,
        postImageUrls,
        userProfilePhoto,
        likes,
        createdAt,
        commentCount,
        qrCode
      }
) {

  const [isComments, setIsComments] = useState(false);
  const [isLikes, setIsLikes] = useState(false);
  const postDetailRef = useRef(null);
  const postLikeRef = useRef(null);
  const [likeData, setLikeData] = useState(null);
  const [isLongCaption, setIsLongCaption] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [countLikes, setCountLikes] = useState(null);
  const [commentsCount, setCommentsCount] = useState(commentCount);
  const { info} = useContext(AppContext)
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");

  const likeCount = Object.keys(likes).length;

  const isAuthor = postUserId === info.userId;

  const { palette } = useTheme();
  const { dark } = palette.primary;
  const { main, medium } = palette.neutral;

  const addRemoveLike = async () => {
    // const response = await fetch(postUpdateLikesRoute + `/${postId}`, {
    //   method: "PATCH",
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    //     "Content-Type": "application/json",
    //   },
    // });
    socket.emit('likePost', { postId});

  };

  const getLikes = async () => {
    if (likeCount > 0) {
      const response = await fetch(postUpdateLikesRoute + `/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const likeData = await response.json();
        setLikeData(likeData);
      }
    }
  };

  const getUser = async (userId) => {
    const response = await api.get(`${inforUserRoute}/${userId}`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        "Content-Type": "application/json",
      },
    });
    if(response.status === 200) {
      setFullName(`${response.data.firstName} ${response.data.lastName}`);
      setAvatarUrl(response.data.avatar);
    }
  };

  const handleCommentToggle = () => {
    setIsComments(!isComments);
  };

  const handleLikeToggle = () => {
    setIsLikes(!isLikes);
  };

  const handleCaptionToggle = () => {
    setIsLongCaption(!isLongCaption);
  };

  function handleBlur(event) {
    if (postDetailRef.current && !postDetailRef.current.contains(event.target)) {
      setIsComments(false);
    }

    if(postLikeRef.current && !postLikeRef.current.contains(event.target)){
      setIsLikes(false);
    }
  }

  useEffect(() => {
    getUser(postUserId);
    setIsLiked(Boolean(likes.find(like => like == info.userId)));
    setCountLikes(Object.keys(likes).length);
    getLikes();

    socket.on('updateLike', async(response)=>{
    if(response._id === postId){
    const likes = response.likes;
    // const likeData = await response.likes.json();
    setLikeData(likes.length ===0 ? null : likes);
    setIsLiked(Boolean(likes.find(like => like._id == info.userId)));
    setCountLikes(Object.keys(likes).length)
      
      }
    })

    socket.on('commentNew', async(response)=>{
      if (response._id === postId) {
      setCommentsCount(response.comments.length)
      }
    });
  }, []);

  return (
    <Box
    m="0 0 2rem 0"
    sx={{
      backgroundColor: palette.background.alt,
      borderRadius: "0.75rem",
      padding: isNonMobileScreens
        ? "1.5rem 1.5rem 0.75rem 1.5rem"
        : "1.5rem 0",
    }}
  >
    <Box
      sx={{
        padding: !isNonMobileScreens ? "0 0.75rem" : "",
      }}
    >
      <HeaderPost
        followingId={postUserId}
        name={fullName}
        subtitle={location}
        userProfilePhotoUrl={avatarUrl}
        isAuthor={isAuthor}
        qrCode = {qrCode}
        postId = {postId}
      />
      <Typography fontWeight="200" fontSize="0.6rem" marginLeft="4.5rem" marginTop="-1rem">
        Posted {fToNow(createdAt)}
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

    {postImageUrls ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: 'pointer'
        }}
        onClick={handleCommentToggle}
      >
        <img
          src={postImageUrls}
          alt={postImageUrls}
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
        onClick={handleLikeToggle}
        sx={{
          cursor: "pointer",
          mb: "1rem",
          "&:hover": {
            color: palette.background.light,
          },
        }}
        color={medium}
      >
      <LikeBox likes={likeData} likeCount={likeCount}  />
      </Typography>
      ) : null}

      {commentsCount ? (
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
          {!isComments
            ? `View ${
                commentsCount > 1
                  ? "all" + " " + commentsCount + " " + "comments"
                  : commentsCount + " " + "comment"
              }`
            : "Hide comments"}
        </Typography>
      ) : null}

      {/* <Typography fontWeight="200" fontSize="0.79rem" marginBottom="1rem">
        Posted {fToNow(createdAt)}
      </Typography> */}
    </Box>

    {isComments && (
      <PostDetail onClose={() => setIsComments(false)} ref={postDetailRef} postId={postId} />
    )}


    {
      isLikes && (
        <LikeDetail onClose={() => setIsLikes(false)} ref={postLikeRef} likeData={likeData} isAuthor={isAuthor}  fullName={fullName}/>
      )
    }




  </Box>
  )
}

export default SinglePostWidget