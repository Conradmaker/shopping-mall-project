import {
  loginError,
  loginSuccess,
  loginRequest,
  registerSuccess,
  registerRequest,
  registerError,
  logoutSuccess,
  logoutRequest,
  logoutError,
  authSuccess,
  authRequest,
  authError,
} from './actions';
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

export type UserActions =
  | ReturnType<typeof loginRequest>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginError>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof registerRequest>
  | ReturnType<typeof registerError>
  | ReturnType<typeof logoutSuccess>
  | ReturnType<typeof logoutRequest>
  | ReturnType<typeof logoutError>
  | ReturnType<typeof authSuccess>
  | ReturnType<typeof authRequest>
  | ReturnType<typeof authError>;

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
};
