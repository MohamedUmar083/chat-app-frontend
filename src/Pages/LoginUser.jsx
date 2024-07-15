import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link as ChakraLink, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ChatState } from "../Provider/ChatProvider";

const LoginUser = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
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
        "Password Should be in 8 - 16 characters)"
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
            toast({
              title: "Error Occured!",
              description: err.response.data.message,
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
    <div>
      <div className="container login mt-3 ">
        <div className="card  border-white ">
          <div className="card-header text-center border-white">
            <h4>Log-in</h4>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="floatingInput" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  className="form-control mb-3"
                  id="floatingInput"
                  placeholder="Enter your Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  required
                />
                <p className="text-danger">{formik.errors.email}</p>
                <label htmlFor="floatingInput" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  className="form-control mb-3"
                  id="floatingInput"
                  placeholder="Enter your Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  required
                />
                <p className="text-danger">{formik.errors.password}</p>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button type="submit" className="btn btn-success w-100 mb-3">
                    Join
                  </button>
                </div>
                <div className="d-grid gap-2 col-8 mx-auto">
                  <p className="text-center">
                    New User ?{" "}
                    <ChakraLink as={Link} to="/register" color="blue">
                      SignUp
                    </ChakraLink>
                    {/* New User ? <Link to="/register"> SignUp</Link> */}
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
