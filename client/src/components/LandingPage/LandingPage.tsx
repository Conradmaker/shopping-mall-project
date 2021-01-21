import { Button, Col, Row, Skeleton } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { RootState } from '../../modules';
import { Filter, loadProduct } from '../../modules/product';
import { authUser } from '../../modules/user';
import CheckBox from './CheckBox';
import { continents, price } from './data';
import ListItem from './ListItem';
import RadioBox from './RadioBox';
import SearchBar from './SearchBar';

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
  @media screen and (max-width: 1200px) {
    padding: 20px;
    .ant-col {
      width: 100%;
      max-width: auto;
    }
  }
`;
export default function LandingPage(): JSX.Element {
  const {
    Products: { data },
  } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(0);
  const [filters, setFilters] = useState<Filter>({
    continents: [],
    price: [],
  });
  const [searchValue, onChangeSearchValue] = useInput('');

  const onLoadMore = useCallback(() => {
    setSkip(skip + 8);
  }, []);

  const onChangeConti = (key: number) => {
    setSkip(0);
    if (filters.continents.indexOf(key) === -1) {
      setFilters({ ...filters, continents: filters.continents.concat(key) });
    } else {
      setFilters({
        ...filters,
        continents: filters.continents.filter(v => v !== key),
      });
    }
  };
  const onChangePrice = (key: number) => {
    setSkip(0);
    const selectedPrice = price.filter(v => v.key === key)[0];
    setFilters({
      ...filters,
      price: selectedPrice.array,
    });
  };
  useEffect(() => {
    dispatch(authUser());
  }, []);

  useEffect(() => {
    const data = { skip, limit: 8, loadMore: skip > 0, filters, searchValue };
    dispatch(loadProduct(data));
  }, [skip, filters, searchValue]);

  if (!data)
    return (
      <LandingPageContaiber>
        <Skeleton active avatar />
      </LandingPageContaiber>
    );
  return (
    <LandingPageContaiber>
      <h1>메인페이지</h1>
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <CheckBox
            title="Continents"
            data={continents}
            checkToggle={onChangeConti}
          />
        </Col>
        <Col lg={12} sm={24}>
          <RadioBox data={price} checkToggle={onChangePrice} title="Prices" />
        </Col>
      </Row>
      <SearchBar value={searchValue} onChange={onChangeSearchValue} />

      <Row gutter={[16, 16]}>
        {data.map(v => (
          <Col lg={6} md={8} sm={24} key={v._id}>
            <ListItem product={v} />
          </Col>
        ))}
      </Row>
      {data.length === 8 && (
        <div className="btnWrapper">
          <Button type="primary" onClick={onLoadMore}>
            더보기
          </Button>
        </div>
      )}
    </LandingPageContaiber>
  );
}
