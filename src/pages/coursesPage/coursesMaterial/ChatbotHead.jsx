import React, { useState, useRef, useEffect } from 'react';
import './ChatbotHead.css';
import { FiSend, FiX } from 'react-icons/fi';
import { RiRobot2Fill } from "react-icons/ri";
import { BsRobot } from "react-icons/bs";

const ChatbotHead = ({ courseTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const chatWidgetRef = useRef(null);
  const sendButtonRef = useRef(null);
  const messagesEndRef = useRef(null);

  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const createInitialMessage = () => ({
    sender: 'Course Assistant',
    timestamp: getCurrentTime(),
    text: "Hi! I'm your AI course assistant"
  });

  // Load messages from localStorage on component mount
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [createInitialMessage()];
  });

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      sender: 'You',
      timestamp: getCurrentTime(),
      text: inputValue
    };

    // Add AI response
    const aiResponse = {
      sender: 'Course Assistant',
      timestamp: getCurrentTime(),
      text: "I'm your AI course assistant"
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInputValue('');
  };

  const handleEndChat = () => {
    // Clear messages from localStorage and reset to initial message
    localStorage.removeItem('chatMessages');
    setMessages([createInitialMessage()]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && chatWidgetRef.current && !chatWidgetRef.current.contains(event.target) && 
          !event.target.closest('.chatbot-head')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className="chatbot-head"
        onClick={toggleChat}
        style={{ opacity: isOpen ? 0.8 : 1 }}
      >
        <BsRobot size={40} color="#fff" />
      </div>

      {isOpen && (
        <div className="chat-widget-container" ref={chatWidgetRef}>
          <div className="chat-widget-header">
            <div className="header-content">
              <div className="robot-icon-container">
                <RiRobot2Fill className="robot-icon" />
              </div>
              <div className="header-text-block">
                <h3 className="header-title">Course Advisor AI</h3>
                <span className="header-status">Online · Ready to help</span>
              </div>
            </div>
            <button
              className="end-chat-btn"
              onClick={handleEndChat}
            >
              End Chat
            </button>
          </div>
          <div className="chat-widget-messages">
            {messages.length === 0 ? (
              <div style={{ color: '#888', textAlign: 'center', marginTop: '40%' }}>
                Chat session ended. Start a new conversation!
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div className="message-bubble-wrapper" key={idx} data-sender={msg.sender}>
                    <div className="message-bubble">
                      <div className="message-header">
                        <span className="sender-name">{msg.sender}</span>
                        <span className="message-timestamp">{msg.timestamp}</span>
                      </div>
                      <div className="message-text">{msg.text}</div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          <div className="chat-widget-input">
            <input 
              type="text" 
              placeholder="Ask about this course..." 
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputValue.trim()) {
                  handleSendMessage();
                }
              }}
            />
            <button 
              className="send-button" 
              disabled={!inputValue.trim()}
              style={{ 
                opacity: !inputValue.trim() ? 0.5 : 1,
                cursor: !inputValue.trim() ? 'not-allowed' : 'pointer'
              }}
              ref={sendButtonRef}
              onClick={() => {
                if (sendButtonRef.current) sendButtonRef.current.blur();
                handleSendMessage();
              }}
            >
              <FiSend />
            </button>
          </div>
          <div className="chat-widget-footer">
            Course Name: {courseTitle}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotHead; 