import { createReducer } from 'typesafe-actions';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
} from './actions';
import { UserActions, UserState } from './types';

const initialState: UserState = {
  userLogin: { loading: false, data: null, error: null },
  userRegister: { loading: false, data: null, error: null },
  userAuth: { loading: false, data: null, error: null },
  errorMsg: null,
};

const user = createReducer<UserState, UserActions>(initialState, {
  [LOGIN_REQUEST]: state => ({
    ...state,
    userLogin: { loading: true, data: null, error: null },
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    userLogin: { loading: false, data: action.payload, error: null },
  }),
  [LOGIN_ERROR]: (state, action) => ({
    ...state,
    userLogin: {
      loading: false,
      data: null,
      error: action.payload,
    },
    errorMsg: action.payload.response?.data,
  }),
  [REGISTER_REQUEST]: state => ({
    ...state,
    userRegister: { loading: true, data: null, error: null },
  }),
  [REGISTER_SUCCESS]: (state, action) => ({
    ...state,
    userRegister: { loading: false, data: action.payload, error: null },
  }),
  [REGISTER_ERROR]: (state, action) => ({
    ...state,
    userRegister: { loading: false, data: null, error: action.payload },
    errorMsg: action.payload.response?.data,
  }),
  [LOGOUT_REQUEST]: state => ({
    ...state,
    userLogin: { ...state.userLogin, loading: true },
  }),
  [LOGOUT_SUCCESS]: state => ({
    ...state,
    userLogin: { loading: false, data: null, error: null },
    userAuth: { ...state.userAuth, data: null },
  }),
  [LOGOUT_ERROR]: (state, action) => ({
    ...state,
    userLogin: { loading: false, data: null, error: action.payload },
    errorMsg: action.payload.response?.data,
  }),
  [AUTH_REQUEST]: state => ({
    ...state,
    userAuth: { loading: true, data: null, error: null },
    errorMsg: null,
  }),
  [AUTH_SUCCESS]: (state, action) => ({
    ...state,
    userAuth: { loading: false, data: action.payload, error: null },
  }),
  [AUTH_ERROR]: (state, action) => ({
    ...state,
    userAuth: { loading: false, data: null, error: action.payload },
    errorMsg: action.payload.response?.data,
  }),
});

export default user;
