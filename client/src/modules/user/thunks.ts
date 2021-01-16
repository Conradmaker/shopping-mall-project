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
} from './actions';
import { loginData, RegisterData, UserActions } from './types';

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
