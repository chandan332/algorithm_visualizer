import { useEffect, useRef, useState } from "react";
import { checkNum, wait } from "../utilities/Helper";
import SucessAlert from "../components/alert/SucessAlert";
import SudokuBoard from "../components/sudoku/SudokuBoard";

const Sudoku = () => {
  const [sudoku, setSudoku] = useState<number[][]>();
  const [show, setShow] = useState(false);
  //onMount
  useEffect(() => {
    setSudoku([
      [3, 0, 6, 5, 0, 8, 4, 0, 0],
      [5, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 8, 7, 0, 0, 0, 0, 3, 1],
      [0, 0, 3, 0, 1, 0, 0, 8, 0],
      [9, 0, 0, 8, 6, 3, 0, 0, 5],
      [0, 5, 0, 0, 9, 0, 6, 0, 0],
      [1, 3, 0, 0, 0, 0, 2, 5, 0],
      [0, 0, 0, 0, 0, 0, 0, 7, 4],
      [0, 0, 5, 2, 0, 6, 3, 0, 0],
    ]);

    //onDestroy
    return () => {};
  }, []);

  const yIndex = useRef<number>(-1);
  const xIndex = useRef<number>(-1);

  async function sudokuSolver() {
    if (!sudoku) return;
    const arr: Array<Array<number>> = [...sudoku];
    const delay = 1000;

    //closure function
    async function Solver(
      start: { x: number; y: number },
      subGrid: { ySize: number; xSize: number }
    ): Promise<boolean> {
      const { x, y } = start;

      //update y and x index
      yIndex.current = y;
      xIndex.current = x;

      //subGrid starting position
      const subGridY = subGrid.ySize * Math.floor(y / subGrid.ySize);
      const subGridX = subGrid.xSize * Math.floor(x / subGrid.xSize);

      //base cases
      if (start.y === arr.length) {
        setShow((show) => !show);
        return true;
      }

      // logic
      if (arr[y][x] !== 0) {
        if (x + 1 === arr[y].length) {
          return Solver({ y: y + 1, x: 0 }, subGrid);
        } else {
          return Solver({ y, x: x + 1 }, subGrid);
        }
      } else {
        let num = 1;
        while (num <= arr[y].length) {
          if (
            !checkNum(arr, {
              num,
              posY: y,
              posX: x,
              subGridStart: { y: subGridY, x: subGridX },
              subGridSize: subGrid,
            })
          ) {
            arr[y][x] = num;
            setSudoku([...arr]);
            await wait(delay);
            if (x + 1 === arr[y].length) {
              if (await Solver({ y: y + 1, x: 0 }, subGrid)) return true;
            } else {
              if (await Solver({ y, x: x + 1 }, subGrid)) return true;
            }
          }
          num++;
        }
      }
      arr[y][x] = 0;
      setSudoku([...arr]);
      await wait(delay);
      return false;
    }
    await Solver({ x: 0, y: 0 }, { ySize: 3, xSize: 3 });
  }

  return (
    sudoku && (
      <div className="w-50 m-auto mt-2">
        {show && <SucessAlert />}
        <SudokuBoard
          arr={sudoku}
          pos={{ y: yIndex.current, x: xIndex.current }}
          solvesudoku={sudokuSolver}
          isDisable={show}
        />
      </div>
    )
  );
};

export default Sudoku;
