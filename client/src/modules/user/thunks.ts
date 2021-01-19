/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { Dispatch } from 'redux';
import { loginRequsetData, RegisterRequestData } from '../../types';
import { Product } from '../product';
import {
  addCartAsync,
  authAsync,
  loadCartAsync,
  loginAsync,
  logoutAsync,
  registerAsync,
  removeCartAsync,
} from './actions';
import {
  UserData,
  loginData,
  LogoutData,
  RegisterData,
  UserActions,
  Cart,
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

const addCartAPI = async (_id: string) => {
  const response = await axios.post<Cart[]>('/api/cart/add', {
    productId: _id,
  });
  return response.data;
};
export const addCart = (_id: string) => async (
  dispatch: Dispatch<UserActions>
) => {
  const { request, success, failure } = addCartAsync;
  try {
    dispatch(request());
    const res = await addCartAPI(_id);
    dispatch(success(res));
  } catch (e) {
    dispatch(failure(e));
  }
};

const loadCartAPI = async (data: { cartId: string[]; cartQt: number[] }) => {
  const response = await axios.get<Product[]>(
    `/api/cart/load?id=${data.cartId}&qt=${data.cartQt}`
  );
  return response.data;
};
export const loadCart = (data: {
  cartId: string[];
  cartQt: number[];
}) => async (dispatch: Dispatch<UserActions>) => {
  const { request, success, failure } = loadCartAsync;
  try {
    dispatch(request());
    const res = await loadCartAPI(data);
    dispatch(success(res));
  } catch (e) {
    dispatch(failure(e));
  }
};

const removeCartAPI = async (id: string) => {
  const response = await axios.get<{ id: string }>(`/api/cart/remove?id=${id}`);
  return response.data;
};
export const removeCart = (id: string) => async (
  dispatch: Dispatch<UserActions>
) => {
  const { request, success, failure } = removeCartAsync;
  try {
    dispatch(request());
    const res = await removeCartAPI(id);
    dispatch(success(res));
  } catch (e) {
    dispatch(failure(e));
  }
};
