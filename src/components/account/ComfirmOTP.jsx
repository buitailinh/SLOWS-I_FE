// import React,{ useState, useRef, useEffect} from 'react'
// import styled from 'styled-components';
// import { ToastContainer, toast } from "react-toastify";
// import anime from "animejs";
// import { useNavigate } from "react-router-dom";
// import Logo from "../../assets/logo.svg";
// import { SendOTP } from '../../pages';


// function ComfirmOTP() {

//     const [otp, setOTP] = useState(["", "", "", "", "", ""]);
//   const [time, setTime] = useState({ minutes: 3, seconds: 0 });
//   const [expired, setExpired] = useState(false);
//   const [filledCount, setFilledCount] = useState(0);
//   const inputRef = useRef([]);
//   const navigate = useNavigate();

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (isNaN(value)) {
//       return;
//     }
//     const newOTP = otp.map((d, i) => (i === index ? value : d));
//     setOTP(newOTP);

//     if (value !== "" && index < 6) {
//     index !== 5 ?  inputRef.current[index + 1].focus() : null;
//     index !== 5 ? console.log("+", filledCount, index) : null;
//     index !== 5 ? setFilledCount(filledCount + 1) : null;
  
//     }
//     else{
//        index > 5 || index ===0? inputRef.current[index].focus() :inputRef.current[index-1].focus();
//        console.log("-", filledCount,index);
//        filledCount ===0 ? null : setFilledCount(filledCount - 1);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Entered OTP is ${otp.join("")}`);
//     navigate('/forgot-password')
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text");
//     if (pasteData.length !== 6) {
//       return;
//     }
//     const otpArray = pasteData.split("");
//     setOTP(otpArray);
//     inputRef.current[0].focus();
//   };
//   const toastOptions = {
//     position: "bottom-right",
//     autoClose: 8000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };
//   useEffect(() => {
//     const design = anime({
//       targets: "svg #XMLID5",
//   keyframes: [
//     { translateX: -500 },
//     { rotateY: 180 },
//     { translateX: 920 },
//     { rotateY: 0 },
//     { translateX: -500 },
//     { rotateY: 180 },
//     { translateX: -500 }
//   ],
//   easing: "easeInOutSine",
//   duration: 60000
//     }
//     );

//     anime({
//       targets: "#dust-paarticle path",
//   translateY: [10, -150],
//   direction: "alternate",
//   loop: true,
//   delay: function (el, i, l) {
//     return i * 100;
//   },
//   endDelay: function (el, i, l) {
//     return (l - i) * 100;
//   }
//     });

//       const interval = setInterval(() => {
//         if (time.minutes === 0 && time.seconds === 0) {
//           clearInterval(interval);
//           setExpired(true);
//         } else if (time.seconds === 0) {
//           setTime({ minutes: time.minutes - 1, seconds: 59 });
//         } else {
//           setTime({ minutes: time.minutes, seconds: time.seconds - 1 });
//         }
        
//       }, 1000);
//       return () => clearInterval(interval);
//   }, [time]);

//   const formatTime = (time) => {
//     const minutes = time.minutes < 10 ? `0${time.minutes}` : time.minutes;
//     const seconds = time.seconds < 10 ? `0${time.seconds}` : time.seconds;
//     return `${minutes}:${seconds}`;
//   };
//   return (
//     <>
//     <FormContainer>
//       <div className="dust-paarticle">
//         <svg width="100%" id="dust-paarticle" height="100%" viewBox="0 0 885 455" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M678.1 394.1C679.923 394.1 681.4 392.622 681.4 390.8C681.4 388.977 679.923 387.5 678.1 387.5C676.277 387.5 674.8 388.977 674.8 390.8C674.8 392.622 676.277 394.1 678.1 394.1Z" stroke="#F4CD39" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path opacity="0.46" d="M880.3 342.9C882.123 342.9 883.6 341.423 883.6 339.6C883.6 337.777 882.123 336.3 880.3 336.3C878.477 336.3 877 337.777 877 339.6C877 341.423 878.477 342.9 880.3 342.9Z" stroke="#F4CD39" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path opacity="0.46" d="M282.2 7.69997C284.023 7.69997 285.5 6.2225 285.5 4.39996C285.5 2.57742 284.023 1.09998 282.2 1.09998C280.377 1.09998 278.9 2.57742 278.9 4.39996C278.9 6.2225 280.377 7.69997 282.2 7.69997Z" stroke="#F4CD39" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M598.3 207.8C601.061 207.8 603.3 205.561 603.3 202.8C603.3 200.039 601.061 197.8 598.3 197.8C595.539 197.8 593.3 200.039 593.3 202.8C593.3 205.561 595.539 207.8 598.3 207.8Z" stroke="#FDB130" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M48.7 442.7C50.4121 442.7 51.8 441.312 51.8 439.6C51.8 437.888 50.4121 436.5 48.7 436.5C46.9879 436.5 45.6 437.888 45.6 439.6C45.6 441.312 46.9879 442.7 48.7 442.7Z" stroke="#E03F8D" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M489.7 311.7C491.909 311.7 493.7 309.909 493.7 307.7C493.7 305.491 491.909 303.7 489.7 303.7C487.491 303.7 485.7 305.491 485.7 307.7C485.7 309.909 487.491 311.7 489.7 311.7Z" stroke="#1DB7C2" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M373.8 225C375.623 225 377.1 223.523 377.1 221.7C377.1 219.877 375.623 218.4 373.8 218.4C371.977 218.4 370.5 219.877 370.5 221.7C370.5 223.523 371.977 225 373.8 225Z" stroke="#FDB130" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M844.1 453.7C846.309 453.7 848.1 451.909 848.1 449.7C848.1 447.491 846.309 445.7 844.1 445.7C841.891 445.7 840.1 447.491 840.1 449.7C840.1 451.909 841.891 453.7 844.1 453.7Z" stroke="#1DB7C2" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M151 254.6C152.16 254.6 153.1 253.66 153.1 252.5C153.1 251.34 152.16 250.4 151 250.4C149.84 250.4 148.9 251.34 148.9 252.5C148.9 253.66 149.84 254.6 151 254.6Z" stroke="#FDB130" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M3.6 315.9C4.7598 315.9 5.7 314.96 5.7 313.8C5.7 312.64 4.7598 311.7 3.6 311.7C2.4402 311.7 1.5 312.64 1.5 313.8C1.5 314.96 2.4402 315.9 3.6 315.9Z" stroke="#9E3FB7" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M768.2 366.7H775.5" stroke="#9E3FB7" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M771.8 363.1V370.4" stroke="#9E3FB7" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <g opacity="0.6">
//   <path opacity="0.6" d="M696.4 40.5H703.8" stroke="#9E3FB7" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path opacity="0.6" d="M700.1 36.8V44.2" stroke="#9E3FB7" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   </g>
//   <path d="M630.3 284.1H636" stroke="#E03F8D" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M633.2 281.2V286.9" stroke="#E03F8D" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M414.9 104.5H420.6" stroke="#E03F8D" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M417.8 101.7V107.3" stroke="#E03F8D" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M203.7 290.8H211.5" stroke="#E03F8D" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M207.6 286.9V294.6" stroke="#E03F8D" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M165.9 402.7H176.2" stroke="#1DB7C2" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M171 397.5V407.9" stroke="#1DB7C2" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M252.1 346.8C253.2 345.3 254.8 346.4 255.9 344.9C257 343.4 255.4 342.2 256.5 340.7C257.6 339.2 259.2 340.3 260.3 338.8C261.4 337.3 259.8 336.1 260.9 334.5C262 333 263.6 334.1 264.7 332.6" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <g opacity="0.4">
//   <path opacity="0.4" d="M36.3 391.2C35.7 389.4 37.5 388.7 36.9 387C36.3 385.2 34.4 385.9 33.7 384.1C33.1 382.3 34.9 381.6 34.3 379.9C33.7 378.1 31.8 378.8 31.1 377C30.5 375.2 32.3 374.5 31.7 372.8" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   </g>
//   <path d="M732.3 292.1C730.6 291.2 731.5 289.5 729.8 288.6C728.1 287.7 727.2 289.5 725.5 288.7C723.8 287.8 724.7 286.1 723 285.2C721.3 284.3 720.4 286.1 718.7 285.3C717 284.4 717.9 282.7 716.2 281.8" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <g opacity="0.53">
//   <path opacity="0.53" d="M282.7 439.7C281.5 440.4 280.5 438.7 279.3 439.4C278.1 440.1 279.1 441.8 278 442.5C276.8 443.2 275.8 441.5 274.6 442.2C273.4 442.9 274.4 444.6 273.3 445.3C272.2 446 271.1 444.3 269.9 445" stroke="#1DB7C2" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   </g>
//   <path d="M819.6 253.6C821.4 253 822 255 823.8 254.4C825.6 253.8 825 251.9 826.8 251.4C828.6 250.8 829.2 252.8 831 252.2C832.8 251.6 832.2 249.7 834 249.2C835.8 248.7 836.4 250.6 838.2 250" stroke="#9E3FB7" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M487.9 207.4C489.7 206.8 490.3 208.8 492.1 208.2C493.9 207.6 493.3 205.7 495.1 205.2C496.9 204.6 497.5 206.6 499.3 206C501.1 205.4 500.5 203.5 502.3 203C504.1 202.5 504.7 204.4 506.5 203.8" stroke="#9E3FB7" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//         </svg>
//       </div>
    
//       <OTPInputContainer>
//         <OTPForm onSubmit={handleSubmit}>
//         <div className="brand">
//               <img src={Logo} alt="logo" />
//               <h1>snappy</h1>
//         </div>
//         <div className='mb-2'>
//             <h2 className= 'text-white'>This is the form for you if you forgot your password</h2>
//         </div>
//         {expired ? (
//         <p className="text-lg text-red-500 mt-4">
//           Time has expired. Please try again.
//         </p>
//       ) : (
//     <div className='flex flex-col justify-center items-center'>
//       <p className="text-lg text-fuchsia-200 mt-2">
//         OTP code sent to phone number 12344 is valid within:
//       </p>
//       <p className='text-lg text-fuchsia-200'>{formatTime(time)}</p>
//       </div>
//       )}
//         <div>
//         {otp.map((data, index) => (
//           <OTPInput
//             key={index}
//             type="text"
//             maxLength="1"
//             value={data}
//             onChange={(e) => handleChange(e, index)}
//             onPaste={handlePaste}
//             ref={(input) => (inputRef.current[index] = input)}
//           />
//         ))}
//       </div>
//       <button type="submit" disabled={filledCount !== 5} className="button-submit mt-10">Confirm</button>
//         <button type="button" className="bg-gray-400 p-2 rounded-md mt-4">Back to</button>
//         </OTPForm>
  
//       </OTPInputContainer>
//       <div className=" text-slate-200 text-xs transform translate-y-[-50px]">Privacy policy and terms of service  <a to="/register">in here.</a></div>
//       </FormContainer>
//     <ToastContainer />
//     </>
//   )
// }

// const FormContainer = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-color: #131324;
//   background-color: #f0f2f5;
//   background-image: url("https://1.bp.blogspot.com/-fd1WXKk-TAc/XyqfngP4PiI/AAAAAAAAVMw/umQz3tkxtg43uPIy8W5og6gAkpCfjaTvACLcBGAsYHQ/w1563-h1563/bg-snell.png");
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: 100%;
//   text-rendering: optimizeLegibility;

//   .dust-paarticle
// {
//   position: absolute;
//     width: 100%;
// }

// #snell
// {
//   position:absolute;
//   top:0;
//   width:100%;
// }
//   `;
//   const OTPInputContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   form {
//     display: flex;
//     flex-direction: column;
//     gap: 1.5rem;
//     background-color: #00000076;
//     border-radius: 2rem;
//     padding: 4rem;
//     z-index: 49;
//     margin-top: 60px;
//   }

//   .button-submit {
//     background-color: #4e0eff;
//     color: white;
//     padding: 1rem 2rem;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 0.4rem;
//     font-size: 1rem;
//     text-transform: uppercase;
//     &:hover {
//       background-color: #4e0eff;
//     }
//   }
//   span {
//     color: white;
//     text-transform: uppercase;
//     a {
//       color: #4e0eff;
//       text-decoration: none;
//       font-weight: bold;
//     }
//   }
//   .input-email {
//     background-color: transparent;
//     padding: 1rem;
//     border: 0.1rem solid #4e0eff;
//     border-radius: 0.4rem;
//     color: white;
//     width: 100%;
//     font-size: 1rem;
//     &:focus {
//       border: 0.1rem solid #997af0;
//       outline: none;
//     }
//   }
// `;

// const OTPInput = styled.input`
//   width: 50px;
//   height: 50px;
//   font-size: 24px;
//   border: 1px solid #ccc;
//   margin: 0 10px;
//   text-align: center;
// `;

// const OTPForm = styled.form`
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 2rem;
//     justify-content: center;
//     img {
//       height: 5rem;
//     }
//     h1 {
//       color: white;
//       font-size: 30px;
//       text-transform: uppercase;
//     }
//   }
// `;

// export default ComfirmOTP