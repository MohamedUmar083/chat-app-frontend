import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const chatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <chatContext.Provider
        value={{
          selectedChat,
          setSelectedChat,
          user,
          setUser,
          notification,
          setNotification,
          chats,
          setChats,
        }}
      >
        {children}
      </chatContext.Provider>
    </div>
  );
};

export const ChatState = () => {
  return useContext(chatContext);
};

export default ChatProvider;
