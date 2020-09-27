import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsTokenExpired, fetchTokenStart } from "../modules/user";

interface IRefreshLoginProps {
  children: React.ReactNode;
}

function RefreshLogin({ children }: IRefreshLoginProps) {
  const dispatch = useDispatch();
  const isTokenExpired = useSelector(selectIsTokenExpired);
  useEffect(() => {
    if (isTokenExpired) {
      dispatch(fetchTokenStart());
    }
  }, [dispatch, isTokenExpired]);

  return <React.Fragment>{children}</React.Fragment>;
}

export default RefreshLogin;
