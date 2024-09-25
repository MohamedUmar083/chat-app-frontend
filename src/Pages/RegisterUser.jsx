import axios from "axios";
import React, { useState } from "react";

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

const RegisterUser = () => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [showcp, setShowcp] = useState(false);
  const handleClick = () => setShow(!show);
  const handleClickcp = () => setShowcp(!showcp);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("User Name Should not be Empty"),

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
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords doesn't match")
      .required("Confirm Password Should not be Empty"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios
          .post(
            "https://chat-app-backend-3x8q.onrender.com/api/user/register-user",
            values
          )
          .then((res) => {
            res.data.data;
            formik.resetForm();
            toast({
              title: "Registration Successful",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          })
          .catch((err) => {
            console.log(err.response.data.message);
            formik.resetForm();
            toast({
              title: "Registration Error!",
              description: err.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          });
      } catch (error) {
        formik.resetForm();
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
            isRequired
            isInvalid={formik.errors.username && formik.touched.username}
            mb="4"
          >
            <FormLabel id="username">User Name</FormLabel>
            <Input
              name="username"
              placeholder="Enter Your User Name"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
            />

            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={formik.errors.email && formik.touched.email}
            mb="4"
          >
            <FormLabel id="email">Email</FormLabel>
            <Input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Your Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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

          <FormControl
            id="confirmpassword"
            isRequired
            isInvalid={
              formik.errors.confirmpassword && formik.touched.confirmpassword
            }
            mb="4"
          >
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
              <Input
                name="confirmpassword"
                type={showcp ? "text" : "password"}
                placeholder="Enter your Password"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="off"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClickcp}>
                  {showcp ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            <FormErrorMessage>{formik.errors.confirmpassword}</FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            type="submit"
            isLoading={formik.isSubmitting}
          >
            Sign Up
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default RegisterUser;
