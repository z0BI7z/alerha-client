import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { AccountContainer } from "./account/styles";
import Authenticate from "./account/Authenticate";
import Profile from "./account/Profile";
import { RECAPTCHA_KEY } from "../config";

function Account() {
  const { path } = useRouteMatch();

  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
      <AccountContainer>
        <Route path={`${path}/authenticate`} component={Authenticate} />
        <Route exact path={`${path}`} component={Profile} />
      </AccountContainer>
    </GoogleReCaptchaProvider>
  );
}

export default Account;
