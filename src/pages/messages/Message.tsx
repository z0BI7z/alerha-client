import React, { useMemo, memo } from "react";
import moment from "moment";
import { MessageContainer, MessageText, MessageDate } from "./message/styles";

interface IMessageProps {
  message: string;
  createdAt: string;
}

function Message({ message, createdAt }: IMessageProps) {
  const parsedDate = useMemo(() => {
    const date = moment(createdAt).local().format("MMM Do YYYY, h:mm:ss a");
    return date;
  }, [createdAt]);

  return (
    <MessageContainer>
      <MessageText>{message}</MessageText>
      <MessageDate>{parsedDate}</MessageDate>
    </MessageContainer>
  );
}

export default memo(Message);
