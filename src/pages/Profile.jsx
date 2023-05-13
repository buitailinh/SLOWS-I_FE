import React, { useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAvatarRoute } from '../utils/APIRoutes';


function Profile() {
    const navigate = useNavigate();
    useEffect( async() => {

        if (!localStorage.getItem('access_token')) {
          navigate("/login");
        };

       await axios.post(`${setAvatarRoute}`, 
      {

      },
            {headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }}
        );


    },
      []);
  return (
    <div>Profile</div>
  )
}

export default Profile