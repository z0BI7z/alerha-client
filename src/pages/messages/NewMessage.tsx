import React, { useState } from "react";
import { Input, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { NewMessageContainer } from "./new-message/styles";
import Spacer from "../../components/Spacer";

interface INewMessageProps {
  onSubmit: (message: string) => void;
}

function NewMessage({ onSubmit }: INewMessageProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.length > 0 && message.length <= 280) {
      onSubmit(message);
      setMessage("");
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <NewMessageContainer>
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={"New Message"}
        size="large"
        onKeyDown={handleEnter}
      />
      <Spacer />
      <Button
        shape="circle"
        icon={<ArrowRightOutlined />}
        onClick={handleSubmit}
      />
    </NewMessageContainer>
  );
}

export default NewMessage;
