import React from 'react';
import { message, Table } from 'antd';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../modules';
import { History } from '../../modules/user';

const HistoryContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;
const columns = [
  {
    title: 'Payment-ID',
    dataIndex: 'paymentId',
  },
  {
    title: 'price',
    dataIndex: 'price',
    sorter: {
      compare: (a: History, b: History) => a.price - b.price,
      multiple: 3,
    },
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    sorter: {
      compare: (a: History, b: History) => a.quantity - b.quantity,
      multiple: 2,
    },
  },
  {
    title: 'Date of Purchase',
    dataIndex: 'dataOfPurchase',
    sorter: {
      compare: (a: History, b: History) => a.dataOfPurchase - b.dataOfPurchase,
      multiple: 1,
    },
  },
];
export default function HistoryPage({
  history,
}: RouteComponentProps): JSX.Element {
  const { userInfo } = useSelector((state: RootState) => state.user);

  if (!userInfo) {
    message.error('로그인이 필요한 서비스입니다.');
    history.replace('/');
    return <div>로그인해주세요!</div>;
  }
  return (
    <HistoryContainer>
      <Table columns={columns} dataSource={userInfo.history} />
    </HistoryContainer>
  );
}
