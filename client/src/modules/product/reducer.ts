import { createReducer } from 'typesafe-actions';
import { AUTH_REQUEST } from '../user';
import {
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  LOAD_DETAIL_ERROR,
  LOAD_DETAIL_REQUEST,
  LOAD_DETAIL_SUCCESS,
  LOAD_PRODUCT_ERROR,
  LOAD_PRODUCT_REQUEST,
  LOAD_PRODUCT_SUCCESS,
} from './actions';
import { ProductActions, ProductState } from './types';

const initialState: ProductState = {
  addProduct: { loading: false, data: null, error: null },
  Products: { loading: false, data: null, error: null },
  Detail: { loading: false, data: null, error: null },
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

  [LOAD_PRODUCT_REQUEST]: state => ({
    ...state,
    Products: { loading: true, data: state.Products.data, error: null },
  }),
  [LOAD_PRODUCT_SUCCESS]: (state, action) => ({
    ...state,
    Products: {
      loading: false,
      data: state.Products.data
        ? action.payload.loadMore
          ? state.Products.data.concat(action.payload.product)
          : action.payload.product
        : action.payload.product,
      error: null,
    },
  }),
  [LOAD_PRODUCT_ERROR]: (state, action) => ({
    ...state,
    Products: { loading: false, data: null, error: action.payload },
    errorMsg: action.payload.response?.data,
  }),
  [LOAD_DETAIL_REQUEST]: state => ({
    ...state,
    Detail: { loading: true, data: null, error: null },
  }),
  [LOAD_DETAIL_SUCCESS]: (state, action) => ({
    ...state,
    Detail: {
      loading: false,
      data: action.payload,
      error: null,
    },
  }),
  [LOAD_DETAIL_ERROR]: (state, action) => ({
    ...state,
    Detail: { loading: false, data: null, error: action.payload },
    errorMsg: action.payload.response?.data,
  }),

  [AUTH_REQUEST]: state => ({
    ...state,
    addProduct: { ...state.addProduct, data: null },
    errorMsg: null,
  }),
});

export default product;
