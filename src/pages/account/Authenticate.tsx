import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { selectIsLoggedIn, loginStart, signUpStart } from "../../modules/user";
import Spacer from "../../components/Spacer";
import {
  AuthenticateContainer,
  AuthenticateSwitch,
} from "./authenticate/styles";

function Authenticate() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const [authState, setAuthState] = useState("login");

  if (isLoggedIn) {
    return <Redirect to="/account" />;
  }

  const login = (values: { email: string; password: string }) => {
    if (authState === "login") {
      dispatch(loginStart(values));
    } else {
      dispatch(signUpStart(values));
    }
  };

  const toggleAuthState = () => {
    if (authState === "login") {
      setAuthState("signup");
    } else {
      setAuthState("login");
    }
  };

  return (
    <AuthenticateContainer
      style={{
        margin: "1rem auto",
        maxWidth: "36rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Form
        initialValues={{
          email: process.env.NODE_ENV === "development" ? "a@c.com" : "",
          password: process.env.NODE_ENV === "development" ? "testing" : "",
        }}
        onFinish={login}
      >
        <label>Email</label>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Email required." },
            { type: "email", message: "Invalid email." },
          ]}
        >
          <Input />
        </Form.Item>
        <label>Password</label>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password required." }]}
        >
          <Input.Password />
        </Form.Item>
        <Spacer height="1rem" />
        <Button type="primary" htmlType="submit">
          {authState === "login" ? "Login" : "Sign Up"}
        </Button>
      </Form>
      <Spacer height="1rem" />
      <AuthenticateSwitch onClick={toggleAuthState}>
        {authState === "login"
          ? "Create an account"
          : "Already have an account?"}
      </AuthenticateSwitch>
    </AuthenticateContainer>
  );
}

export default Authenticate;
