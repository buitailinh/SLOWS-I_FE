import React,{useEffect,useRef, useContext, useState} from 'react'
import styled from "styled-components";
import { AppContext } from '../../utils/context';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { logo } from '../../assets';
import ButtonHeader from './ButtonHeader';
import DropdownHeader from './DropdownHeader';
import FlexBetween from '../users/styledComponents/FlexBetween';
import SearchBar from './SearchBar';
import Notification from './Notification';
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import {
  Textsms,
  LightMode,
  DarkMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ImagesearchRollerIcon from '@mui/icons-material/ImagesearchRoller';
import ChatIcon from '@mui/icons-material/Chat';
import { blue } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import { getTotalMsgNotification, listenMsgItemNotificationOfAUser } from '../../utils/firebase';


function Header() {

  const { auth, info } = useContext(AppContext);

  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isSendMailPage = location.pathname === '/sendMail';
  const isSendOTP = location.pathname === '/forgot-password';
  const [numMsgNotifi, setNumMsgNotifi] = useState(0);
  // const isComfirmOTP = location.pathname = '/comfirmOTP';
  // const isCreatePost = location.pathname === '/create-post';

     const handleMobileMenuToggle = () => {
          setIsMobileMenuToggled(!isMobileMenuToggled);
        };

        useEffect(() => {
          if(info){
          // numNotification();
          getTotalMsgNotification(info.userId, (quantity)=>{
            setNumMsgNotifi(quantity);
          });
          
        }
        },[info]);
  return (
   <Container>
       {!isLoginPage && !isRegisterPage && !isSendMailPage && (
    // bg-[url('./../public/bgHeader2.jpg')] bg-white
    <div>
    {isNonMobileScreens ? (
    <header className="fixed top-0 z-50 bg-[url('./assets/header2.avif')] bg-cover bg-no-repeat bg-center bg-fixed  w-full flex overflow-visible justify-between items-center  sm:px-8 px-4 py-1 border-b border-b-[#e6ebf4] ">
      <Link to="/">
      <div className="items-center gap-4 justify-center flex">
        <img src={logo} alt="logo" className="w-9 object-contain" />
        <h1 className='uppercase  font-[800] text-xl'>snappy</h1> 
        </div>
      </Link>

      <SearchBar />
      
      {/* <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Create</Link> */}
      {auth ? (
      <div className='flex justify-center space-x-4 '>
        <Link to="/create-post" className="flex flex-col items-center hover:text-black">

            <ImagesearchRollerIcon sx={{fontSize: "22px", color:"white"}} />
           <ButtonHeader nameButton= {"Dall-e"}/> 
           
        </Link>
        <Link to="/listPosts" className='flex flex-col items-center hover:text-black'> 
            <Diversity3Icon sx={{ fontSize: "22px", color:"white"}}  />
            <ButtonHeader nameButton= {"Common"}/>
            {/* <img src="https://img.icons8.com/pastel-glyph/64/null/groups--v2.png" className='w-25 h-25'/> */}
        </Link>
        <Notification />
        <Link to="/chatAI" className='flex flex-col  items-center  text-white'> 
 
            {/* <Textsms sx={{ fontSize: "25px" }}  /> */}
            <SmartToyIcon sx={{ fontSize: "22px" }} />
            <ButtonHeader nameButton= {"Chat AI"}/>

        </Link>
        <Link to="/setAvatar" > <ButtonHeader nameButton={'Create'}/></Link> 
        <Link to="/chat" className='flex flex-col  items-center  text-white relative'  > 
           <ChatIcon sx={{ fontSize: "22px", color:"white" }} />
           <ButtonHeader nameButton={'Chat'}/>
           { numMsgNotifi >0 && 

        <div className="absolute left-0 top-0 ">
        <span className="relative bg-red-500 rounded-[100%] text-[10px] text-white px-[0.3rem] py-[0.1rem] left-2 top-0 ">{numMsgNotifi}</span>
        </div>
    }
        </Link> 
      <DropdownHeader />
      </div>
      )
      : (
        <div className='flex justify-center space-x-4 '>
        <Link to="/create-post"> <ButtonHeader nameButton= {"Card"}/> </Link>
      <Link to="/login" > <ButtonHeader nameButton={'Login'}/></Link>
      </div>
      )
  }
    </header>
    ):(
      <header className="fixed top-0 z-10 bg-[url('./assets/header2.avif')] bg-cover bg-no-repeat bg-center bg-fixed  w-full flex overflow-visible justify-between items-center  sm:px-8 px-4 py-1 border-b border-b-[#e6ebf4] ">
         <Link to="/">
         <div className="flex  flex-col items-center justify-center">
           <img src={logo} alt="logo" className="w-5 object-contain" />
           <h1 className='uppercase  font-[400] text-xs'>snappy</h1> 
           </div>
         </Link>

         <SearchBar className='w-auto' />
      { isMobileMenuToggled ? (
      <IconButton onClick={handleMobileMenuToggle}>
        <Close/>
      </IconButton>
      ) : (
        <IconButton onClick={handleMobileMenuToggle}>
        <Menu />
      </IconButton>
      )
      }
    </header>
    )
  }
     {!isNonMobileScreens && isMobileMenuToggled && (
         <Box
               position="fixed"
               right="0"
               top="0"
               height="auto"
               maxHeight="80vh"
               maxWidth="500px"
               minWidth="200px"
             >
               {/* CLOSE ICON */}
               <Box display="flex" justifyContent="flex-end" p="1.5rem">
                
               </Box>
               <FlexBetween
                 display="flex"
                 flexDirection="column"
                 justifyContent="center"
                 alignItems="center"
                 gap="2rem"
                 zIndex="2"
                 className='absolute hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 dark:divide-gray-600'
               >
         {auth ? (
         // < className='flex justify-center space-x-4 '>
           <div className='w-full z-150'>
      
         <div className="px-4 py-3 text-sm text-gray-900 dark:text-white" >
           {/* <div>Bonnie Green</div> */}
           <Link to="/profile"> 
             <div className="font-medium truncate">Test</div>
           </Link>
           
         </div>
         <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
           <li>
             <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
           </li>
           <li>
             <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
           </li>
           <li>
             <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
           </li>
         </ul>
         <div class="py-2">
           {/* <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a> */}
         </div>
         <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
          </div>
         )
         : (
           <div className='flex justify-center space-x-4 '>
           <Link to="/create-post"> <ButtonHeader nameButton= {"Card"}/> </Link>
         <Link to="/login" > <ButtonHeader nameButton={'Login'}/></Link>
         </div>
         )
     }
      </FlexBetween>
     </Box>
      )}
   </div>
  )
}
</Container>
)
}

const Container = styled.div`
a:hover > * {
  color: black;
}

.hover\:text-black:hover > * {
  color: black;
  transition: color 0.5s ease-in-out;
}

`


export default Header