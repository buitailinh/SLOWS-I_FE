import React, {useState,useRef, useEffect, useContext}  from 'react'
import { useParams } from 'react-router-dom';
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
import api from './../utils/api';
import { AppContext } from '../utils/context';
import { postRoute, inforUserRoute, postUpdateLikesRoute } from '../utils/APIRoutes';
import { fToNow } from '../utils/formatData';
import Following from '../components/users/Following/Following';
import FlexBetween from '../components/users/styledComponents/FlexBetween';
import socket from '../utils/socket';
import LikeBox from '../components/users/LikeBox/LikeBox';
import { Close } from "@mui/icons-material";
import Comment from '../components/users/Comment/Comment';
import { profileMeRoute } from '../utils/APIRoutes';
import LikeDetail from '../components/users/Post/LikeDetail';
import HeaderPost from '../components/users/Post/HeaderPost';


    
function DetailPost() {

    const [isComments, setIsComments] = useState(true);
    const [isLikes, setIsLikes] = useState(false);
    const postLikeRef = useRef(null);
    const [likeData, setLikeData] = useState([]);
    const [commentData, setCommentData] = useState(null);
    const [commentNumData, setCommentNumData] = useState(null);
    const [isLongCaption, setIsLongCaption] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [fullName, setFullName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
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


    const { id } = useParams();

//   const postDetail = async(id) =>{
//     const result = await api.get(`${postRoute}/${id}`);
//     if(result.status === 200){
//         const post = result.data;
//         console.log(post, info);
//         setPost(result.data);
//         setCommentsCount(post.comments.length);
//         likeCount = Object.keys(post.likes).length;
//     }
//   }

  const handleCaptionToggle = () => {
    setIsLongCaption(!isLongCaption);
  };

  const handleLikeToggle = () => {
    setIsLikes(!isLikes);
  };

  const handleClose = () =>{
    console.log('close')
    window.history.back();
  }

  function handleBlur(event) {
    if(postLikeRef.current && !postLikeRef.current.contains(event.target)){
      setIsLikes(false);
    }
  }

  const postDetail = async (id) => {
    const result = await api.get(`${postRoute}/${id}`);
    if (result.status === 200) {
      const postData = result.data;
      setPost(postData);
      setLikeData(postData.likes.length === 0 ? null : post.likes);
      setCountLikes(Object.keys(postData.likes).length);
      
      setCommentData(postData.comments.length === 0 ? null : postData.comments);
      setCommentsCount(Object.keys(postData.comments).length);

    //   setCommentNumData(postData.comments.length >numComment? postData.comments.slice(-numComment): postData.comments)

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

  useEffect(() => { 
    postDetail(id);
    if(post.comments){
        // setCommentNumData(commentData.length >numComment? commentData.slice(-numComment): commentData)
        }

    socket.on("updateLike", async (response) => {
      if (response._id === id) {
        const likes = response.likes;
        setLikeData(likes.length === 0 ? null : likes);
        setIsLiked(Boolean(likes.find((like) => like._id === info.userId)));
        setCountLikes(Object.keys(likes).length);
      }
    });
  
    socket.on("commentNew", async (response) => {
      if (response._id === id) {
      setCommentsCount(response.comments.length);
      setCommentData(response.comments)
      }

    });
  }, [id, info]);

  useEffect(() =>{
    if(post.likes){
    setLikeData(post.likes.length === 0 ? null : post.likes);
    }
  },[likeData] )

//   useEffect(() =>{
//     if(post.comments){
//     setCommentNumData(commentData.length >numComment? commentData.slice(-numComment): commentData)
//     }
//   }, [commentData,numComment]);
  

  return (
    <Box
    m="0 0 2rem 0"
    sx={{
      backgroundColor: palette.background.alt,
      borderRadius: "0.75rem",
      padding: isNonMobileScreens
        ? "4rem 1.5rem 0.75rem 1.5rem"
        : "1.5rem 0",
        position: "fixed" 
    }}
    display={isNonMobileScreens ? "flex" : "block"}
    gap="4rem"
    justifyContent="center"
    
  >

    <Box
        flexBasis={isNonMobileScreens ? "55%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
        sx={{backgroundColor: "rgba(0, 0, 0, 0.5)"}} 
    >
    <div className=' h-max flex'>
    
    <Box sx={{ justifyContent: "center", alignItems: "center", height: "100%", margin: "2rem 2rem", display: "flex"}}>
    {images.length > 0 ? (
        <img
        src={images[0]}
        alt={images[0]}
        style={{
          borderRadius: isNonMobileScreens ? "0.75rem" : "0",
          height: "90%",
          width: "90%",
          alignItems: "center",
          
        }} 
      />
    ) : null}
    </Box>
    <IconButton
      sx={{
        position: "absolute",
        top: "5.5rem",
        left: "4.5rem",
        color: "white",
        fontSize: "10rem",
        backgroundColor: "rgba(0, 0, 0, 0.3)", /* màu background mờ mờ */
        borderRadius: "50%", /* để button trở thành hình tròn */
        padding: "1rem", /* để tăng kích thước của button */
        opacity: 0.7, /* độ mờ của background */

      }}
      onClick={handleClose}
    >
      <Close />
    </IconButton>
    </div>
        
    </Box>

     <Box flexBasis={isNonMobileScreens ? "35%" : undefined}>
        <HeaderPost
        followingId={author._id}
        name={`${author.firstName} ${author.lastName}`}
        subtitle={""}
        userProfilePhotoUrl={author.avatar}
        isAuthor={isAuthor}
      />

      <Typography fontWeight="200" fontSize="0.6rem" marginLeft="4.5rem" marginTop="-1rem">
        Posted {fToNow(post.createdAt)}
      </Typography>

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
      <LikeBox likes={likeData} likeCount={countLikes}  />
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
      />
    )}

{
      isLikes && (
        <LikeDetail onClose={() => setIsLikes(false)} ref={postLikeRef} likeData={likeData} isAuthor={isAuthor}  fullName={`${post.firstName} ${post.lastName}`}/>
      )
    }


      </Box>


    </Box>
   
  )
}

export default DetailPost