import { ActionType } from 'typesafe-actions';
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
export interface UserData {
  _id: string;
  isAdmin: boolean;
  isAuth: boolean;
  email: string;
  name: string;
  lastname: string;
  role: number;
  image: string;
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
    data: null | UserData;
    error: Error | null;
  };
  errorMsg: null | string;
};
