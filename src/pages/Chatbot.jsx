import React, { useState, useEffect } from 'react';
import "./Chatbot.scss";
import attach from '../assets/attach.png';
import usericon from '../assets/user.png';
import uparrow from "../assets/uparrow.png";
import boticon from "../assets/bot_circular.jpg";
import Navbar from '../components/Navbar';
import axios from 'axios';
import { marked } from 'marked';

function Chatbot() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
          const response = await axios.get('http://localhost:5000/get-msgs', {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
  
          if (response.status === 200) {
              console.log("Messages:", response.data.messages);
              const msgs = response.data.messages
              if(msgs){
                const msglist = msgs.map((msgobj) => {
                  return { type: msgobj.sender, content: msgobj.message }
                })
                console.log(msglist)
                setMessages(msglist);
              }
          } else {
              console.error(response.data.error);
              return
          }
      } catch (error) {
          console.error("Login error: ", error);
          return
      }
    }
    getMessages()
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
  
  const getChatbotResponse = async (userQuery) => {
    const data = { question: userQuery }
    try {
        const response = await axios.post('http://localhost:5000/ask-query', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
          const answer = response.data.answer
          handleChatbotResponse(answer)
        } else {
            console.error(response.data.error);
            return
        }
    } catch (error) {
        console.error("Login error: ", error);
        return
    }
  }

  const handleChatbotResponse = async (answer) => {
    const data = {
      message: answer,
      sender: "chatbot"
    };
    try {
        const response = await axios.post('http://localhost:5000/upload-msg', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            console.log("POST successful");
        } else {
            console.error(response.data.error);
            return
        }
    } catch (error) {
        console.error("Login error: ", error);
        return
    }
    setMessages((prev) => [
      ...prev,
      { type: "chatbot", content: answer}
    ]);
  }

  const handleSendMessage = async () => {
    let input = document.getElementById('query-input');
    if (input.value === '') return;

    let userQuery = input.value;
    input.value = '';
    const data = {
      message: userQuery,
      sender: "user"
    };
    try {
        const response = await axios.post('http://localhost:5000/upload-msg', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            console.log("POST successful");
        } else {
            console.error(response.data.error);
            return
        }
    } catch (error) {
        console.error("Login error: ", error);
        return
    }
    setMessages((prev) => [
      ...prev,
      { type: "user", content: userQuery }
    ]);
    getChatbotResponse(userQuery)
  };

  return (
    <div id='chatbot-grid'>
      <div id='chatbot-window' className='radius-small'>
        <div id="chat">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type === "user" && 'reverse'}`}>
              {msg.type === 'chatbot' && 
                <img src={boticon} alt="" />
              }
              {
                msg.type === "user" ? (
                  <p className="user-query">{msg.content}</p>
                ) : (
                  <p className='chatbot-answer' dangerouslySetInnerHTML={{__html: marked(msg.content)}}></p>
                )
              }
            </div>
          ))}
        </div>
        <div id="query" className='radius-large'>
          <input id='query-input' type="text" placeholder='Message' />
          <button>
            <img src={uparrow} onClick={() => handleSendMessage()} />
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
