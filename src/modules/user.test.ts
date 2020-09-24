import { call, put } from "redux-saga/effects";
import moment from "moment";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_URL } from "../config";
import * as userModule from "./user";

axios.post = jest.fn();
jest.mock("jwt-decode", () => jest.fn());
const mockedJwtDecode = jwtDecode as jest.Mock;

describe("User Reducer", () => {
  it("should return initial state", () => {
    expect(userModule.userReducer(undefined, userModule.userTest())).toEqual(
      userModule.INITIAL_STATE
    );
  });

  it("should contain user info after successful signup and login", () => {
    expect.assertions(2);

    const now = moment();
    const mockUserInfo:
      | userModule.ISignUpUserInfo
      | userModule.ILoginUserInfo = {
      profile: {
        id: "123",
        email: "test@test.com",
      },
      token: "token",
      tokenExpiration: now.clone().add(1, "hour").toString(),
      refreshToken: "refreshToken",
      refreshTokenExpiration: now.clone().add(1, "year").toString(),
    };
    const mockFinalState: userModule.IUserState = {
      profile: {
        id: "123",
        email: "test@test.com",
      },
      token: "token",
      tokenExpiration: now.clone().add(1, "hour").toString(),
      refreshToken: "refreshToken",
      refreshTokenExpiration: now.clone().add(1, "year").toString(),
      apiKey: null,
    };
    expect(
      userModule.userReducer(undefined, userModule.loginSuccess(mockUserInfo))
    ).toEqual(mockFinalState);
    expect(
      userModule.userReducer(undefined, userModule.signUpSuccess(mockUserInfo))
    ).toEqual(mockFinalState);
  });
});

describe("User Sagas", () => {
  it("should signup and login success with valid username and password", () => {
    expect.assertions(6);

    const userCredentials = { email: "test@test.com", password: "testing" };
    const mockResponse: { data: userModule.ISignUpResponse } = {
      data: {
        token: "token",
        refreshToken: "refreshToken",
        user: {
          _id: "123",
          email: "test@test.com",
          passwordHash: "hashtestinghash",
          createdAt: "1/1/2000",
          updatedAt: "1/1/2000",
        },
      },
    };
    const mockUserInfo: userModule.ISignUpUserInfo = {
      profile: {
        id: "123",
        email: "test@test.com",
      },
      token: "token",
      tokenExpiration: "1/1/2000",
      refreshToken: "refreshToken",
      refreshTokenExpiration: "1/1/2001",
    };

    const signUpGen = userModule.signUpSaga(
      userModule.signUpStart(userCredentials)
    );
    expect(signUpGen.next().value).toEqual(
      call(axios.post, API_URL + "/auth/signup", userCredentials)
    );
    mockedJwtDecode
      .mockReturnValueOnce({ expiration: "1/1/2000" })
      .mockReturnValueOnce({ expiration: "1/1/2001" });
    expect(signUpGen.next(mockResponse).value).toEqual(
      put(userModule.signUpSuccess(mockUserInfo))
    );
    expect(signUpGen.next().done).toBeTruthy();

    const loginGen = userModule.loginSaga(
      userModule.loginStart(userCredentials)
    );
    expect(loginGen.next().value).toEqual(
      call(axios.post, API_URL + "/auth/login", userCredentials)
    );
    mockedJwtDecode
      .mockReturnValueOnce({ expiration: "1/1/2000" })
      .mockReturnValueOnce({ expiration: "1/1/2001" });
    expect(loginGen.next(mockResponse).value).toEqual(
      put(userModule.loginSuccess(mockUserInfo))
    );
    expect(loginGen.next().done).toBeTruthy();
  });
});

jest.clearAllMocks();
