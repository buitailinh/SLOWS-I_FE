import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../utils/context';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
import Logout from '../../pages/Logout';

function DropdownHeader() {
    const [showDropdown, setShowDropdown] = useState(false);
    const ref = useRef(null);
  const { info} = useContext(AppContext)
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const showProfile = () =>{

  }
  return (
    <div ref={ref}>
    {/* <Button onClick={toggleDropdown}> */}
    <button className=" focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center" type="button"
     onClick={handleClick}
     aria-controls={open ? 'account-menu' : undefined}
     aria-haspopup="true"
     aria-expanded={open ? 'true' : undefined}
     >
      <div className='flex flex-col text-center mx-auto justify-center'>
        {info.avatar? (
          <div className='mx-auto'> <img className="w-7 h-7 rounded-full" src={info.avatar} alt="Avatar"  /></div>
        ):(
          <div className='mx-auto'> <img className="w-7 h-7 rounded-full" src="./../../../blank-profile-picture-973460__340.webp" alt="Avatar"  /></div>
        )
        }
        <p className='text-[12px]'>{info.fullName}</p>
      </div>
    </button>

    <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} >
        <Link to="/profile" onClick={toggleDropdown} className='flex' style={{ width: "100%" }}> 
        <Avatar /> Profile
      </Link>
          
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {/* <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon> */}
          <Logout /> 
        </MenuItem>
      </Menu>
   
<script src="../path/to/flowbite/dist/flowbite.min.js"></script>
  </div>
  )
}


const Container = styled.div`
  position: relative;
  display: inline-block;
  z-index: 100;
`;

const DropdownContent = styled.div`

`;

// const Avatar = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   margin-right: 8px;
// `;

const Username = styled.span`
  font-size: 20px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
`;

export default DropdownHeader