import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import {AppContext} from '../utils/context';
import { logoutRoute } from "../utils/APIRoutes";

function Logout() {
    const navigate = useNavigate();
    const {setToken,stopAuth, setInfo } = useContext(AppContext); 
    const handleClick = async () => {
      await axios.get(logoutRoute,{
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
        }
      }).then(()=>{
        localStorage.clear();
        setToken(null);
        setInfo(undefined);
        stopAuth();
        navigate("/login");
      }).catch(err => {
        console.error(err);
      });
       
        // window.location.reload();
      }

  return (
    <Button className="flex px-4 w-full  text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleClick}>
      <BiPowerOff className="pr-1" />   Sign out
    </Button>
  )
}

const Button = styled.button`
  display: flex;
//   justify-content: center;
//   align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
//   background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

export default Logout