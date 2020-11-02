import { Cell, Spinner } from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";

type Props = {
  currentIndex: number;
  currentNumber: number;
};

export const NumberInfo = ({ currentIndex, currentNumber }: Props) => {
  const [info, setInfo] = useState("");

  useEffect(() => {
    fetch(`http://numbersapi.com/${currentNumber}/trivia`)
      .then((r) => r.text())
      .then((data) => setInfo(data));
  }, [setInfo, currentNumber]);

  return (
    <>
      <Cell>Индекс числа Фибоначчи: {currentIndex}</Cell>
      {info ? <Cell>{info}</Cell> : <Spinner />}
    </>
  );
};
