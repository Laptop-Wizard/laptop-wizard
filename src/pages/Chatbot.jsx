import React, { useState, useEffect } from 'react';
import "./Chatbot.scss";
import attach from '../assets/attach.png';
import usericon from '../assets/user.png';
import uparrow from "../assets/uparrow.png";
import boticon from "../assets/bot_circular.jpg";
import Navbar from '../components/Navbar';

function Chatbot() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleSendMessage('chatbot-answer');
      } 
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSendMessage = (msgType) => {
    let input = document.getElementById('query-input');
    if (input.value === '') return;

    let msgContent = input.value;
    input.value = '';

    setMessages((prev) => [
      ...prev,
      { type: msgType, content: msgContent }
    ]);
  };

  return (
    <div id='chatbot-grid'>
      <div id='chatbot-window' className='radius-small'>
        <div id="chat">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type === 'user-query' && 'reverse'}`}>
              {msg.type === 'chatbot-answer' && 
                <img src={boticon} alt="" />
              }
              <p className={`${msg.type}`}>{msg.content}</p>
            </div>
          ))}
        </div>
        <div id="query" className='radius-large'>
          <input id='query-input' type="text" placeholder='Message' />
          <button>
            <img src={uparrow} onClick={() => handleSendMessage('user-query')} />
          </button>
        </div>
      </div>
      <div id='user-bar' className='radius-large'>
        <img src={usericon} alt="" />
        <h4>Rakesh Dharne</h4>
      </div>
      <div id='upload' className='radius-small'>
        <h4>Chat History</h4>
      </div>
    </div>
  );
}

export default Chatbot;
