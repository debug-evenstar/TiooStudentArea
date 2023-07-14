import { useState } from 'react';

export const useBoolean = (
  initialValue?: boolean
): [value: boolean, setTrue: () => void, setFalse: () => void] => {
  const [value, setValue] = useState(initialValue || false);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [value, setTrue, setFalse];
};

export default useBoolean;