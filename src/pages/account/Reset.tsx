import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { clearLastAction } from "../../modules/lastAction";
import {
  CREATE_FORGOTTEN_PASSWORD_TOKEN_FAILURE,
  RESET_FORGOTTEN_PASSWORD_FAILURE,
} from "../../modules/user";
import useLastAction from "../../utils/useLastAction";
import NewPassword from "./reset/NewPassword";
import PasswordReset from "./reset/PasswordReset";

const ResetContainer = styled.div`
  padding: 1rem;
`;

const Reset = () => {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  const FailedActionTypes = useMemo(
    () => [
      CREATE_FORGOTTEN_PASSWORD_TOKEN_FAILURE,
      RESET_FORGOTTEN_PASSWORD_FAILURE,
    ],
    []
  );

  const notifyError = useCallback(
    (error: string) => {
      toast.error(error, {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
      });
      dispatch(clearLastAction());
    },
    [dispatch]
  );
  useLastAction(FailedActionTypes, notifyError);

  return (
    <ResetContainer>
      <Route path={`${path}/password/:resetToken`} component={NewPassword} />
      <Route exact path={`${path}/password`} component={PasswordReset} />
    </ResetContainer>
  );
};

export default Reset;
