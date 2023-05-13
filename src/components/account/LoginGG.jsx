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
  localStorage.setItem('access_token', data.token.accessToken);
  localStorage.setItem('refresh_token', data.token.refreshToken)
  const accessToken = localStorage.getItem('access_token');
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