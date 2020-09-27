import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import Authenticate from "./account/Authenticate";
import Profile from "./account/Profile";

function Account() {
  const { path } = useRouteMatch();

  return (
    <React.Fragment>
      <Route path={`${path}/authenticate`} component={Authenticate} />
      <Route exact path={`${path}`} component={Profile} />
    </React.Fragment>
  );
}

export default Account;
