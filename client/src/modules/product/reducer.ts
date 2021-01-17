import { createReducer } from 'typesafe-actions';
import { AUTH_REQUEST } from '../user';
import {
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
} from './actions';
import { ProductActions, ProductState } from './types';

const initialState: ProductState = {
  addProduct: { loading: false, data: null, error: null },
  errorMsg: null,
};

const product = createReducer<ProductState, ProductActions>(initialState, {
  [ADD_PRODUCT_REQUEST]: state => ({
    ...state,
    addProduct: { loading: true, data: null, error: null },
  }),
  [ADD_PRODUCT_SUCCESS]: (state, action) => ({
    ...state,
    addProduct: { loading: false, data: action.payload, error: null },
  }),
  [ADD_PRODUCT_ERROR]: (state, action) => ({
    ...state,
    addProduct: { loading: false, data: null, error: action.payload },
    errorMsg: action.payload.response?.data,
  }),
  [AUTH_REQUEST]: state => ({
    ...state,
    addProduct: { ...state.addProduct, data: null },
    errorMsg: null,
  }),
});

export default product;
