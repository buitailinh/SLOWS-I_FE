import React, { useState } from 'react';
import { Typography, Box, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function FormatLikes({ users, isNonMobileScreens, otherLikes }) {

  const [user, setUser] = useState(users[0]);
  const { palette } = useTheme();

  const handleClick = (user) => {
    setUser(user);
  };


  return (
<Box component="span" display="inline">
      {users.length > 1 ? (
        isNonMobileScreens ? (
          users.slice(0, 2).map((user, index) => (
            <Link
              key={uuidv4()}
              to={`/profile/${user.userId}`}
              onClick={() => handleClick(user.userId)}
              style={{ color: palette.neutral.dark }}
            >
              {user.fullname}
              {index !== 1 ? ", " : " "}
            </Link>
          ))
        ) : (
          <Link
            to={`/profile/${user.userId}`}
            onClick={() => handleClick(userId)}
            style={{ color: palette.neutral.dark }}
          >
            {user.fullname + " "}
          </Link>
        )
      ) : users.length === 1 ? (
        <Link
        to={`/profile/${user.userId}`}
        onClick={() => handleClick(userId)}
        style={{ color: palette.neutral.dark }}
      >
        {user.fullname + " "}
      </Link>
      ) : (
        <></>
      )}
      {users.length + otherLikes > 2 ? (
        <Typography color="textSecondary" display="inline">
          and {otherLikes} {otherLikes > 1 ? "others" : "other"} like this
        </Typography>
      ) : users.length + otherLikes === 0 ? (
        " likes this"
      ) : (
        <Typography color="textSecondary" display="inline">
         {` like this`}
        </Typography>
      )}
    </Box>
  )
}

export default FormatLikes