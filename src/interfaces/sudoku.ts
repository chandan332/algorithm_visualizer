export interface checkOptions {
  num: number;
  posY: number;
  posX: number;
  subGridStart: { y: number; x: number };
  subGridSize: { ySize: number; xSize: number };
}

export interface sudokuboard {
  arr: Array<Array<number>>;
  pos: { y: number; x: number };
  isDisable: boolean;
  solvesudoku(): void;
}
