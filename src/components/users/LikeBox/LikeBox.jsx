import React from 'react';
import { Box, AvatarGroup, Avatar, useMediaQuery } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import FormatLikes   from './FormatLikes';

function LikeBox({ likes, likeCount }) {

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const users = likes.map((l) => { return { fullname: l.firstName + " " + l.lastName, userId: l._id } });



  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      mb: "1rem",
    }}
  >
    <AvatarGroup max={4}>
      {likes
        .slice(0, isNonMobileScreens ? 4 : 3)
        .map(({ username, avatar }, i) => (
          <Avatar
            key={uuidv4()}
            sx={{ width: 23, height: 23 }}
            alt={username}
            src={avatar}
          />
        ))}
    </AvatarGroup>

    <Box component={"span"} sx={{ ml: "0.5rem" }}>
      <FormatLikes
        isNonMobileScreens={isNonMobileScreens}
        users={users}
        otherLikes={
          likeCount > 0 ? likeCount - (isNonMobileScreens ? 2 : 1) : 0
        }
      />
    </Box>
  </Box>
  )
}

export default LikeBox