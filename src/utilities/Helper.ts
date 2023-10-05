import { checkOptions } from "../interfaces/sudoku";

function checkNumInRow(num: number, arr: number[][], yIndex: number): boolean {
  // Check if the number exists in the array using Array.prototype.includes
  return arr[yIndex].includes(num);
}

function checkNumInColumn(
  num: number,
  arr: number[][],
  columnIndex: number
): boolean {
  return arr.some((row) => row[columnIndex] === num);
}

function checkNumInSubGrid(
  num: number,
  arr: number[][],
  start: { y: number; x: number },
  subGrid: { ySize: number; xSize: number }
): boolean {
  return arr
    .slice(start.y, start.y + subGrid.ySize)
    .some((row) =>
      row.slice(start.x, start.x + subGrid.xSize).some((cell) => cell === num)
    );
}

export function checkNum(arr: number[][], opt: checkOptions): boolean {
  const { num, posY, posX, subGridStart, subGridSize } = opt;
  return (
    checkNumInColumn(num, arr, posX) ||
    checkNumInRow(num, arr, posY) ||
    checkNumInSubGrid(num, arr, subGridStart, subGridSize)
  );
}

export async function wait(miliseconds: number = 0) {
  let timeoutId: NodeJS.Timeout;
  const promise = new Promise((resolve) => {
    timeoutId = setTimeout(resolve, miliseconds);
  });
  promise.catch(() => clearTimeout(timeoutId));
  return promise;
}
