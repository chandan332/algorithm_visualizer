import { SudokuBoardStyle, CellStyle } from "./SudokuBoardStyle";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { sudokuboard } from "../../interfaces/sudoku";

const SudokuBoard = ({
  arr,
  pos: currPos,
  isDisable,
  solvesudoku,
}: sudokuboard) => {
  return (
    <>
      <SudokuBoardStyle $numRows={arr.length}>
        {arr.map((arr: Array<number>, y: number) => {
          return arr.map((num: number, x: number) => {
            if (y < currPos.y || (y === currPos.y && x < currPos.x)) {
              return (
                <CellStyle key={uuidv4()} $bgColor="#2195ef">
                  {num}
                </CellStyle>
              );
            }
            if (y === currPos.y && x === currPos.x) {
              return (
                <CellStyle key={uuidv4()} $bgColor="red">
                  {num}
                </CellStyle>
              );
            }
            return <CellStyle key={uuidv4()}>{num}</CellStyle>;
          });
        })}
      </SudokuBoardStyle>
      <Button
        variant="dark"
        className="me-2"
        onClick={solvesudoku}
        disabled={isDisable}
      >
        Solve
      </Button>
    </>
  );
};

export default SudokuBoard;
