/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosError } from 'axios';
import { UserData, loginData, LogoutData, RegisterData } from './types';
import { createAsyncAction } from 'typesafe-actions';

export const LOGIN_REQUEST = 'user/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'user/LOGIN_ERROR';

export const REGISTER_REQUEST = 'user/REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'user/REGISTER_SUCCESS';
export const REGISTER_ERROR = 'user/REGISTER_ERROR';

export const LOGOUT_REQUEST = 'user/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'user/LOGOUT_ERROR';

export const AUTH_REQUEST = 'user/AUTH_REQUEST';
export const AUTH_SUCCESS = 'user/AUTH_SUCCESS';
export const AUTH_ERROR = 'user/AUTH_ERROR';

export const loginAsync = createAsyncAction(
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR
)<undefined, loginData, AxiosError>();

export const registerAsync = createAsyncAction(
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR
)<undefined, RegisterData, AxiosError>();

export const authAsync = createAsyncAction(
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR
)<undefined, UserData, AxiosError>();
export const logoutAsync = createAsyncAction(
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
)<undefined, LogoutData, AxiosError>();

export const actions = { loginAsync, registerAsync, logoutAsync, authAsync };
