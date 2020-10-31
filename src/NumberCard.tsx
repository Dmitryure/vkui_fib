import React from "react";
import style from "./NumberCard.module.css";

type Props = {
  n: number;
};

export const NumberCard = ({ n }: Props) => {
  return (
    <div className={style.container}>
      <span>{n}</span>
    </div>
  );
};
