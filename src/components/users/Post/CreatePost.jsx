import React,{ useRef, useEffect, useState, useContext } from 'react'
import styled from 'styled-components';
import Dropzone from "react-dropzone";
import {
    IconButton,
    Typography,
    InputBase,
    useTheme,
    Divider,
    Box,
    Button,
    Checkbox,
    useMediaQuery,
    Tooltip
  } from "@mui/material";
import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";
import api from '../../../utils/api';
import formatFile from '../../../utils/formatFile';
import { AppContext } from '../../../utils/context';
import { postRoute  } from '../../../utils/APIRoutes';
import UserAvatar from '../styledComponents/UserAvatar';
import FlexBetween from '../styledComponents/FlexBetween';
import WidgetWrapper from '../styledComponents/WidgetWrapper';
import {CircularProgress} from '@mui/material';

function CreatePost({onClose}) {

    const postDetailRef = useRef(null);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState(null)
    const { info = {} } = useContext(AppContext);
    const [imageUrls, setImageUrls] = useState([]);
    const [isCreatePost, setIsCreatePost] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const [errors, setErrors] = useState({});
    const [isImage, setIsImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const emojiRef = useRef(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
    const navigate = useNavigate();

    const { palette } = useTheme();
    const { dark } = palette.primary;
    const { main, medium, mediumMain } = palette.neutral;
    const classes = useStyles();


    const handleEmojiPickerhideShow = () => {
      setShowEmojiPicker(!showEmojiPicker);
    };
  
    const handleEmojiClick = (emojiObject) => {
      let message = post;
      message += emojiObject.emoji;
      setPost(message);
    };

    const handleDrop = (acceptedFiles) => {
        acceptedFiles = acceptedFiles.slice(0, isNonMobileScreens ? 5 : 4);
    
        setImageUrls(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
    
        setImage(acceptedFiles);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          // await postSchema.validate(
          //   { caption: post, images: imageUrls },
          //   { abortEarly: false }
          // );
          const formData = new FormData();
          
          if(imageUrls[0]) {
            formData.append('file', imageUrls[0]);
          } 

          formData.append('content', post);
          await api.post(postRoute, formData)
          setErrors({});
          
          // navigate("/listPosts");
          window.location.reload();
          setLoading(false);
        } catch (err) {
          const validationErrors = {};
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          setErrors(validationErrors);
        }
      };
    
      const handleBlur = async () => {
        setErrors({});
      };
    
      const handleChange = async (e) => {
        setPost(e.target.value);
        if (post.length > 2) {
          try {
            await postSchema.validate(
              { caption: post, images: imageUrls },
              { abortEarly: false }
            );
            setErrors({});
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
          }
          return;
        }
      };

      const handleCreatePost = () =>{
        setIsCreatePost(!isCreatePost);
      }
    
    useEffect(() => {
        if(info) {
            setProfilePhotoUrl(info.avatar);
          }
        function handleClickOutside(event) {
            if (postDetailRef.current && !postDetailRef.current.contains(event.target)) {
              onClose();
            }

            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
              setShowEmojiPicker(false);
            }
          }
      
          document.addEventListener('mousedown', handleClickOutside);
      
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };

      
        },[postDetailRef, onClose]);

  return (
    <Container className="fixed inset-0 z-20 bg-gray-500 bg-opacity-50 flex items-center justify-center translate-y-6">
    <div className=" bg-white pt-4 rounded-md shadow-lg animate__animated w-[45%] max-h-[90%]" ref={postDetailRef}
    >
      <div className="flex justify-between px-8 items-center mb-2">
        <div className="flex justify-center items-center">
          <img className="mr-4" src="https://img.icons8.com/office/16/null/create-new.png" />
          <h2 className="text-2xl font-bold relative">Tạo bài viết mới 
          </h2>
        </div>
        <button className="rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={onClose}>
          <span className="sr-only">Đóng</span>
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <Box>
      <WidgetWrapper m="0 0 2rem 0" sx={{ textAlign: "center" }}>
      <FlexBetween gap="1.5rem">
        <UserAvatar image={profilePhotoUrl} />
        <InputBase
          classes={{ input: classes.input }}
          placeholder="What's on your mind?....."
          onChange={handleChange}
          onBlur={handleBlur}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />

      <Tooltip title="icon">
      <div className="button-container">
                <div className="emoji" ref={emojiRef}>
                    <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
      </Tooltip>
      </FlexBetween>
      {errors.caption && (
        <Typography sx={{ fontSize: "0.69rem" }} variant="small" color="error">
          {errors.caption}
        </Typography>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
     
        <FlexBetween gap="0.25rem">
        <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={true}
            onDrop={handleDrop}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box {...getRootProps()} >
                  <input onBlur={handleBlur} {...getInputProps()} />  
                  <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={{ mediumMain }}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>           
                </Box>
              </FlexBetween>
            )}
          </Dropzone>
        </FlexBetween>


        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem" onClick={handleCreatePost}>
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={loading || !post && !image}
          onClick={handleSubmit}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          {loading ? (
            <CircularProgress sx={{ color: palette.neutral.dark }} size={15} />
          ) : (
            "Post"
          )}
        </Button>
      </FlexBetween>

      {image && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={true}
            onDrop={handleDrop}
          >
            {({ getRootProps, getInputProps }) => (
              <div className=' flex justify-center '>
                <Box
                  {...getRootProps()}
                  border={
                    errors.images
                      ? `2px dashed red`
                      : ``
                  }
                >
                  <input onBlur={handleBlur} {...getInputProps()} />
                  {!image ? (
                    <p>Add Images Here</p>
                  ) : (
                    <FlexBetween>
                      <FlexBetween>
                        {imageUrls.map((img) => (
                          <img
                            // width="70rem"
                            // height="70rem"
                            style={{
                              margin: "0 0.25rem",
                              border: `0.2rem solid ${palette.primary.dark}`,
                            }}
                            className="w-full h-full"
                            src={img.preview}
                            alt={img.name}
                            key={img.preview}
                          />
                        ))}
                      </FlexBetween>
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                <div>
                  <IconButton onClick={() => setImage(null)}>
                    <DeleteOutlined />
                  </IconButton>
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {errors.images && (
            <Typography sx={{ fontSize: "0.69rem" }} color="error">
              {errors.images}
            </Typography>
          )}
        </Box>
      )}
    </WidgetWrapper>
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
  
`;

const useStyles = makeStyles((theme) => ({
    input: {
      "&:focus": {
        borderColor: "transparent",
        boxShadow: "none",
      },
    },
  }));


export default CreatePost