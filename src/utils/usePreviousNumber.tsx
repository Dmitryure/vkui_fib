import { useEffect, useRef } from "react";

export const usePreviousNumber = (value: number = 0) => {
  const previousValueRef = useRef<number>(value);
  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);
  return previousValueRef.current;
};
