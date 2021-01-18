import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../modules';
import { loadDetail, Product } from '../../modules/product';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';

const DetailContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  h1 {
    text-align: center;
  }
`;

export default function DetailPage({
  match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
  const { data } = useSelector((state: RootState) => state.product.Detail);
  const dispatch = useDispatch();
  const { id } = match.params;

  useEffect(() => {
    dispatch(loadDetail(id));
  }, [id, dispatch]);
  if (!data) return <></>;
  return (
    <DetailContainer>
      <h1>{data?.title}</h1>
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <ProductImage detail={data as Product} />
        </Col>
        <Col lg={12} sm={24}>
          <ProductInfo detail={data as Product} />
        </Col>
      </Row>
    </DetailContainer>
  );
}
