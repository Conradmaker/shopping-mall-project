import { Button, message, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../modules';
import { Product } from '../../modules/product';
import { loadCart } from '../../modules/user';
import Paypal from '../common/Paypal';
import UserCardBlock from './UserCardBlock';

const CartPageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  h1 {
    font-size: 30px;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  h2 {
    margin-top: 30px;
    margin-bottom: 10px;
  }
`;
export default function CartPage({
  history,
}: RouteComponentProps): JSX.Element {
  const {
    userInfo,
    loadCart: { data },
  } = useSelector((state: RootState) => state.user);
  const {
    paypal: { data: success },
  } = useSelector((state: RootState) => state.payment);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  const calculateTotal = (cartDetail: Product[]) => {
    const total = cartDetail.reduce((acc, v) => {
      if (v.quantity === undefined) {
        v.quantity = 0;
      }
      acc = acc + v.price * v.quantity;
      return acc;
    }, 0);
    setTotal(total);
  };
  const goHome = () => {
    history.replace('/');
  };
  const goBuyList = () => {
    history.replace(`/buylist/${userInfo?._id}`);
  };
  useEffect(() => {
    if (!userInfo) {
      message.warning('로그인이 필요한 서비스입니다.');
      return history.replace('/login');
    }
    if (!userInfo.cart) throw Error('error');
    const cartId: string[] = userInfo.cart.map(v => v.id);
    const cartQt: number[] = userInfo.cart.map(v => v.quantity);
    dispatch(loadCart({ cartId, cartQt }));
  }, [userInfo]);
  useEffect(() => {
    if (!data) return;
    calculateTotal(data);
  }, [data]);

  if (success) {
    return (
      <Result
        status="success"
        title="구매가 완료되었습니다!"
        subTitle="-Thank you for your buy-"
        extra={[
          <Button type="primary" key="console" onClick={goBuyList}>
            구매내역
          </Button>,
          <Button onClick={goHome} key="buy">
            홈으로
          </Button>,
        ]}
      />
    );
  }
  if (data?.length === 0 || !data)
    return (
      <Result
        status="404"
        title="이런.."
        subTitle="장바구니가 비어있어요.. 쇼핑하러 가볼까요?"
        extra={
          <Button type="primary" onClick={() => history.push('/')}>
            Back Home
          </Button>
        }
      />
    );
  if (!data) return <div>데이터가 없어요!!</div>;
  return (
    <CartPageContainer>
      <h1>My Cart</h1>
      <UserCardBlock list={data} />
      <h2>Total Amount:{total} $</h2>
      <Paypal priceTotal={total} />
    </CartPageContainer>
  );
}
