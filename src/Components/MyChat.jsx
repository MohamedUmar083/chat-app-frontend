import React, { useEffect, useState } from "react";
import { ChatState } from "../Provider/ChatProvider";
import axios from "axios";
import { Button, useToast } from "@chakra-ui/react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoader from "../Modals/ChatLoader";
import { getSender } from "../Provider/Logics.js";
import Group from "../Modals/Group.jsx";

const MyChat = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: user.token,
        },
      };

      const { data } = await axios.get(
        "https://chat-app-backend-3x8q.onrender.com/api/chat/fetchchat",
        config
      );

      setChats(data);
      console.log(data);
      //
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "45%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "20px", md: "20px" }}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <Group>
          <Button
            disabled="flex"
            fontSize={{ base: "17px", md: "17px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group
          </Button>
        </Group>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                mb={0}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.username} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoader />
        )}
      </Box>
    </Box>
  );
};

export default MyChat;
