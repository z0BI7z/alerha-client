import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchApiKeyStart } from "../modules/user";

interface IRefreshApiKeyProps {
  children: React.ReactNode;
}

function RefreshApiKey({ children }: IRefreshApiKeyProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchApiKeyStart());
  }, [dispatch]);

  return <React.Fragment>{children}</React.Fragment>;
}

export default RefreshApiKey;
