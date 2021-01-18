import { Button, Descriptions } from 'antd';
import React, { useCallback } from 'react';
import { Product } from '../../modules/product';
type ProductInfoProps = {
  detail: Product;
};
export default function ProductInfo({ detail }: ProductInfoProps): JSX.Element {
  const addCart = useCallback(() => {
    console.log(1);
  }, []);
  return (
    <section>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price">{detail.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{detail.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{detail.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {detail.description}
        </Descriptions.Item>
      </Descriptions>
      <Button size="large" shape="round" type="primary" onClick={addCart}>
        Add to Cart
      </Button>
    </section>
  );
}
