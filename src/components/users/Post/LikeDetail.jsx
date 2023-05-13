import React, { useRef, useEffect, useState, useContext } from 'react'
import styled from 'styled-components';
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
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../styledComponents/FlexBetween';
import { AppContext } from '../../../utils/context';
import api from '../../../utils/api';
import { fShortenNumber } from '../../../utils/formatNumber';
import UserAvatar from '../styledComponents/UserAvatar';






function LikeDetail({ onClose, likeData ,isAuthor , fullName }) {

    const listLikeRef = useRef(null);
    const { palette } = useTheme();
    const { medium } = palette.neutral;
    const navigate = useNavigate();
    const { info} =  useContext(AppContext);



    useEffect(() => {
        function handleClickOutside(event) {
            if (listLikeRef.current && !listLikeRef.current.contains(event.target)) {
              onClose();
            }
          }
      
          document.addEventListener('mousedown', handleClickOutside);
      
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
        },[listLikeRef, onClose]);
  return (
    <Container className="fixed inset-0 z-20 bg-gray-500 bg-opacity-50 flex items-center justify-center translate-y-6">
    <div className="post-form bg-white pt-6 rounded-md shadow-lg animate__animated w-[35%] max-h-[30rem]" ref={listLikeRef}
    >
         <div className="flex justify-between px-8 items-center mb-4">
      <div className="flex justify-center items-center">
        <img className="mr-4" src="https://img.icons8.com/ios-glyphs/30/null/agreement-like.png" />
        <h2 className="text-xl font-bold relative">Những người đã thích bài viết của 
        { isAuthor ? " bạn": `${fullName}`}
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
    sx={{
      mt: "0.5rem",
      
      alignItems: "center",
      maxHeight: "420px", 
      overflowY: 'auto',
      // padding: '10px',
      paddingX: '40px',
   
    }}
  >

    { likeData?.length > 0 ? likeData.map((c,i) => (
       <FlexBetween sx={{       
        width: "100%",
        
        border: '0.5px solid #ccc',
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
                    onClick={() => navigate(`/profile`+ c._id === info.userId ? '': `/${c._id}`)}
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

export default LikeDetail