import React, { useState, useRef }  from 'react';
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import FlexBetween from '../styledComponents/FlexBetween';
import UserAvatar from '../styledComponents/UserAvatar';
import WidgetWrapper from '../styledComponents/WidgetWrapper';
import api from '../../../utils/api';
import { postRoute  } from '../../../utils/APIRoutes';

  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
    CircularProgress,
  } from "@mui/material";
import CreatePost from './CreatePost';


function MyPostWidget({ profilePhotoUrl }) {

    const dispatch = useDispatch();
  const [imageUrls, setImageUrls] = useState([]);
  const [errors, setErrors] = useState({});
  const [isImage, setIsImage] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const createPostRef = useRef(null);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  // const { username } = useSelector((state) => state.user);
  const username = 'BTLinh'
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(false);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { mediumMain, medium } = palette.neutral;

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

  const handleCreatePost = () =>{
    setIsCreatePost(!isCreatePost);
  }

  function handleBlur1(event) {
    if(createPostRef.current && !createPostRef.current.contains(event.target)){
      setIsCreatePost(false);
    }
  }

  const handlePost = async (e) => {
    const formData = new FormData();
    formData.append("caption", post);

    if (imageUrls) {
      imageUrls.forEach((image) => {
        formData.append("postImageUrls", image);
      });
    }

    const response = await fetch(SERVER_URL + "p", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const posts = await response.json();

    setLoading(false);

    dispatch(setPosts({ posts }));
    setImageUrls([]);
    setImage(null);
    setPost("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      
      if(imageUrls[0]) {
        formData.append('file', imageUrls[0]);
      } 

      formData.append('content', post);
       await api.post(postRoute, formData, {
      })
      setErrors({});
      navigate("/listPosts");
      setLoading(false);

    } catch (err) {
      console.log(err);
      const validationErrors = {};
      // err.inner.forEach((error) => {
      //   validationErrors[error.path] = error.message;
      // });
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
        // err.inner.forEach((error) => {
        //   validationErrors[error.path] = error.message;
        // });
        setErrors(validationErrors);
      }
      return;
    }
  };
  return (
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
      </FlexBetween>
      {errors.caption && (
        <Typography sx={{ fontSize: "0.69rem" }} variant="small" color="error">
          {errors.caption}
        </Typography>
      )}
      {isImage && (
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
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={
                    errors.images
                      ? `2px dashed red`
                      : `2px dashed ${palette.primary.main}`
                  }
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input onBlur={handleBlur} {...getInputProps()} />
                  {!image ? (
                    <p>Add Images Here</p>
                  ) : (
                    <FlexBetween>
                      <FlexBetween>
                        {imageUrls.map((img) => (
                          <img
                            width="70rem"
                            height="70rem"
                            style={{
                              margin: "0 0.25rem",
                              border: `0.2rem solid ${palette.primary.dark}`,
                            }}
                            src={img.preview}
                            alt={img.name}
                            key={img.preview}
                          />
                        ))}
                      </FlexBetween>

                      <IconButton>
                        <EditOutlined />
                      </IconButton>
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton onClick={() => setImage(null)}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
          {errors.images && (
            <Typography sx={{ fontSize: "0.69rem" }} color="error">
              {errors.images}
            </Typography>
          )}
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={{ mediumMain }}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
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
          disabled={loading || !post}
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
      {
        isCreatePost && (
          <CreatePost onClose={() => setIsCreatePost(false)} ref={createPostRef} />
        )
      }
    </WidgetWrapper>
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
export default MyPostWidget