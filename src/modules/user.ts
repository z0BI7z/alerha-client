import { createSelector } from "reselect";
import { takeLatest, call, put, select, all } from "redux-saga/effects";
import axios from "axios";
import moment from "moment";
import jwtDecode from "jwt-decode";
import { API_URL } from "../config";
import { IState } from "./store";
import { ApiErrorTypes } from "../config";

// --- ACTION TYPES ---
const USER_SIGNUP_START = "USER_SIGNUP_START";
const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
const USER_SIGNUP_FAILURE = "USER_SIGNUP_FAILURE";

const USER_LOGIN_START = "USER_LOGIN_START";
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

const USER_SIGNOUT_START = "USER_SIGNOUT_START";
const USER_SIGNOUT_SUCCESS = "USER_SIGNOUT_SUCCESS";
const USER_SIGNOUT_FAILURE = "USER_SIGNOUT_FAILURE";

const FETCH_TOKEN_START = "FETCH_TOKEN_START";
const FETCH_TOKEN_SUCCESS = "FETCH_TOKEN_SUCCESS";
const FETCH_TOKEN_FAILURE = "FETCH_TOKEN_FAILURE";

const FETCH_API_KEY_START = "FETCH_API_KEY_START";
const FETCH_API_KEY_SUCCESS = "FETCH_API_KEY_SUCCESS";
const FETCH_API_KEY_FAILURE = "FETCH_API_KEY_FAILURE";

// --- ACTION CREATORS ---

