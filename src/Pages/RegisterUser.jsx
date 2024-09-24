import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link as ChakraLink, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterUser = () => {
  const toast = useToast();
  const navigate = useNavigate();

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
        "Password Should be in 8 - 16 characters)"
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
            toast({
              title: "Registration Successful",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            navigate("/");
          })
          .catch((err) => {
            console.log(err.response.data.message);
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
      <div className="container register mt-3">
        <div className="card border-white">
          <div className="card-header text-center border-white">
            <h4>Register</h4>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="username" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  name="username"
                  autoComplete="off"
                  className="form-control mb-3"
                  id="username"
                  placeholder="Enter Your User Name"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  required
                />
                <p className="text-danger">{formik.errors.username}</p>
                <label htmlFor="email" className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  className="form-control mb-3"
                  id="email"
                  placeholder="Enter Your Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  required
                />
                <p className="text-danger">{formik.errors.email}</p>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  className="form-control mb-3"
                  id="password"
                  placeholder="Enter New Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  required
                />
                <p className="text-danger">{formik.errors.password}</p>
                <label htmlFor="confirmpassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmpassword"
                  autoComplete="off"
                  className="form-control mb-3"
                  id="confirmpassword"
                  placeholder="Enter Your Password Again"
                  value={formik.values.confirmpassword}
                  onChange={formik.handleChange}
                  required
                />
                <p className="text-danger">{formik.errors.confirmpassword}</p>

                <div className="d-grid gap-2 col-6 mx-auto">
                  <button type="submit" className="btn btn-success w-100 mb-3">
                    Register
                  </button>
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
