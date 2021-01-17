import { UserActions, UserState } from './types';

const initialState: UserState = {
  userLogin: { loading: false, data: null, error: null },
  userRegister: { loading: false, data: null, error: null },
  userAuth: { loading: false, data: null, error: null },
  errorMsg: null,
};

export default function user(
  state: UserState = initialState,
  action: UserActions
): UserState {
  switch (action.type) {
    case 'user/LOGIN_REQUEST':
      return {
        ...state,
        userLogin: { loading: true, data: null, error: null },
      };
    case 'user/LOGIN_SUCCESS':
      return {
        ...state,
        userLogin: { loading: false, data: action.payload, error: null },
      };
    case 'user/LOGIN_ERROR':
      return {
        ...state,
        userLogin: {
          loading: false,
          data: null,
          error: action.payload,
        },
        errorMsg: action.payload.response?.data,
      };

    case 'user/REGISTER_REQUEST':
      return {
        ...state,
        userRegister: { loading: true, data: null, error: null },
      };
    case 'user/REGISTER_SUCCESS':
      return {
        ...state,
        userRegister: { loading: false, data: action.payload, error: null },
      };
    case 'user/REGISTER_ERROR':
      return {
        ...state,
        userRegister: { loading: false, data: null, error: action.payload },
        errorMsg: action.payload.response?.data,
      };

    case 'user/LOGOUT_REQUEST':
      return {
        ...state,
        userLogin: { ...state.userLogin, loading: true },
      };
    case 'user/LOGOUT_SUCCESS':
      return {
        ...state,
        userLogin: { loading: false, data: null, error: null },
        userAuth: { ...state.userAuth, data: null },
      };
    case 'user/LOGOUT_ERROR':
      return {
        ...state,
        userLogin: { loading: false, data: null, error: action.payload },
        errorMsg: action.payload.response?.data,
      };

    case 'user/AUTH_REQUEST':
      return {
        ...state,
        userAuth: { loading: true, data: null, error: null },
        errorMsg: null,
      };
    case 'user/AUTH_SUCCESS':
      return {
        ...state,
        userAuth: { loading: false, data: action.payload, error: null },
      };
    case 'user/AUTH_ERROR':
      return {
        ...state,
        userAuth: { loading: false, data: null, error: action.payload },
        errorMsg: action.payload.response?.data,
      };
    default:
      return state;
  }
}
