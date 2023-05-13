import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Styled from 'styled-components';
import api from '../../utils/api';
import { ChatAiRoute } from '../../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import { async } from 'regenerator-runtime';


function MessageHistory(props) {

    const [messageHistory, setMessageHistory] = useState([]);
    const navigate = useNavigate();

    const getMessageHistory = async ()=>{
      const response = await api.get(`${ChatAiRoute}`).catch((error) => {
        throw new Error("API response was not okay");
      });
      if(response.status === 200){
        setMessageHistory(response.data)
      }
    }

    async function handleButtonClick(chatAiId){
      navigate(`/chatAi/${chatAiId}`);
    };
    useEffect(() => {

        // setMessageHistory(['abn', 'abc'])
        getMessageHistory();
    },[]);
  return (
    <Container>
<div className=" overflow-scroll overflow-x-hidden h-1/2 min-h-0 mt-30 mr-[-8px] w-auto fixed message-history-container">
      {/*Loop through the message history */}
      {messageHistory.map((message, index) => (
        // Display the first message for each conversation
        <button className="
         border-0
        flex items-center
        text-sm
        leading-5" key={index}
        onClick={() => handleButtonClick(message._id)}
        >
          <motion.div
            // fade messages in
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="w-60 flex items-center  text-gray-300 border-none mb-4 ml-4"
          >
            {/* Chat bubble svg */}
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 min-h-4 min-w-4 max-h-4 max-w-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>

            {/* Truncated message */}
            <p className={`${!props.open && "hidden"}  overflow-hidden whitespace-nowrap text-overflow-ellipsis ml-4`}>
              {/* {message.user === "me" && */}
                {/* // Uppercase first character of message */}
                { message.content.charAt(0).toUpperCase() + 
                message.content.substring(1, 30) + 
                (message.content.length > 30 ? '...' : '') }

                {/* //   } */}
            </p>
          </motion.div>
        </button>
      ))}
    </div>
    </Container>
  )
}

const Container = Styled.div`
.message-history-container::-webkit-scrollbar {
  display: none;
  background-color: #202123;
  width: 0.6em;
}

.message-history-container::-webkit-scrollbar-thumb {
  background: #b3befe;
  border: 2px solid transparent;
  border-radius: 8px;
  background-clip: content-box;
  height: 40px;
}

.message-history-container:hover::-webkit-scrollbar {
  display: flex;
}

`

export default MessageHistory