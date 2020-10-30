import { createSelector } from "reselect";
import { takeLatest, call, put, select, all } from "redux-saga/effects";
import axios from "axios";
import moment from "moment";
import jwtDecode from "jwt-decode";
import { API_URL } from "../config";
import { IState } from "./store";
import { ApiErrorResponseTypes } from "../config";

// --- ACTION TYPES ---
const USER_TEST = "USER_TEST";

const INVALID_REFRESH_TOKEN = "INVALID_REFRESH_TOKEN";
const INVALID_TOKEN = "INVALID_TOKEN";

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

const CREATE_API_KEY_START = "CREATE_API_KEY_START";
const CREATE_API_KEY_SUCCESS = "CREATE_API_KEY_SUCCESS";
const CREATE_API_KEY_FAILURE = "CREATE_API_KEY_FAILURE";

const RESET_EMAIL_START = "RESET_EMAIL_START";
const RESET_EMAIL_SUCCESS = "RESET_EMAIL_SUCCESS";
const RESET_EMAIL_FAILURE = "RESET_EMAIL_FAILURE";

const RESET_PASSWORD_START = "RESET_PASSWORD_START";
const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";

// --- ACTION CREATORS ---

// Errors
export function userTest() {
  return {
    type: USER_TEST as typeof USER_TEST,
  };
}

export function invalidRefreshToken() {
  return {
    type: INVALID_REFRESH_TOKEN as typeof INVALID_REFRESH_TOKEN,
  };
}

export function invalidToken() {
  return {
    type: INVALID_TOKEN as typeof INVALID_TOKEN,
  };
}

// Sign Up
export function signUpStart({
  email,
  password,
  token,
}: {
  email: string;
  password: string;
  token: string;
}) {
  return {
    type: USER_SIGNUP_START as typeof USER_SIGNUP_START,
    payload: {
      email,
      password,
      token,
    },
  };
}

