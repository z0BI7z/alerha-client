import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectIsLoggedIn } from '../../modules/user';

function Profile() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return (
      <Redirect to='/account/login' />
    );
  }

  return (
    <div>
      Dashboard
    </div>
  );
}

export default Profile;