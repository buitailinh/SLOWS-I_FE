import React, { useEffect, useRef,useContext, useState } from 'react'
import { motion } from "framer-motion";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from 'styled-components';
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AppContext } from './../../utils/context';
import { logo } from '../../assets';

function ChatMessage({ message, isLastMessage, selectedModel }) {
  const messagesEndRef = useRef(null);

  const [copyButtonVisible, setCopyButtonVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [cursorVisible, setCursorVisible] = useState("|");
  const [buttonText, setButtonText] = useState("Copy");
  const { info} = useContext(AppContext);

  // Use typewriter hook to type out ai message
  let text = message.message;
  if(isLastMessage && message && message.userSend === 'gpt'){
   [text] = useTypewriter({
    words: [message.message],
    typeSpeed: 15,
  });
  console.log(message.message);
}


  // Copy ai message to clipboard
  function copyText() {
    navigator.clipboard.writeText(text.trimStart()).then(
      () => {
        setButtonText("Copied");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  }

  // Scrolls to the bottom of the screen
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // console.log(message, text)
    if (text){
    if (text?.length === message?.message?.length) {
      // Typewriter is done, hide the cursor, show copy button and scroll to bottom
      setCursorVisible("");
      setCopyButtonVisible(true);
      scrollToBottom();
    } else {
      // Typewriter is still typing, show the cursor and hide copy button
      setCursorVisible("|");
      setCopyButtonVisible(false);
    }
  }
  }, [text]);


  return (
    <Container> 
     <motion.div
      // fade messages in
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className={`chat-message ${message.userSend === "gpt" && "chatgpt"}`}
    >
      <div className="chat-message-center">
        <div className={`avatar ${message.userSend === "gpt" && "chatgpt"}`}>
          {/* Icon for user */}
          {message.userSend === "me" && (
            // <svg
            //   width={39}
            //   height={39}
            //   className="svg"
            //   viewBox="0 0 20 20"
            //   data-testid="user-avatar"
            // >
            //   <path
            //     fill="currentColor"
            //     d="M12.075 10.812c1.358-.853 2.242-2.507 2.242-4.037 0-2.181-1.795-4.618-4.198-4.618S5.921 4.594 5.921 6.775c0 1.53.884 3.185 2.242 4.037-3.222.865-5.6 3.807-5.6 7.298 0 .23.189.42.42.42h14.273c.23 0 .42-.189.42-.42 0-3.491-2.379-6.433-5.601-7.298M6.761 6.775c0-2.162 1.773-3.778 3.358-3.778s3.359 1.616 3.359 3.778-1.774 3.778-3.359 3.778-3.358-1.616-3.358-3.778M3.415 17.69c.218-3.51 3.142-6.297 6.704-6.297s6.486 2.787 6.705 6.297H3.415z"
            //   />
            // </svg>
            <div className='w-full h-full rounded-lg'>
              { info.avatar ? 
                <img src={info.avatar} alt="" className='w-full h-full'/>
                : 
                <img src="./../../blank-profile-picture-973460__340.webp" alt="" className='w-full h-full'/>
            }
              
            </div>
            
          )}

          {/* Icon for AI */}
          {message.userSend === "gpt" && (
            // <svg className="svg" data-testid="ai-avatar">
            //   <path
            //     d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237Zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132Zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18Z"
            //     fill="currentColor"
            //   />
            // </svg>
            <img src={logo} alt="" className='w-full h-full'/>
          )}
        </div>

        {/* Messages */}

        {/* User message */}
        {message.userSend === "me" && (
          <div className="message">{message.message.split("\n")}</div>
        )}

        {/* AI message */}
        { isLastMessage ? (
          <>
           {message.userSend === "gpt" && (
          <div className="message" data-testid="ai-message">
            {/* Typewriter text followed by cursor */}
            {selectedModel === "gpt-3.5-turbo" && (
              <>
                <ReactMarkdown className={`message__markdown`}
              children={text}
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || 'language-js')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={atomDark} language={match[1]} PreTag="div" {...props}
                    />
                  ) : (<code className={className} {...props}>{children} </code>)
                }
              }} />

                <Cursor cursorColor="white" cursorStyle={cursorVisible} />
              </>
            )}

            {/* If selected model is coding then add syntax highlighter */}
            {selectedModel === "code-davinci-002" && (
              <>
                <SyntaxHighlighter
                  className="syntax-highlighter"
                  language="javascript"
                  style={atomDark}
                  wrapLongLines={true}
                >
                  {text.trimStart()}
                </SyntaxHighlighter>
              </>
            )}

            {/* Display copy to clipboard button if last message */}
            {isLastMessage && copyButtonVisible && text !== "" ? (
              <button
                className="copy-text-button"
                onClick={copyText}
                data-testid="copy"
              >
                {/* Copy svg */}
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x={8} y={2} width={8} height={4} rx={1} ry={1} />
                </svg>
                &nbsp; {buttonText}
              </button>
            ) : null}
            <div ref={messagesEndRef} />
          </div>
        )}
          </>
        ) : (<>
         {message.userSend === "gpt" && (
          <div className="message" data-testid="ai-message">
            {/* Typewriter text followed by cursor */}
            {selectedModel === "gpt-3.5-turbo" && (
              <>
               <ReactMarkdown className={`message__markdown`}
              children={text}
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || 'language-js')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={atomDark} language={match[1]} PreTag="div" {...props}
                    />
                  ) : (<code className={className} {...props}>{children} </code>)
                }
              }} />
                <Cursor cursorColor="white" cursorStyle={cursorVisible} />
              </>
            )}

            {/* If selected model is coding then add syntax highlighter */}
            {selectedModel === "code-davinci-002" && (
              <>
                <SyntaxHighlighter
                  className="syntax-highlighter"
                  language="javascript"
                  style={atomDark}
                  wrapLongLines={true}
                >
                  {text.trimStart()}
                </SyntaxHighlighter>
              </>
            )}

            {/* Display copy to clipboard button if last message */}
            {isLastMessage && copyButtonVisible && text !== "" ? (
              <button
                className="copy-text-button"
                onClick={copyText}
                data-testid="copy"
              >
                {/* Copy svg */}
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x={8} y={2} width={8} height={4} rx={1} ry={1} />
                </svg>
                &nbsp; {buttonText}
              </button>
            ) : null}
            <div ref={messagesEndRef} />
          </div>
        )}
        </>)}
      </div>
    </motion.div>
    </Container>
  )
}

