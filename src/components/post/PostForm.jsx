import React, { useRef, useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import { preview } from '../../assets';
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import styled from 'styled-components';
import SpeechRecognition, {
    useSpeechRecognition,
  } from "react-speech-recognition";
import api from './../../utils/api';
import { postRoute} from './../../utils/APIRoutes';
import formatFile from './../../utils/formatFile';
import axios from 'axios';
import {Loader } from '../../components';


function PostForm({ onClose, content, photo }) {

    const formRef = useRef(null);
    const emojiRef = useRef(null);
    const microRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const { transcript } = useSpeechRecognition();
    const [lastTranscript, setLastTranscript] = useState(transcript);
    const [isListening, setIsListening] = useState(false);
    const [image, setImage] = useState(undefined);

  // Turns microphone on and off
    function handleToggleListening() {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
    }
  }
    const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

    const handleClose = () => {
        // Thêm class animate__fadeOut khi đóng form
        document.querySelector('.post-form').classList.add('animate__zoomOut');
    
        // Chờ animation hoàn thành rồi mới đóng form
        setTimeout(() => {
          onClose();
        }, 500);
      };

      useEffect(() => {
        setTimeout(() => {
          const cleanedTranscript = transcript.trim().replace(/\s+/g, " ");
          if (cleanedTranscript !== lastTranscript) {
            setMsg(msg + cleanedTranscript.slice(lastTranscript.length));
            setLastTranscript(cleanedTranscript);
          }
        }, 800);
      }, [transcript, msg, setMsg, lastTranscript]);

    useEffect(() => {

        setMsg(content);
        setImage(photo);

        function handleClickOutside(event) {
          if (formRef.current && !formRef.current.contains(event.target)) {
            onClose();
          }

          if (emojiRef.current && !emojiRef.current.contains(event.target)) {
            setShowEmojiPicker(false);
          }

          if (microRef.current && !microRef.current.contains(event.target)) {
            SpeechRecognition.stopListening();
            setIsListening(false);
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [formRef, onClose]);

     const handleSubmitPost = async (e) => {
      e.preventDefault();
      if( image !== undefined){
        const file = formatFile(image);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('content', msg);
        try {
          setLoading(true);
          const response = await api.post(postRoute,formData,  {
            headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": `Bearer ${localStorage.getItem(import.meta.env.REACT_APP_NAME_AT_KEY)}`,
            }
          });
          alert('Success');
        } catch (error) {
          alert(error);
        } finally {
          setLoading(false);
        }
      }else {
        alert('image not found');
      }

     }
  return (
   
    <div className="fixed inset-0 z-20 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="post-form bg-white p-8 rounded-md shadow-lg animate__animated w-4/12"
      ref={formRef}
      >
       {/* <div className='flex '> 
            <h2 className="text-lg font-bold mb-4">Create post</h2>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABK0lEQVR4nGNgIANcDg3NvBoVNeOwt7cgyZqXdk3dv2n6ot9fe3v/X4uMnM5Q3jFTrqJntjE+vGLbYd+dxy/FHNxcv23Rui0fz9159Q9kyNXQ0AyGBRv3rrr15PV/XPj+i/f/33378//e5dX/P9yb8v/B1Vn/F6/d8mlJ19T9YCct2XJgyadf///jw/evrAFr/v9u8f+PD6b+P7S5difcT0sIGICu+c7F5f9B3iHKgPtomu9eWgH2DihMCBpw6WA/hmawoS/e/wcFLF4DLhxe+P/BiSqw5k/3p4FdApMDBSxBA05sbPp/f1/h/4cnqv6f39OOIkfQgL37dv1PiA8DG3L+0EIMrxE0YPv2jf/37NmBM1aI8sInPHgQGjBj2ZZckCHEYlDeAWVAmAEARIGs7LPA6McAAAAASUVORK5CYII="></img>
        </div> */}
       
        <div className='flex items-center mb-4'> 
            <img className="mr-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABK0lEQVR4nGNgIANcDg3NvBoVNeOwt7cgyZqXdk3dv2n6ot9fe3v/X4uMnM5Q3jFTrqJntjE+vGLbYd+dxy/FHNxcv23Rui0fz9159Q9kyNXQ0AyGBRv3rrr15PV/XPj+i/f/33378//e5dX/P9yb8v/B1Vn/F6/d8mlJ19T9YCct2XJgyadf///jw/evrAFr/v9u8f+PD6b+P7S5difcT0sIGICu+c7F5f9B3iHKgPtomu9eWgH2DihMCBpw6WA/hmawoS/e/wcFLF4DLhxe+P/BiSqw5k/3p4FdApMDBSxBA05sbPp/f1/h/4cnqv6f39OOIkfQgL37dv1PiA8DG3L+0EIMrxE0YPv2jf/37NmBM1aI8sInPHgQGjBj2ZZckCHEYlDeAWVAmAEARIGs7LPA6McAAAAASUVORK5CYII="></img>
            <h2 className="text-lg font-bold relative">
                Create post
            </h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmitPost}>
          <div className='grid'>
            <label htmlFor="title" className="block font-medium">
            The content of your post:
            </label>
            <textarea
              name="content"
              id="content"
              className="border-gray-400 border-2 rounded w-full p-2 resize-none"
              placeholder="type your message here"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
            />
          <Container>
            <div className="button-container">
                <div className="emoji" ref={emojiRef}>
                    <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <div className='ml-2'>
            <button
            type='button'
            className={`mic-button ${isListening && "listening"} ${
              isListening === false && "not-listening"
            }`}
            onClick={handleToggleListening}
            aria-label="toggle microphone"
            ref={microRef}
          >
            {/* Microphone svg */}
            <svg
              stroke="currentColor"
              fill="currentColor"
              width={24}
              height={24}
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="mic-svg"
            >
              <path
                stroke="none"
                d="M16 24H8v-1h3.5v-3.018A7.004 7.004 0 0 1 5 13v-2h1v2.01A6.003 6.003 0 0 0 12 19c3.311 0 6-2.689 6-6v-2h1v2a7.004 7.004 0 0 1-6.5 6.982V23H16v1zM7 5c0-2.76 2.24-5 5-5s5 2.24 5 5v8c0 2.76-2.24 5-5 5s-5-2.24-5-5V5zm9 0c0-2.208-1.792-4-4-4S8 2.792 8 5v8c0 2.208 1.792 4 4 4s4-1.792 4-4V5z"
              />
            </svg>
          </button>
            </div>
          </Container>
          </div>
          <div>
            <label htmlFor="content" className="block font-medium">
              Image for this content:
            </label>
             <div className='flex flex-wrap justify-around'>
             <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-72 p-3 h-72 flex justify-center items-center">

            { photo ? (
                <img
                src={image}
                alt={content}
                className="w-full h-full object-contain"
              />
            ): (
                <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40 m-auto"
              />
            )}
              </div>
             </div>
             {loading && (
             <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader text='Saving...'/>
              </div>
              )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmitPost}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const Container = styled.div`
display: flex;
align-items: center;
grid-template-columns: 5% 95%;
padding: 0.2rem 2rem;
justify-content: space-around;
z-index: 1;
@media screen and (min-width: 720px) and (max-width: 1080px) {
  padding: 0 1rem;
  gap: 1rem;
}
.button-container {
  display: flex;
  align-items: center;
  color: white;
  background-color: #363842;
  border: 1px solid #373942;
  border-radius: 10px;
  padding: 8px;
  gap: 1rem;
  .emoji {
    position: relative;
   
    svg {
      font-size: 1.2rem;
      color: #ffff00c8;
      cursor: pointer;
    }
    .EmojiPickerReact {
      position: absolute;
      top: 20px;
      background-color: #080420;
      box-shadow: 0 5px 10px #9a86f3;
      border-color: #9a86f3;
      .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
    }
  }
}
.button-container:hover {
    background-color: #202123;
    border: 1px solid #202123;
    transition: all 150ms ease-in;
  }
.input-container {
  width: 100%;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: #ffffff34;
  input {
    width: 90%;
    height: 60%;
    background-color: transparent;
    color: white;
    border: none;
    padding-left: 1rem;
    font-size: 1.2rem;
    &::selection {
      background-color: #9a86f3;
    }
    &:focus {
      outline: none;
    }
  }
  button {
    padding: 0.3rem 2rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #9a86f3;
    border: none;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding: 0.3rem 1rem;
      svg {
        font-size: 1rem;
      }
    }
    svg {
      font-size: 2rem;
      color: white;
    }
  }

}

.mic-button {
    border: 1px solid #373942;
    border-radius: 10px;
    color: gray;
    background-color: #363842;
    bottom: 40px;
    left: 10%;
    padding: 4px;
    padding-top: 6px;
  }
  
  .mic-button:hover {
    background-color: #202123;
    border: 1px solid #202123;
    transition: all 150ms ease-in;
  }
  
  .not-listening {
    color: #fff;
  }
  
  .listening {
    color: rgb(255, 65, 65);
  }
`

export default PostForm