// Sign Up
export function signUpStart({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return {
    type: USER_SIGNUP_START as typeof USER_SIGNUP_START,
    payload: {
      email,
      password,
    },
  };
}

interface ISignUpUserInfo {
  profile: {
    id: string;
    email: string;
  };
  token: string;
  refreshToken: string;
  tokenExpiration: moment.Moment;
  refreshTokenExpiration: moment.Moment;
}

export function signUpSuccess(userInfo: ISignUpUserInfo) {
  return {
    type: USER_SIGNUP_SUCCESS as typeof USER_SIGNUP_SUCCESS,
    payload: userInfo,
  };
}

export function signUpFailure(error: Error) {
  return {
    type: USER_SIGNUP_FAILURE as typeof USER_SIGNUP_FAILURE,
    payload: error.message,
  };
}

// Login
export function loginStart({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return {
    type: USER_LOGIN_START as typeof USER_LOGIN_START,
    payload: {
      email,
      password,
    },
  };
}

type ILoginUserInfo = ISignUpUserInfo;

export function loginSuccess(userInfo: ILoginUserInfo) {
  return {
    type: USER_LOGIN_SUCCESS as typeof USER_LOGIN_SUCCESS,
    payload: userInfo,
  };
}

export function loginFailure(error: Error) {
  return {
    type: USER_LOGIN_FAILURE as typeof USER_LOGIN_FAILURE,
    payload: error.message,
  };
}

// Sign Out
export function signOutStart() {
  return {
    type: USER_SIGNOUT_START as typeof USER_SIGNOUT_START,
  };
}

export function signOutSuccess() {
  return {
    type: USER_SIGNOUT_SUCCESS as typeof USER_SIGNOUT_SUCCESS,
  };
}

export function signOutFailure(error: Error) {
  return {
    type: USER_SIGNOUT_FAILURE as typeof USER_SIGNOUT_FAILURE,
    payload: error,
  };
}

// Fetch Token
export function fetchTokenStart() {
  return {
    type: FETCH_TOKEN_START as typeof FETCH_TOKEN_START,
  };
}

export function fetchTokenSuccess(tokenInfo: {
  token: string;
  tokenExpiration: moment.Moment;
}) {
  return {
    type: FETCH_TOKEN_SUCCESS as typeof FETCH_TOKEN_SUCCESS,
    payload: tokenInfo,
  };
}

export function fetchTokenFailure(error: Error) {
  return {
    type: FETCH_TOKEN_FAILURE as typeof FETCH_TOKEN_FAILURE,
    payload: error,
  };
}

// Fetch Api Key
export function fetchApiKeyStart() {
  return {
    type: FETCH_API_KEY_START as typeof FETCH_API_KEY_START,
  };
}

export function fetchApiKeySuccess(apiKey: string) {
  return {
    type: FETCH_API_KEY_SUCCESS as typeof FETCH_API_KEY_SUCCESS,
    payload: apiKey,
  };
}

export function fetchApiKeyFailure(error: Error) {
  return {
    type: FETCH_API_KEY_FAILURE as typeof FETCH_API_KEY_FAILURE,
    payload: error,
  };
}

// Action Creator Return Types
type SignUpStartAction = ReturnType<typeof signUpStart>;
type SignUpSuccessAction = ReturnType<typeof signUpSuccess>;
type SignUpFailureAction = ReturnType<typeof signUpFailure>;
type LoginStartAction = ReturnType<typeof loginStart>;
type LoginSuccessAction = ReturnType<typeof loginSuccess>;
type LoginFailureAction = ReturnType<typeof loginFailure>;
type SignOutStartAction = ReturnType<typeof signOutStart>;
type SignOutSuccessAction = ReturnType<typeof signOutSuccess>;
type SignOutFailureAction = ReturnType<typeof signOutFailure>;
type FetchApiKeyStartAction = ReturnType<typeof fetchApiKeyStart>;
type FetchApiKeySuccessAction = ReturnType<typeof fetchApiKeySuccess>;
type FetchApiKeyFailureAction = ReturnType<typeof fetchApiKeyFailure>;
type FetchTokenStartAction = ReturnType<typeof fetchTokenStart>;
type FetchTokenSuccessAction = ReturnType<typeof fetchTokenSuccess>;
type FetchTokenFailureAction = ReturnType<typeof fetchTokenFailure>;

type UserActions =
  | SignUpStartAction
  | SignUpSuccessAction
  | SignUpFailureAction
  | LoginStartAction
  | LoginSuccessAction
  | LoginFailureAction
  | SignOutStartAction
  | SignOutSuccessAction
  | SignOutFailureAction
  | FetchApiKeyStartAction
  | FetchApiKeySuccessAction
  | FetchApiKeyFailureAction
  | FetchTokenStartAction
  | FetchTokenSuccessAction
  | FetchTokenFailureAction;

// --- REDUCER ---
export interface IUserState {
  profile: {
    id: string;
    email: string;
  } | null;
  token: string | null;
  refreshToken: string | null;
  tokenExpiration: moment.Moment | null;
  refreshTokenExpiration: moment.Moment | null;
  apiKey: string | null;
}

const INITIAL_STATE: IUserState = {
  profile: null,
  token: null,
  refreshToken: null,
  tokenExpiration: null,
  refreshTokenExpiration: null,
  apiKey: null,
};

export function userReducer(state = INITIAL_STATE, action: UserActions) {
  switch (action.type) {
    case USER_SIGNUP_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case USER_SIGNUP_FAILURE:
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        profile: null,
        token: null,
        refreshToken: null,
        tokenExpiration: null,
        refreshTokenExpiration: null,
        apiKey: null,
      };
    case USER_SIGNOUT_FAILURE:
    case USER_SIGNOUT_SUCCESS:
      return {
        profile: null,
        token: null,
        refreshToken: null,
        tokenExpiration: null,
        refreshTokenExpiration: null,
        apiKey: null,
      };
    case FETCH_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        tokenExpiration: action.payload.tokenExpiration,
      };
    case FETCH_TOKEN_FAILURE:
      return {
        ...state,
        token: null,
        tokenExpiration: null,
      };
    default:
      return state;
  }
}

// --- SELECTORS ---
const selectUser = (state: IState) => state.user;

export const selectToken = createSelector([selectUser], (user) => user.token);

export const selectTokenExpiration = createSelector(
  [selectUser],
  (user) => user.tokenExpiration
);

export const selectRefreshToken = createSelector(
  [selectUser],
  (user) => user.refreshToken
);

export const selectRefreshTokenExpiration = createSelector(
  [selectUser],
  (user) => user.refreshTokenExpiration
);

export const selectTokens = createSelector(
  [selectToken, selectRefreshToken],
  (token, refreshToken) => ({ token, refreshToken })
);

export const selectIsLoggedIn = createSelector(
  [selectToken, selectTokenExpiration],
  (token, tokenExpiration) =>
    token != null &&
    tokenExpiration != null &&
    moment(tokenExpiration).isAfter(moment())
);

// --- SAGAS ---

// Types
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

interface TokenResponse {
  message: string;
  token: string;
}

