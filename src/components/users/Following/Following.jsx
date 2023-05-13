import React, { useState, useContext} from 'react'
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography, CircularProgress, useTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from '../styledComponents/FlexBetween';
import UserAvatar from '../styledComponents/UserAvatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import { FollowingRoute } from '../../../utils/APIRoutes';
import api from '../../../utils/api';
import { AppContext } from '../../../utils/context';
import socket from '../../../utils/socket';

function Following({
    followingId,
    name = "",
    subtitle = "",
    isAuthor,
    status ="",
    userProfilePhotoUrl = "",
 }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { light, dark } = palette.primary;
  const { main, medium } = palette.neutral;
  const [loading, setLoading] = useState(false);
  const [relative, setRelative] = useState(status);
  const { info} = useContext(AppContext);

  const updateFollowing = async() =>{

    setLoading(true);
    const res = await api.post(`${FollowingRoute}`, {
      creator: info.userId,
      receiver: followingId,
      status: "Following",
    }, {headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }}
    );
    if(res.status<400){
      const follow = res.data;
      if(info.userId === follow.creator){
        // console.log('follow', follow.creatorStatus);
        setRelative(follow.creatorStatus);
      } else{
        // console.log('follow2', follow.receiverStatus);
        setRelative(follow.receiverStatus);
      }
      setLoading(false);
      socket.emit('updateFollow', {userId1: follow.creator, userId2: follow.receiver});
    }
  }


  return (

    <FlexBetween>
    <FlexBetween gap="1rem">
      <UserAvatar image={userProfilePhotoUrl} size="25px" />
      <Box
        onClick={() => {
          navigate(`/profile/${followingId}`);
          navigate(0);
        }}
      >
        <Typography
          color={main}
          variant="h5"
          fontWeight="500"
          sx={{
            "&:hover": {
              color: palette.primary.dark,
              cursor: "pointer",
            },
          }}
        >
          {name.length > 17 ? `${name.substring(0, 17)}...` : name}
        </Typography>
        <Typography color={medium} fontSize="0.75rem">
          {subtitle.length > 17
            ? `${subtitle.substring(0, 17)}...`
            : subtitle}
        </Typography>
      </Box>
    </FlexBetween>
    <Box>
    {!isAuthor && (
      <IconButton
        onClick={() => updateFollowing()}
        disabled={loading}
        sx={{ backgroundColor: light, p: "0.4rem" }}
      >
        {loading ? (
          <CircularProgress size={15} />
        ) : relative ? (
          <>
          {relative === 'Following' && <PersonRemoveOutlined sx={{ color: dark, fontSize: '18px' }}  /> }
          {relative === 'Friend' && <PeopleIcon sx={{ color: dark, fontSize: '18px' }}  />}
          {relative === 'Follower' && <PersonIcon sx={{ color: dark, fontSize: '18px' }}  />}
          {relative === '' && <PersonAddOutlined sx={{ color: dark, fontSize: '18px' }} />}
          </>
        ) : (
          <PersonAddOutlined sx={{ color: dark, fontSize: '18px' }} />
        )}
      </IconButton>
    )}
    </Box>
  </FlexBetween>


);
}

export default Following