import { Button, Form, Input } from "antd";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spacer from "../../../../components/Spacer";
import { clearLastAction } from "../../../../modules/lastAction";
import {
  resetPasswordStart,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
} from "../../../../modules/user";
import useLastAction from "../../../../utils/useLastAction";

function Password() {
  const dispatch = useDispatch();

  const resetPassword = ({
    password,
    newPassword,
  }: {
    password: string;
    newPassword: string;
  }) => {
    dispatch(
      resetPasswordStart({
        password,
        newPassword,
      })
    );
  };

  const notifySuccess = useCallback(() => {
    toast.success("Successfully updated password.", {
      autoClose: 2000,
      position: toast.POSITION.TOP_CENTER,
      pauseOnHover: false,
    });
    dispatch(clearLastAction());
  }, [dispatch]);
  useLastAction(RESET_PASSWORD_SUCCESS, notifySuccess);

  const notifyError = useCallback(
    (error: string) => {
      toast.error(error.toString(), {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
      });
      dispatch(clearLastAction());
    },
    [dispatch]
  );
  useLastAction(RESET_PASSWORD_FAILURE, notifyError);

  return (
    <div>
      <Form onFinish={resetPassword}>
        <label>Password</label>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password required." }]}
        >
          <Input.Password placeholder="password1234" />
        </Form.Item>
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
        <Button htmlType="submit">Confirm</Button>
      </Form>
    </div>
  );
}

export default Password;
