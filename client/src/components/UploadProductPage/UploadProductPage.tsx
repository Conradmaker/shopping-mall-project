import { Button, Form, Input, Select, Typography } from 'antd';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
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
export default function UploadProductPage(): JSX.Element {
  const [title, onChangeTitle] = useInput('');
  const [desc, onChangeDesc] = useInput('');
  const [price, onChangePrice] = useInput(0);
  const [continent, onChangeContinent] = useInput(1);
  const [images, setImages] = useState<Array<string | null>>([]);

  const updateImages = useCallback((newImgs: string[]) => {
    setImages(newImgs);
  }, []);
  console.log({ title, desc, price, continent, images });
  return (
    <UploadProductContainer>
      <Typography.Title level={2}>Upload Travel Product</Typography.Title>
      <Form>
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