const Container  = styled.div`
.chat-message.chatgpt {
    background-color: #f0f0f0 ;
  }
  
  .chat-message {
    background-color: #bbd8f2;
  }
  
  .chat-message-center {
    max-width: 760px;
    // margin-top:10px;
    margin-left: 12%;
    margin-right: auto;
    display: flex;
    padding: 6px;
    // align-items: center;
  }
  
  .message {
    position: relative;
    padding-left: 10px;
    padding-right: 10px;
    white-space: pre-wrap;
    display: flex;
    align-items: center;
  }
  
  .avatar {
    margin-top: 10px;
    margin-bottom: 10px;
    background: black;
    min-width: 15px;
    min-height: 15px;
    max-width: 15px;
    max-height: 15px;
    align-items: flex-start;
  }
  
  .avatar.chatgpt {
    background-color: #0da37f;
  }
  
  .svg {
    display: none;
  }
  
  .copy-text-button {
    position: absolute;
    display: none;
    top: 0px;
    background-color: #444654;
    color: white;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 5px;
    transition: all 0.2s ease-in-out;
  }
  
  .copy-text-button:hover {
    background-color: #202123;
    border: 1px solid gray;
  }
  
  .copy-text-button:active {
    opacity: 0.1;
  }
  
  @media (min-width: 1024px) {
    .avatar {
      min-width: 30px;
      min-height: 30px;
      max-width: 30px;
      max-height: 30px;
    }
  
    .message {
      padding-left: 40px;
      padding-right: 40px;
    }
  
    .chat-message-center {
      padding: 12px;
      padding-left: 24px;
      padding-right: 24px;
    }
  
    .svg {
      display: inline;
    }
  
    .copy-text-button {
      right: -50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

`

export default ChatMessage