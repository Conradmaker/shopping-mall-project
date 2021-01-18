import { Button, Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../modules';
import { loadProduct } from '../../modules/product';
import { authUser } from '../../modules/user';
import ListItem from './ListItem';

const LandingPageContaiber = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  min-height: 90vh;
  h1 {
    text-align: center;
  }
  .btnWrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
export default function LandingPage(): JSX.Element {
  const {
    Products: { data },
    errorMsg,
  } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(0);
  const onLoadMore = useCallback(() => {
    setSkip(skip + 8);
  }, []);
  useEffect(() => {
    dispatch(authUser());
  }, []);
  useEffect(() => {
    const data = { skip, limit: 8, loadMore: true };
    dispatch(loadProduct(data));
  }, [skip]);
  if (!data) return <div>데이터가 없어요ㅠㅠ</div>;
  return (
    <LandingPageContaiber>
      <h1>메인페이지</h1>
      <Row gutter={[16, 16]}>
        {data.map(v => (
          <Col lg={6} md={8} sm={24} key={v._id}>
            <ListItem product={v} />
          </Col>
        ))}
      </Row>
      {data.length < 9 && (
        <div className="btnWrapper">
          <Button type="primary" onClick={onLoadMore}>
            더보기
          </Button>
        </div>
      )}
    </LandingPageContaiber>
  );
}
