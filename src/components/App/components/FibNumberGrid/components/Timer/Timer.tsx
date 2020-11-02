import React, { useEffect, useState } from "react";
import { usePreviousNumber } from "../../../../../../utils/usePreviousNumber";
import style from "./Timer.module.css";

type Props = {
  time: number;
  value: number;
  ignore: number[];
};

export const Timer = ({ time, value, ignore }: Props) => {
  const [isDebouncing, setIsDebouncing] = useState(false);
  const previousValue = usePreviousNumber(value);

  useEffect(() => {
    // REFACTOR: looks weird
    const timeout = setTimeout(() => {
      setIsDebouncing(false);
    }, time);
    if (value !== previousValue && !ignore.includes(value)) {
      setIsDebouncing((state) => {
        if (!state) {
          return true;
        } else {
          setTimeout(() => {
            setIsDebouncing(true);
          }, 10);
        }
        return false;
      });
    } else {
      setIsDebouncing(false);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return (
    <div
      className={style.timer}
      style={
        isDebouncing
          ? { transition: `all ${time}ms`, transform: "translateX(0)" }
          : {}
      }
    />
  );
};
