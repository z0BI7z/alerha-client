// Legacy

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { selectIsLoggedIn, signUpStart } from "../../modules/user";

function SignUp() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  if (isLoggedIn) {
    return <Redirect to="/account" />;
  }

  return (
    <div
      style={{
        margin: "1rem auto",
        maxWidth: "36rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Formik
        initialValues={{
          email: process.env.NODE_ENV === "development" ? "a@c.com" : "",
          password: process.env.NODE_ENV === "development" ? "testing" : "",
        }}
        onSubmit={(value) => {
          dispatch(signUpStart(value));
        }}
      >
        <Form>
          <Field name="email" type="text" />
          <ErrorMessage name="email" />
          <Field name="password" type="text" />
          <ErrorMessage name="password" />
          <button type="submit">Create Account</button>
        </Form>
      </Formik>
      <button type="button" onClick={() => history.push("/account/login")}>
        Login
      </button>
    </div>
  );
}

export default SignUp;
