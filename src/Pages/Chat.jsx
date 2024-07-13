import React, { useEffect, useState } from "react";
import { ChatState } from "../Provider/ChatProvider";
import Search from "../Components/Search";
import MyChat from "../Components/MyChat";
import ChatBox from "../Components/ChatBox";
import { Box } from "@chakra-ui/layout";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <Search />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChat fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chat;
