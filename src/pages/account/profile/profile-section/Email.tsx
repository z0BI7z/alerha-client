import { Button, Form, Input } from "antd";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spacer from "../../../../components/Spacer";
import { clearLastAction } from "../../../../modules/lastAction";
import {
  resetEmailStart,
  RESET_EMAIL_FAILURE,
  RESET_EMAIL_SUCCESS,
  selectEmail,
} from "../../../../modules/user";
import useLastAction from "../../../../utils/useLastAction";

function Email() {
  const dispatch = useDispatch();

  const userEmail = useSelector(selectEmail);

  const resetEmail = ({ email: newEmail }: { email: string }) => {
    dispatch(resetEmailStart({ newEmail }));
  };

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
  useLastAction(RESET_EMAIL_FAILURE, notifyError);

  const notifySuccess = useCallback(
    (m: any) => {
      console.log("haha");
      toast.success("Successfully updated email.", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
      });
      dispatch(clearLastAction());
    },
    [dispatch]
  );
  useLastAction(RESET_EMAIL_SUCCESS, notifySuccess);

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
        <Spacer height="1rem" />
        <Button htmlType="submit">Confirm</Button>
      </Form>
    </div>
  );
}

export default Email;