export interface ISignUpUserInfo {
  profile: {
    id: string;
    email: string;
  };
  token: string;
  refreshToken: string;
  tokenExpiration: string;
  refreshTokenExpiration: string;
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

export type ILoginUserInfo = ISignUpUserInfo;

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
  tokenExpiration: string;
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

// Fetch API Key
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

// Create API Key
export function createApiKeyStart() {
  return {
    type: CREATE_API_KEY_START as typeof CREATE_API_KEY_START,
  };
}

export function createApiKeySuccess(apiKey: string) {
  return {
    type: CREATE_API_KEY_SUCCESS as typeof CREATE_API_KEY_SUCCESS,
    payload: apiKey,
  };
}

export function createApiKeyFailure(error: Error) {
  return {
    type: CREATE_API_KEY_FAILURE as typeof CREATE_API_KEY_FAILURE,
    payload: error,
  };
}

// Reset Email
export function resetEmailStart({
  newEmail,
  password,
}: {
  newEmail: string;
  password: string;
}) {
  return {
    type: RESET_EMAIL_START as typeof RESET_EMAIL_START,
    payload: {
      newEmail,
      password,
    },
  };
}

export type IResetEmailUserInfo = ISignUpUserInfo;

export function resetEmailSuccess(userInfo: IResetEmailUserInfo) {
  return {
    type: RESET_EMAIL_SUCCESS as typeof RESET_EMAIL_SUCCESS,
    payload: userInfo,
  };
}

export function resetEmailFailure(error: Error) {
  return {
    type: RESET_EMAIL_FAILURE as typeof RESET_EMAIL_FAILURE,
    payload: error,
  };
}

// Reset Password
export function resetPasswordStart({
  password,
  newPassword,
}: {
  password: string;
  newPassword: string;
}) {
  return {
    type: RESET_PASSWORD_START as typeof RESET_PASSWORD_START,
    payload: {
      password,
      newPassword,
    },
  };
}

export type IResetPasswordUserInfo = ISignUpUserInfo;

export function resetPasswordSuccess(userInfo: IResetPasswordUserInfo) {
  return {
    type: RESET_PASSWORD_SUCCESS as typeof RESET_PASSWORD_SUCCESS,
    payload: userInfo,
  };
}

export function resetPasswordFailure(error: Error) {
  return {
    type: RESET_PASSWORD_FAILURE as typeof RESET_PASSWORD_FAILURE,
    payload: error,
  };
}

// Action Creator Return Types
type UserTestAction = ReturnType<typeof userTest>;
type InvalidRefreshTokenAction = ReturnType<typeof invalidRefreshToken>;
type InvalidTokenAction = ReturnType<typeof invalidToken>;
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
type CreateApiKeyStartAction = ReturnType<typeof createApiKeyStart>;
type CreateApiKeySuccessAction = ReturnType<typeof createApiKeySuccess>;
type CreateApiKeyFailureAction = ReturnType<typeof createApiKeyFailure>;
type FetchTokenStartAction = ReturnType<typeof fetchTokenStart>;
type FetchTokenSuccessAction = ReturnType<typeof fetchTokenSuccess>;
type FetchTokenFailureAction = ReturnType<typeof fetchTokenFailure>;
type ResetEmailStartAction = ReturnType<typeof resetEmailStart>;
type ResetEmailSuccessAction = ReturnType<typeof resetEmailSuccess>;
type ResetEmailFailureAction = ReturnType<typeof resetEmailFailure>;
type ResetPasswordStartAction = ReturnType<typeof resetPasswordStart>;
type ResetPasswordSuccessAction = ReturnType<typeof resetPasswordSuccess>;
type ResetPasswordFailureAction = ReturnType<typeof resetPasswordFailure>;

type UserActions =
  | UserTestAction
  | InvalidRefreshTokenAction
  | InvalidTokenAction
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
  | CreateApiKeyStartAction
  | CreateApiKeySuccessAction
  | CreateApiKeyFailureAction
  | FetchTokenStartAction
  | FetchTokenSuccessAction
  | FetchTokenFailureAction
  | ResetEmailStartAction
  | ResetEmailSuccessAction
  | ResetEmailFailureAction
  | ResetPasswordStartAction
  | ResetPasswordSuccessAction
  | ResetPasswordFailureAction;

// --- REDUCER ---
export interface IUserState {
  profile: {
    id: string | null;
    email: string | null;
  };
  token: string | null;
  refreshToken: string | null;
  tokenExpiration: string | null;
  refreshTokenExpiration: string | null;
  apiKey: string | null;
}

export const USER_INITIAL_STATE: IUserState = {
  profile: {
    id: null,
    email: null,
  },
  token: null,
  refreshToken: null,
  tokenExpiration: null,
  refreshTokenExpiration: null,
  apiKey: null,
};

export function userReducer(state = USER_INITIAL_STATE, action: UserActions) {
  switch (action.type) {
    case USER_SIGNUP_SUCCESS:
    case USER_LOGIN_SUCCESS:
    case RESET_EMAIL_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case USER_SIGNUP_FAILURE:
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        profile: {
          id: null,
          email: null,
        },
        token: null,
        refreshToken: null,
        tokenExpiration: null,
        refreshTokenExpiration: null,
        apiKey: null,
      };
    case USER_SIGNOUT_FAILURE:
    case USER_SIGNOUT_SUCCESS:
    case INVALID_REFRESH_TOKEN:
      return {
        profile: {
          id: null,
          email: null,
        },
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
    case INVALID_TOKEN:
      return {
        ...state,
        token: null,
        tokenExpiration: null,
      };
    case FETCH_API_KEY_SUCCESS:
    case CREATE_API_KEY_SUCCESS:
      return {
        ...state,
        apiKey: action.payload,
      };
    case FETCH_API_KEY_FAILURE:
      return {
        ...state,
        apiKey: null,
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

export const selectIsTokenExpired = createSelector(
  [selectTokenExpiration],
  (date) => moment(date).isBefore(moment())
);

export const selectApiKey = createSelector([selectUser], (user) => user.apiKey);

export const selectProfile = createSelector(
  [selectUser],
  (user) => user.profile
);

export const selectUserId = createSelector(
  [selectProfile],
  (profile) => profile.id
);

export const selectEmail = createSelector(
  [selectProfile],
  (profile) => profile.email
);

// --- SAGAS ---

// Types
export interface IUser {
  _id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISignUpResponse {
  token: string;
  refreshToken: string;
  user: IUser;
}

export type ILoginResponse = ISignUpResponse;
export type IResetEmailResponse = ISignUpResponse;
export type IResetPasswordResponse = ISignUpResponse;

export interface IDecodedToken {
  userId: string;
  email: string;
  expiration: string;
}

export interface ITokenResponse {
  message: string;
  token: string;
}

export interface IApiKeyResponse {
  message: string;
  apiKey: string;
}

// Handle API Typed Errors
function* handleApiTypedErrors(error: any) {
  if (error.response && error.response.data && error.response.data.type) {
    switch (error.response.data.type) {
      case ApiErrorResponseTypes.INVALID_REFRESH_TOKEN:
        yield put(invalidRefreshToken());
        break;
      case ApiErrorResponseTypes.INVALID_TOKEN:
        yield put(invalidToken());
        break;
    }
  }
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
    moment(refreshTokenExpiration).isBefore(moment())
  ) {
    return false;
  }

  return true;
}

function* checkValidToken() {
  const token: ReturnType<typeof selectToken> = yield select(selectToken);
  const tokenExpiration: ReturnType<typeof selectTokenExpiration> = yield select(
    selectTokenExpiration
  );

  if (
    !token ||
    !tokenExpiration ||
    moment(tokenExpiration).isBefore(moment())
  ) {
    return false;
  }

  return true;
}

function* ensureValidRefreshToken() {
  try {
    const isValidRefreshToken = yield call(checkValidRefreshToken);
    if (!isValidRefreshToken) {
      const error = new Error("Invalid refresh token.");
      throw error;
    }
  } catch (error) {
    yield put(invalidRefreshToken());
    throw error;
  }
}

export function* ensureValidToken() {
  try {
    const isValidToken = yield call(checkValidToken);
    if (!isValidToken) {
      yield call(ensureValidRefreshToken);
      yield put(fetchTokenStart());
    }
  } catch (error) {
    yield put(invalidToken());
    throw error;
  }
}

// Sign Up
export function* watchSignUpSaga() {
  yield takeLatest(USER_SIGNUP_START, signUpSaga);
}

export function* signUpSaga(action: SignUpStartAction) {
  try {
    const url = API_URL + "/auth/signup";
    const response = yield call(axios.post, url, {
      email: action.payload.email,
      password: action.payload.password,
      token: action.payload.token,
    });
    const { token, refreshToken, user }: ISignUpResponse = response.data;
    const { expiration: tokenExpiration }: IDecodedToken = jwtDecode(token);
    const { expiration: refreshTokenExpiration }: IDecodedToken = jwtDecode(
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
        tokenExpiration,
        refreshTokenExpiration,
      })
    );
    return;
  } catch (error) {
    yield call(handleApiTypedErrors, error);
    yield put(signUpFailure(error));
    return;
  }
}

// Login
export function* watchLoginSaga() {
  yield takeLatest(USER_LOGIN_START, loginSaga);
}

export function* loginSaga(action: LoginStartAction) {
  try {
    const url = API_URL + "/auth/login";
    const response = yield call(axios.post, url, {
      email: action.payload.email,
      password: action.payload.password,
    });

    const { token, refreshToken, user }: ILoginResponse = response.data;
    const { expiration: tokenExpiration }: IDecodedToken = jwtDecode(token);
    const { expiration: refreshTokenExpiration }: IDecodedToken = jwtDecode(
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
        tokenExpiration,
        refreshTokenExpiration,
      })
    );
    return;
  } catch (error) {
    yield call(handleApiTypedErrors, error);
    yield put(loginFailure(error));
    return;
  }
}

