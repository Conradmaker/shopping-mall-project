/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosError } from 'axios';
import { UserData, loginData, LogoutData, RegisterData, Cart } from './types';
import { createAsyncAction } from 'typesafe-actions';
import { Product } from '../product';

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

export const ADD_CART_REQUEST = 'user/ADD_CART_REQUEST';
export const ADD_CART_SUCCESS = 'user/ADD_CART_SUCCESS';
export const ADD_CART_ERROR = 'user/ADD_CART_ERROR';

export const LOAD_CART_REQUEST = 'user/LOAD_CART_REQUEST';
export const LOAD_CART_SUCCESS = 'user/LOAD_CART_SUCCESS';
export const LOAD_CART_ERROR = 'user/LOAD_CART_ERROR';

export const REMOVE_CART_REQUEST = 'user/REMOVE_CART_REQUEST';
export const REMOVE_CART_SUCCESS = 'user/REMOVE_CART_SUCCESS';
export const REMOVE_CART_ERROR = 'user/REMOVE_CART_ERROR';

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

export const addCartAsync = createAsyncAction(
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_ERROR
)<undefined, Cart[], AxiosError>();

export const loadCartAsync = createAsyncAction(
  LOAD_CART_REQUEST,
  LOAD_CART_SUCCESS,
  LOAD_CART_ERROR
)<undefined, Product[], AxiosError>();

export const removeCartAsync = createAsyncAction(
  REMOVE_CART_REQUEST,
  REMOVE_CART_SUCCESS,
  REMOVE_CART_ERROR
)<undefined, { id: string }, AxiosError>();

export const actions = {
  loginAsync,
  registerAsync,
  logoutAsync,
  authAsync,
  addCartAsync,
  loadCartAsync,
  removeCartAsync,
};
