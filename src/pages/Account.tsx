import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Route, useRouteMatch } from "react-router-dom";
import { RECAPTCHA_KEY } from "../config";
import Authenticate from "./account/Authenticate";
import Profile from "./account/Profile";
import Reset from "./account/Reset";
import { AccountContainer } from "./account/styles";

function Account() {
  const { path } = useRouteMatch();

  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
      <AccountContainer>
        <Route path={`${path}/authenticate`} component={Authenticate} />
        <Route path={`${path}/reset`} component={Reset} />
        <Route exact path={`${path}`} component={Profile} />
      </AccountContainer>
    </GoogleReCaptchaProvider>
  );
}

export default Account;
