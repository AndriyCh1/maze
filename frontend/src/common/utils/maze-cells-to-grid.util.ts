import { ICell } from "../../components/maze/models/cell.model";

export const mapCellsToGrid = (cells: ICell[], mazeWidth: number) => {
  let row: ICell[] = [];
  const grid: ICell[][] = [];

  cells.forEach((cell) => {
    row.push(cell);

    if ((cell.x + 1) % mazeWidth === 0) {
      grid.push(row);
      row = [];
    }
  });

  return grid;
};
