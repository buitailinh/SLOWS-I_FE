import React, { useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAvatarRoute } from '../utils/APIRoutes';


function Profile() {
    const navigate = useNavigate();
    useEffect( async() => {

        if (!localStorage.getItem(import.meta.env.VITE_NAME_AT_KEY)) {
          navigate("/login");
        };

       await axios.post(`${setAvatarRoute}`, 
      {

      },
            {headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem(import.meta.env.VITE_NAME_AT_KEY)}`,
            }}
        );


    },
      []);
  return (
    <div>Profile</div>
  )
}

export default Profile