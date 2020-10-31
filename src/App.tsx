import React, { SetStateAction, useCallback, useState } from "react";
import { View, Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { FibNumberGrid } from "./FibNumberGrid";
import style from "./App.module.css";
import { NumberInfo } from "./NumberInfo";

export enum EPanels {
  main = "main",
  number = "number",
}

export type PanelData = {
  activePanel: string;
  history: string[];
};

const initialActivePanelData = {
  activePanel: "main",
  history: ["main"],
};

function App() {
  const [panelData, setPanelData] = useState<PanelData>(initialActivePanelData);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNavigationClick = useCallback(
    (
      panel: PanelData | SetStateAction<PanelData>,
      n: number,
      i: number
    ): void => {
      setPanelData(panel);
      setCurrentNumber(n);
      setCurrentIndex(i);
    },
    [setPanelData, setCurrentIndex, setCurrentNumber]
  );

  return (
    <>
      <div className={style.circle} />
      <View activePanel={panelData.activePanel}>
        <Panel id={EPanels.main}>
          <PanelHeader>NumbersList</PanelHeader>
          <FibNumberGrid handleNavigationClick={handleNavigationClick} />
        </Panel>
        <Panel id={EPanels.number}>
          <PanelHeader
            left={
              <PanelHeaderBack
                onClick={() => setPanelData(initialActivePanelData)}
              />
            }
          >
            Инфа по числу {currentNumber}
          </PanelHeader>
          <NumberInfo
            currentIndex={currentIndex}
            currentNumber={currentNumber}
          />
        </Panel>
      </View>
    </>
  );
}

export default App;
