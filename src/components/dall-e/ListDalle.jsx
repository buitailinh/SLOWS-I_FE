import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './../../utils/api';
import { dalleRoute } from '../../utils/APIRoutes';
import SinglePostSkeleton from '../users/Post/SinglePostSkeleton';
import { Box, useMediaQuery, Skeleton, Divider, Button } from "@mui/material";
import WidgetWrapper from '../users/styledComponents/WidgetWrapper';
import SingleDalle from './SingleDalle';

function ListDalle() {

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [dalles, setDalles] = useState();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    const getMeDalle = async () =>{
        if (page > 1 && hasMore) {
            setIsLoadingMore(true);
          }
          try {
            const response = await api.get(`${dalleRoute}/me`);

            console.log('dalle:', response);
            const data = response.data;
      
            // setHasMore(data.data.hasMore);
      
            if (page === 1) {
              setDalles(data[0])
            } else {
              setDalles(data[0]);
            }
      
            return;
          } catch (err) {
            console.error(err);
          } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
          }
    }

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
    getMeDalle();
  }, [page]);


  if (isLoading) {
    return Array.from(new Array(2)).map((el, index) => (
      <SinglePostSkeleton key={index} />
    ));
  }




  return (
    <Box>
      {dalles.length ===0? <Box sx={{
            width: '100%',
            textAlign: "center",  fontSize: "18px", fontWeight: "500"
        }}
        alignItems="center"
        > Ban chua co bo sua tap nao! Hay them no 
            <Link to='/create-post' > <p className=' text-blue-600'> tai  day </p></Link>
        </Box> :(
            <Box
            style={{ maxHeight: "92vh", overflowY: "auto", }}
            sx={{
             overflowY: 'auto',
             '&::-webkit-scrollbar': {
               display: 'none',
             },
           }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gridAutoRows: 'minmax(200px, auto)', gridGap: '1rem' }}>
            {
              dalles.map(({ _id, prompt, photos}) =>(
                <SingleDalle  
                key={_id}
                prompt={prompt}
                photos={photos}
                />
              ))
            }
            </div>
        
          </Box>
        )}
        
    </Box>
  )
}

export default ListDalle