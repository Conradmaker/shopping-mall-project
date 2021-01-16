/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { UserData, loginData, LogoutData, RegisterData } from './types';

const LOGIN_REQUEST = 'user/LOGIN_REQUEST' as const;
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS' as const;
const LOGIN_ERROR = 'user/LOGIN_ERROR' as const;

const REGISTER_REQUEST = 'user/REGISTER_REQUEST' as const;
const REGISTER_SUCCESS = 'user/REGISTER_SUCCESS' as const;
const REGISTER_ERROR = 'user/REGISTER_ERROR' as const;

const LOGOUT_REQUEST = 'user/LOGOUT_REQUEST' as const;
const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS' as const;
const LOGOUT_ERROR = 'user/LOGOUT_ERROR' as const;

const AUTH_REQUEST = 'user/AUTH_REQUEST' as const;
const AUTH_SUCCESS = 'user/AUTH_SUCCESS' as const;
const AUTH_ERROR = 'user/AUTH_ERROR' as const;

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});
export const loginSuccess = (data: loginData) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});
export const loginError = (error: Error) => ({
  type: LOGIN_ERROR,
  payload: error,
});

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});
export const registerSuccess = (data: RegisterData) => ({
  type: REGISTER_SUCCESS,
  payload: data,
});
export const registerError = (error: Error) => ({
  type: REGISTER_ERROR,
  payload: error,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});
export const logoutSuccess = (data: LogoutData) => ({
  type: LOGOUT_SUCCESS,
  payload: data,
});
export const logoutError = (error: Error) => ({
  type: LOGOUT_ERROR,
  payload: error,
});

export const authRequest = () => ({
  type: AUTH_REQUEST,
});
export const authSuccess = (data: UserData) => ({
  type: AUTH_SUCCESS,
  payload: data,
});
export const authError = (error: Error) => ({
  type: AUTH_ERROR,
  payload: error,
});
