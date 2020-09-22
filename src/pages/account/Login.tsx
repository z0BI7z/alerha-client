import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { selectIsLoggedIn, loginStart } from '../../modules/user';

function Login() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  if (isLoggedIn) {
    return (
      <Redirect to='/account' />
    );
  }

  return (
    <div>
      <Formik
        initialValues={{
          email: process.env.NODE_ENV === 'development' ? 'a@c.com' : '',
          password: process.env.NODE_ENV === 'development' ? 'testing' : ''
        }}
        onSubmit={(value) => {
          dispatch(loginStart(value));
        }}
      >
        <Form>
          <Field name='email' type='text' />
          <ErrorMessage name='email' />
          <Field name='password' type='text' />
          <ErrorMessage name='password' />
          <button type='submit'>Login</button>
        </Form>
      </Formik>
      <button type='button' onClick={() => history.push('/account/signup')}>Create an Account</button>
    </div>
  );
}

export default Login;