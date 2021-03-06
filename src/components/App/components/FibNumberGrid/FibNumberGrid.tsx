import {
  Card,
  CardGrid,
  Cell,
  FormLayout,
  FormLayoutGroup,
  Input,
  ScreenSpinner,
} from "@vkontakte/vkui";
import React, { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { useDebouncedInput } from "../../../../utils";
import { PanelData, EPanels } from "../../App";
import { NumberCard, Timer } from "./components";
import { useFibonacciWorker } from "../../../../utils/useFibonacciWorker";

const debounceTime = 1000;

type Props = {
  handleNavigationClick: (
    panel: PanelData | SetStateAction<PanelData>,
    n: number,
    i: number
  ) => void;
};

export const FibNumberGrid = ({ handleNavigationClick }: Props) => {
  const [debouncedValue, setValue, value] = useDebouncedInput(0, debounceTime);
  const [data, setNum, loading] = useFibonacciWorker(0);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value);
    if (isNaN(number)) {
      return;
    }
    setValue(number);
  };

  useEffect(() => {
    setNum(debouncedValue);
  }, [debouncedValue, setNum]);

  return (
    <>
      <FormLayout>
        <FormLayoutGroup
          top="Введите число - получите фибоначи"
        >
          <Input
            value={value ? value : ""}
            onChange={handleInput}
          />
          <Timer time={debounceTime} value={value} ignore={[0]} />
        </FormLayoutGroup>
        <Cell>
          {!isNaN ? "Введенное число: " + debouncedValue : "Введите число"}
        </Cell>
        {loading ? (
          <ScreenSpinner />
        ) : data.length > 0 ? (
          <CardGrid>
            {data.map((n, i) => {
              return (
                <Card
                  size="s"
                  key={i}
                  onClick={() =>
                    handleNavigationClick(
                      (state) => ({
                        activePanel: EPanels.number,
                        history: [...state.history, EPanels.number],
                      }),
                      n,
                      i
                    )
                  }
                >
                  <NumberCard n={n} />
                </Card>
              );
            })}
          </CardGrid>
        ) : (
          ""
        )}
      </FormLayout>
    </>
  );
};
