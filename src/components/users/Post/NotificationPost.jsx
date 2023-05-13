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
import api from '../../../utils/api';
import { AppContext } from '../../../utils/context';
import FlexBetween from '../styledComponents/FlexBetween';
import WidgetWrapper from '../styledComponents/WidgetWrapper';
import {CircularProgress} from '@mui/material';
import { postRoute } from '../../../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function NotificationPost({onClose, title, content, postId = ''}) {

    const postDetailRef = useRef(null);
    const [isCreatePost, setIsCreatePost] = useState(false);
    const { info = {} } = useContext(AppContext);
    const { palette } = useTheme();
    const { dark } = palette.primary;
    const { main, medium, mediumMain } = palette.neutral;
    const [loading, setLoading] = useState(false);

    const handleBlur = async () => {
        setErrors({});
      };

    const handleCreatePost = () =>{
        setIsCreatePost(!isCreatePost);
      }

    const handleDeleteSuccess = () => {
        toast.success("Xoá bài viết thành công!", { position: toast.POSITION.BOTTOM_CENTER, autoClose: 1000,
        closeButton: false,
        hideProgressBar: true });
      };
    const handleDeleteFale = () => {
        toast.error("Xoá bài viết thất bại!", { position: toast.POSITION.BOTTOM_CENTER, autoClose: 1000,
        closeButton: false,
        hideProgressBar: true });
      };
    

    const handleDeletePost = async() =>{
      setLoading(true);

      const {status} = await api.delete(`${postRoute}/${postId}`);

      if(status ==200){
        setLoading(false);
        handleDeleteSuccess()
        setTimeout(()=>{
          window.location.reload();
        }, 1000);
       
      } else{
        setLoading(false);
        handleDeleteFale();
    }}

    useEffect(() =>{
        function handleClickOutside(event) {
            if (postDetailRef.current && !postDetailRef.current.contains(event.target)) {
              onClose();
            }
          }
      
          document.addEventListener('mousedown', handleClickOutside);
      
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };

      
        },[postDetailRef, onClose]);
  return (
    <Container className="fixed inset-0 z-20 bg-gray-500 bg-opacity-50 flex items-center justify-center translate-y-6">
    <div className=" bg-white pt-4 rounded-md shadow-lg animate__animated w-[40%] max-h-[90%]" ref={postDetailRef}
    >
      <div className="flex justify-between px-8 items-center mb-2">
        <div className="flex justify-center items-center">
          <img className="mr-4" src="https://img.icons8.com/office/16/null/create-new.png" />
          <h2 className="text-2xl font-bold relative">{title}
          </h2>
        </div>
        <button className="rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={onClose}>
          <span className="sr-only">Đóng</span>
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className='flex justify-center items-center text-xl'>
        <p>{content}</p>
      </div>
      <Box>
      </Box>
      <Box className=' flex justify-around items-center my-4'>
    <Box className=' max-w-[50%] '>
      <FlexBetween className=''>

      <Button

onClick={onClose}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            marginX: '3rem'
          }}
        >
          {loading ? (
            <CircularProgress sx={{ color: palette.neutral.dark }} size={15} />
          ) : (
            "Huy"
          )}
        </Button>
      <Button
         
          onClick={handleDeletePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            marginX: '3rem'
          }}
        >
          {loading ? (
            <CircularProgress sx={{ color: palette.neutral.dark }} size={15} />
          ) : (
            "Xoa"
          )}
        </Button>


      </FlexBetween>
    </Box>
    </Box>
    <ToastContainer />
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

export default NotificationPost