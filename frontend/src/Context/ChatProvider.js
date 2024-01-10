import { createContext, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

//Will provide context of the logged in user in the whole app

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setUser(userInfo);
  }, [history]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext); //To use contexts in ChatPage
};
export default ChatProvider;
