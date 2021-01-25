import { createReducer } from 'typesafe-actions';
import { PAYPAL_SUCCESS_SUCCESS } from '../Payment';
import { Product } from '../product';
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
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_ERROR,
  LOAD_CART_REQUEST,
  LOAD_CART_SUCCESS,
  LOAD_CART_ERROR,
  REMOVE_CART_SUCCESS,
  REMOVE_CART_REQUEST,
  REMOVE_CART_ERROR,
} from './actions';
import { UserActions, UserState } from './types';

const initialState: UserState = {
  userLogin: { loading: false, data: null, error: null },
  userRegister: { loading: false, data: null, error: null },
  userAuth: { loading: false, data: null, error: null },
  addCart: { loading: false, data: null, error: null },
  loadCart: { loading: false, data: null, error: null },
  removeCart: { loading: false, data: null, error: null },
  userInfo: null,
  errorMsg: null,
};

const user = createReducer<UserState, UserActions>(initialState, {
  [LOGIN_REQUEST]: state => ({
    ...state,
    userLogin: { loading: true, data: null, error: null },
    errorMsg: null,
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
    userInfo: null,
  }),
  [LOGOUT_ERROR]: (state, action) => ({
    ...state,
    userLogin: { loading: false, data: null, error: action.payload },
    errorMsg: action.payload.response?.data,
  }),
  [AUTH_REQUEST]: state => ({
    ...state,
    userAuth: { loading: true, data: state.userAuth.data, error: null },
    errorMsg: null,
  }),
  [AUTH_SUCCESS]: (state, action) => ({
    ...state,
    userAuth: { loading: false, data: true, error: null },
    userInfo: action.payload,
  }),
  [AUTH_ERROR]: (state, action) => ({
    ...state,
    userAuth: { loading: false, data: null, error: action.payload },
    errorMsg: action.payload.response?.data,
  }),
  [ADD_CART_REQUEST]: state => ({
    ...state,
    addCart: { loading: true, data: null, error: null },
    errorMsg: null,
  }),
  [ADD_CART_SUCCESS]: (state, action) => ({
    ...state,
    addCart: { loading: false, data: true, error: null },
    userInfo: { ...state.userInfo, cart: action.payload },
  }),
  [ADD_CART_ERROR]: (state, action) => ({
    ...state,
    addCart: { loading: false, data: null, error: action.payload },
    errorMsg: action.payload.response?.data,
  }),
  [LOAD_CART_REQUEST]: state => ({
    ...state,
    loadCart: { loading: true, data: state.loadCart.data, error: null },
    errorMsg: null,
  }),
  [LOAD_CART_SUCCESS]: (state, action) => ({
    ...state,
    loadCart: { loading: false, data: action.payload, error: null },
  }),
  [LOAD_CART_ERROR]: (state, action) => ({
    ...state,
    loadCart: { loading: false, data: null, error: action.payload },
    errorMsg: action.payload.response?.data,
  }),
  [REMOVE_CART_REQUEST]: state => ({
    ...state,
    removeCart: { loading: true, data: null, error: null },
    errorMsg: null,
  }),
  [REMOVE_CART_SUCCESS]: (state, action) => ({
    ...state,
    removeCart: { loading: false, data: true, error: null },
    userInfo: {
      ...state.userInfo,
      cart: state.userInfo?.cart?.filter(v => v.id !== action.payload.id),
    },
    loadCart: {
      ...state.loadCart,
      data: (state.loadCart.data as Product[]).filter(
        v => v._id !== action.payload.id
      ),
    },
  }),
  [REMOVE_CART_ERROR]: (state, action) => ({
    ...state,
    removeCart: { loading: false, data: null, error: action.payload },
    errorMsg: action.payload.response?.data,
  }),
  [PAYPAL_SUCCESS_SUCCESS]: state => ({
    ...state,
    loadCart: { ...state.loadCart, data: null },
    userInfo: { ...state.userInfo, cart: [] },
  }),
});

export default user;
