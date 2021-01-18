import { Collapse, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import React, { useState } from 'react';

type RadioBoxProps = {
  data: { key: number; name: string; array: number[] }[];
  title: string;
  checkToggle: (key: number) => void;
};
export default function RadioBox({
  checkToggle,
  title,
  data,
}: RadioBoxProps): JSX.Element {
  const [value, setValue] = useState(1);

  const onToggle = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    checkToggle(e.target.value);
  };
  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header={title} key="1">
          <Radio.Group value={value} onChange={onToggle}>
            {data.map(v => (
              <Radio key={v.key} value={v.key}>
                {v.name}
              </Radio>
            ))}
          </Radio.Group>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}
