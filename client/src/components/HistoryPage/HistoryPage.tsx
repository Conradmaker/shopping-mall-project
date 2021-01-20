import React from 'react';
import { message, Table } from 'antd';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { RootState } from '../../modules';
import { History } from '../../modules/user';
dayjs.locale('ko');

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

  const computedHistory = userInfo?.history?.map(v => ({
    ...v,
    dataOfPurchase: dayjs(v.dataOfPurchase)
      .locale('ko')
      .format('YYYY년 MMMM D일 HH시'),
  }));

  if (!userInfo) {
    message.error('로그인이 필요한 서비스입니다.');
    history.replace('/login');
    return <div>로그인해주세요!</div>;
  }
  return (
    <HistoryContainer>
      <Table columns={columns} dataSource={computedHistory as []} />
    </HistoryContainer>
  );
}
