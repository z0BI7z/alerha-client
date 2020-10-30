import * as ApiErrorResponseTypes from "./api-error-response-types";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export const RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_KEY || "";

export { ApiErrorResponseTypes };
