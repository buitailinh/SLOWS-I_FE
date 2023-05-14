import React, { useEffect, useState }  from 'react'
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import SinglePostSkeleton from './SinglePostSkeleton';
import SinglePostWidget from './SinglePostWidget';
import { dallePostRoute, postMeRoute, postRoute } from '../../../utils/APIRoutes';
import api from '../../../utils/api';
import { Box } from '@mui/material';

function PostsWidget({ userId, isProfile = false }) {

    const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
    const  [posts, setPosts] = useState();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getMePosts = async () => {
    if (page > 1 && hasMore) {
      setIsLoadingMore(true);
    }
    try {
      const response = await api.get(postMeRoute, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem(import.meta.env.REACT_APP_NAME_AT_KEY)}` },
      });
      const data = response.data;

      // setHasMore(data.data.hasMore);

      if (page === 1) {
        setPosts(data[0])
      } else {
        setPosts(data[0]);
      }

      return;
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const getListPosts = async () => {
    if (page > 1 && hasMore) {
      setIsLoadingMore(true);
    }
    if (!hasMore) {
      setIsLoadingMore(false);
      return;
    }
    try {
    
      const response = await api.get(`${postRoute}`);
      const data =  response.data.data;
      // console.log('Test4', data.data);
      setHasMore(data.hasMore);

      if (page === 1) {
        setPosts(data)
      } else {
        setPosts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const getUserPosts = async () => {
    if (page > 1 && hasMore) {
      setIsLoadingMore(true);
    }
    if (!hasMore) {
      setIsLoadingMore(false);
      return;
    }
    try {
    
      const response = await api.get(`${postRoute}/users/${userId}`);
      const data = response.data;
      setHasMore(data.hasMore);

      if (page === 1) {
        setPosts(data[0])
      } else {
        setPosts(data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  /**===========Handle Scroll============ */
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentHeight = window.innerHeight + window.pageYOffset;

      if (currentHeight + 1 >= scrollHeight && hasMore) {
        setPage(page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, hasMore]);

  useEffect(() => {
    if (isProfile) {
      if(userId){
        getUserPosts();
      } else{
        getMePosts();
      }
    } else {
      getListPosts();
      
    }
  }, [page, isProfile, userId]);


  if (isLoading) {
    return Array.from(new Array(2)).map((el, index) => (
      <SinglePostSkeleton key={index} />
    ));
  }


  return (
    <>
    {posts.length === 0 &&  <Box sx={{
            width: '100%',
            marginTop: '50%',
            textAlign: "center",  fontSize: "18px", fontWeight: "500"
        }}
        alignItems="center"
        > Chua co bai viet nao!
            
        </Box>}
      {posts.map(
        ({
          _id,
          author,
          location,
          content,
          images,
          userProfilePhoto,
          likes,
          comments,
          createdAt,
          qrCode
        }) => (
          <SinglePostWidget
            key={uuidv4()}
            postId={_id}
            postUserId={author}
            location={location}
            caption={content}
            postImageUrls={images[0]}
            likes={likes}
            commentCount={comments.length}
            createdAt={createdAt}
            qrCode={qrCode}
          />
        )
      )}
      {isLoadingMore
        ? Array.from(new Array(1)).map((el, index) => (
            <SinglePostSkeleton key={uuidv4()} />
          ))
        : null}
    </>
  )
}

export default PostsWidget