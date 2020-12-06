import { Button, Form, Input } from "antd";
import React, { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Spacer from "../../components/Spacer";
import {
  loginStart,
  selectIsLoggedIn,
  signUpStart,
  USER_LOGIN_FAILURE,
  USER_SIGNUP_FAILURE,
} from "../../modules/user";
import useLastAction from "../../utils/useLastAction";
import {
  AuthenticateContainer,
  AuthenticateSwitch,
} from "./authenticate/styles";

const listeningActionTypes = [USER_SIGNUP_FAILURE, USER_LOGIN_FAILURE];

function Authenticate() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const [authState, setAuthState] = useState("login");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const notify = useCallback((error: string) => {
    toast.error(error, {
      autoClose: 2000,
      position: toast.POSITION.TOP_CENTER,
      pauseOnHover: false,
    });
  }, []);
  useLastAction(listeningActionTypes, notify);

  if (isLoggedIn) {
    return <Redirect to="/account" />;
  }

  const handleSubmit = async (values: { email: string; password: string }) => {
    if (authState === "login") {
      dispatch(loginStart(values));
    } else {
      try {
        if (executeRecaptcha) {
          const recaptchaToken = await executeRecaptcha();
          dispatch(
            signUpStart({
              ...values,
              recaptchaToken,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
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
    <AuthenticateContainer>
      <Form
        initialValues={{
          email: process.env.NODE_ENV === "development" ? "a@c.com" : "",
          password: process.env.NODE_ENV === "development" ? "testing" : "",
        }}
        onFinish={handleSubmit}
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
