import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useDebouncedInput = (
  initialValue: number | string = "",
  timeout: number
): [string | number, Dispatch<SetStateAction<string | number>>] => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [value, timeout]);

  return [debouncedValue, setValue];
};
