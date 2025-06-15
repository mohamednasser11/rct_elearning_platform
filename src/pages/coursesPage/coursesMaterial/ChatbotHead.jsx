import React, { useState, useRef, useEffect } from "react";
import "./ChatbotHead.css";
import { FiSend } from "react-icons/fi";
import { RiRobot2Fill } from "react-icons/ri";
import { BsRobot } from "react-icons/bs";
import Cookies from "js-cookie";
import ReactMarkdown from "react-markdown";

const ChatbotHead = ({ courseId, courseTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const chatWidgetRef = useRef(null);
  const sendButtonRef = useRef(null);
  const messagesEndRef = useRef(null);

  const wsRef = useRef(null);
  const [wsIsConnected, setWsIsConnected] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [wsMessageType, setWsMessageType] = useState(null);
  const [messages, setMessages] = useState([]);

  const wsConnect = () => {
    const token = Cookies.get("refresh_token");

    const chatSessions = JSON.parse(localStorage.getItem("chatSessions")) || {};
    const session = chatSessions[courseId] || null;

    const wsUrl = new URL("ws://localhost:8000/ws/chat/");
    wsUrl.searchParams.set("token", token);
    wsUrl.searchParams.set("course_id", courseId);
    if (session) wsUrl.searchParams.set("session_id", session);

    console.log("connecting", wsUrl.toString());
    wsRef.current = new WebSocket(wsUrl.toString());

    wsRef.current.onopen = () => {
      setWsIsConnected(true);
    };

    wsRef.current.onmessage = function (e) {
      setIsWaiting(false);
      const message = JSON.parse(e.data);
      console.log(message);
      try {
        setWsMessageType(message.type);
        switch (message.type) {
          case "session.new": {
            const chatSessions =
              JSON.parse(localStorage.getItem("chatSessions")) || {};

            chatSessions[courseId] = message.data.session_id;

            localStorage.setItem("chatSessions", JSON.stringify(chatSessions));
            break;
          }

          case "session.resume": {
            setMessages(
              message.data.history.map((e) => ({
                ...e,
                timestamp: new Date(e.timestamp),
              })),
            );
            break;
          }

          case "stream.start": {
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: "",
                timestamp: new Date(),
              },
            ]);
            break;
          }

          case "stream.chunk":
            setMessages((prev) => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              if (lastMessage?.role === "assistant") {
                return [
                  ...newMessages.slice(0, -1),
                  {
                    ...lastMessage,
                    content:
                      lastMessage.content +
                      message.data.message.replace(/\n/g, "  \n"),
                  },
                ];
              }
              return newMessages;
            });
            break;

          case "stream.end":
            break;

          default:
            console.error("unhandled message", message);
            break;
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };

    wsRef.current.onclose = (e) => {
      setWsIsWaiting(false);
      setWsIsConnected(false);
      console.log(e.code);

      switch (e.code) {
        case 4000: // missing token
        case 4001: // invalid token
        case 4011: // course does not exist
        case 4013: // user not enrolled to the course
          break;

        case 4002: // user is unauthorized
        case 4012: /* session does not exist */ {
          const chatSessions =
            JSON.parse(localStorage.getItem("chatSessions")) || {};
          delete chatSessions[courseId];
          localStorage.setItem("chatSessions", JSON.stringify(chatSessions));
          setTimeout(wsConnect, 3000);
          break;
        }

        default:
          if (!e.wasClean) {
            setTimeout(wsConnect, 3000);
          }
          break;
      }

      wsRef.current = null;
    };

    wsRef.current.onerror = function (error) {
      console.error("WebSocket error:", error);
    };
  };

  const wsDisconnect = () => {
    wsRef.current?.close();
    wsRef.current = null;
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const canSend =
    wsIsConnected &&
    !isWaiting &&
    inputValue.trim() &&
    wsMessageType !== "stream.start" &&
    wsMessageType !== "stream.chunk";

  const handleSendMessage = () => {
    if (!canSend) return;

    wsRef.current?.send(
      JSON.stringify({ type: "send", data: { message: inputValue } }),
    );

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: inputValue,
        timestamp: new Date(),
      },
    ]);

    setInputValue("");
    setIsWaiting(true);
  };

  const handleEndChat = () => {
    const chatSessions = JSON.parse(localStorage.getItem("chatSessions")) || {};
    delete chatSessions[courseId];
    localStorage.setItem("chatSessions", JSON.stringify(chatSessions));
    setMessages([]);
    wsDisconnect();
    wsConnect();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && wsRef.current == null) wsConnect();

    const handleClickOutside = (event) => {
      if (
        isOpen &&
        chatWidgetRef.current &&
        !chatWidgetRef.current.contains(event.target) &&
        !event.target.closest(".chatbot-head")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
                <span className="header-status">
                  {wsIsConnected ? "Online · Ready to help" : "Offline"}
                </span>
              </div>
            </div>
            <button className="end-chat-btn" onClick={handleEndChat}>
              End Chat
            </button>
          </div>
          <div className="chat-widget-messages">
            {messages.map((msg, idx) => (
              <div
                className="message-bubble-wrapper"
                key={idx}
                data-sender={msg.role}
              >
                <div className="message-bubble">
                  <div className="message-header">
                    <span className="sender-name">
                      {msg.role == "user" ? "You" : "Course Assistant"}
                    </span>
                    <span className="message-timestamp">
                      {msg.timestamp.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </span>
                  </div>
                  <div className="message-text">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-widget-input">
            <input
              type="text"
              placeholder="Ask about this course..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputValue.trim()) {
                  handleSendMessage();
                }
              }}
            />
            <button
              className="send-button"
              disabled={!canSend}
              style={{
                opacity: !canSend ? 0.5 : 1,
                cursor: !canSend ? "not-allowed" : "pointer",
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
          <div className="chat-widget-footer">Course Name: {courseTitle}</div>
        </div>
      )}
    </>
  );
};

export default ChatbotHead;
