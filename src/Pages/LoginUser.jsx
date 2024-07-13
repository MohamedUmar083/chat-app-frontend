import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link as ChakraLink, useToast } from "@chakra-ui/react";

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
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const payload = { email, password };
  const handleSubmit = async (e) => {
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      return;
    }
    try {
      e.preventDefault();
      await axios
        .post(
          "https://chat-app-backend-3x8q.onrender.com/api/user/login-user",
          payload,
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
        .catch((err) => console.log(err));
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
  };
  return (
    <div>
      <div className="container login mt-3 ">
        <div className="card  border-white ">
          <div className="card-header text-center border-white">
            <h4>Log-in</h4>
          </div>
          <form onSubmit={handleSubmit}>
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
                  placeholder="Email"
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)}
                  required
                />
                <label htmlFor="floatingInput" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  className="form-control mb-3"
                  id="floatingInput"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => SetPassword(e.target.value)}
                  required
                />

                <div className="d-grid gap-2 col-6 mx-auto">
                  <button className="btn btn-success w-100 mb-3">Join</button>
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
