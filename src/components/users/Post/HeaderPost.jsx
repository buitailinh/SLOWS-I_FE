import React, { useState, useContext, useEffect, useRef} from 'react'
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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../utils/api';
import { FollowingRoute } from '../../../utils/APIRoutes';
import { AppContext } from '../../../utils/context';
import NotificationPost from './NotificationPost';


function HeaderPost({
    followingId,
    name = "",
    subtitle = "",
    isAuthor,
    userProfilePhotoUrl = "",
    qrCode = '',
    postId = ''
 }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { palette } = useTheme();
    const { light, dark } = palette.primary;
    const { main, medium } = palette.neutral;
    const [loading, setLoading] = useState(false);
    const [isFollowing, setIsFollowing]  = useState(false);
    const [showQrCode, setShowQrCode] = useState(false);
    const { info} = useContext(AppContext);
    const [status, setStatus] = useState(false);
    const createNotifiRef = useRef(null);
    const [isNotification, setIsNotification] = useState(false);
  
  
  
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleNotifiPost = () =>{
      setIsNotification(!isNotification);
    }

    function handleBlur1(event) {
      if(createPostRef.current && !createPostRef.current.contains(event.target)){
        setIsCreatePost(false);
      }
    }


    const handleMouseEnter = () => {
        setShowQrCode(true);
   
      };
    
      const handleMouseLeave = () => {
        setShowQrCode(false);
      };

      const handleCopy = () => {
        navigator.clipboard.writeText(qrCode);
        toast.success("Mã QR đã được sao chép vào Clipboard!", { position: toast.POSITION.BOTTOM_CENTER, autoClose: 1500,
        closeButton: false,
        hideProgressBar: true });
      };

      const getRepositoryUser = async() =>{

        console.log('this ......', followingId);
          const {data} = await api.get(`${FollowingRoute}/${followingId? followingId: false}`);

          if(followingId === data.creator){
            if( data.receiverStatus === 'Follower'){
              setStatus(true);
            }
            if(data.receiverStatus !== 'Follower' || data.receiverStatus !== ''){
              setIsFollowing(true);
            }
              
          } else{
            if( data.creatorStatus === 'Follower'){
            
              setStatus( true);
            }

            if(data.creatorStatus !== 'Follower' || data.creatorStatus !== ''){
              setIsFollowing(true);
            }
              
            
          }

      };

      useEffect(() =>{
        if(info.userId !== followingId)
        getRepositoryUser();
      },[info, followingId])


  return (
    <>
    <FlexBetween>
    <FlexBetween gap="1rem">
      <UserAvatar image={userProfilePhotoUrl} size="55px" />
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
    {!isAuthor  && (
     <>{ !isFollowing && <IconButton
        onClick={() => updateFollowing()}
        disabled={loading}
        sx={{ backgroundColor: light, p: "0.6rem" }}
      >
        {loading ? (
          <CircularProgress size={20} />
        ) : status ? (
          <>
         <PersonIcon sx={{ color: dark, fontSize: '18px' }}  />
          {/* {status === 'Following' && <PersonRemoveOutlined sx={{ color: dark, fontSize: '18px' }}  /> } */}
          {/* {status === 'Friend' && <PeopleIcon sx={{ color: dark, fontSize: '18px' }}  />} */}
          {/* {status === 'Follower' && <PersonIcon sx={{ color: dark, fontSize: '18px' }}  />} */}
          {/* {status === '' && <PersonAddOutlined sx={{ color: dark, fontSize: '18px' }} />} */}
          </>
        ) : (
          <PersonAddOutlined sx={{ color: dark, fontSize: '18px' }} />
        )}
      </IconButton>
 }</>
    )}

    <IconButton  sx={{ backgroundColor: light, p: "0.6rem" }} onClick={handleClick}
      aria-controls={open ? 'post-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
    
    >
      <MoreVertIcon  sx={{ color: dark }}/>
    </IconButton>
    </Box>
  </FlexBetween>

  <Menu
        anchorEl={anchorEl}
        id="post-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
      
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
          <BookmarkBorderIcon fontSize='small' />
          </ListItemIcon>
          Lưu bài viết
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <NotificationsIcon fontSize="small" />
          </ListItemIcon>
          Bật thông báo bài viết
        </MenuItem>
        <MenuItem onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <ListItemIcon>
            <QrCode2OutlinedIcon fontSize="small" />
          </ListItemIcon>
         {`Mã QR của bài viết `}
          {showQrCode && (
        <img
        id="qr-code-image"
          src={qrCode}
          alt="QR code"
          style={{ width: "100px", height: "100px", transform: "scale(1)" }}
          className="w-24 h-24 absolute top-0 left-[-120px] transform scale-0 transition-transform duration-200 ease-in-out"
        />
      )}
        <ContentCopyIcon fontSize="small" onClick={handleCopy} />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CancelPresentationIcon fontSize="small" />
          </ListItemIcon>
          Ẩn bài viết này
        </MenuItem>
        { !isAuthor ? <>
          <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AutoAwesomeMotionOutlinedIcon fontSize='small' />
          </ListItemIcon>
       { `Ẩn từ ${name}` }
        </MenuItem>
        <MenuItem onClick={handleClose}>
         <ListItemIcon>
         <BlockOutlinedIcon fontSize='small' />
         </ListItemIcon>
         {`Chặn ${name}`}
        </MenuItem>
        <MenuItem onClick={handleClose}>
         <ListItemIcon>
          <ReportGmailerrorredOutlinedIcon />
         </ListItemIcon>
         Báo cáo bài viết 
        </MenuItem>
        </> : <>
        
        <MenuItem onClick={handleNotifiPost}>
          <ListItemIcon>
            <AutoAwesomeMotionOutlinedIcon fontSize='small' />
          </ListItemIcon>
          Xoá bài viết này
        </MenuItem>
        <MenuItem onClick={handleClose}>
         <ListItemIcon>
          <ReportGmailerrorredOutlinedIcon />
         </ListItemIcon>
         Sao chép liên kết 
        </MenuItem>
        </>}
        
      </Menu>


      <ToastContainer />
      { isNotification &&  <NotificationPost onClose={() => setIsNotification(false)} ref={createNotifiRef}  title ="Thông báo xoá bài viết:" content="Bạn có muốn xoá bài viết này không?" postId ={postId} />}
     
  </>
  )
}

export default HeaderPost