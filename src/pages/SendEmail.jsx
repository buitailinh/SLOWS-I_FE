import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SendEmail() {
    const [time, setTime] = useState({ minutes: 3, seconds: 0 });
    const [expired, setExpired] = useState(false);
    const location = useLocation();
    const email = location.state?.email;
    
  useEffect(() => {
    const interval = setInterval(() => {
      if (time.minutes === 0 && time.seconds === 0) {
        clearInterval(interval);
        setExpired(true);
      } else if (time.seconds === 0) {
        console.log('send', email)
        setTime({ minutes: time.minutes - 1, seconds: 59 });
      } else {
        setTime({ minutes: time.minutes, seconds: time.seconds - 1 });
      }
      
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const formatTime = (time) => {
    const minutes = time.minutes < 10 ? `0${time.minutes}` : time.minutes;
    const seconds = time.seconds < 10 ? `0${time.seconds}` : time.seconds;
    return `${minutes}:${seconds}`;
  };

  const redirect = () => {
    window.location.href = 'https://mail.google.com';
  };

  return (
    <div className="flex flex-col items-center pt-20 h-screen bg-[url('../../public/bgsend.jpg')]">
        
      <img src="../../public/sendMail.png" alt="Mail Icon" className="h-45 w-45" />
      <h1 className="text-3xl font-bold text-white mt-8">
        Check your email - <i className=' text-red-300'>{email}</i>
      </h1>
      {expired ? (
        <p className="text-lg text-red-500 mt-10">
          Time has expired. Please try again.
        </p>
      ) : (

      <p className="text-lg text-fuchsia-200 mt-10">
        Redirecting to Gmail in {formatTime(time)}
      </p>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-16"
        onClick={redirect}
      >
        Go to Gmail now
      </button>
    </div>
  );
};

export default SendEmail