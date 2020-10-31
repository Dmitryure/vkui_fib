import {
  Card,
  CardGrid,
  Cell,
  FormLayout,
  FormLayoutGroup,
  Input,
} from "@vkontakte/vkui";
import React, {
  ChangeEvent,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { fibList, useDebouncedInput } from "./utils";
import { PanelData, EPanels } from "./App";
import { NumberCard } from "./NumberCard";

type Props = {
  handleNavigationClick: (
    panel: PanelData | SetStateAction<PanelData>,
    n: number,
    i: number
  ) => void;
};

export const FibNumberGrid = ({ handleNavigationClick }: Props) => {
  const [number, setNumber] = useDebouncedInput(0, 1000);

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNumber(Number(e.target.value));
    },
    [setNumber]
  );

  const memoList = useMemo(() => {
    return fibList(Number(number));
  }, [number]);

  return (
    <>
      <FormLayout>
        <FormLayoutGroup top="Введите число - получите фибоначи">
          <Input onChange={handleInput} />
        </FormLayoutGroup>
        <Cell>{!isNaN ? "Введенное число: " + number : "Введите число"}</Cell>

        {memoList.length > 0 ? (
          <CardGrid>
            {memoList.map((n, i) => {
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
