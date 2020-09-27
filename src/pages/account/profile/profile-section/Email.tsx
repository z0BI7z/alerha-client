import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { resetEmailStart, selectEmail } from "../../../../modules/user";
import Spacer from "../../../../components/Spacer";

function Email() {
  const dispatch = useDispatch();

  const userEmail = useSelector(selectEmail);

  const resetEmail = ({
    email: newEmail,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(resetEmailStart({ newEmail, password }));
  };

  return (
    <div>
      <p>{`Your Email: ${userEmail}`}</p>
      <Form onFinish={resetEmail}>
        <label>New Email</label>
        <Form.Item
          name="email"
          rules={[{ required: true, type: "email", message: "Invalid email." }]}
        >
          <Input placeholder="test@test.com" />
        </Form.Item>
        <label>Password</label>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password required." }]}
        >
          <Input.Password
            placeholder="password1234"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Spacer height="1rem" />
        <Button htmlType="submit">Confirm</Button>
      </Form>
    </div>
  );
}

export default Email;
