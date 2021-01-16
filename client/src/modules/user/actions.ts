/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { loginData, RegisterData } from './types';

const LOGIN_REQUEST = 'user/LOGIN_REQUEST' as const;
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS' as const;
const LOGIN_ERROR = 'user/LOGIN_ERROR' as const;

const REGISTER_REQUEST = 'user/REGISTER_REQUEST' as const;
const REGISTER_SUCCESS = 'user/REGISTER_SUCCESS' as const;
const REGISTER_ERROR = 'user/REGISTER_ERROR' as const;

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
