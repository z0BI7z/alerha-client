import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import Login from './account/Login';
import SignUp from './account/SignUp';
import Profile from './account/Profile';

function Account() {
  const { path } = useRouteMatch();

  return (
    <React.Fragment>
      <Route path={`${path}/login`} component={Login} />
      <Route path={`${path}/signup`} component={SignUp} />
      <Route exact path={`${path}`} component={Profile} />
    </React.Fragment>
  );
}

export default Account;