import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { selectIsLoggedIn, selectUserId } from "../modules/user";
import {
  selectMessages,
  fetchMessagesStart,
  addMessageStart,
  createMessageStart,
  IMessageResponse,
} from "../modules/messages";
import { Redirect } from "react-router-dom";
import { API_URL } from "../config";
import {
  MessagesContainer,
  MessagesHeader,
  MessagesTitle,
} from "./messages/styles";
import MessagesActions from "./messages/MessagesActions";
import NewMessage from "./messages/NewMessage";
import Message from "./messages/Message";

function Messages() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessagesStart());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && userId) {
      const socket = io(API_URL);
      socket.on("connect", () => {
        socket.emit("initialize", userId);
      });
      socket.on(
        "new-message",
        ({
          newMessage,
          tempId,
        }: {
          newMessage: IMessageResponse;
          tempId?: string;
        }) => {
          dispatch(addMessageStart({ message: newMessage, tempId }));
        }
      );
      socket.on("delete-messages", () => {
        dispatch(fetchMessagesStart());
      });
    }
  }, [dispatch, isLoggedIn, userId]);

  const messages = useSelector(selectMessages);

  const createMessage = useCallback(
    (message: string) => {
      dispatch(createMessageStart(message));
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    return <Redirect to="/account/authenticate" />;
  }

  return (
    <MessagesContainer>
      <MessagesHeader>
        <MessagesTitle>Messages</MessagesTitle>
        <MessagesActions />
      </MessagesHeader>
      <NewMessage onSubmit={createMessage} />
      {messages.map(({ _id, message, createdAt }) => {
        return <Message key={_id} message={message} createdAt={createdAt} />;
      })}
    </MessagesContainer>
  );
}

export default Messages;
