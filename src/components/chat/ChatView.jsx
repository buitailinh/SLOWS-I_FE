import React,  { useState, useRef, useEffect,useContext , useLayoutEffect} from 'react';
import { CircularProgress } from "@mui/material";
import { AppContext } from './../../utils/context';
import Hero from '../chatAI/Hero';
import ChatInputForm from '../chat/ChatInputForm';
import { ChatAiRoute } from '../../utils/APIRoutes';
import api from '../../utils/api';
import ChatMessage from '../chatAI/ChatMessage'
import { useNavigate } from 'react-router-dom';

function ChatView(props) {
  const { id } = props;
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [user, setUser] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [hasTrial, setHasTrial] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [responseFailed, setResponseFailed] = useState(false);
  const [statusSend, setStatusSend] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const chatLogRef = useRef();
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
  const { info, auth} = useContext(AppContext);
  const navigate = useNavigate();
  const idRef = useRef(id);

  async function fetchChat  () {
    if (id) {
      const response = await api.get(`${ChatAiRoute}/${id}`).catch((error) => {
          // Show response failed error
          setResponseFailed(true);
          setIsLoading(false);
          throw new Error("API response was not okay");
        }
      );
      if(response.status === 200){
        // const data = await response.data.json();
        // console.log("abcdef",response.data.chat);
        setChatLog(response.data.chat);
      }
      if (response.status === 429) {
        setIsRateLimited(true);
        setIsLoading(false);
        throw new Error("Rate limit reached");
      } 
    } else{
      console.log("ko ton tai");
      setChatLog([]);
    }
  };

  function handleNewChat(){
    clearInput();
    clearChat();
    setIsRateLimited(false);
    setResponseFailed(false);
  }

  function clearChat() {
    setChatLog([]);
  }

  function clearInput() {
    setInput("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const chatSend = { userSend: "me", message: input }
    let chatLogNew = [...chatLog, chatSend];

    clearInput(); // Clear the input field
    setChatLog(chatLogNew); // Set the new chat log with user's input
    setIsLoading(true);
    if(!id){
      const response = await api.post(ChatAiRoute, chatSend,{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 201) {
        const  result = response.data;
        setStatusSend(true);
        navigate(`/chatAi/${result._id}`);
        setIsLoading(false);
      }
      if (response.status === 429) {
        setIsRateLimited(true);
        setIsLoading(false);
        throw new Error("Rate limit reached");
      }  
    }
    else {
      const response = await api.patch(ChatAiRoute + `/${id}`, chatSend,{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .catch((error) => {
        // Show response failed error
        setResponseFailed(true);
        setIsLoading(false);
        throw new Error("API response was not okay");
      });

      if (response.status === 429) {
        setIsRateLimited(true);
        setIsLoading(false);
        throw new Error("Rate limit reached");
      }
  
      // Response was successful
      setIsRateLimited(false);
      setResponseFailed(false);
      setStatusSend(true);

      setChatLog([...chatLogNew, { userSend: "gpt", message: `${response.data.message}` }]);
      setIsLoading(false);
    }

  };

  useEffect(() => {
    if (idRef.current !== id) {
      idRef.current = id;
      fetchChat();
    }
    if(idRef.current  === undefined){
      setChatLog([]);
    }
  }, [id])

  useEffect(() => {
    chatLogRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  return (
   <div class=" flex flex-col duration-300 overflow-hidden relative bg-slate-200 dark:bg-light-grey">
  <main class="flex-grow overflow-y-scroll flex flex-col shadow-md" ref={chatLogRef}>
    <section class="flex-1 relative bg-gradient-to-t"  ref={chatLogRef}>
    {chatLog.length === 0 && !isRateLimited && <Hero />}
    {!isRateLimited && (
          <div className="text-left" ref={chatLogRef}>
            {chatLog.map((message, index) => {
              return (
                <div ref={chatLogRef} key={index}>
              <ChatMessage
                key={index}
                message={message}
                isLastMessage={index === chatLog.length - 1}
                selectedModel={selectedModel}
                // statusSend={statusSend}
              />
              </div>
            )
            }
            )}
            <div ref={chatLogRef} /> 
            {isLoading === true && (
              <div className="mt-20 flex justify-center items-center">
                <CircularProgress style={{ color: "#b3befe" }} />
              </div>
            )}
          </div>
        )}
    {isRateLimited && <RateLimitError />}
    {responseFailed && <ResponseFailedError />}
    </section>
    {/* <div className="flex justify-end">
    
    </div> */}
  </main>
  
  <div class="px-4 py-2 w-screen mb-[85px]" >
  <ChatInputForm
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            selectedModel={selectedModel}
          />
  </div>
</div>
  )
}

export default ChatView