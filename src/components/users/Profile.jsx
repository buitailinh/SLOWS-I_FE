import React, { useEffect, useState, useContext } from 'react'
import { Box, useMediaQuery, Skeleton, Divider, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FollowingListWidget from './Following/FollowingListWidget';
import WidgetWrapper from './styledComponents/WidgetWrapper';
import UserAvatar from './styledComponents/UserAvatar';
import UserWidget from './user/UserWidget';
import PostsWidget from './Post/PostsWidget';
import MyPostWidget from './Post/MyPostWidget';
import FlexBetween from './styledComponents/FlexBetween';
import { profileMeRoute, inforUserRoute } from '../../utils/APIRoutes';
import api from '../../utils/api';
import { AppContext } from '../../utils/context';
import ListDalle from '../dall-e/ListDalle';



function Profile() {
  const [user, setUser] = useState({});
  const [isListPost, setIsListPost] = useState(true);
  const { info } = useContext(AppContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");


  function handleSelectOption (){
    setIsListPost(!isListPost);
    console.log(isListPost)
  }
 
  const getUser = async () => {
    if(id){
      console.log('info', info)
      if(id === info.userId){
        navigate('/profile');
      } else{
     const response = await  api.get(`${inforUserRoute}/${id}`);
     const userData = response.data;
      if(response.status === 200){
        userData.fullname = userData.firstName + ' ' + userData.lastName;
        setUser(userData);
      } else {
        navigate('/');
      }
    }
    } else{
      
     const response = await api.get(profileMeRoute);
    if (response.status === 200) {
      const userData = response.data;

      userData.fullname = userData.firstName + ' ' + userData.lastName;
      setUser(userData);
    } else {
      navigate("/");
    }
  }

   
  };

  useEffect(() => {
    if(info){
    getUser();
    }
    
  }, [id, info]);
  return (
<Box>

      <Box
        width="100%"
        padding="4rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="4rem"
        justifyContent="center"
        sx={{position: "fixed",top: "0"  }}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined} >
          <Box
          style={{ maxHeight: "92vh", overflowY: "auto", }}
          sx={{
           overflowY: 'auto',
           '&::-webkit-scrollbar': {
             display: 'none',
           },
         }}
          >
          {!user ? (
            <WidgetWrapper>
              <FlexBetween gap="0.5rem" pb="1.1rem">
                <FlexBetween>
                  <UserAvatar isLoading={true} />
                  <Box marginLeft="1rem">
                    <Skeleton variant="h4" width="11rem" />
                    <FlexBetween paddingTop="0.4rem" width="11rem">
                      <FlexBetween>
                        <Skeleton width="5rem" />
                      </FlexBetween>
                      <FlexBetween>
                        <Skeleton width="5rem" />
                      </FlexBetween>
                    </FlexBetween>
                  </Box>
                </FlexBetween>
                <Skeleton
                  width="2rem"
                  height="3rem"
                  sx={{ borderRadius: "50%" }}
                />
              </FlexBetween>

              <Divider />

              <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.1rem">
                  <Skeleton
                    width="2rem"
                    height="3.2rem"
                    sx={{ borderRadius: "50%" }}
                  />
                  <Skeleton width="10rem" />
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                  <Skeleton
                    width="2rem"
                    height="3.2rem"
                    sx={{ borderRadius: "50%" }}
                  />
                  <Skeleton width="10rem" />
                </Box>
              </Box>

              <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                  <Skeleton width="10rem" />
                  <Skeleton width="4rem" />
                </FlexBetween>

                <FlexBetween>
                  <Skeleton width="10rem" />
                  <Skeleton width="3rem" />
                </FlexBetween>
              </Box>

              <Box p="1rem 0">
                <Skeleton width="10rem" mb="0.7rem" />
                <FlexBetween gap="1rem" mb="0.5rem">
                  <FlexBetween gap="1rem">
                    <Skeleton
                      width="2rem"
                      height="3.2rem"
                      sx={{ borderRadius: "50%" }}
                    />
                    <Box>
                      <Skeleton width="10rem" />
                      <Skeleton width="6rem" />
                    </Box>
                  </FlexBetween>
                  <Skeleton
                    width="2rem"
                    height="3.2rem"
                    sx={{ borderRadius: "50%" }}
                  />
                </FlexBetween>

                <FlexBetween gap="1rem">
                  <FlexBetween gap="1rem">
                    <Skeleton
                      width="2rem"
                      height="3.2rem"
                      sx={{ borderRadius: "50%" }}
                    />
                    <Box>
                      <Skeleton width="10rem" />
                      <Skeleton width="4rem" />
                    </Box>
                  </FlexBetween>
                  <Skeleton
                    width="2rem"
                    height="3.2rem"
                    sx={{ borderRadius: "50%" }}
                  />
                </FlexBetween>
              </Box>
            </WidgetWrapper>
          ) : (
            <UserWidget
              username={user.fullname}
              userId= {id}
              profilePhotoUrl={user.avatar}
            />
          )}
          <Box m="1rem 0" />
          {!user ? (
            <WidgetWrapper>
              <Skeleton
                width="60%"
                height={25}
                style={{ marginBottom: "1.5rem" }}
              />
              <Box display="flex" flexDirection="column" gap="1.5rem">
                {Array.from(new Array(3)).map((p) => (
                  <FlexBetween key={uuidv4()}>
                    <FlexBetween gap="1rem">
                      <UserAvatar isLoading={true} size="55px" />

                      <Box>
                        <Skeleton
                          width="150px"
                          height={25}
                          style={{ marginBottom: "0.25rem" }}
                        />
                        <Skeleton width="75px" height={20} />
                      </Box>
                    </FlexBetween>

                    <FlexBetween>
                      <Skeleton
                        variant="circle"
                        width={30}
                        height={30}
                        style={{ padding: "0.6rem", borderRadius: "50%" }}
                      />
                    </FlexBetween>
                  </FlexBetween>
                ))}
              </Box>
            </WidgetWrapper>
          ) : (
            <FollowingListWidget username={user.username} userId={user._id} />
          )}
        </Box>
            </Box>
        <Box
          flexBasis={isNonMobileScreens ? "48%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {(id === info?.userId || !id ) && <Box>
            <WidgetWrapper sx={{ paddingY: '0.5rem'}}>
              <Box sx={{ display:'flex', justifyContent: 'space-around', alignItems: "center"}}>
                <Button sx={{ backgroundColor: isListPost ? 'blue': '#a7dbf1' , width: "40%", textAlign: "center"}} onClick={!isListPost ? handleSelectOption : null}>Bai viet cua ban</Button>
                <Button sx={{ backgroundColor: isListPost ? '#a7dbf1' : 'blue', width: "40%", textAlign: "center"}} onClick={isListPost ? handleSelectOption : null}>Bo suu tap</Button>
              </Box>
              
            </WidgetWrapper>
            
          </Box>}
          <Box
          style={{ maxHeight: "92vh", overflowY: "auto", }}
          sx={{
           overflowY: 'auto',
           '&::-webkit-scrollbar': {
             display: 'none',
           },
         }}
          >
            {(id ) && <Box >
            <WidgetWrapper sx={{ paddingY: '0.5rem', backgroundColor:'#a7dbf1'}}>
              <Box sx={{ textAlign: "center",  fontSize: "18px", fontWeight: "500" }}> 
                {`Bai viet cua ${user.fullname}`}
              </Box>
            </WidgetWrapper>
            </Box>}
              {/* <MyPostWidget profilePhotoUrl={info?.avatar} /> */}
              <Box m="1rem 0" />
          {!user ? (
            Array.from(new Array(3)).map((el, index) => (
              <WidgetWrapper marginBottom="2rem" key={index}>
                {/* Following skeleton  */}
                <FlexBetween>
                  <FlexBetween gap="1rem">
                    <UserAvatar isLoading={true} size="55px" />

                    <Box>
                      <Skeleton
                        width="150px"
                        height={25}
                        style={{ marginBottom: "0.25rem" }}
                      />
                      <Skeleton width="75px" height={20} />
                    </Box>
                  </FlexBetween>

                  <FlexBetween>
                    <Skeleton
                      variant="circle"
                      width={30}
                      height={30}
                      style={{ padding: "0.6rem", borderRadius: "50%" }}
                    />
                  </FlexBetween>
                </FlexBetween>

                <Skeleton
                  width="100%"
                  height={20}
                  style={{ marginTop: "1rem" }}
                />
                <Skeleton width="50%" height={20} />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Skeleton
                    variant="rect"
                    width="100%"
                    height="25rem"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                  />
                </div>

                <FlexBetween mt="0.25rem">
                  <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                      <Skeleton
                        variant="circle"
                        width={24}
                        height={24}
                        style={{ borderRadius: "50%" }}
                      />
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                      <Skeleton
                        variant="circle"
                        width={24}
                        height={24}
                        style={{ borderRadius: "50%" }}
                      />
                    </FlexBetween>
                  </FlexBetween>

                  <Skeleton
                    variant="circle"
                    width={24}
                    height={24}
                    style={{ borderRadius: "50%" }}
                  />
                </FlexBetween>
              </WidgetWrapper>
            ))
          ) : (
             isListPost? <PostsWidget isProfile={true} userId={id} /> : 
             <ListDalle/>
          )}
          </Box>
        </Box>
      </Box>
    </Box>

  )
}

export default Profile