import { Button, Form, Input, message, Select, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { RootState } from '../../modules';
import { addProduct } from '../../modules/product';
import FileUpload from '../common/utils/FileUpload';

const UploadProductContainer = styled.div`
  max-width: 700px;
  margin: 10px auto;
  label {
    width: 100px;
  }
`;
const continents: { key: number; value: string }[] = [
  { key: 1, value: 'Africa' },
  { key: 2, value: 'Europe' },
  { key: 3, value: 'Asia' },
  { key: 4, value: 'North America' },
  { key: 5, value: 'South America' },
  { key: 6, value: 'Asustralia' },
  { key: 7, value: 'Antarctica' },
];
export default function UploadProductPage({
  history,
}: RouteComponentProps): JSX.Element {
  const {
    user: {
      userAuth: { data: user },
    },
    product: {
      addProduct: { data },
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [title, onChangeTitle] = useInput('');
  const [desc, onChangeDesc] = useInput('');
  const [price, onChangePrice] = useInput(0);
  const [continent, onChangeContinent] = useInput(1);
  const [images, setImages] = useState<Array<string>>([]);

  const updateImages = useCallback((newImgs: string[]) => {
    setImages(newImgs);
  }, []);
  const onSubmit = () => {
    if (!title || !desc || !price || !continent || !images) {
      return message.warn('모든값을 넣어주세요!');
    }
    if (!user?._id) {
      message.warn('로그인이 필요한 서비스입니다.');
      return history.replace('/login');
    }
    dispatch(
      addProduct({
        writer: user?._id,
        title,
        desc,
        price,
        continent,
        images,
      })
    );
  };
  useEffect(() => {
    if (data) {
      message.success('상품등록 성공');
      history.push('/');
    }
  }, [data]);
  return (
    <UploadProductContainer>
      <Typography.Title level={2}>Upload Travel Product</Typography.Title>
      <Form onFinish={onSubmit}>
        <FileUpload updateImages={updateImages} />
        <Form.Item
          name={['product', 'title']}
          label="Title"
          rules={[{ required: true }]}
        >
          <Input value={title} onChange={onChangeTitle} />
        </Form.Item>
        <Form.Item name={['product', 'desc']} label="Description">
          <Input.TextArea value={desc} onChange={onChangeDesc} />
        </Form.Item>
        <Form.Item name={['product', 'price']} label="Price">
          <Input
            prefix="₩"
            suffix="원"
            type="number"
            value={price}
            onChange={onChangePrice}
          />
        </Form.Item>
        <Form.Item name={['product', 'location']} label="Location">
          <Select
            style={{ width: 300 }}
            allowClear
            value={continent}
            onChange={onChangeContinent}
          >
            {continents.map(v => (
              <Select.Option value={v.key} key={v.key}>
                {v.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            등록
          </Button>
        </Form.Item>
      </Form>
    </UploadProductContainer>
  );
}
