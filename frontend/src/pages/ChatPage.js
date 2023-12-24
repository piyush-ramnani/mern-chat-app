import { Box } from "@chakra-ui/layout";
import Chatbox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const ChatPage = () => {
  const { user } = ChatState();
  console.log(user);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box>
        {user && <MyChats />}
        {user && <Chatbox />}
      </Box>
    </div>
  );
};

export default ChatPage;
