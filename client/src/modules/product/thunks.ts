import axios from 'axios';
import { Dispatch } from 'redux';
import { addProductAsync, loadProductAsync } from './actions';
import { LoadOpt, Product, ProductActions } from './types';

const addProductApi = async (data: Product) => {
  const response = await axios.post<Product>('/api/product/add', data);
  return response.data;
};
export const addProduct = (product: Product) => async (
  dispatch: Dispatch<ProductActions>
): Promise<void> => {
  const { request, success, failure } = addProductAsync;
  try {
    dispatch(request());
    const data = await addProductApi(product);
    dispatch(success(data));
  } catch (e) {
    dispatch(failure(e));
  }
};
const loadProductApi = async (opt: LoadOpt) => {
  const response = await axios.post<Product[]>('/api/product/load', opt);
  return response.data;
};
export const loadProduct = (opt: LoadOpt) => async (
  dispatch: Dispatch<ProductActions>
): Promise<void> => {
  const { request, success, failure } = loadProductAsync;
  try {
    dispatch(request());
    const data = await loadProductApi(opt);
    dispatch(success(data));
  } catch (e) {
    console.error(e);
    dispatch(failure(e));
  }
};
