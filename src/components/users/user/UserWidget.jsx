import React, { useEffect, useState, useContext, useRef } from 'react';
import { Box, Typography, Divider, useTheme, useMediaQuery, IconButton ,CircularProgress} from "@mui/material";
import { useSelector } from "react-redux";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Dropzone from "react-dropzone";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    Twitter,
    LinkedIn,
    PersonAddOutlined,
    PersonRemoveOutlined,
 
  } from "@mui/icons-material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import UserAvatar from '../styledComponents/UserAvatar';
import FlexBetween from '../styledComponents/FlexBetween';
import WidgetWrapper from '../styledComponents/WidgetWrapper';
import PeopleIcon from '@mui/icons-material/People';
import UserWidgetSkeleton from './UserWidgetSkeleton';
import PersonIcon from '@mui/icons-material/Person';
import BlockIcon from '@mui/icons-material/Block';
import { AppContext } from '../../../utils/context';
import api from '../../../utils/api';
import { ChatUserRoute, FollowingRoute, setAvatarRoute} from '../../../utils/APIRoutes';
import socket from '../../../utils/socket';
import NotificationBlockUser from './NotificationBlockUser';


function UserWidget({ username,userId, profilePhotoUrl, status, action, actionYou }) {

  const { id } = useParams();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const { dark, medium, main } = palette.neutral;
  const [loading, setLoading] = useState(false);
  const { light } = palette.primary;
  const [followingStatus, setFollowingStatus]  = useState('');
  const [errors, setErrors] = useState({});
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
  const [imageUrls, setImageUrls] = useState([]);
  const [image, setImage] = useState(null);
  const notificationBlockRef = useRef(null);
  const [isNotification, setIsNotification] = useState(false);
  const [time, setTime] = useState();

  const { info} = useContext(AppContext);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

    const  occupation =2 , viewedProfile = 2, impressions = 'tets', location1 = 'test';


    const handleNotifiBlock = (action) =>{
      switch (action) {
        case 1: setTime(15*60*1000); break;
        case 2: setTime(30*60*1000); break;
        case 3: setTime(60*60*1000); break;
        case 4: setTime(12*60*60*1000); break
        case 5: setTime(24*60*60*1000); break
        default: setTime(null); break;
      }    
      
      setIsNotification(!isNotification);
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


  const  handleSearchMessage = async() =>{
    if(id){
      const res = await api.get(`${ChatUserRoute}/user/${id}`);
      if(res.status === 200){
        const data = res.data;
        navigate(`/chat/${data._id}`);
      }
      
      // console.log('false', res)

    }
  }

  const handleBlur = async () => {
    setErrors({});
  };

  const getFollowUser = async() =>{
    if(id && info){
      const res = await api.get(`${FollowingRoute}/${id}`);
      if(res.status === 200){
        if(res.data){
          const follow = res.data;
          if(info.userId === follow.creator){
            setFollowingStatus(follow.creatorStatus);
          } else{
            setFollowingStatus(follow.receiverStatus);
          }
        }
      }
    }
  }

  const getListFollowerUser = async() =>{
    if(id){
      const {data} = await api.get(`${FollowingRoute}/followers/${id}`);
      // console.log('aaa',res);
      setFollowerCount(data.length);
    } 
    else{
      const {data} = await api.get(`${FollowingRoute}/followers`);
      
      setFollowerCount(data.length);
    }
  }

  const getListFollowingUser = async() =>{
    if(id){
      const {data} = await api.get(`${FollowingRoute}/followings/${id}`);
      setFollowingCount(data.length);
    } else{
      const {data} = await api.get(`${FollowingRoute}/followings`);
      setFollowingCount(data.length);
    }
  }

  const handleDrop = async(acceptedFiles) => {
    acceptedFiles = acceptedFiles.slice(0, isNonMobileScreens ? 5 : 4);

    setImageUrls(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
   
     const { data} = await api.post(`${setAvatarRoute}`,{file:acceptedFiles[0]});
     if (data.status === false) {
       toast.error(data.msg, toastOptions);
     }
     if (data.status === true) {
       localStorage.setItem(import.meta.env.VITE_NAME_AT_KEY, data.token.accessToken);
       localStorage.setItem(import.meta.env.VITE_NAME_RF_KEY, data.token.refreshToken)
       const accessToken = localStorage.getItem(import.meta.env.VITE_NAME_AT_KEY);
       if(accessToken){
         // console.log(accessToken);
         setTimeout(() => {  window.location.reload(); }, 50)
        //  navigate("/profile")
       }
       else {
         toast.error("Error setting avatar. Please try again.", toastOptions);
       }
     } 
  };



  const updateFollowing = async() =>{

    setLoading(true);
    const res = await api.post(`${FollowingRoute}`, {
      creator: info.userId,
      receiver: id,
      status: "Following",
    },
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(import.meta.env.VITE_NAME_AT_KEY)}`,
    }}
    )

    if(res.status<400){
      const follow = res.data;
      if(info.userId === follow.creator){
        setFollowingStatus(follow.creatorStatus);
      } else{
        setFollowingStatus(follow.receiverStatus);
      }
      setLoading(false);
      socket.emit('updateFollow', {userId1: follow.creator, userId2: follow.receiver});
    }
  }
    useEffect(() => {
        getFollowUser();
        getListFollowerUser();
        getListFollowingUser();

        socket.on("sendUpdateFollow", async(response) =>{
          if(response.userId1 === info.userId || response.userId2 === id){
            getListFollowerUser();
            getListFollowingUser();
          }
        })
    }, [id, info]);
  return (
    <WidgetWrapper>
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween>
          <UserAvatar image={profilePhotoUrl} />
          {!id && location.pathname === '/profile' &&
          <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={true}
          onDrop={handleDrop}
        >
          {({ getRootProps, getInputProps }) => (
           <Box {...getRootProps()} sx={{ position: 'relative' }} >
              <input onBlur={handleBlur} {...getInputProps()} />  
          <IconButton  sx={{
               alignItems: "center",
               position: 'absolute',
               marginLeft: '-15px',
               marginBottom: '0px',
               justifyContent: "center", backgroundColor: light, p: "0.4rem"}}>
          
          <EditOutlined sx={{ color: main, fontSize:'10px' }} />
          </IconButton>
          </Box>
          )}
          </Dropzone>
          }
          <Box marginLeft="1rem">
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: 'blueviolet',
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate("/profile")}
            >
              {username}
            </Typography>
            <FlexBetween paddingTop="0.4rem" width="6rem">
              { !status && <>
                <FlexBetween>
                <Typography color={dark} marginRight="0.25rem">
                  {followerCount}
                </Typography>
                <Typography color={medium} fontSize='8px'>
                  {followerCount === 1 ? "follower" : "followers"}
                </Typography>
              </FlexBetween>

              { followingCount>0  && <FlexBetween>
                <Typography color={dark}>{followingCount}</Typography>
                <Typography color={medium} marginLeft="0.25rem" fontSize='8px'>
                  following
                </Typography>
              </FlexBetween>}
              </>}

            </FlexBetween>
          </Box>
        </FlexBetween>

        { info && info.userId === userId || !id? (
           <ManageAccountsOutlined sx={{ marginLeft:'20px'}} />
        ) :(
          <Box  sx={{ display:'flex', flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"}} >
          { !status && <>
            <Box sx={{
            width: "25px",
            height: "25px",
            alignItems: 'center',
            textAlign: 'center',
            mr:'0.2rem',
            "&:hover": {
              color: 'blueviolet',
              cursor: "pointer",
            },
          }}
          onClick={handleSearchMessage}
          >
          <img src="https://img.icons8.com/external-beshi-glyph-kerismaker/48/null/external-Messanger-communication-media-beshi-glyph-kerismaker.png"/>
          <Box fontSize='6px'>
          Message
          </Box>
          </Box>

          <Box sx={{ textAlign:'center',marginRight: '0.1rem', "&:hover": {
                  color: 'blueviolet',
                  cursor: "pointer",
                },}}>
          <IconButton
               onClick={() => updateFollowing()}
               disabled={loading}
               sx={{ display:'flex', flexDirection: "column",
               alignItems: "center",
               justifyContent: "center", backgroundColor: light, p: "0.4rem", mt:'0.5rem'}}
          >
             {loading ? (
          <CircularProgress size={20} />
        ) : followingStatus ? (
          <>
          {followingStatus === 'Following' && <PersonRemoveOutlined sx={{ color: dark, fontSize: '14px' }}  /> }
          {followingStatus === 'Friend' && <PeopleIcon sx={{ color: dark, fontSize: '14px' }}  />}
          {followingStatus === 'Follower' && <PersonIcon sx={{ color: dark, fontSize: '14px' }}  />}
          {followingStatus === '' && <PersonAddOutlined sx={{ color: dark, fontSize: '14px' }} />}
          </>
        ) : (
          <PersonAddOutlined sx={{ color: dark, fontSize: '14px' }} />
        )}
            </IconButton>
            <Box fontSize='6px'>
          {followingStatus}
          </Box>
          </Box>
          </>}
          
          <Box sx={{ textAlign:'center', "&:hover": {
                  color: 'blueviolet',
                  cursor: "pointer",
                },}}>
          <IconButton
               onClick={handleClick}
               disabled={loading}
               aria-controls={open ? 'post-menu' : undefined}
               aria-haspopup="true"
               aria-expanded={open ? 'true' : undefined}
               sx={{ display:'flex', flexDirection: "column",
               alignItems: "center",
               justifyContent: "center", backgroundColor: light, p: "0.4rem", mt:'0.5rem'}}
          >
            <BlockIcon sx={{ color: dark, fontSize: '14px' }} />
            </IconButton>
            <Box fontSize='6px'>
                { actionYou ? "Unblock": "Block" } 
          </Box>
          </Box>
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
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
      { actionYou ? 
         <MenuItem className=' text-xs' onClick={()=>handleNotifiBlock(6)}>
         <ListItemIcon>
           <img className='w-5 h-5' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACz0lEQVR4nO2YTUgVURTHf/WyooyKQoo+EKNFELWoRYZJYo8KaxFmWQS5SkFzYxG06HMTBUVRC5WWRpQULaJAiLBNC2vTrsigVkEfthCqRcqB82AY7r3PN+PM9dH84A/Hud7z7n/u3LnnDmRkZGRk/AesB0YcupHGII4CdTFzLAFaHKojBTYDa2PmWA3c1Pi65msH8kAD0EWZsBK4qPE5YBVwDNgB1AJtlAmuR2tWWoPYAKxIcLHnSJj5wBHgL3A2Rh6540sdSpzDwIQqjpFTgTwmzSFh5uodexjDyDZgXN9M3makwEBEIzLIT8BpZggDEYzIungMPE3zrRTViOwBVwJqDLT1AJ+BZaE+jaE+kiM1bEZksKNAr6op0NYJbDf0aQr8/6jmSJz9umG9Au5pXB9ol0EMxsg/mJaR54bN6045GinGJi36bMxW2chrjhnLAqAf+AP81liuTYU9wBmDEi9jTDwz7N5ybSq0Aw8MqiBldjlKEWmzsRHY4lCkvajCcEcO6B4g8S1H3/MOIxcc/V4AHx2ScqlkcoZntFZPihKfMPRZDlTrW81mJPjGS4WcDtam8LG3GfiqJX+3w8hJx29+sPSRCjwy8mgNOSQVbWEW7gPf9dgqVAFjhgGNaZuNNUCNQZVMA5WW5DV6p2QWnuh5PFwRjAdMSLzP8htVekwYsmjndBiRBf7Doi+BWbANsFtlm4lFwHvgkeMxXodnWrX86NHY9jjdLrL7e2EesBc4pG+wPq1yq/VaPrSxedmtXR/eWnXR/9I18U/LkgZVv16TtrtqYLf29c5W4E2Rjwphyews1DVRuPZWc3lhMfCzRBPv9Az/0tAmueQDXurU6wBeA8MlmPkW+ntYc0ic6pG3QIv+uJQrHSXOTFAdmkPigz6MdCVgpNOHkcsJGLnkw0hfAkZ6fRi5ph8ijmvlOxJRzZpD4qs+jGRkZGRkEJVJJzZPxYka+IgAAAAASUVORK5CYII="></img>
         {/* <BookmarkBorderIcon fontSize='small' /> */}
         </ListItemIcon>
        Bỏ Chặn người này!
       </MenuItem> : <>
       
       <MenuItem className=' text-xs' onClick={()=>handleNotifiBlock(1)}>
          <ListItemIcon>
            <img className='w-5 h-5' src="data:image/png;base64,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"></img>
          {/* <BookmarkBorderIcon fontSize='small' /> */}
          </ListItemIcon>
          Chặn người này trong 15p
        </MenuItem>
        <MenuItem className=' text-xs' onClick={()=>handleNotifiBlock(2)}>
          <ListItemIcon>
            <img className='w-5 h-5' src="data:image/png;base64,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"></img>
          {/* <BookmarkBorderIcon fontSize='small' /> */}
          </ListItemIcon>
          Chặn người này trong 30p
        </MenuItem>
        <MenuItem className=' text-xs' onClick={()=>handleNotifiBlock(3)}>
          <ListItemIcon>
            <img className='w-5 h-5' src="data:image/png;base64,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"></img>
   
          </ListItemIcon>
          Chặn người này trong 1h
        </MenuItem>
        <MenuItem className=' text-xs' onClick={()=>handleNotifiBlock(4)}>
          <ListItemIcon>
            <img className='w-5 h-5' src="data:image/png;base64,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"></img>
          {/* <BookmarkBorderIcon fontSize='small' /> */}
          </ListItemIcon>
          Chặn người này trong 12h
        </MenuItem>
        <MenuItem className=' text-xs' onClick={()=>handleNotifiBlock(5)}>
          <ListItemIcon>
            <img className='w-5 h-5' src="data:image/png;base64,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"></img>
          {/* <BookmarkBorderIcon fontSize='small' /> */}
          </ListItemIcon>
          Chặn người này trong 24h
        </MenuItem>
        <MenuItem className=' text-xs' onClick={()=>handleNotifiBlock(6)}>
          <ListItemIcon>
          <img className='w-5 h-5' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADVUlEQVR4nO2Zy0tVURTGf121tK5R0UihsVaYQdBIiAgaBFmgEET4mPUgQaIyMxpEYpNmNXIQpaQ9tP6HBj2QMMo0miRRNkitKIzwxoJ1YbE5955Hp84x/GDD4Zy11v32Pt9Za+19YRlLD2VAMzAIvAa+6ZDrAX0mNqnEQeANkPMZYnOAFCED9AUg7o5e9U0cfQ6xj8A5YBuwRkc90K3P3EkkLpucGbeBbBH7SmDI8WkkIax0NC/kVwTwE5th4zeV1Ifd7Mim2Mp7vYkZ499EAhg0BETzYXHe+N8iAUwaAnUR/OuNv9SJf46vhkAY+eSRNf4Sa8lNYK3xnycBTC51CQ0YAlKkwqLH+N8kBWm0MqR8PiWdRsucQjYUopDdSUMhQ7tK2xYM+7yJtQ75RWA/CaPXmcSMFqntmp2yet3jyEbGZVKAjMck/Maikk9FO51Ho+rZj/xUGmRTCGWaUaS3mdBiJ+OVpsqmNG8pl/E/YQPQDox6nG6MAG3AelKICm1LpLnzSwZzQJf6BEKJ5vf3EU4gCo0FoEHjVwPPIsR4qr6+6I+ReH4cM+SnnWcvgA5gi55syErXAMeBccd22m8SO7T4xEn+kRayCmflF3RimSJ8SoExJ94ToLyQwylj+EADxIVuh/xuH/tMETWcKeR00RjJdZzZZs5DUmHI2zcxWyg7XTBGl2KcQLuj+ZKQ5PtVDfabaPVyPmkMZCcWF0ZN3I4I5DP6/IS5f98rwB5j8NZnpaLuqzdHJI/6Ft1flztaPUw8+GJiVkYkL1htnktMT1wxRvN6+hzn0UyFx9bzegDygY9o1gHvnJ3XvhglVBth5fPY6ichW9DsqklxuwvsJBpGTCypsFHICzqN7T18UFfgryTZaV0FDqm8NgKrVBrVeu8IcA04qrHajP+4psSw5EuAl8a+hQAQOd0AfkVsIyTno0XHJoexkOTR9GsLmXALjBr9kc8RJrFLY3QVeN4fgLyk95/G5zR/8G/NXm0zRvRD+gD8AL5rt/gceKiEG0zjVa4tsdselBb5vVJdeUv+cbFm7m/Dq50e1wpbq3k+q9mm09F8TrNjFQmjSlcxrBTHgE2kBCKBs/ox5nzGrGpeMl3qINmpVRsze740ofdawmabZZAAfgMH1wsNdmvMrQAAAABJRU5ErkJggg==" />
          {/* <BookmarkBorderIcon fontSize='small' /> */}
          </ListItemIcon>
          Chặn người này vinh vien
        </MenuItem>
       </>
    }
      </Menu>
          </Box>
        ) }
       
        
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location1}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>

        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Box p="1rem 0">
        <Typography color={main} marginBottom="0.7rem" fontWeight="500">
          Social Media Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Twitter />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Media</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <LinkedIn />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
      { isNotification && <NotificationBlockUser onClose={() => setIsNotification(false)} ref={notificationBlockRef} fullname ={username} userId={userId} time={time}  action={actionYou}/>}
    </WidgetWrapper>
  )
}

export default UserWidget