// Token Refresh
function* checkValidRefreshToken() {
  const refreshToken: ReturnType<typeof selectRefreshToken> = yield select(
    selectRefreshToken
  );
  const refreshTokenExpiration: ReturnType<typeof selectRefreshTokenExpiration> = yield select(
    selectRefreshTokenExpiration
  );

  if (
    !refreshToken ||
    !refreshTokenExpiration ||
    refreshTokenExpiration.isBefore(moment())
  ) {
    const isLoggedIn: ReturnType<typeof selectIsLoggedIn> = yield select(
      selectIsLoggedIn
    );
    if (isLoggedIn) {
      yield put(signOutStart());
    }
    return false;
  }

  return true;
}

function* checkValidToken() {
  const token: ReturnType<typeof selectToken> = yield select(selectToken);
  const tokenExpiration: ReturnType<typeof selectTokenExpiration> = yield select(
    selectTokenExpiration
  );

  if (!token || !tokenExpiration || tokenExpiration.isBefore(moment())) {
    return false;
  }

  return true;
}

// Sign Up
function* watchSignUpSaga() {
  yield takeLatest(USER_SIGNUP_START, signUpStartSaga);
}

function* signUpStartSaga(action: SignUpStartAction) {
  try {
    const url = API_URL + "/auth/signup";
    const response = yield call(axios.post, url, {
      email: action.payload.email,
      password: action.payload.password,
    });
    const { token, refreshToken, user }: ISignUpResponse = response.data;
    const { expiration: tokenExpiration }: DecodedToken = jwtDecode(token);
    const { expiration: refreshTokenExpiration }: DecodedToken = jwtDecode(
      refreshToken
    );
    const profile = {
      id: user._id,
      email: user.email,
    };

    yield put(
      signUpSuccess({
        profile,
        token,
        refreshToken,
        tokenExpiration: moment(tokenExpiration),
        refreshTokenExpiration: moment(refreshTokenExpiration),
      })
    );
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
    const url = API_URL + "/auth/login";
    const response = yield call(axios.post, url, {
      email: action.payload.email,
      password: action.payload.password,
    });

    const { token, refreshToken, user }: ILoginResponse = response.data;
    const { expiration: tokenExpiration }: DecodedToken = jwtDecode(token);
    const { expiration: refreshTokenExpiration }: DecodedToken = jwtDecode(
      refreshToken
    );
    const profile = {
      id: user._id,
      email: user.email,
    };

    yield put(
      loginSuccess({
        profile,
        token,
        refreshToken,
        tokenExpiration: moment(tokenExpiration),
        refreshTokenExpiration: moment(refreshTokenExpiration),
      })
    );
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

// Sign Out
function* watchSignOutSaga() {
  yield takeLatest(USER_SIGNUP_START, signOutSaga);
}

function* signOutSaga() {
  try {
    const isTokenValid = yield call(checkValidToken);
    if (!isTokenValid) {
      const isRefreshTokenValid: boolean = yield call(checkValidRefreshToken);
      if (!isRefreshTokenValid) {
        const error = Error("Invalid refresh token.");
        throw error;
      } else {
        yield put(fetchTokenStart());
      }
    }

    const {
      token,
      refreshToken,
    }: ReturnType<typeof selectTokens> = yield select(selectTokens);

    const url = API_URL + "/auth/logout";
    yield call(axios.post, url, {
      token,
      refreshToken,
    });
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

// Fetch Token
function* watchFetchTokenSaga() {
  yield takeLatest(FETCH_TOKEN_START, fetchTokenSaga);
}

function* fetchTokenSaga() {
  try {
    const isRefreshTokenValid: boolean = yield call(checkValidRefreshToken);
    if (!isRefreshTokenValid) {
      const error = Error("Invalid refresh token.");
      throw error;
    }

    const refreshToken: string = yield select(selectRefreshToken);

    const url = API_URL + "/auth/refresh-token";
    const response = yield call(axios.post, url, {
      refreshToken,
    });

    const { token }: TokenResponse = response.data;
    const { expiration: tokenExpiration }: DecodedToken = jwtDecode(token);

    yield put(
      fetchTokenSuccess({ token, tokenExpiration: moment(tokenExpiration) })
    );
    return;
  } catch (error) {
    if (
      error.response &&
      error.response.type &&
      error.response.type === ApiErrorTypes.INVALID_REFRESH_TOKEN
    ) {
      yield put(signOutStart());
    }

    yield put(fetchTokenFailure(error));
    return;
  }
}

export function* userSagas() {
  yield all([
    call(watchSignUpSaga),
    call(watchLoginSaga),
    call(watchSignOutSaga),
    call(watchFetchTokenSaga),
  ]);
}
