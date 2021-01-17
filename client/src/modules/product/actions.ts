import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { Product } from './types';

export const ADD_PRODUCT_REQUEST = 'product/ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'product/ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_ERROR = 'product/ADD_PRODUCT_ERROR';

export const addProductAsync = createAsyncAction(
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR
)<undefined, Product, AxiosError>();

export const actions = { addProductAsync };
