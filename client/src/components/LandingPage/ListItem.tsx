import { Card, Carousel } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Product } from '../../modules/product/types';

const ImageBox = styled.div`
  width: 100%;
  height: 150px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  background: #999;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

interface ListItemProps {
  product: Product;
}
export default function ListItem({ product }: ListItemProps): JSX.Element {
  return (
    <Card
      hoverable
      cover={
        <Link to={`/detail/${product._id}`}>
          <Carousel autoplay autoplaySpeed={2000}>
            {product.images.map(image => (
              <ImageBox key={image}>
                <img alt="image" src={`http://localhost:8000/${image}`} />
              </ImageBox>
            ))}
          </Carousel>
        </Link>
      }
    >
      <Card.Meta title={product.title} description={product.price} />
    </Card>
  );
}
