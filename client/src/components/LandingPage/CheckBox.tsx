import { Checkbox, Collapse } from 'antd';
import React from 'react';

type CheckBoxProps = {
  data: { key: number; value: string }[];
  title: string;
  checkToggle: (key: number) => void;
};

export default function CheckBox({
  data,
  title,
  checkToggle,
}: CheckBoxProps): JSX.Element {
  const onToggle = (key: number) => {
    checkToggle(key);
  };
  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header={title} key="1">
          {data.map(v => (
            <Checkbox key={v.key} onChange={() => onToggle(v.key)}>
              {v.value}
            </Checkbox>
          ))}
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}
