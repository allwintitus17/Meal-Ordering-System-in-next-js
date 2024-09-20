"use client";
import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "@/features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // State for validation errors
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");

  useEffect(() => {
    if (isError) {
      console.log(isError);
      window.alert("Cannot Sign in");
    }

    if (isSuccess) {
      window.alert("User Registered Successfully");
      router.push("/");
      dispatch(reset())
    }
  }, [isError, isSuccess, user, message, router, dispatch]);

  // Real-time validation inside the onChange function
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    // Validation for each field
    if (e.target.name === "name") {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (e.target.value.length < 3) {
        setNameError("Name should contain more than 3 characters");
      } else if (!nameRegex.test(e.target.value)) {
        setNameError("Name should contain only letters and spaces");
      } else {
        setNameError(""); // Clear error if valid
      }
    }

    if (e.target.name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/;
      if (!emailRegex.test(e.target.value)) {
        setEmailError(
          "Please enter a valid email (e.g., example@domain.com or example@domain.in)"
        );
      } else {
        setEmailError(""); // Clear error if valid
      }
    }

    if (e.target.name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
      if (!passwordRegex.test(e.target.value)) {
        setPasswordError(
          "Password must be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character."
        );
      } else {
        setPasswordError(""); // Clear error if valid
      }
    }

    if (e.target.name === "password2") {
      if (e.target.value !== password) {
        setPassword2Error("Passwords do not match");
      } else {
        setPassword2Error(""); // Clear error if valid
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Final validation before submitting
    if (!nameError && !emailError && !passwordError && !password2Error) {
      if (password2 === "") {
        setPassword2Error("Please confirm your password");
        return;
      }

      if (password !== password2) {
        setPassword2Error("Passwords do not match");
        return;
      }

      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Create an Account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter Your Name"
            />
            {nameError && <p style={{ color: "red" }}>{nameError}</p>}
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter Your Email"
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter Your Password"
            />
            {passwordError && (
              <p style={{ color: "red" }}>{passwordError}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Re-enter the Password"
            />
            {password2Error && (
              <p style={{ color: "red" }}>{password2Error}</p>
            )}
          </div>

          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Submit
            </button>
          </div>

          If you already have an account, please{" "}
          <Link href="/Login">
            <b>Login</b>
          </Link>
        </form>
      </section>
    </>
  );
};

export default Register;
