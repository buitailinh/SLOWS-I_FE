import React, { useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginGGRoute } from '../../utils/APIRoutes';
import axios from "axios";
import queryString from 'query-string';
import jwt from 'jsonwebtoken';

function LoginGG() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const {token } = queryString.parse(location.search);
  const data = JSON.parse(token)
  

  useEffect(() =>{
  localStorage.setItem(import.meta.env.VITE_NAME_AT_KEY, data.token.accessToken);
  localStorage.setItem(import.meta.env.VITE_NAME_RF_KEY, data.token.refreshToken)
  const accessToken = localStorage.getItem(import.meta.env.VITE_NAME_AT_KEY);
  if(accessToken){
    // navigate("/");
    window.location.href = '/';
  }
  else{
    navigate("/login");
  }
  })


  return (
    <div>LoginGG</div>
    // <div></div>
  )
}

export default LoginGG