import React, { useEffect, useState } from 'react'
import SpeechRecognition, {
    useSpeechRecognition,
  } from "react-speech-recognition";
import { motion } from "framer-motion";
import styled from 'styled-components';

function ChatInputForm({
  input,
  setInput,
  handleSubmit,
  isLoading,
  selectedModel,
}) {

  const { transcript } = useSpeechRecognition();
  const [lastTranscript, setLastTranscript] = useState(transcript);
  const [isListening, setIsListening] = useState(false);

  function handleToggleListening() {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      const cleanedTranscript = transcript.trim().replace(/\s+/g, " ");
      if (cleanedTranscript !== lastTranscript) {
        setInput(input + cleanedTranscript.slice(lastTranscript.length));
        setLastTranscript(cleanedTranscript);
      }
    }, 800);
  }, [transcript, input, setInput, lastTranscript]);


  return (
    <Container>

    <motion.div
      // fades in
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="chat-input-box"
    >
      {/* Only show chat input if user is signed in */}
      {/* {user && ( */}
        <>
          {/* Microphone on/off button */}
          <button
            className={`mic-button ${isListening && "listening"} ${
              isListening === false && "not-listening"
            }`}
            onClick={handleToggleListening}
            aria-label="toggle microphone"
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

          {/* Input form */}
          <form data-testid="chat-input-form" onSubmit={handleSubmit}>
            <textarea
              maxLength="1000" // Adjust this as needed
              required={true}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (e.target.value.trim() === "") return;
                  if (isLoading) return;
                  handleSubmit(e);
                }
              }}
              data-testid="chat-input-textarea"
              className="chat-input-textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              // Change placeholder based on selected model
              placeholder={
                selectedModel === "code-davinci-002"
                  ? "Start with a comment, data or code"
                  : "Prompt"
              }
            ></textarea>

            {/* Submit button */}
            <button
              data-testid="submit-button"
              className="submit-button"
              disabled={isLoading}
              aria-label="submit"
            >
              {/* Submit svg */}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 20 20"
                className="submit-svg"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.894 2.553a1 1 0 0 0-1.788 0l-7 14a1 1 0 0 0 1.169 1.409l5-1.429A1 1 0 0 0 9 15.571V11a1 1 0 1 1 2 0v4.571a1 1 0 0 0 .725.962l5 1.428a1 1 0 0 0 1.17-1.408l-7-14z"
                  stroke="none"
                />
              </svg>
            </button>
          </form>
        </>
      {/* )} */}
    </motion.div>
    </Container>
  )
}

const Container = styled.div`

.chat-input-box {
    // margin: 70px;
  }
  
  .chat-input-textarea {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    resize: none;
    color: white;
    background-color: #40414f;
    width: 50%;
    border-radius: 5px;
    border: none;
    outline: none;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.35);
    padding: 4px 12px;
    font-size: 0.9em;
    position: absolute;
    bottom: 30px;
    left: 45%;
    transform: translateX(-50%);
    padding-right: 35px;
  }
  
  .submit-svg {
    width: 16px;
    height: 16px;
  }
  
  .submit-button {
    border: 1px solid #40414f;
    border-radius: 10px;
    color: gray;
    background-color: #40414f;
    position: absolute;
    bottom: 50px;
    left: 70%;
    transform: translateX(-50%);
    transform: rotate(90deg);
    transition: all 150ms ease-in-out;
  }
  
  .submit-button:hover {
    background-color: #202123;
    border: 1px solid #202123;
  }
  
  .submit-button:disabled {
    background-color: #40414f;
    border: 1px solid #40414f;
    opacity: 0.1;
  }
  
  .mic-button {
    border: 1px solid #373942;
    border-radius: 10px;
    color: gray;
    background-color: #363842;
    position: absolute;
    bottom: 40px;
    left: 10%;
    transform: translateX(-50%);
    padding: 4px;
    padding-top: 6px;
  }
  
  .mic-button:hover {
    background-color: #202123;
    border: 1px solid #202123;
    transition: all 150ms ease-in;
  }
  
  .not-listening {
    color: rgb(255, 65, 65);
  }
  
  .listening {
    color: green;
  }
  
  @media (min-width: 1024px) {
    .chat-input-box {
      padding: 1px;
    }
  
    .chat-input-textarea {
      width: 50%;
      font-size: 1.25em;
      bottom: 27px;
      padding: 6px 12px;
      padding-right: 60px;
      display: flex;
    align-items: center;
    }
  
    .submit-button {
      bottom: 45px;
      left: 72%;
    }
  
    .mic-button {
      bottom: 40px;
      left: 15%;
    }
  
    .submit-svg {
      width: 20px;
      height: 20px;
    }
  }
`

export default ChatInputForm