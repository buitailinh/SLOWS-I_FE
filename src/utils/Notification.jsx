import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { close } from '../assets';

function Notification({ message, type }) {
    const [showAlert, setShowAlert] = useState(true);

    // useEffect(() => {
    //   console.log('abc')
    //   // const timeout = setTimeout(() => {
    //   //   setShowAlert(false);
    //   // }, 5000);
  
    //   return () => {
    //     // clearTimeout(timeout);
    //   };
    // }, []);


  
    return (
      //   <Container>
      // <div className="overlay"></div>
      // <div className={`alert ${type}`}>
      //   <p>{message}</p>
      // </div>
      // </Container>

      <Container>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <div className=' bg-slate-200 w-[330px]'>
      <div className="bg-[url('./assets/notification.png')] bg-no-repeat bg-center bg-cover p-4 rounded-md shadow-lg" style={{backgroundSize: '50%'}}>
      <h2 className="text-xl align-middle font-medium mb-10 color-inherit">NOTIFICATION</h2>
        <div className={`alert ${type}`}>
        <p className='text-lg font-medium text-center'>{message}</p>
        </div>
      </div>
      </div>
    </div>
    </Container>

    );
}

const Container = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;


  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }


.alert {
  border-radius: 0.25rem;
  padding: 0rem 0rem;
  max-width: 90vw;
  }
  
  .alert p {
    margin-top: 0;
  }
  
  .alert.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  .alert.warning {
    color: #CC0000;
    border: 1px solid #ffeeba;
  }
  
  .alert.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
  
`

export default Notification