import React, { useState, useEffect, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from '../../../utils/context';
import WidgetWrapper from '../styledComponents/WidgetWrapper';
import Following from './Following';
import FollowingListSkeleton from './FollowingListSkeleton';
import { followersRoute, followingRoute } from '../../../utils/APIRoutes';
import api from '../../../utils/api';
import socket from '../../../utils/socket';

function FollowingListWidget({ username , isProfile=false }) {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const  [followers, setFollowers] = useState();
    const [followings, setFollowing] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { info }  = useContext(AppContext);
    const token = useSelector((state) => state.token);
    // const signedInUsername = useSelector((state) => state.user.username )
    // const followings = useSelector((state) => state.user.followings);
    // const followings = 2;


    const getFollowings = async () => {
        const { data} = await api.get(followingRoute);
        // const {data} = await response.json();
        setIsLoading(false)
     
          // dispatch(setFollowing({ followings: data }));
        setFollowing(data);
     
          // dispatch(setPersonFollowing({ followings: data }));
    }

    const getFollowers = async () => {
            const {data} = await api.get(followersRoute);
        // const data = await response.json();
        setIsLoading(false)

        // console.log('test:',isSignedInUserProfile)
          // dispatch(setFollowers({ followers: data }));
          setFollowers(data);     
          // dispatch(setPersonFollowers({ followers: data}));
    }

    

    useEffect(() => {
        getFollowings();
        // getFollowers();
    },[info])

    if(isLoading){
        return (
          <FollowingListSkeleton/>
        )
    }
  if(followings.length){
    return (
        <WidgetWrapper>
            <Typography
              color={palette.neutral.dark}
              variant="h5"
              fontWeight="500"
              sx={{ mb: "1.5rem" }}
            >
               People you following
            </Typography>

            <Box display="flex" flexDirection="column" gap="1.5rem">
            {followings.map(({ 
    _id, 
    firstName,
    lastName,
    occupation,
    creator,
    receiver, 
    receiverStatus,
    creatorStatus
  }) => {
    const name = creator._id === info.userId ? receiver.firstName + ' ' + receiver.lastName : creator.firstName + ' ' + creator.lastName;
    const avatar = creator._id === info.userId ? receiver.avatar : creator.avatar;
    const userId = creator._id === info.userId ? receiver._id : creator._id;
    const status = creator._id === info.userId ?  creatorStatus:receiverStatus;
    return (
      <Following
        isProfile={true}
        key={_id}
        followingId={userId}
        name={name}
        status = {status}
        subtitle={occupation}
        userProfilePhotoUrl={avatar || 'https://res.cloudinary.com/dllwgzvxm/image/upload/v1680174020/blank-profile-picture-973460__340_vurt3r.webp'}
      />
    );
  })}
            </Box>
        </WidgetWrapper>
    )
  }

    
}

export default FollowingListWidget