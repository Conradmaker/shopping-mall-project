/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { Dispatch } from 'redux';
import { loginRequsetData, RegisterRequestData } from '../../types';
import {
  loginRequest,
  loginError,
  loginSuccess,
  registerSuccess,
  registerRequest,
  registerError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  authRequest,
  authSuccess,
  authError,
} from './actions';
import {
  UserData,
  loginData,
  LogoutData,
  RegisterData,
  UserActions,
} from './types';

const loginAPI = async (data: loginRequsetData) => {
  const response = await axios.post<loginData>('/api/user/login', data);
  return response.data;
};
export const loginUser = (data: loginRequsetData) => async (
  dispatch: Dispatch<UserActions>
) => {
  try {
    dispatch(loginRequest());
    const res = await loginAPI(data);
    dispatch(loginSuccess(res));
  } catch (e) {
    dispatch(loginError(e));
  }
};

const registerAPI = async (data: RegisterRequestData) => {
  const response = await axios.post<RegisterData>('/api/user/register', data);
  return response.data;
};
export const registerUser = (data: RegisterRequestData) => async (
  dispatch: Dispatch<UserActions>
) => {
  try {
    dispatch(registerRequest());
    const res = await registerAPI(data);
    dispatch(registerSuccess(res));
  } catch (e) {
    dispatch(registerError(e));
  }
};

const logoutAPI = async () => {
  const response = await axios.get<LogoutData>('/api/user/logout');
  return response.data;
};
export const logoutUser = () => async (dispatch: Dispatch<UserActions>) => {
  try {
    dispatch(logoutRequest());
    const res = await logoutAPI();
    dispatch(logoutSuccess(res));
  } catch (e) {
    dispatch(logoutError(e));
  }
};

const authAPI = async () => {
  const response = await axios.get<UserData>('/api/user/auth');
  return response.data;
};
export const authUser = () => async (dispatch: Dispatch<UserActions>) => {
  try {
    dispatch(authRequest());
    const res = await authAPI();
    dispatch(authSuccess(res));
  } catch (e) {
    dispatch(authError(e));
  }
};
