import React, { useContext, useEffect, useState} from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { AppContext } from '../utils/context';
import UserWidget from '../components/users/user/UserWidget';
import MyPostWidget from '../components/users/Post/MyPostWidget';
import PostsWidget from '../components/users/Post/PostsWidget';
import FollowingListWidget from '../components/users/Following/FollowingListWidget';
import FollowerListWidget from '../components/users/Following/FollowerListWidget';
import AdWidget from '../components/home/AdWidget';
import socket from '../utils/socket';


function ListPost() {

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { info } = useContext(AppContext);


  
  useEffect(() => {

    socket.on('authentication', (data)=>{
      console.log('data:', data);
    })

   
    // getInfo();
    // console.log("info: ", auth, info);
  }, []);
  const auth = info? info: {};

  return (
    <Box
      width="100%"
      padding="4rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
      sx={{position: "fixed",top: "0"  }}
    >
      <Box flexBasis={isNonMobileScreens ? "22%" : undefined} 
      display={isNonMobileScreens ? "flex" : "none"}
      >
        {/* <div className='fixed -translate-x-6'> */}
        <Box style={{ maxHeight: "90vh", overflowY: "auto" }}
         sx={{
          width:'max',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        
        }}>
        <UserWidget username={auth?.fullName} profilePhotoUrl={auth?.avatar} />
        {/* </div> */}
        <Box m="1rem 0" />
        <FollowingListWidget username={auth?.username} userId={auth?.userId} />
        </Box>
      </Box>

      <Box
        flexBasis={isNonMobileScreens ? "48%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
        >
        <Box style={{ maxHeight: "100vh", overflowY: "auto", }}
         sx={{
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        >
        <MyPostWidget profilePhotoUrl={auth?.avatar} />
        <PostsWidget username={auth?._id} />
        </Box>
      </Box>
      {isNonMobileScreens && (
        <Box flexBasis="24%">
          <AdWidget />
          <Box m="1rem 0" />
          <Box style={{ maxHeight: "48vh", overflowY: "auto", }}
         sx={{
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}>
          <FollowerListWidget username={auth?.fullName} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ListPost