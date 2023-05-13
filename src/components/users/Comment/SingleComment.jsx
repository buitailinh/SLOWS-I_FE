import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactHtmlParser from 'react-html-parser';
import {
    Box,
    Checkbox,
    Typography,
    useTheme,
    useMediaQuery
} from "@mui/material";

import {
 Favorite,
 FavoriteBorder,
} from '@mui/icons-material';

import { formatTime } from '../../../utils/formatData';
import { fShortenNumber } from '../../../utils/formatNumber';
import FlexBetween from '../styledComponents/FlexBetween';
import UserAvatar from '../styledComponents/UserAvatar';

function SingleComment({ comment, onLikeClick}) {

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const {
        _id,
        createdAt,
        likes={},
        content,
        repComments,
        author,
    } = comment

    const fullname = author.fullName;
    const userId = author._id;
    // const comment = ReactHtmlParser(content);

    // const isLiked = Boolean(likes[signedInUsername]);
    const isLiked = false;
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const { medium } = palette.neutral;

    const navigate = useNavigate();


  return (
<FlexBetween sx={{
        // m: "0.7rem 3% 0 3%",        
        width: "100%",
      }}>
         <UserAvatar image={author.avatar} size="32px"/>
        
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
                    onClick={() => navigate(`/profile/${userId}`)}
                >
                  {fullname}
                </Box>
                <Box component={"span"} color={medium}
                 sx={{
                  fontSize: {isNonMobileScreens},
                  marginLeft: '4px'
                 }}
                >
                  {formatTime(createdAt)}
                </Box>
             </Box>

              <Box
                sx={{ display: "flex", fontSize: {isNonMobileScreens}, marginTop: '4px'}}
              >
                  <Typography  fontSize="0.75rem">
                  {ReactHtmlParser(content)}
                  </Typography>
              </Box>
           </Box>

           <label>
           <Checkbox
            size="24"
            icon={<FavoriteBorder />} 
            checkedIcon={<Favorite />} 
            checked={isLiked}
            onChange={() => onLikeClick(_id)}
            label="Like"
           />
           <Typography mr={2} color={medium} fontSize="0.75rem">
                    {fShortenNumber(likeCount) || 0} { likeCount !== 1 ? 'likes' : 'like'}
            </Typography>
            </label>
         </Box> 
      </FlexBetween>
  )
}

export default SingleComment