import { createReducer } from 'typesafe-actions';
import {
  PAYPAL_SUCCESS_ERROR,
  PAYPAL_SUCCESS_REQUEST,
  PAYPAL_SUCCESS_SUCCESS,
} from './actions';
import { PaymentActions, PaymentState } from './types';

const initialState: PaymentState = {
  paypal: { loading: false, data: null, error: null },
};

const payment = createReducer<PaymentState, PaymentActions>(initialState, {
  [PAYPAL_SUCCESS_REQUEST]: state => ({
    ...state,
    paypal: { loading: true, data: null, error: null },
  }),
  [PAYPAL_SUCCESS_SUCCESS]: state => ({
    ...state,
    paypal: { loading: true, data: true, error: null },
  }),
  [PAYPAL_SUCCESS_ERROR]: (state, action) => ({
    ...state,
    paypal: { loading: true, data: null, error: action.payload.response?.data },
  }),
});
export default payment;
