import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';

export const PAYPAL_SUCCESS_REQUEST = 'user/PAYPAL_SUCCESS_REQUEST';
export const PAYPAL_SUCCESS_SUCCESS = 'user/PAYPAL_SUCCESS_SUCCESS';
export const PAYPAL_SUCCESS_ERROR = 'user/PAYPAL_SUCCESS_ERROR';

export const paypalSuccessAsync = createAsyncAction(
  PAYPAL_SUCCESS_REQUEST,
  PAYPAL_SUCCESS_SUCCESS,
  PAYPAL_SUCCESS_ERROR
)<undefined, { id: string }, AxiosError>();

export const actions = {
  paypalSuccessAsync,
};
