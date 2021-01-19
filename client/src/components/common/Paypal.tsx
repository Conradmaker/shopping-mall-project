/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { PaypalSuccess, paypalSuccess } from '../../modules/Payment';
import { Product } from '../../modules/product';

type PaypalProps = {
  priceTotal: number;
};
export default function Paypal({ priceTotal }: PaypalProps): JSX.Element {
  const {
    loadCart: { data: cartData },
  } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const onSuccess = (payment: PaypalSuccess) => {
    console.log('The payment was succeeded!', payment);
    dispatch(
      paypalSuccess({
        paymentDetail: payment,
        cartDetail: cartData as Product[],
      })
    );
  };

  const onCancel = (data: any) => {
    console.log('The payment was cancelled!', data);
  };

  const onError = (err: any) => {
    console.log('Error!', err);
  };

  const env = 'sandbox';
  const currency = 'USD';
  const total = priceTotal;
  const client = {
    sandbox: process.env.REACT_APP_PAYPAL_APP_ID,
    production: 'YOUR-PRODUCTION-APP-ID',
  };

  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={total}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
      style={{
        size: 'large',
        color: 'blue',
        shape: 'rect',
        label: 'checkout',
      }}
    />
  );
}
