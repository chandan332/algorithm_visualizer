import styled from "styled-components";

export const SudokuBoardStyle = styled.div<{ $numRows: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$numRows}, 1fr);
  grid-gap: 2px;
  padding: 2px;
  margin: 10px auto;
  border: 2px solid #000;
`;

export const CellStyle = styled.div<{ $bgColor?: string; $textColor?: string }>`
  border: 1px solid #000;
  background-color: ${(props) => (props.$bgColor ? props.$bgColor : "inherit")};
  color: ${(props) => (props.$textColor ? props.$textColor : "inherit")};
  /* transition: all ease-in-out 1s; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;
