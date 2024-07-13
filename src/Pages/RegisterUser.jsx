import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link as ChakraLink, useToast } from "@chakra-ui/react";

const RegisterUser = () => {
  const [username, SetUsername] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const payload = { username, email, password };
  const handleSubmit = async (e) => {
    if (!username || !email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      e.preventDefault();
      await axios
        .post("http://localhost:8383/api/user/register-user", payload)
        .then((res) => {
          res.data.data;
          toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        })
        .catch((err) => console.log(err.response.error));
      navigate("/");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <div>
      <div className="container register mt-3">
        <div className="card border-white">
          <div className="card-header text-center border-white">
            <h4>Register</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="floatingInput" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  name="username"
                  autoComplete="off"
                  className="form-control mb-3"
                  id="floatingInput"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => SetUsername(e.target.value)}
                  required
                />
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
                  <button className="btn btn-success w-100 mb-3">
                    Register
                  </button>
                </div>
                <div className="d-grid gap-2 col-8 mx-auto">
                  <p className="text-center">
                    Already have account?{" "}
                    <ChakraLink as={Link} to="/" color="blue">
                      Login
                    </ChakraLink>
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

export default RegisterUser;
