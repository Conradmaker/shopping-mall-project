import axios from 'axios';
import { Dispatch } from 'redux';
import { paypalSuccessAsync } from './actions';
import { PaymentActions, PaymentRequest } from './types';

const paypalSuccessAPI = async (data: PaymentRequest) => {
  const response = await axios.post<{ id: string }>(
    `/api/payment/paypal`,
    data
  );
  return response.data;
};
export const paypalSuccess = (data: PaymentRequest) => async (
  dispatch: Dispatch<PaymentActions>
): Promise<void> => {
  const { request, success, failure } = paypalSuccessAsync;
  try {
    dispatch(request());
    const res = await paypalSuccessAPI(data);
    dispatch(success(res));
  } catch (e) {
    console.error(e);
    dispatch(failure(e));
  }
};
