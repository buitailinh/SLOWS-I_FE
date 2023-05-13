
import React,{useEffect, useContext, Component} from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { logo } from './assets';
import { useSelector } from 'react-redux';
import { 
  Home,
  CreatePost,
  ChatAI,
  ListPost,
  SendOTP,
  DetailPost,
  ChatUser
 } from './pages';
import Register from './pages/Register';
import Login from './pages/Login';
import SetAvatar from './pages/SetAvatar';
import {AppContext} from './utils/context'
import SendEmail from './pages/SendEmail';
import VeryEmail from './components/account/VeryEmail';
import LoginGG from './components/account/LoginGG';
import {CssBaseline, ThemeProvider} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from 'react'
import Header from './components/header/Header'
import DropdownHeader from './components/header/DropdownHeader';
import { Profile } from './components/users';
import { themeSettings} from './utils/theme';
import StorePage from './pages/StorePage';
// import ComfirmOTP from './components/account/ComfirmOTP';

const App = () => {
  const navigate = useNavigate();
  const { auth,setToken,grantAuth, setInfo } = useContext(AppContext); 
  const location = useLocation();
  // user manually refesher browser after login
   useEffect(() => {

    const accessToken = localStorage.getItem('access_token');
          // console.log('abc');
          if (accessToken) {
            // setToken(accessToken);
            // const decodedToken = jwt.decode(accessToken);
            // setInfo(decodedToken)
            // grantAuth() 
          }
          // api.interceptors.response.use(
          //   (response) => {
          //     console.log('refreshToken:',response);
          //     return response;
          //   },
          //   async (error) => {
          //     const originalRequest = error.config;
          
          //     // Kiểm tra xem access token hết hạn hay không
          //     if (error.response.status === 401 && !originalRequest._retry) {
          //       originalRequest._retry = true;
          //       const refresh_token = localStorage.getItem('refresh_token');
          
          //       // Gọi API đổi access token mới với refresh token
          //       const response = await axios.post('http://localhost:3000/refresh-token', {
          //         refresh_token,
          //       });
          
          //       // Lưu trữ access token mới vào LocalStorage
          //       localStorage.setItem('access_token', response.data.access_token);
          
          //       // Gán access token mới vào header của yêu cầu
          //       api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
          
          //       // Gửi lại yêu cầu ban đầu với access token mới
          //       return api(originalRequest);
          //     }
          //     return Promise.reject(error);
          //   }
          // );
   }, []);
   const handleNavigateToCreatePost = () => {
    navigate('/create-post');
  }

  const mode = useSelector((state ) =>  state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])


   return (

  <div>
    <Header />
    <main className=" w-full bg-[#f9fafe]  min-h-screen pt-18">
    <ThemeProvider theme={theme}>
    <CssBaseline/>
      <Routes>
          <Route path="/register" element={<Register />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<SendOTP />} />
          {/* <Route path='/comfirmOTP' element={<ComfirmOTP />} /> */}

          <Route path="/sendMail" element={<SendEmail />} />
          <Route path="/confirm?/:email/:token" element={<VeryEmail/>} />

          <Route path="/create-post" element={ <CreatePost />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/chatAI" element={<ChatAI />} />
          <Route path="/chat" element={<ChatUser/>} />
          <Route path="/chat/:id" element={<ChatUser/>} />
          <Route path="/chatAI/:id" element={<ChatAI />} />
          <Route path="/post/:id" element={<DetailPost />} />
          <Route path="/listPosts" element={<ListPost />} />
          <Route path="/store" element={<StorePage />} />
          <Route path='/loginGG?/:token' element={<LoginGG />} />
          {/* <Route path="*" element={<p>Path not resolved</p>} /> */}
      </Routes>
      </ThemeProvider>
    </main>
    
   </div>
);
  }



export default App;