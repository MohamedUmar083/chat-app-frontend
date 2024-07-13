import React from "react";
import axios from "axios";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  Box,
  useToast,
} from "@chakra-ui/react";
import { ChatState } from "../Provider/ChatProvider";
import UserList from "../Components/UserDetails/UserList";
import UserBadge from "../Components/UserDetails/UserBadge";

const Group = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: user.token,
        },
      };
      const { data } = await axios.get(
        `http://localhost:8383/api/user/get-user?search=${search}`,
        config
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: user.token,
        },
      };
      await axios
        .post(
          "http://localhost:8383/api/chat/group",
          {
            name: groupChatName,
            users: JSON.stringify(selectedUsers.map((u) => u._id)),
          },
          config
        )
        .then((res) => {
          const data = res.data.data;
          console.log(data);
          setChats([data, ...chats]);
          onClose();
          toast({
            title: "New Group Chat Created!",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        })
        .catch((error) => console.log(error));
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const handleDelete = async (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    toast({
      title: "User Removed Successfully!",

      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };
  const handleGroup = async (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  return (
    <div>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" justifyContent="center">
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadge
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              // <ChatLoading />
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserList
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            {/*  */}
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Group;
