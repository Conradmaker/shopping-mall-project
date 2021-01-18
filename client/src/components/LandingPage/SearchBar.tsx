import { Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 16px;
`;

type SearchBarProps = {
  value: string;
  onChange: (value: React.ChangeEvent) => void;
};
export default function SearchBar({
  onChange,
  value,
}: SearchBarProps): JSX.Element {
  return (
    <SearchBox>
      <Input.Search
        style={{ width: '400px' }}
        value={value}
        onChange={onChange}
      />
    </SearchBox>
  );
}
