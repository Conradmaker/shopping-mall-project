/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionType } from 'typesafe-actions';
import { Product } from '../product';
import { actions } from './actions';
export interface loginData {
  loginSuccess: boolean;
  userId: string;
}
export interface RegisterData {
  success: boolean;
}
export interface LogoutData {
  success: boolean;
}
export interface Cart {
  id: string;
  quantity: number;
  date: number;
}
export interface UserData {
  _id?: string;
  isAdmin?: boolean;
  isAuth?: boolean;
  email?: string;
  name?: string;
  lastname?: string;
  role?: number;
  image?: string;
  cart?: Cart[];
  history?: any[];
}

export type UserActions = ActionType<typeof actions>;

export type UserState = {
  userLogin: { loading: boolean; data: null | loginData; error: Error | null };
  userRegister: {
    loading: boolean;
    data: null | RegisterData;
    error: Error | null;
  };
  userAuth: {
    loading: boolean;
    data: null | boolean;
    error: Error | null;
  };
  addCart: {
    loading: boolean;
    data: null | boolean;
    error: Error | null;
  };
  loadCart: {
    loading: boolean;
    data: null | Product[];
    error: Error | null;
  };
  removeCart: {
    loading: boolean;
    data: null | boolean;
    error: Error | null;
  };
  userInfo: null | UserData;
  errorMsg: null | string;
};
