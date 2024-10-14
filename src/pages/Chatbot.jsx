import React, { useState,useEffect } from 'react'
import "./Chatbot.scss"
import attach from '../assets/attach.png'

function Chatbot() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log("Pressed");
        handleSendMessage();
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const handleSendMessage = () => {
    let input = document.getElementById('query-input')
    if(input.value == '') return
    console.log("Called");
    let newMsg = input.value
    input.value = ''
    setMessages((prev) => ([...prev, newMsg]))
  }
  return (
    <div id='chatbot-grid'>
        <div id='chatbot-window' className='radius-small'>
          <div id="chat">
              {messages.map((msg, index) => (
                <p key={index}>{msg}</p>
              ))}
          </div>
          <div id="query" className='radius-large'>
            <button>
              <img src={attach} />
            </button>
            <input id='query-input' type="text" name="" placeholder='Message' />
          </div>
        </div>
        <div id='user-bar' className='radius-large'></div>
        <div id='upload' className='radius-small'></div>
    </div>
  )
}

export default Chatbot