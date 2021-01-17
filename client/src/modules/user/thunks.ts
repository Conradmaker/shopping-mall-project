/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { Dispatch } from 'redux';
import { loginRequsetData, RegisterRequestData } from '../../types';
import { authAsync, loginAsync, logoutAsync, registerAsync } from './actions';
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
  const { request, success, failure } = loginAsync;
  try {
    dispatch(request());
    const res = await loginAPI(data);
    dispatch(success(res));
  } catch (e) {
    console.error(e);
    dispatch(failure(e));
  }
};

const registerAPI = async (data: RegisterRequestData) => {
  const response = await axios.post<RegisterData>('/api/user/register', data);
  return response.data;
};
export const registerUser = (data: RegisterRequestData) => async (
  dispatch: Dispatch<UserActions>
) => {
  const { request, success, failure } = registerAsync;
  try {
    dispatch(request());
    const res = await registerAPI(data);
    dispatch(success(res));
  } catch (e) {
    dispatch(failure(e));
  }
};

const logoutAPI = async () => {
  const response = await axios.get<LogoutData>('/api/user/logout');
  return response.data;
};
export const logoutUser = () => async (dispatch: Dispatch<UserActions>) => {
  const { request, success, failure } = logoutAsync;
  try {
    dispatch(request());
    const res = await logoutAPI();
    dispatch(success(res));
  } catch (e) {
    dispatch(failure(e));
  }
};

const authAPI = async () => {
  const response = await axios.get<UserData>('/api/user/auth');
  return response.data;
};
export const authUser = () => async (dispatch: Dispatch<UserActions>) => {
  const { request, success, failure } = authAsync;
  try {
    dispatch(request());
    const res = await authAPI();
    dispatch(success(res));
  } catch (e) {
    dispatch(failure(e));
  }
};
