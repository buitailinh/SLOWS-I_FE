import React, {useState, useEffect, useContext} from 'react'
import Sidebar from '../components/chat/Sidebar';
import ChatView from '../components/chat/ChatView';
import { useParams } from 'react-router-dom';

function ChatAI() {

  let [chatId, setChatId] = useState(null)
  const { id } = useParams();

 
  useEffect(() => {
      console.log('id', id);
      setChatId(id)
  },[id])
  return (
    <div className="flex transition duration-500 ease-in-out mt-14 h-[94vh] fixed">
          <Sidebar id = {chatId}/>
          <ChatView id = {chatId}/>
    </div>
  )
}

export default ChatAI