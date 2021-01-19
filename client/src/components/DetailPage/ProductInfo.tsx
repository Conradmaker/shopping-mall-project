import { Button, Descriptions } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Product } from '../../modules/product';
import { addCart } from '../../modules/user';
type ProductInfoProps = {
  detail: Product;
};
export default function ProductInfo({ detail }: ProductInfoProps): JSX.Element {
  const dispatch = useDispatch();
  const onAddCart = useCallback(() => {
    dispatch(addCart(detail._id as string));
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
      <Button size="large" shape="round" type="primary" onClick={onAddCart}>
        Add to Cart
      </Button>
    </section>
  );
}