// Sign Out
export function* watchSignOutSaga() {
  yield takeLatest(USER_SIGNOUT_START, signOutSaga);
}

export function* signOutSaga() {
  try {
    yield call(ensureValidToken);

    const {
      token,
      refreshToken,
    }: ReturnType<typeof selectTokens> = yield select(selectTokens);

    const url = API_URL + "/auth/signout";
    yield call(
      axios.post,
      url,
      {
        refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(signOutSuccess());
  } catch (error) {
    yield call(handleApiTypedErrors, error);
    yield put(signOutFailure(error));
  }
}

// Fetch Token
export function* watchFetchTokenSaga() {
  yield takeLatest(FETCH_TOKEN_START, fetchTokenSaga);
}

export function* fetchTokenSaga() {
  try {
    const isRefreshTokenValid: boolean = yield call(checkValidRefreshToken);
    if (!isRefreshTokenValid) {
      yield put(invalidRefreshToken());
      const error = Error("Invalid refresh token.");
      throw error;
    }

    const refreshToken: string = yield select(selectRefreshToken);

    const url = API_URL + "/auth/refresh-token";
    const response = yield call(axios.post, url, {
      refreshToken,
    });

    const { token }: ITokenResponse = response.data;
    const { expiration: tokenExpiration }: IDecodedToken = jwtDecode(token);

    yield put(fetchTokenSuccess({ token, tokenExpiration }));
    return;
  } catch (error) {
    yield call(handleApiTypedErrors, error);
    yield put(fetchTokenFailure(error));
    return;
  }
}

// Fetch Api Key
export function* watchFetchApiKeySaga() {
  yield takeLatest(FETCH_API_KEY_START, fetchApiKeySaga);
}

export function* fetchApiKeySaga() {
  try {
    yield call(ensureValidToken);
    const token: ReturnType<typeof selectToken> = yield select(selectToken);

    const url = API_URL + "/api-key";
    const response = yield call(axios.get, url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { apiKey }: IApiKeyResponse = response.data;

    yield put(fetchApiKeySuccess(apiKey));
    return;
  } catch (error) {
    yield call(handleApiTypedErrors, error);
    yield put(fetchApiKeyFailure(error));
    return;
  }
}

// Create Api Key
export function* watchCreateApiKeySaga() {
  yield takeLatest(CREATE_API_KEY_START, createApiKeySaga);
}

export function* createApiKeySaga() {
  try {
    yield call(ensureValidToken);
    const token: ReturnType<typeof selectToken> = yield select(selectToken);

    const url = API_URL + "/api-key";

    const response = yield call(
      axios.post,
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { apiKey }: IApiKeyResponse = response.data;

    yield put(createApiKeySuccess(apiKey));
    return;
  } catch (error) {
    yield call(handleApiTypedErrors, error);
    yield put(createApiKeyFailure(error));
    return;
  }
}

// Reset Email
export function* watchResetEmailSaga() {
  yield takeLatest(RESET_EMAIL_START, resetEmailSaga);
}

export function* resetEmailSaga(action: ResetEmailStartAction) {
  try {
    yield call(ensureValidToken);
    const currentToken: ReturnType<typeof selectToken> = yield select(
      selectToken
    );

    const url = API_URL + "/auth/reset-email";
    const response = yield call(
      axios.post,
      url,
      {
        newEmail: action.payload.newEmail,
        password: action.payload.password,
      },
      {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      }
    );

    const { token, refreshToken, user }: IResetEmailResponse = response.data;
    const { expiration: tokenExpiration }: IDecodedToken = jwtDecode(token);
    const { expiration: refreshTokenExpiration }: IDecodedToken = jwtDecode(
      refreshToken
    );
    const profile = {
      id: user._id,
      email: user.email,
    };

    yield put(
      resetEmailSuccess({
        profile,
        token,
        refreshToken,
        tokenExpiration,
        refreshTokenExpiration,
      })
    );
  } catch (error) {
    yield put(resetEmailFailure(error));
  }
}

// Reset Password
export function* watchResetPasswordSaga() {
  yield takeLatest(RESET_PASSWORD_START, resetPasswordSaga);
}

export function* resetPasswordSaga(action: ResetPasswordStartAction) {
  try {
    yield call(ensureValidToken);
    const currentToken: ReturnType<typeof selectToken> = yield select(
      selectToken
    );

    const url = API_URL + "/auth/reset-password";
    const response = yield call(
      axios.post,
      url,
      {
        password: action.payload.password,
        newPassword: action.payload.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      }
    );

    const { token, refreshToken, user }: IResetPasswordResponse = response.data;
    const { expiration: tokenExpiration }: IDecodedToken = jwtDecode(token);
    const { expiration: refreshTokenExpiration }: IDecodedToken = jwtDecode(
      refreshToken
    );
    const profile = {
      id: user._id,
      email: user.email,
    };

    yield put(
      resetPasswordSuccess({
        profile,
        token,
        refreshToken,
        tokenExpiration,
        refreshTokenExpiration,
      })
    );
  } catch (error) {
    yield put(resetPasswordFailure(error));
  }
}

export function* userSagas() {
  yield all([
    call(watchSignUpSaga),
    call(watchLoginSaga),
    call(watchSignOutSaga),
    call(watchFetchTokenSaga),
    call(watchFetchApiKeySaga),
    call(watchCreateApiKeySaga),
    call(watchResetEmailSaga),
    call(watchResetPasswordSaga),
  ]);
}
