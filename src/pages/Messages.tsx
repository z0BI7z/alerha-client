import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { selectIsLoggedIn, selectUserId } from "../modules/user";
import {
  selectMessages,
  fetchMessagesStart,
  addMessageStart,
  createMessageStart,
  IMessage,
} from "../modules/messages";
import { Redirect } from "react-router-dom";
import { API_URL } from "../config";

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
      socket.on("new-message", (newMessage: IMessage) => {
        dispatch(addMessageStart(newMessage));
      });
    }
  }, [dispatch, isLoggedIn, userId]);

  const messages = useSelector(selectMessages);

  const [newMessage, setNewMessage] = useState("");
  const createMessage = useCallback(
    (message: string) => {
      dispatch(createMessageStart(message));
      setNewMessage("");
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    return <Redirect to="/account/login" />;
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
      <div>Messages</div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="button" onClick={() => createMessage(newMessage)}>
          +
        </button>
      </div>
      {messages.map(({ _id, message, createdAt }) => {
        return (
          <div key={_id}>
            {message} - {createdAt}
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
