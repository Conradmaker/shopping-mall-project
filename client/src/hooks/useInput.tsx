/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';

function isChange(
  e: React.ChangeEvent<any> | number
): e is React.ChangeEvent<any> {
  return (e as React.ChangeEvent).target !== undefined;
}
export default function useInput<T>(
  initialValue: T
): [
  T,
  (e: React.ChangeEvent<any> | number) => void,
  React.Dispatch<React.SetStateAction<T>>
] {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback((e: React.ChangeEvent<any> | number) => {
    if (isChange(e)) {
      setValue(e.target.value);
    } else {
      setValue(e as any);
    }
  }, []);
  return [value, onChange, setValue];
}
