import { Button, Form, Input } from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spacer from "../../../components/Spacer";
import { clearLastAction } from "../../../modules/lastAction";
import {
  resetForgottenPasswordStart,
  RESET_FORGOTTEN_PASSWORD_SUCCESS,
} from "../../../modules/user";
import useLastAction from "../../../utils/useLastAction";

const NewPassword = () => {
  const dispatch = useDispatch();
  const { resetToken } = useParams<{ resetToken: string }>();
  const [finished, setFinished] = useState(false);

  const handleSubmit = useCallback(
    ({ newPassword }: { newPassword: string }) => {
      dispatch(resetForgottenPasswordStart(resetToken, newPassword));
    },
    [dispatch, resetToken]
  );

  const notifySuccess = useCallback(() => {
    toast.success("Successfully reset password.", {
      autoClose: 2000,
      position: toast.POSITION.TOP_CENTER,
      pauseOnHover: false,
    });
    dispatch(clearLastAction());
    setFinished(true);
  }, [dispatch]);
  useLastAction(RESET_FORGOTTEN_PASSWORD_SUCCESS, notifySuccess);

  if (finished) {
    return (
      <div>
        <p>{`Password reset.`}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Reset Password</h2>
      <p>Please enter a new password.</p>
      <Form onFinish={handleSubmit}>
        <label>New Password</label>
        <Form.Item
          name="newPassword"
          rules={[{ required: true, message: "New Password required." }]}
        >
          <Input.Password placeholder="password1234" />
        </Form.Item>
        <label>Confirm New Password</label>
        <Form.Item
          name="confirmNewPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Confirm New Password required." },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Passwords do not match.");
              },
            }),
          ]}
        >
          <Input.Password placeholder="password1234" />
        </Form.Item>
        <Spacer height="1rem" />
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default NewPassword;
