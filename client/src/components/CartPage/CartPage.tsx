import { Button, message, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../modules';
import { Product } from '../../modules/product';
import { loadCart } from '../../modules/user';
import UserCardBlock from './UserCardBlock';

const CartPageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  h1 {
    font-size: 30px;
    font-weight: bold;
  }
`;
export default function CartPage({
  history,
}: RouteComponentProps): JSX.Element {
  const {
    userInfo,
    loadCart: { data },
  } = useSelector((state: RootState) => state.user);
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
    console.log(total);
    setTotal(total);
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

  if (data?.length === 0)
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
    </CartPageContainer>
  );
}
