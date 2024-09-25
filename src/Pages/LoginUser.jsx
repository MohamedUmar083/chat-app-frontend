import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ChatState } from "../Provider/ChatProvider";

const LoginUser = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const { setUser } = ChatState();
  const toast = useToast();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      navigate("/chats");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email"
      )
      .required("Email Should not be Empty"),
    password: Yup.string()
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+]{8,16}$/,
        "Password Should be in 8 - 16 characters"
      )
      .required("Password Should not be Empty"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      try {
        await axios
          .post(
            "https://chat-app-backend-3x8q.onrender.com/api/user/login-user",
            values,
            config
          )
          .then((res) => {
            const user = res.data.data;

            setUser(user);
            localStorage.setItem("userInfo", JSON.stringify(user));
            toast({
              title: "Login Successful",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            navigate("/chats");
          })
          .catch((err) => {
            console.log(err.response.data.message);
            toast({
              title: "Invalid Password!",

              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          });
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing="5px">
          <FormControl
            id="email"
            isRequired
            isInvalid={formik.errors.email && formik.touched.email}
            mb="4"
          >
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              placeholder="Enter your Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl
            id="password"
            isRequired
            isInvalid={formik.errors.password && formik.touched.password}
            mb="4"
          >
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                name="password"
                type={show ? "text" : "password"}
                placeholder="Enter your Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="off"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="green"
            width="100%"
            style={{ marginTop: 15 }}
            type="submit"
            isLoading={formik.isSubmitting}
          >
            Login
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default LoginUser;
