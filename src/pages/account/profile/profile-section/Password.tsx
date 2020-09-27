import React from "react";
import { useDispatch } from "react-redux";
import { Input, Form, Button } from "antd";
import Spacer from "../../../../components/Spacer";
import { resetPasswordStart } from "../../../../modules/user";

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

  return (
    <div>
      <Form onFinish={resetPassword}>
        <label>Password</label>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password required." }]}
        >
          <Input.Password placeholder="test@test.com" />
        </Form.Item>
        <label>New Password</label>
        <Form.Item
          name="newPassword"
          rules={[{ required: true, message: "New Password required." }]}
        >
          <Input placeholder="password1234" />
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
          <Input placeholder="password1234" />
        </Form.Item>
        <Spacer height="1rem" />
        <Button htmlType="submit">Confirm</Button>
      </Form>
    </div>
  );
}

export default Password;
