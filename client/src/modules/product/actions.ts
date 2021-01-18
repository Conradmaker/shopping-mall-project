import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { Product } from './types';

export const ADD_PRODUCT_REQUEST = 'product/ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'product/ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_ERROR = 'product/ADD_PRODUCT_ERROR';

export const LOAD_PRODUCT_REQUEST = 'product/LOAD_PRODUCT_REQUEST';
export const LOAD_PRODUCT_SUCCESS = 'product/LOAD_PRODUCT_SUCCESS';
export const LOAD_PRODUCT_ERROR = 'product/LOAD_PRODUCT_ERROR';

export const LOAD_DETAIL_REQUEST = 'product/LOAD_DETAIL_REQUEST';
export const LOAD_DETAIL_SUCCESS = 'product/LOAD_DETAIL_SUCCESS';
export const LOAD_DETAIL_ERROR = 'product/LOAD_DETAIL_ERROR';

export const addProductAsync = createAsyncAction(
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR
)<undefined, Product, AxiosError>();

export const loadProductAsync = createAsyncAction(
  LOAD_PRODUCT_REQUEST,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_ERROR
)<undefined, { product: Product[]; loadMore: boolean }, AxiosError>();

export const loadDetailAsync = createAsyncAction(
  LOAD_DETAIL_REQUEST,
  LOAD_DETAIL_SUCCESS,
  LOAD_DETAIL_ERROR
)<undefined, Product, AxiosError>();

export const actions = { addProductAsync, loadProductAsync, loadDetailAsync };
