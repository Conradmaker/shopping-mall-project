import { Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Product } from '../../modules/product';
import { removeCart } from '../../modules/user';

const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
  img {
    max-height: 50px;
  }
`;
function TableItem({ item }: { item: Product }): JSX.Element {
  const dispatch = useDispatch();
  const onRemove = () => {
    dispatch(removeCart(item._id as string));
  };
  return (
    <tr>
      <td>
        <img
          src={
            item.images.length > 0
              ? `http://localhost:8000/${item.images[0]}`
              : ''
          }
          alt=""
        />
      </td>
      <td>{item.quantity} 개</td>
      <td>{item.price} $</td>
      <td>
        <Button onClick={onRemove}>삭제</Button>
      </td>
    </tr>
  );
}

type UserCardBlockProps = {
  list: Product[];
};
export default function UserCardBlock({
  list,
}: UserCardBlockProps): JSX.Element {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Remove From Cart</th>
          </tr>
        </thead>
        <tbody>
          {list.map(v => (
            <TableItem key={v._id} item={v} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
