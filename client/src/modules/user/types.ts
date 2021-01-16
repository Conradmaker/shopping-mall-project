import {
  loginError,
  loginSuccess,
  loginRequest,
  registerSuccess,
  registerRequest,
  registerError,
} from './actions';
export interface loginData {
  loginSuccess: boolean;
  userId: string;
}
export interface RegisterData {
  success: boolean;
}

export type UserActions =
  | ReturnType<typeof loginRequest>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginError>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof registerRequest>
  | ReturnType<typeof registerError>;

export type UserState = {
  userLogin: { loading: boolean; data: null | loginData; error: Error | null };
  userRegister: {
    loading: boolean;
    data: null | RegisterData;
    error: Error | null;
  };
};
