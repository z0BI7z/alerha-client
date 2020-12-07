import { Button, Form, Input } from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Spacer from "../../../components/Spacer";
import { clearLastAction } from "../../../modules/lastAction";
import {
  createForgottenPasswordTokenStart,
  CREATE_FORGOTTEN_PASSWORD_TOKEN_SUCCESS,
} from "../../../modules/user";
import useLastAction from "../../../utils/useLastAction";

const PasswordReset = () => {
  const dispatch = useDispatch();

  const [finished, setFinished] = useState(false);

  const handleSubmit = useCallback(
    ({ email }: { email: string }) => {
      dispatch(createForgottenPasswordTokenStart(email));
    },
    [dispatch]
  );

  const notifySuccess = useCallback(() => {
    setFinished(true);
    dispatch(clearLastAction());
  }, [dispatch]);
  useLastAction(CREATE_FORGOTTEN_PASSWORD_TOKEN_SUCCESS, notifySuccess);

  if (finished) {
    return (
      <div>
        <Spacer height="1rem" />
        <p>Please check your email for a link to reset your password.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Reset Password</h2>
      <p>Please submit your email.</p>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[{ required: true, type: "email", message: "Invalid email." }]}
        >
          <Input placeholder="test@test.com" />
        </Form.Item>
        <Spacer height="1rem" />
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default PasswordReset;
