import { createSelector } from 'reselect';
import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import { API_URL } from '../config';
import { IState } from './store';

// --- ACTION TYPES ---
const USER_SIGNUP_START = 'USER_SIGNUP_START';
const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';

const USER_LOGIN_START = 'USER_LOGIN_START';
const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';


// --- ACTION CREATORS ---
export function signUpStart({ email, password }: { email: string; password: string }) {
  return {
    type: USER_SIGNUP_START as typeof USER_SIGNUP_START,
    payload: {
      email,
      password,
    }
  }
}

export function signUpSuccess(userInfo: IUserState) {
  return {
    type: USER_SIGNUP_SUCCESS as typeof USER_SIGNUP_SUCCESS,
    payload: userInfo,
  }
}


export function signUpFailure(error: Error) {
  return {
    type: USER_SIGNUP_FAILURE as typeof USER_SIGNUP_FAILURE,
    payload: error.message,
  }
}

export function loginStart({ email, password }: { email: string; password: string }) {
  return {
    type: USER_LOGIN_START as typeof USER_LOGIN_START,
    payload: {
      email,
      password,
    }
  }
}

export function loginSuccess(userInfo: IUserState) {
  return {
    type: USER_LOGIN_SUCCESS as typeof USER_LOGIN_SUCCESS,
    payload: userInfo,
  }
}


export function loginFailure(error: Error) {
  return {
    type: USER_LOGIN_FAILURE as typeof USER_LOGIN_FAILURE,
    payload: error.message,
  }
}

type SignUpStartAction = ReturnType<typeof signUpStart>;
type SignUpSuccessAction = ReturnType<typeof signUpSuccess>;
type SignUpFailureAction = ReturnType<typeof signUpFailure>;
type LoginStartAction = ReturnType<typeof loginStart>;
type LoginSuccessAction = ReturnType<typeof loginSuccess>;
type LoginFailureAction = ReturnType<typeof loginFailure>;

type UserActions = SignUpStartAction
  | SignUpSuccessAction
  | SignUpFailureAction
  | LoginStartAction
  | LoginSuccessAction
  | LoginFailureAction;


// --- REDUCER ---
export interface IUserState {
  profile: {
    id: string;
    email: string;
  } | null,
  token: string | null;
  refreshToken: string | null;
  tokenExpiration: moment.Moment | null;
  refreshTokenExpiration: moment.Moment | null;
}

const INITIAL_STATE: IUserState = {
  profile: null,
  token: null,
  refreshToken: null,
  tokenExpiration: null,
  refreshTokenExpiration: null,
}

export function userReducer(state = INITIAL_STATE, action: UserActions) {
  switch (action.type) {
    case USER_SIGNUP_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case USER_SIGNUP_FAILURE:
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        profile: null,
        token: null,
        refreshToken: null,
        tokenExpiration: null,
        refreshTokenExpiration: null,
      }
    default:
      return state;
  }
}


// --- SELECTORS ---
const selectUser = (state: IState) => state.user;

export const selectToken = createSelector([
  selectUser,
], user => user.token);

export const selectTokenExpiration = createSelector([
  selectUser,
], user => user.tokenExpiration);

export const selectRefreshToken = createSelector([
  selectUser,
], user => user.refreshToken);

export const selectRefreshTokenExpiration = createSelector([
  selectUser,
], user => user.refreshTokenExpiration);

export const selectIsLoggedIn = createSelector([
  selectToken,
  selectTokenExpiration,
], (token, tokenExpiration) => token != null && tokenExpiration != null && moment(tokenExpiration).isAfter(moment()));


// --- SAGAS ---
interface IUser {
  _id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

interface ISignUpResponse {
  token: string;
  refreshToken: string;
  user: IUser;
}

type ILoginResponse = ISignUpResponse;

export interface DecodedToken {
  userId: string;
  email: string;
  expiration: string;
}

// Token Refresh
function* checkRefreshTokenExpiration() {
  const refreshTokenExpiration: ReturnType<typeof selectRefreshTokenExpiration> = yield select(selectRefreshTokenExpiration);

  if (!refreshTokenExpiration) {
    return;
  }

  if (refreshTokenExpiration.isBefore(moment())) {
    return;
  }
}

function* checkTokenExpiration() {
  const tokenExpiration: ReturnType<typeof selectTokenExpiration> = yield select(selectTokenExpiration);

  if (!tokenExpiration) {
    return;
  }

  if (tokenExpiration.isBefore(moment())) {
    return;
  }
}

// Sign Up
function* watchSignUpSaga() {
  yield takeLatest(USER_SIGNUP_START, signUpStartSaga);
}

function* signUpStartSaga(action: SignUpStartAction) {
  try {
    const url = API_URL + '/auth/signup';
    const response = yield call(axios.post, url, {
      email: action.payload.email,
      password: action.payload.password,
    });
    const { token, refreshToken, user }: ISignUpResponse = response.data;
    const { expiration: tokenExpiration }: DecodedToken = jwtDecode(token);
    const { expiration: refreshTokenExpiration }: DecodedToken = jwtDecode(refreshToken);
    const profile = {
      id: user._id,
      email: user.email,
    }

    yield put(signUpSuccess({
      profile,
      token,
      refreshToken,
      tokenExpiration: moment(tokenExpiration),
      refreshTokenExpiration: moment(refreshTokenExpiration),
    }));

    return;

  } catch (error) {
    console.log(error);

    if (error.isAxiosError) {
      yield put(signUpFailure(Error(error.response.data.message)));
      return;
    }

    yield put(signUpFailure(error));
    return;
  }
}

// Login
function* watchLoginSaga() {
  yield takeLatest(USER_LOGIN_START, loginStartSaga);
}

function* loginStartSaga(action: LoginStartAction) {
  try {
    const url = API_URL + '/auth/login';
    const response = yield call(axios.post, url, {
      email: action.payload.email,
      password: action.payload.password,
    });
    const { token, refreshToken, user }: ILoginResponse = response.data;
    const { expiration: tokenExpiration }: DecodedToken = jwtDecode(token);
    const { expiration: refreshTokenExpiration }: DecodedToken = jwtDecode(refreshToken);
    const profile = {
      id: user._id,
      email: user.email,
    }

    yield put(loginSuccess({
      profile,
      token,
      refreshToken,
      tokenExpiration: moment(tokenExpiration),
      refreshTokenExpiration: moment(refreshTokenExpiration),
    }));

    return;

  } catch (error) {
    console.log(error);

    if (error.isAxiosError) {
      yield put(loginFailure(Error(error.response.data.message)));
      return;
    }

    yield put(loginFailure(error));
    return;
  }
}

export function* userSagas() {
  yield all([
    call(watchSignUpSaga),
    call(watchLoginSaga),
  ]);
}