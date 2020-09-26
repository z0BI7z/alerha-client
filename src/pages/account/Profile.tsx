import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectToken,
  selectApiKey,
  signOutStart,
  fetchTokenStart,
  fetchApiKeyStart,
  createApiKeyStart,
} from "../../modules/user";

function Profile() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchApiKeyStart());
    }
  }, [isLoggedIn, dispatch]);

  const token = useSelector(selectToken);
  const apiKey = useSelector(selectApiKey);

  const signOut = useCallback(() => dispatch(signOutStart()), [dispatch]);
  const fetchToken = useCallback(() => dispatch(fetchTokenStart()), [dispatch]);
  const fetchApiKey = useCallback(() => dispatch(fetchApiKeyStart()), [
    dispatch,
  ]);
  const createApiKey = useCallback(() => dispatch(createApiKeyStart()), [
    dispatch,
  ]);

  if (!isLoggedIn) {
    return <Redirect to="/account/login" />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "36rem",
        margin: "1rem auto",
      }}
    >
      <button type="button" onClick={signOut}>
        Sign Out
      </button>
      <p>Dashboard</p>
      <button type="button" onClick={fetchToken}>
        Reset Token
      </button>
      <p style={{ overflowWrap: "break-word" }}>{token || "No token."}</p>
      <button type="button" onClick={fetchApiKey}>
        Fetch Api Key
      </button>
      <button type="button" onClick={createApiKey}>
        {apiKey ? "Reset api key" : "Create an api key"}
      </button>
      <p style={{ overflowWrap: "break-word" }}>{apiKey || "No api key."}</p>
    </div>
  );
}

export default Profile;
