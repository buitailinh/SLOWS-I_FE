import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute, searchAvatarRoute } from "../utils/APIRoutes";
import formatFile from "../utils/formatFile";
import api from '../utils/api';

export default function SetAvatar() {
  const api = searchAvatarRoute;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const loadData = async () => {
    if (!localStorage.getItem(import.meta.env.VITE_NAME_AT_KEY)) 
      navigate("/login");
    };
    loadData();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const file = formatFile(avatars[selectedAvatar]);
      const formData = new FormData();
      formData.append('file', file);
      // console.log(formData);
      const { data} = await axios.post(`${setAvatarRoute}`,formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${localStorage.getItem(import.meta.env.VITE_NAME_AT_KEY)}`,
        },
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(import.meta.env.VITE_NAME_AT_KEY, data.token.accessToken);
        localStorage.setItem(import.meta.env.VITE_NAME_RF_KEY, data.token.refreshToken)
        const accessToken = localStorage.getItem(import.meta.env.VITE_NAME_AT_KEY);
        if(accessToken){
          // console.log(accessToken);
          setTimeout(() => {  window.location.reload(); }, 100)
          navigate("/profile")
        }
        else {
          toast.error("Error setting avatar. Please try again.", toastOptions);
        }
      } 
    }
  };

  const loadData = async () => {
    const data = [];
    try {
      for (let i = 0; i < 5; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}.png`,
          // 'https://api.multiavatar.com/Binx Bond.png',
          {
            responseType: 'arraybuffer',
          })
        .then(res =>
            btoa(new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )));
        data.push(`data:image/png;base64,${image}`);
      }
      setAvatars(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error setting avatar. Please try again.", toastOptions);
    }
    
  };
  useEffect(() => {
  loadData();
  }, []);
  // const searchAvatarOther = () => window.location.reload();

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1 className=" text-2xl text-inherit">Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    // src={`data:image/svg+xml;base64,${avatar}`}
                    src={`${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <div>
          <button onClick={loadData} className="search-btn mr-2"> Pick a avatar others </button>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          </div>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg clip-path='url(%26quot%3b%23SvgjsClipPath1167%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1168)'%3e%3c/rect%3e%3ccircle r='44.52' cx='827.83' cy='559.51' fill='url(%23SvgjsLinearGradient1169)'%3e%3c/circle%3e%3ccircle r='18.045' cx='1068.06' cy='267.15' fill='url(%23SvgjsLinearGradient1170)'%3e%3c/circle%3e%3ccircle r='55.845' cx='1328.63' cy='431.7' fill='url(%23SvgjsLinearGradient1171)'%3e%3c/circle%3e%3ccircle r='47.76' cx='793.82' cy='522.37' fill='%2343468b'%3e%3c/circle%3e%3ccircle r='39.44' cx='264.92' cy='492.96' fill='%23834fa5'%3e%3c/circle%3e%3ccircle r='20.675' cx='476.4' cy='128.83' fill='url(%23SvgjsLinearGradient1172)'%3e%3c/circle%3e%3ccircle r='53.3' cx='208.6' cy='28.37' fill='url(%23SvgjsLinearGradient1173)'%3e%3c/circle%3e%3ccircle r='45.74' cx='1311.06' cy='516.77' fill='url(%23SvgjsLinearGradient1174)'%3e%3c/circle%3e%3ccircle r='32.45' cx='1015.24' cy='341.97' fill='url(%23SvgjsLinearGradient1175)'%3e%3c/circle%3e%3ccircle r='43.18' cx='1322.14' cy='184.98' fill='url(%23SvgjsLinearGradient1176)'%3e%3c/circle%3e%3ccircle r='19.695' cx='1172.04' cy='320.33' fill='url(%23SvgjsLinearGradient1177)'%3e%3c/circle%3e%3ccircle r='49.41' cx='393.48' cy='552.75' fill='%2343468b'%3e%3c/circle%3e%3ccircle r='39.195' cx='220.93' cy='358.05' fill='url(%23SvgjsLinearGradient1178)'%3e%3c/circle%3e%3ccircle r='31.615' cx='146.18' cy='57.64' fill='url(%23SvgjsLinearGradient1179)'%3e%3c/circle%3e%3ccircle r='30.795' cx='1410.32' cy='518.54' fill='url(%23SvgjsLinearGradient1180)'%3e%3c/circle%3e%3c/g%3e%3cdefs%3e%3cclipPath id='SvgjsClipPath1167'%3e%3crect width='1440' height='560' x='0' y='0'%3e%3c/rect%3e%3c/clipPath%3e%3clinearGradient x1='15.28%25' y1='-39.29%25' x2='84.72%25' y2='139.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1168'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(151%2c 6%2c 79%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='738.7900000000001' y1='559.51' x2='916.8700000000001' y2='559.51' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1169'%3e%3cstop stop-color='%2384b6e0' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(112%2c 112%2c 208%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='1031.97' y1='267.15' x2='1104.15' y2='267.15' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1170'%3e%3cstop stop-color='%2332325d' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(197%2c 197%2c 207%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='1216.94' y1='431.7' x2='1440.3200000000002' y2='431.7' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1171'%3e%3cstop stop-color='%2332325d' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(197%2c 197%2c 207%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='435.04999999999995' y1='128.83' x2='517.75' y2='128.83' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1172'%3e%3cstop stop-color='%2384b6e0' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(112%2c 112%2c 208%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='102' y1='28.370000000000005' x2='315.2' y2='28.370000000000005' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1173'%3e%3cstop stop-color='%23ab3c51' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(137%2c 120%2c 227%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='1219.58' y1='516.77' x2='1402.54' y2='516.77' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1174'%3e%3cstop stop-color='%2384b6e0' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(112%2c 112%2c 208%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='950.34' y1='341.97' x2='1080.14' y2='341.97' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1175'%3e%3cstop stop-color='%2332325d' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(197%2c 197%2c 207%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='1235.7800000000002' y1='184.98' x2='1408.5000000000002' y2='184.98' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1176'%3e%3cstop stop-color='%2332325d' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(197%2c 197%2c 207%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='1132.6499999999999' y1='320.33' x2='1211.4299999999998' y2='320.33' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1177'%3e%3cstop stop-color='%2384b6e0' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(112%2c 112%2c 208%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='142.54000000000002' y1='358.05' x2='299.32000000000005' y2='358.05' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1178'%3e%3cstop stop-color='%23ab3c51' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(137%2c 120%2c 227%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='82.95000000000002' y1='57.64' x2='209.41000000000003' y2='57.64' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1179'%3e%3cstop stop-color='%2332325d' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(197%2c 197%2c 207%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='1348.73' y1='518.54' x2='1471.91' y2='518.54' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1180'%3e%3cstop stop-color='%23ab3c51' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(137%2c 120%2c 227%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }

  .search-btn {
      background-color: #4e0e;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      &:hover {
        background-color: #4e1e;
    }
  }
`;