import React, { useState, useEffect, useContext } from 'react'
import { Box, Typography, useTheme } from "@mui/material";
import { AppContext } from '../../../utils/context';
import WidgetWrapper from '../styledComponents/WidgetWrapper';
import Following from './Following';
import FollowingListSkeleton from './FollowingListSkeleton';
import { followersRoute,followAddRoute } from '../../../utils/APIRoutes';
import api from '../../../utils/api';

function FollowerListWidget({ username , isProfile=false }) {

    const { palette } = useTheme();
    const  [followers, setFollowers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { info }  = useContext(AppContext);

    const getFollowers = async () => {
        const {data} = await api.get(followAddRoute);
    setIsLoading(false)

    setFollowers(data[0]);     
}


useEffect(() => {
    getFollowers();
},[info])

if(isLoading){
    return (
      <FollowingListSkeleton/>
    )
}
if(followers.length){
    return (
        <WidgetWrapper>
            <Typography
              color={palette.neutral.dark}
              variant="h5"
              fontWeight="500"
              sx={{ mb: "1.5rem" }}
            >
               Recommend to friends
            </Typography>

            <Box display="flex" flexDirection="column" gap="1.5rem">
            {followers.map(({ 
    _id, 
    firstName,
    lastName,
    avatar,
  }) => {
    const name = firstName + ' ' + lastName;
    return (
      <Following
        isProfile={true}
        key={_id}
        followingId={_id}
        name={name}
        userProfilePhotoUrl={avatar || 'https://res.cloudinary.com/dllwgzvxm/image/upload/v1680174020/blank-profile-picture-973460__340_vurt3r.webp'}
      />
    );
  })}
            </Box>
        </WidgetWrapper>
    )
  }
}

export default FollowerListWidget