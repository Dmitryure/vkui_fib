import { useEffect, useRef } from "react";

export const usePreviousNumber = (value: number = 0) => {
  const previousValueRef = useRef<number>();
  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);
  return previousValueRef.current;
};
