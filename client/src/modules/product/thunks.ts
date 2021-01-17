import axios from 'axios';
import { Dispatch } from 'redux';
import { addProductAsync } from './actions';
import { Product, ProductActions } from './types';

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
