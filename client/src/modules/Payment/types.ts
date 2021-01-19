import { ActionType } from 'typesafe-actions';
import { Product } from '../product';
import { actions } from './actions';

export interface PaypalSuccess {
  address: {
    line1: string;
    city: string;
    postal_code: string;
    recipient_name: string;
    state: string;
  };
  cancelled: boolean;
  email: string;
  paid: true;
  payerID: string;
  paymentID: string;
  paymentToken: string;
  returnUrl: string;
}
export interface PaymentRequest {
  paymentDetail: PaypalSuccess;
  cartDetail: Product[];
}
export type PaymentActions = ActionType<typeof actions>;
export interface PaymentState {
  paypal: { loading: boolean; data: null | boolean; error: null | string };
}
