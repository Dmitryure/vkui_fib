import { Dispatch, SetStateAction, useEffect, useState } from "react";
//@ts-ignore
import makeFibListWorker from "workerize!./fibList";
import { usePreviousNumber } from "./usePreviousNumber";
let workerInstance = makeFibListWorker();

export const useWorker = (
  initialNum: number
): [number[], Dispatch<SetStateAction<number>>, boolean] => {
  const [num, setNum] = useState(initialNum);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<number[]>([]);
  const previousNumber = usePreviousNumber();

  useEffect(() => {
    if (previousNumber === num) {
      return;
    }
    setLoading(true);
    if (workerInstance) {
      workerInstance.terminate();
      workerInstance = undefined;
    }
    workerInstance = makeFibListWorker();
    workerInstance.fibList(num).then((data: number[]) => {
      setData(data);
      setLoading(false);
      workerInstance.terminate();
    });
  }, [num, previousNumber]);

  return [data, setNum, loading];
};

/*
eslint
  import/no-webpack-loader-syntax: 0,
*/
